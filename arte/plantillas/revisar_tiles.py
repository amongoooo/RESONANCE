"""Revisor de tiles dibujados sobre la plantilla propia (plantilla_propia_zona1.png).

Uso: python3 revisar_tiles.py mis_tiles.png [--imagen errores.png] [--estricto]

Lee el PNG exportado (288×192, indexado o RGBA, sin la capa guia) y revisa cada uno de los 38 tiles.
Las marcas de cada lado y la forma de cada pieza salen de la plantilla (tiles_propios.py), no se copian a mano.
Las celdas vacías se saltan (pendientes), así sirve a medio dibujar.

Errores (código de salida 1):
  - color fuera de la paleta, semitransparencia, casillas 0 o 20-23;
    en PNG indexado, un índice cuyo color no es el de esa casilla (Unity leerá el índice).
  - píxel que da al aire sin contorno de sombra (1-3): lados «aire» de la celda y huecos dentro de ella.
  - suelo justo debajo del pasto que no es 4 o 5.
  - uniones: dos lados que pueden tocarse (mismo tipo, misma mitad, mismos extremos al aire, mismo grupo)
    deben coincidir píxel a píxel en hueco, contorno y material (con --estricto, en casilla exacta).
  - variantes: sus cuatro lados, contra los de su tile base.
Avisos (no cambian el código de salida):
  - algo dibujado fuera de la pieza de la plantilla.
La regla «madera con contorno sombra-1» no se revisa todavía: ningún tile está asignado a madera.
"""
import os, sys
from PIL import Image, ImageDraw

AQUI = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, AQUI)
from tiles_propios import TILES, VARIANTE_DE, borde  # noqa: E402

PLANTILLA = os.path.join(AQUI, "plantilla_propia_zona1.png")
PALETA = os.path.join(AQUI, "..", "paletas", "resonancia_zona1.gpl")
GRUPO = {"B": "grueso", "I": "grueso", "U": "delgado", "L": "delgado", "X": "delgado"}
LADOS = ("arriba", "der", "abajo", "izq")
OPUESTO = {"arriba": "abajo", "abajo": "arriba", "izq": "der", "der": "izq"}
# Para cada lado, los dos lados perpendiculares que forman sus extremos.
EXTREMOS = {"arriba": ("izq", "der"), "abajo": ("izq", "der"), "izq": ("arriba", "abajo"), "der": ("arriba", "abajo")}


def leer_paleta(ruta):
    cols = []
    for linea in open(ruta, encoding="utf-8"):
        p = linea.split()
        if len(p) >= 4 and all(x.isdigit() for x in p[:3]):
            cols.append(tuple(int(x) for x in p[:3]))
    return cols  # cols[i] = color de la casilla i (0 = vacío)


