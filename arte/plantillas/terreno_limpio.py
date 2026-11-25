"""Versión limpia de la plantilla para la capa de terreno (hitbox) en Unity.

Uso: python3 terreno_limpio.py [carpeta de salida]   (por defecto, esta carpeta)
Saca plantilla_terreno_zona1.png: mismas celdas que plantilla_propia_zona1.png, pero cada tile es un
cuadrado liso de su color (esquina, borde o relleno) sin las marcas de unión (naranja, magenta, blanco)
y sin el verde de la decoración. La forma opaca (el collider) es idéntica a la de la plantilla.
La plantilla original no se toca; esta es solo para probar luces y jugabilidad.
"""
import os, sys
from collections import Counter
from PIL import Image

AQUI = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, AQUI)
from tiles_propios import TILES, COLORES, VERDE  # noqa: E402

def limpiar(src, dst):
    im = Image.open(src).convert("RGBA")
    out = Image.new("RGBA", im.size, (0, 0, 0, 0))
    for _, _, c, f in TILES:
        px = [im.getpixel((c*16+x, f*16+y)) for y in range(16) for x in range(16)]
        base = Counter(p[:3] for p in px if p[3] and p[:3] not in COLORES and p[:3] != VERDE)
        color = base.most_common(1)[0][0]
        for y in range(16):
            for x in range(16):
                out.putpixel((c*16+x, f*16+y), color + (255,))
    out.save(dst)

if __name__ == "__main__":
    carpeta = sys.argv[1] if len(sys.argv) > 1 else AQUI
    limpiar(os.path.join(AQUI, "plantilla_propia_zona1.png"), os.path.join(carpeta, "plantilla_terreno_zona1.png"))
    print("plantilla_terreno_zona1.png listo en", carpeta)
