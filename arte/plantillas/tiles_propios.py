"""Lista de tiles de la plantilla propia (plantilla_propia_zona1.png) y su leyenda.

Uso: python3 tiles_propios.py <carpeta de salida>
Cada tile es (id, nombre, x, y) en píxeles; todos miden 16×16.
Los nombres son una propuesta: corrígelos aquí y vuelve a correr el script.
"""
import sys
from PIL import Image, ImageDraw

def c(col, row): return (col * 16, row * 16)

TILES = []
def t(i, nombre, xy): TILES.append((i, nombre, *xy))

# Terreno base 4×4
for i, (n, cr) in enumerate([
    ("esq sup-izq", (0,0)), ("borde sup a", (1,0)), ("borde sup b", (2,0)), ("esq sup-der", (3,0)),
    ("borde izq a", (0,1)), ("relleno 1", (1,1)), ("relleno 2", (2,1)), ("borde der a", (3,1)),
    ("borde izq b", (0,2)), ("relleno 3", (1,2)), ("relleno 4", (2,2)), ("borde der b", (3,2)),
    ("esq inf-izq", (0,3)), ("borde inf a", (1,3)), ("borde inf b", (2,3)), ("esq inf-der", (3,3))], 1):
    t(f"B{i}", n, c(*cr))
# Esquinas interiores (2×2 magenta) — falta confirmar cuál esquina lleva el hueco
for i, cr in enumerate([(4,0), (5,0), (4,1), (5,1)], 1): t(f"I{i}", "esquina interior (?)", c(*cr))
# Bloques de 1×1 (3×3): el 3×3 repite H y V; son 7 tiles únicos
for i, (n, cr) in enumerate([("esq sup-izq", (6,0)), ("horizontal", (7,0)), ("esq sup-der", (8,0)),
    ("vertical", (6,1)), ("suelto", (7,1)), ("esq inf-izq", (6,2)), ("esq inf-der", (8,2))], 1):
    t(f"U{i}", "1×1 " + n, c(*cr))
t("U8", "1×1 horizontal (variante)", c(7,2))
t("U9", "1×1 vertical (variante)", c(8,1))
# L
for i, cr in enumerate([(9,0), (10,0), (9,1), (9,2)], 1): t(f"L{i}", "L", c(*cr))
# Cruz
for i, (n, cr) in enumerate([("arriba", (12,0)), ("izquierda", (11,1)), ("centro", (12,1)),
    ("derecha", (13,1)), ("abajo", (12,2))], 1): t(f"X{i}", "cruz " + n, c(*cr))
# Medios bloques (en la imagen recibida están corridos 8 px respecto a la rejilla)
for i, n in enumerate(["sin unir", "unidas en vertical", "unidas en horizontal", "unidas en las dos"], 1):
    t(f"M{i}", "4 mitades: " + n, (8 + 32 * (i - 1), 72))
for i in range(4): t(f"T{i+1}", "tira horizontal", (16 * i, 104))
for i, xy in enumerate([(72, 96), (72, 112), (8, 128), (8, 144)], 1): t(f"P{i}", "pilar vertical", xy)
for i, xy in enumerate([(96, 96), (112, 96), (96, 112), (112, 112)], 1): t(f"A{i}", "anillo", xy)

# Variantes (azul más claro en la plantilla): mismo tile con otro dibujo, para dar variedad.
# variante -> tile base. Mismas marcas de unión; solo cambia el dibujo.
VARIANTE_DE = {"B3":"B2", "B9":"B5", "B12":"B8", "B15":"B14",
               "B7":"B6", "B10":"B6", "B11":"B6",
               "U8":"U2", "U9":"U4"}

COLORES = {(249,243,232):"aire", (245,138,74):"une", (216,45,142):"relleno"}
def lados(im, x, y):
    """Marca de cada lado (arriba, derecha, abajo, izquierda), muestreada a 3 px de la esquina."""
    def m(px, py):
        return COLORES.get(im.getpixel((x+px, y+py))[:3], "-")
    return m(3,0), m(15,3), m(3,15), m(0,3)

def leyenda_md(src, dst):
    im = Image.open(src).convert("RGBA")
    L = ["# Leyenda de la plantilla propia (54 tiles)", "",
         "Generada por `tiles_propios.py` desde `plantilla_propia_zona1.png`. Corrige los nombres en el script.", "",
         "- `x,y` son píxeles de la esquina superior izquierda; `col,fila` es la celda de 16×16 (con decimales si el tile está corrido 8 px).",
         "- Lados: **aire** (blanco) = borde visible, lleva contorno de sombra; **une** (naranja) = el dibujo continúa con el vecino; **relleno** (magenta) = se une con relleno.",
         "- Variante = azul más claro en la plantilla: mismo tile con otro dibujo; debe tener las mismas uniones que su base.",
         "- Los tiles corridos (M, T, P1-P2... ver columna `corrido`) quedan pegados a un lado a 8 px de la rejilla; es así a propósito.", "",
         "| id | nombre | x,y | col,fila | corrido | arriba | derecha | abajo | izquierda | variante de |",
         "|---|---|---|---|---|---|---|---|---|---|"]
    for i, n, x, y in TILES:
        a, d, b, iz = lados(im, x, y)
        corr = ("x+8 " if x % 16 else "") + ("y+8" if y % 16 else "")
        L.append(f"| {i} | {n} | {x},{y} | {x/16:g},{y/16:g} | {corr.strip() or '-'} | {a} | {d} | {b} | {iz} | {VARIANTE_DE.get(i, '-')} |")
    open(dst, "w", encoding="utf-8").write("\n".join(L) + "\n")

def leyenda(src, dst, S=6):
    im = Image.open(src).convert("RGBA")
    bg = Image.new("RGBA", im.size, (170, 180, 228, 255)); bg.alpha_composite(im)
    b = bg.resize((im.width * S, im.height * S), Image.NEAREST); d = ImageDraw.Draw(b)
    for i, n, x, y in TILES:
        fuera = (x % 16 or y % 16)
        d.rectangle([x*S, y*S, (x+16)*S-1, (y+16)*S-1], outline=(255, 60, 60, 255) if fuera else (255, 255, 0, 255), width=2)
        d.text((x*S+4, y*S+3), i + ("*" if i in VARIANTE_DE else ""), fill=(255, 255, 0, 255))
    b.save(dst)

if __name__ == "__main__":
    out = sys.argv[1]
    leyenda(out + "/plantilla_propia_zona1.png", out + "/plantilla_propia_zona1_leyenda.png")
    leyenda_md(out + "/plantilla_propia_zona1.png", out + "/LEYENDA.md")
    fuera = [i for i, n, x, y in TILES if x % 16 or y % 16]
    print(len(TILES), "tiles;", len(fuera), "fuera de la rejilla de 16:", " ".join(fuera))
