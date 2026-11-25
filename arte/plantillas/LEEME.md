# Plantillas de tiles

- `plantilla_tiles_zona1.png`: plantilla real (160×128 px, rejilla de 16×16). Solo trae las marcas de conexión.
- `plantilla_tiles_zona1_leyenda.png`: la misma plantilla ampliada, con el nombre de cada tile y qué significa cada color.
- `generar_plantilla.py`: el script que genera las dos imágenes (`python3 generar_plantilla.py <carpeta>`), por si cambia el acomodo.

## Cómo usarla en Aseprite

1. Abre `plantilla_tiles_zona1.png` y cambia el nombre de la capa a `guia`; bájale la opacidad a ~40 %.
2. Agrega una capa nueva encima, llamada `tiles`, y dibuja ahí.
3. Rejilla: View > Grid > Grid Settings, 16×16, y activa Snap to Grid si te ayuda.
4. Para exportar, oculta `guia` y guarda una copia en PNG. Los cuadros vacíos se ignoran al cortar en Unity.

Marcas: punteado verde = se une con otro tile (el dibujo continúa sin corte); línea rosa = da al aire (borde visible); amarilla = se apoya sobre el suelo; contorno gris punteado = variante opcional.

## Plantilla propia (la que se usa)

- `plantilla_propia_zona1.png`: la plantilla del autor (288×192, la nueva de 38 tiles). Se corta siempre en la rejilla de 16×16: cada celda con dibujo es un tile (bloque 4×4, 4 esquinas interiores, anillo 3×3 hueco, cruz, suelto y dos parejas de puntas). Se quitaron las piezas de 1/2 y los anillos de la plantilla anterior de 74.
- El verde es la decoración de pasto: sobresale unos 4 px fuera de las celdas y no lleva hitbox. No es un tile.
- Variantes: el mismo tile con otro dibujo y las mismas uniones que su base. Ya no se pintan de otro azul; se reconocen por su lugar (ver `LEYENDA.md`).
- `plantilla_terreno_zona1.png` y `terreno_limpio.py`: versión limpia para la capa de terreno en Unity (cuadrados lisos, sin marcas ni verde, con la misma forma). `python3 terreno_limpio.py [carpeta]`.
- `LEYENDA.md` y `plantilla_propia_zona1_leyenda.png`: id, nombre, celda, pieza y marca de cada lado. Las variantes llevan `*`.
- `tiles_propios.py`: lista de tiles y generador de la leyenda (`python3 tiles_propios.py <carpeta>`); también comprueba que toda celda con dibujo esté en la lista. Los nombres son una propuesta: se corrigen en el script.
- `revisar_tiles.py`: revisa la hoja exportada (`python3 revisar_tiles.py mis_tiles.png [--imagen errores.png] [--estricto]`). Errores: color fuera de la paleta, semitransparencia, casillas 0 o 20-23, índice que no es su casilla (PNG indexado), píxel al aire sin contorno de sombra, suelo distinto de 4-5 bajo el pasto, uniones que no coinciden (solo dentro de su grupo: B+I; U+L+X; M+T+P+A) y variantes con lados distintos a su base. Aviso: dibujo fuera de la pieza. Las celdas vacías cuentan como pendientes, así sirve a medio dibujar. Las uniones comparan hueco, contorno y material; con `--estricto`, la casilla exacta.
- `GUIA.md`: orden de trabajo con Unity abierto; la plantilla es el formato de todo tileset y lo que no se use se deja vacío.
