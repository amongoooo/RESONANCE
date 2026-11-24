"""Lista de tiles de la plantilla propia (plantilla_propia_zona1.png) y su leyenda.

Uso: python3 tiles_propios.py <carpeta de salida>
La hoja se corta SIEMPRE en la rejilla de 16×16: cada celda con dibujo es un tile.
Los bloques pequeños son piezas de 8 px pegadas a un lado o a una esquina de su celda.
Cada tile es (id, nombre, col, fila). Los nombres son una propuesta: corrígelos aquí.
"""
import sys
from PIL import Image, ImageDraw

TILES = []
def t(i, nombre, col, fila): TILES.append((i, nombre, col, fila))

# Terreno base 4×4
for i, (n, cr) in enumerate([
    ("esq sup-izq", (0,0)), ("borde sup a", (1,0)), ("borde sup b", (2,0)), ("esq sup-der", (3,0)),
    ("borde izq a", (0,1)), ("relleno 1", (1,1)), ("relleno 2", (2,1)), ("borde der a", (3,1)),
    ("borde izq b", (0,2)), ("relleno 3", (1,2)), ("relleno 4", (2,2)), ("borde der b", (3,2)),
    ("esq inf-izq", (0,3)), ("borde inf a", (1,3)), ("borde inf b", (2,3)), ("esq inf-der", (3,3))], 1):
    t(f"B{i}", n, *cr)
# Esquinas interiores (2×2 magenta): el hueco queda en la esquina sin marca magenta
for i, (n, cr) in enumerate([("hueco abajo-der", (4,0)), ("hueco abajo-izq", (5,0)),
                             ("hueco arriba-der", (4,1)), ("hueco arriba-izq", (5,1))], 1):
    t(f"I{i}", "esquina interior, " + n, *cr)
# Bloques de 1×1 (3×3)
for i, (n, cr) in enumerate([("esq sup-izq", (6,0)), ("horizontal", (7,0)), ("esq sup-der", (8,0)),
    ("vertical", (6,1)), ("suelto", (7,1)), ("esq inf-izq", (6,2)), ("esq inf-der", (8,2)),
    ("horizontal (variante)", (7,2)), ("vertical (variante)", (8,1))], 1):
    t(f"U{i}", "1×1 " + n, *cr)
# L
for i, cr in enumerate([(9,0), (10,0), (9,1), (9,2)], 1): t(f"L{i}", "L", *cr)
# Cruz
for i, (n, cr) in enumerate([("arriba", (12,0)), ("izquierda", (11,1)), ("centro", (12,1)),
    ("derecha", (13,1)), ("abajo", (12,2))], 1): t(f"X{i}", "cruz " + n, *cr)
# Cuartos de 8×8 (filas 4-5): 4 juegos de 2×2 celdas; cada celda lleva un cuarto pegado a una esquina
k = 1
for c0, juego in [(0, "sueltos"), (2, "unidos en horizontal"), (4, "unidos en vertical"), (6, "unidos en las dos")]:
    for dc, df, esq in [(0,0,"abajo-der"), (1,0,"abajo-izq"), (0,1,"arriba-der"), (1,1,"arriba-izq")]:
        t(f"M{k}", f"cuartos {juego}, pieza {esq}", c0 + dc, 4 + df); k += 1
# Tiras de 16×8 (filas 6-7): fila 6 pegadas abajo, fila 7 pegadas arriba
k = 1
for f, lado in [(6, "abajo"), (7, "arriba")]:
    for c, n in enumerate(["suelta", "centro", "extremo izq", "extremo der"]):
        t(f"T{k}", f"tira {n}, pegada {lado}", c, f); k += 1
# Pilares de 8×16: columna 4 pegados a la der., columna 5 a la izq.
t("P1", "pilar extremo sup, pegado der", 4, 6); t("P2", "pilar extremo sup, pegado izq", 5, 6)
t("P3", "pilar extremo inf, pegado der", 4, 7); t("P4", "pilar extremo inf, pegado izq", 5, 7)
t("P5", "pilar suelto, pegado der", 0, 8);      t("P6", "pilar suelto, pegado izq", 1, 8)
t("P7", "pilar centro, pegado der", 0, 9);      t("P8", "pilar centro, pegado izq", 1, 9)
# Anillo
for i, (n, cr) in enumerate([("sup-izq", (6,6)), ("sup-der", (7,6)), ("inf-izq", (6,7)), ("inf-der", (7,7))], 1):
    t(f"A{i}", "anillo " + n, *cr)

# Variantes (azul más claro en la plantilla): mismo tile con otro dibujo, para dar variedad.
# variante -> tile base. Mismas marcas de unión; solo cambia el dibujo.
VARIANTE_DE = {"B3":"B2", "B9":"B5", "B12":"B8", "B15":"B14",
               "B7":"B6", "B10":"B6", "B11":"B6",
               "U8":"U2", "U9":"U4"}

COLORES = {(249,243,232):"aire", (245,138,74):"une", (216,45,142):"relleno"}

