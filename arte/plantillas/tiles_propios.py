"""Lista de tiles de la plantilla propia (plantilla_propia_zona1.png) y su leyenda.

Uso: python3 tiles_propios.py <carpeta de salida>
La hoja (288×192) se corta SIEMPRE en la rejilla de 16×16: cada celda con dibujo es un tile (38).
El verde de la plantilla es la decoración de pasto: va fuera de las celdas, no es un tile ni lleva hitbox.
Cada tile es (id, nombre, col, fila). Los nombres son una propuesta: corrígelos aquí.
"""
import sys
from PIL import Image, ImageDraw

TILES = []
def t(i, nombre, col, fila): TILES.append((i, nombre, col, fila))

# Bloque base 4×4 (columnas 1-4, filas 1-4)
for i, n in enumerate(["esq sup-izq", "borde sup a", "borde sup b", "esq sup-der",
                       "borde izq a", "relleno 1", "relleno 2", "borde der a",
                       "borde izq b", "relleno 3", "relleno 4", "borde der b",
                       "esq inf-izq", "borde inf a", "borde inf b", "esq inf-der"]):
    t(f"B{i+1}", n, 1 + i % 4, 1 + i // 4)
# Esquinas interiores (2×2 magenta, columnas 6-7, filas 1-2): el hueco queda en la esquina sin marca magenta
for i, (n, cr) in enumerate([("hueco abajo-der", (6,1)), ("hueco abajo-izq", (7,1)),
                             ("hueco arriba-der", (6,2)), ("hueco arriba-izq", (7,2))], 1):
    t(f"I{i}", "esquina interior, " + n, *cr)
# Anillo de 1×1 (3×3 con el centro hueco, columnas 9-11, filas 1-3) y el suelto
for i, (n, cr) in enumerate([("esq sup-izq", (9,1)), ("horizontal", (10,1)), ("esq sup-der", (11,1)),
    ("vertical", (9,2)), ("suelto", (10,6)), ("esq inf-izq", (9,3)), ("esq inf-der", (11,3)),
    ("horizontal (variante)", (10,3)), ("vertical (variante)", (11,2))], 1):
    t(f"U{i}", "1×1 " + n, *cr)
# Puntas de línea: pareja horizontal (L1-L2) y vertical (L3-L4)
for i, (n, cr) in enumerate([("punta izq, une der", (13,6)), ("punta der, une izq", (14,6)),
    ("punta arriba, une abajo", (10,9)), ("punta abajo, une arriba", (10,10))], 1):
    t(f"L{i}", n, *cr)
# Cruz
for i, (n, cr) in enumerate([("arriba", (15,1)), ("izquierda", (14,2)), ("centro", (15,2)),
    ("derecha", (16,2)), ("abajo", (15,3))], 1):
    t(f"X{i}", "cruz " + n, *cr)

# Variantes (azul más claro en la plantilla): mismo tile con otro dibujo, para dar variedad.
# variante -> tile base. Mismas marcas de unión; solo cambia el dibujo.
VARIANTE_DE = {"B3":"B2", "B9":"B5", "B12":"B8", "B15":"B14",
               "B7":"B6", "B10":"B6", "B11":"B6",
               "U8":"U2", "U9":"U4"}

COLORES = {(249,243,232):"aire", (245,138,74):"une", (216,45,142):"relleno"}
VERDE = (91, 136, 61)  # decoración de pasto: fuera de las celdas, no es tile

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
         "- `pieza`: tamaño del dibujo dentro de la celda (los 38 tiles ocupan la celda entera, 16×16).",
         "- Lados de la celda: **aire** (blanco) = borde visible, lleva contorno de sombra; **une** (naranja) = el dibujo continúa con el vecino; **relleno** (magenta) = se une con relleno.",
         "- Variante: mismo tile con otro dibujo; debe tener las mismas uniones que su base. La plantilla nueva ya no las pinta de otro azul: se reconocen por su lugar (el segundo borde de cada lado, los rellenos 2 a 4, y la segunda pieza horizontal y vertical del anillo).",
         "- El verde de la plantilla es la decoración de pasto: va fuera de las celdas y no es un tile ni lleva hitbox.", "",
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
    def con_dibujo(c, f):
        return any(p[3] and p[:3] != VERDE
                   for p in (im.getpixel((c*16+x, f*16+y)) for y in range(16) for x in range(16)))
    con = {(c, f) for f in range(im.height // 16) for c in range(im.width // 16) if con_dibujo(c, f)}
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
