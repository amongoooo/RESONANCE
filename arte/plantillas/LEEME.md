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

- `plantilla_propia_zona1.png`: la plantilla del autor (224×160). No se modifica. Se corta siempre en la rejilla de 16×16: son 74 tiles (cada celda con dibujo es uno).
- Los bloques pequeños (cuartos, tiras y pilares) son piezas de 8 px pegadas a un lado o a una esquina dentro de su celda de 16×16; los cortes caen siempre en un borde de color.
- El azul más claro marca variantes: el mismo tile con otro dibujo. Llevan las mismas uniones que su tile base.
- `LEYENDA.md` y `plantilla_propia_zona1_leyenda.png`: id, nombre, celda, pieza y marca de cada lado. Las variantes llevan `*`.
- `tiles_propios.py`: lista de tiles y generador de la leyenda (`python3 tiles_propios.py <carpeta>`); también comprueba que toda celda con dibujo esté en la lista. Los nombres son una propuesta: se corrigen en el script.
- `revisar_tiles.py`: revisa la hoja exportada (`python3 revisar_tiles.py mis_tiles.png [--imagen errores.png] [--estricto]`). Errores: color fuera de la paleta, semitransparencia, casillas 0 o 20-23, índice que no es su casilla (PNG indexado), píxel al aire sin contorno de sombra, suelo distinto de 4-5 bajo el pasto, uniones que no coinciden (solo dentro de su grupo: B+I; U+L+X; M+T+P+A) y variantes con lados distintos a su base. Aviso: dibujo fuera de la pieza. Las celdas vacías cuentan como pendientes, así sirve a medio dibujar. Las uniones comparan hueco, contorno y material; con `--estricto`, la casilla exacta.
- `GUIA.md`: guía por fases (orden, fechas y cortes) para dibujar una hoja de material; la plantilla es el formato de todo tileset y lo que no se use se deja vacío.