def borde(im, col, fila, lado):
    """Marca de un lado de la celda: aire / une / relleno / vacío, con «½» si la pieza solo cubre medio lado."""
    x, y = col * 16, fila * 16
    pts = {"arriba": [(x+i, y) for i in range(16)], "abajo": [(x+i, y+15) for i in range(16)],
           "izq": [(x, y+i) for i in range(16)], "der": [(x+15, y+i) for i in range(16)]}[lado]
    px = [im.getpixel(p) for p in pts]
    llenos = [i for i, p in enumerate(px) if p[3]]
    if not llenos: return "vacío"
    a, b = llenos[0], llenos[-1]
    medio = [COLORES.get(px[i][:3], "?") for i in range(a + 1, b)]  # sin las esquinas de la pieza
    marca = max(set(medio), key=medio.count) if medio else "?"
    if b - a + 1 < 16:
        donde = ("arriba" if a == 0 else "abajo") if lado in ("izq", "der") else ("izq" if a == 0 else "der")
        return f"{marca} ½ {donde}"
    return marca

def pieza(im, col, fila):
    x, y = col * 16, fila * 16
    caja = im.crop((x, y, x + 16, y + 16)).getbbox()
    if caja == (0, 0, 16, 16): return "16×16"
    w, h = caja[2] - caja[0], caja[3] - caja[1]
    v = "arriba" if caja[1] == 0 and h < 16 else "abajo" if h < 16 else ""
    hz = "izq" if caja[0] == 0 and w < 16 else "der" if w < 16 else ""
    return f"{w}×{h} " + "-".join(s for s in (v, hz) if s) if (v or hz) else f"{w}×{h} (anillo)"

def leyenda_md(src, dst):
    im = Image.open(src).convert("RGBA")
    L = [f"# Leyenda de la plantilla propia ({len(TILES)} tiles)", "",
         "Generada por `tiles_propios.py` desde `plantilla_propia_zona1.png`. Corrige los nombres en el script.", "",
         "- La hoja se corta siempre en la rejilla de 16×16: `col,fila` es la celda y `x,y` su esquina en píxeles.",
         "- `pieza`: tamaño del dibujo dentro de la celda y el lado o esquina al que va pegado (los bloques pequeños miden 8 px).",
         "- Lados de la celda: **aire** (blanco) = borde visible, lleva contorno de sombra; **une** (naranja) = el dibujo continúa con el vecino; **relleno** (magenta) = se une con relleno; **vacío** = la pieza no toca ese lado. «½» = la pieza cubre solo esa mitad del lado.",
         "- Variante = azul más claro en la plantilla: mismo tile con otro dibujo; debe tener las mismas uniones que su base.", "",
         "| id | nombre | col,fila | x,y | pieza | arriba | derecha | abajo | izquierda | variante de |",
         "|---|---|---|---|---|---|---|---|---|---|"]
    for i, n, c, f in TILES:
        lados = [borde(im, c, f, s) for s in ("arriba", "der", "abajo", "izq")]
        L.append(f"| {i} | {n} | {c},{f} | {c*16},{f*16} | {pieza(im, c, f)} | " + " | ".join(lados) + f" | {VARIANTE_DE.get(i, '-')} |")
    open(dst, "w", encoding="utf-8").write("\n".join(L) + "\n")

def leyenda(src, dst, S=6):
    im = Image.open(src).convert("RGBA")
    bg = Image.new("RGBA", im.size, (170, 180, 228, 255)); bg.alpha_composite(im)
    b = bg.resize((im.width * S, im.height * S), Image.NEAREST); d = ImageDraw.Draw(b)
    for c in range(im.width // 16 + 1): d.line([(c*16*S, 0), (c*16*S, b.height)], fill=(60, 60, 200, 255))
    for f in range(im.height // 16 + 1): d.line([(0, f*16*S), (b.width, f*16*S)], fill=(60, 60, 200, 255))
    for i, n, c, f in TILES:
        d.rectangle([c*16*S, f*16*S, (c+1)*16*S-1, (f+1)*16*S-1], outline=(255, 255, 0, 255), width=2)
        d.text((c*16*S+4, f*16*S+3), i + ("*" if i in VARIANTE_DE else ""), fill=(255, 255, 0, 255))
    b.save(dst)

def comprobar(src):
    """Toda celda con dibujo está en la lista y ningún tile cae en una celda vacía."""
    im = Image.open(src).convert("RGBA")
    con = {(c, f) for f in range(im.height // 16) for c in range(im.width // 16)
           if im.crop((c*16, f*16, c*16+16, f*16+16)).getbbox()}
    lista = {(c, f) for _, _, c, f in TILES}
    assert len(lista) == len(TILES), "celda repetida en la lista"
    return sorted(con - lista), sorted(lista - con)

if __name__ == "__main__":
    out = sys.argv[1]
    src = out + "/plantilla_propia_zona1.png"
    faltan, sobran = comprobar(src)
    leyenda(src, out + "/plantilla_propia_zona1_leyenda.png")
    leyenda_md(src, out + "/LEYENDA.md")
    print(len(TILES), "tiles; celdas con dibujo sin tile:", faltan or "ninguna", "; tiles en celda vacía:", sobran or "ninguno")