def rol(c):
    if c is None: return "hueco"
    return ("vacío", "sombra", "suelo", "construido", "aire", "vida", "sonido")[0 if c == 0 else 1 if c <= 3 else (c - 4) // 4 + 2]


def leer_hoja(ruta, paleta, errores):
    """Devuelve cas[y][x] = casilla (int) o None si es transparente; -1 = color fuera de paleta."""
    im = Image.open(ruta)
    w, h = im.size
    cas = [[None] * w for _ in range(h)]
    if im.mode == "P":
        trans = im.info.get("transparency")
        pal = im.getpalette() or []
        malos = set()
        for y in range(h):
            for x in range(w):
                i = im.getpixel((x, y))
                if isinstance(trans, int) and i == trans: continue
                if isinstance(trans, bytes) and i < len(trans) and trans[i] < 255:
                    if trans[i] > 0: errores.append(((x, y), "semitransparente"))
                    continue
                if i >= len(paleta):
                    cas[y][x] = -1; errores.append(((x, y), f"índice {i} fuera de la paleta")); continue
                if tuple(pal[3*i:3*i+3]) != paleta[i] and i not in malos:
                    malos.add(i); errores.append(((x, y), f"el índice {i} no tiene el color de la casilla {i} (¿paleta reordenada?)"))
                cas[y][x] = i
    else:
        im = im.convert("RGBA")
        idx = {c: i for i, c in enumerate(paleta)}
        for y in range(h):
            for x in range(w):
                r, g, b, a = im.getpixel((x, y))
                if a == 0: continue
                if a < 255: errores.append(((x, y), "semitransparente"))
                cas[y][x] = idx.get((r, g, b), -1)
                if cas[y][x] == -1: errores.append(((x, y), f"color fuera de la paleta {(r, g, b)}"))
    return (w, h), cas


def tipo_lado(marca):
    """'une ½ abajo' -> ('une', 'abajo'); 'aire' -> ('aire', None)."""
    p = marca.split()
    return p[0], (p[2] if len(p) == 3 else None)


def linea(cas, c, f, lado):
    x, y = c * 16, f * 16
    if lado == "arriba": return [cas[y][x+i] for i in range(16)]
    if lado == "abajo": return [cas[y+15][x+i] for i in range(16)]
    if lado == "izq": return [cas[y+i][x] for i in range(16)]
    return [cas[y+i][x+15] for i in range(16)]


def iguales(a, b, estricto):
    if estricto: return a == b
    return rol(a) == rol(b)


def revisar(ruta, estricto=False):
    paleta = leer_paleta(PALETA)
    plantilla = Image.open(PLANTILLA).convert("RGBA")
    generales = []
    tam, cas = leer_hoja(ruta, paleta, generales)
    if tam != plantilla.size:
        sys.exit(f"La hoja mide {tam[0]}×{tam[1]}; debe medir {plantilla.size[0]}×{plantilla.size[1]} como la plantilla.")

    por_tile = {i: {"errores": [], "avisos": []} for i, *_ in TILES}
    celda = {(c, f): i for i, _, c, f in TILES}
    pos = {i: (c, f) for i, _, c, f in TILES}
    marcas = {i: {s: borde(plantilla, c, f, s) for s in LADOS} for i, _, c, f in TILES}
    for (x, y), msg in generales:
        i = celda.get((x // 16, y // 16))
        if i: por_tile[i]["errores"].append(((x, y), msg))

    dibujado = {i for i, _, c, f in TILES
                if any(cas[f*16+dy][c*16+dx] is not None for dy in range(16) for dx in range(16))}
    sin_lista = sorted({(x // 16, y // 16) for y in range(tam[1]) for x in range(tam[0])
                        if cas[y][x] is not None} - set(celda))

    for i, _, c, f in TILES:
        if i not in dibujado: continue
        E, A = por_tile[i]["errores"], por_tile[i]["avisos"]
        x0, y0 = c * 16, f * 16
        fuera_aire = {s: tipo_lado(marcas[i][s])[0] in ("aire", "vacío") for s in LADOS}
        for dy in range(16):
            for dx in range(16):
                v = cas[y0+dy][x0+dx]
                if v is None: continue
                x, y = x0 + dx, y0 + dy
                if v == 0 or 20 <= v <= 23:
                    E.append(((x, y), f"casilla {v} ({'vacío' if v == 0 else 'sonido'}): no va en tiles"))
                if plantilla.getpixel((x, y))[3] == 0:
                    A.append(((x, y), "dibujado fuera de la pieza de la plantilla"))
                # Contorno: ¿algún vecino es aire?
                al_aire = False
                for ddx, ddy, lado in ((0, -1, "arriba"), (1, 0, "der"), (0, 1, "abajo"), (-1, 0, "izq")):
                    nx, ny = dx + ddx, dy + ddy
                    if 0 <= nx < 16 and 0 <= ny < 16:
                        if cas[y0+ny][x0+nx] is None: al_aire = True
                    elif fuera_aire[lado]:
                        al_aire = True
                if al_aire and v > 0 and not 1 <= v <= 3:
                    E.append(((x, y), f"da al aire sin contorno de sombra (casilla {v})"))
                # Pasto sobre suelo
                if 16 <= v <= 19 and dy < 15:
                    abajo = cas[y+1][x]
                    if abajo is not None and 4 <= abajo <= 7 and abajo not in (4, 5):
                        E.append(((x, y+1), f"bajo el pasto solo va suelo 4 o 5 (hay {abajo})"))

    # Uniones dentro de cada grupo
    def firma(i, lado):
        t, mitad = tipo_lado(marcas[i][lado])
        if t not in ("une", "relleno"): return None
        ext = tuple(tipo_lado(marcas[i][e])[0] in ("aire", "vacío") for e in EXTREMOS[lado])
        return (GRUPO[i[0]], t, mitad, ext)

    def px_de(i, lado, k):
        c, f = pos[i]
        return (c*16 + (k if lado in ("arriba", "abajo") else (15 if lado == "der" else 0)),
                f*16 + (k if lado in ("izq", "der") else (15 if lado == "abajo" else 0)))

    fallas = {}  # (tile, lado, qué) -> [(otro tile, su lado, píxeles distintos)]
    def comparar(a, la, b, lb, que_a, que_b):
        A_, B_ = linea(cas, *pos[a], la), linea(cas, *pos[b], lb)
        mal = [k for k in range(16) if not iguales(A_[k], B_[k], estricto)]
        if mal:
            fallas.setdefault((a, la, que_a), []).append((b, lb, mal))
            if b != a: fallas.setdefault((b, lb, que_b), []).append((a, la, mal))

    for la in ("der", "abajo"):
        lb = OPUESTO[la]
        for a in sorted(dibujado):
            fa = firma(a, la)
            if not fa: continue
            for b in sorted(dibujado):
                if firma(b, lb) == fa:
                    comparar(a, la, b, lb, "unión", "unión")
    for v, base in VARIANTE_DE.items():
        if v in dibujado and base in dibujado:
            for s in LADOS:
                comparar(v, s, base, s, f"variante de {base}", f"base de {v}")
    for (i, lado, que), otros in fallas.items():
        nombres = ", ".join(f"{o} ({lo})" for o, lo, _ in otros)
        por_tile[i]["errores"].append((px_de(i, lado, otros[0][2][0]),
            f"{que}: su lado {lado} no coincide con {len(otros)} lado(s): {nombres}"))

    return por_tile, dibujado, sin_lista, cas


def imagen(ruta_hoja, por_tile, dst, S=6):
    im = Image.open(ruta_hoja).convert("RGBA")
    bg = Image.new("RGBA", im.size, (110, 112, 130, 255)); bg.alpha_composite(im)
    b = bg.resize((im.width * S, im.height * S), Image.NEAREST); d = ImageDraw.Draw(b)
    for c in range(im.width // 16 + 1): d.line([(c*16*S, 0), (c*16*S, b.height)], fill=(60, 60, 200, 255))
    for f in range(im.height // 16 + 1): d.line([(0, f*16*S), (b.width, f*16*S)], fill=(60, 60, 200, 255))
    for r in por_tile.values():
        for clave, color in (("avisos", (255, 210, 0, 255)), ("errores", (255, 40, 40, 255))):
            for (x, y), _ in r[clave]:
                d.rectangle([x*S, y*S, x*S+S-1, y*S+S-1], outline=color, width=2)
    b.save(dst)


def main(argv):
    if not argv or argv[0].startswith("-"):
        sys.exit(__doc__)
    ruta = argv[0]
    estricto = "--estricto" in argv
    por_tile, dibujado, sin_lista, _ = revisar(ruta, estricto)
    ne = na = 0
    for i, n, c, f in TILES:
        r = por_tile[i]
        if i not in dibujado or not (r["errores"] or r["avisos"]): continue
        print(f"\n{i} ({n}, celda {c},{f})")
        for clave, etiqueta in (("errores", "ERROR"), ("avisos", "aviso")):
            vistos = {}
            for (x, y), msg in r[clave]:
                vistos.setdefault(msg, []).append((x, y))
            for msg, pts in vistos.items():
                extra = f" y {len(pts) - 3} más" if len(pts) > 3 else ""
                print(f"  {etiqueta}: {msg} en {', '.join(f'({x},{y})' for x, y in pts[:3])}{extra}")
        ne += len(r["errores"]); na += len(r["avisos"])
    if sin_lista:
        print("\naviso: hay dibujo en celdas que no son tiles:", sin_lista); na += 1
    print(f"\n{len(dibujado)} de {len(TILES)} tiles dibujados ({len(TILES) - len(dibujado)} pendiente(s)); "
          f"{ne} error(es), {na} aviso(s).")
    if "--imagen" in argv:
        dst = argv[argv.index("--imagen") + 1]
        imagen(ruta, por_tile, dst)
        print("Imagen con marcas (rojo = error, amarillo = aviso):", dst)
    return 1 if ne else 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
