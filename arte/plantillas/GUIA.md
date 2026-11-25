# Orden de trabajo para los tiles (con Unity abierto)

El arte se dibuja y se actualiza con Unity corriendo, no antes: primero se juega con la plantilla y los tiles de material se hacen y se retocan viendo la sala. Cómo dibujar no va aquí. Los ids (B1, U2…) están en `LEYENDA.md`.

## Cómo encaja

- La plantilla (38 tiles de 16×16) es el formato de todo tileset de material. Las piezas que un material no use se dejan vacías.
- **Terreno:** la grid con collider se arma solo con la plantilla (`plantilla_terreno_zona1.png`, la versión limpia). Es la hitbox y la jugabilidad; no lleva arte.
- **Decoración:** otra grid encima, con un Order in Layer mayor y sin collider, lleva las hojas de material (laterita, pasto, piedra…). El pasto sobresale unos 4 px fuera de la celda.
- Llamo «paleta de colores» a la de `arte/paletas/` y «paleta de tiles» a la de Unity.

## Orden

1. Proyecto base de Unity (URP 2D, Pixel Perfect 480×270, 16 PPU, Git LFS).
2. Tilemap con Rule Tile del terreno desde la plantilla, con collider y la cámara Pixel Perfect.
3. Luz 2D y shader de paleta sobre ese Tilemap.
4. Arte del primer material de la zona 1, un tile a la vez y viéndolo en la sala. Orden de dibujo:
   - **Bloque base:** B6 (relleno), luego B5, B8, B2 y B14 (bordes), luego B1, B4, B13 y B16 (esquinas).
   - **Esquinas y delgado:** I1 a I4, U1 a U7.
   - **Conectores y variedad:** L1 a L4, X1 a X5 y las variantes (B3 B7 B9 B10 B11 B12 B15 U8 U9).
   - Las variantes van después de su base, porque deben tener las mismas uniones.

## Cada vez que se dibuja

1. Dibuja en la capa `tiles` y guarda en Aseprite.
2. Revisa en Unity cómo se ve en la sala.
3. Cuando haya varios tiles, exporta sin la capa `guia` (PNG indexado, 288×192) y corre `python3 arte/plantillas/revisar_tiles.py hoja.png --imagen errores.png`.

Las celdas vacías cuentan como pendientes, así que el revisor sirve a medio dibujar. Todavía no distingue «pendiente» de «esta hoja no la usa».

## Fechas tentativas (supuesto, se recalcula con lo que tardes)

- 25 a 29 nov: proyecto base de Unity.
- 30 nov a 4 dic: Rule Tile del terreno y cámara Pixel Perfect.
- 5 a 9 dic: luces y shader sobre el terreno.
- 10 a 13 dic: primeros tiles de arte (bloque base).

Los pasos 3 y 4 de la sala (protagonista y bombo) no caben en estas fechas sin mover algo; se decide con cifras cuando termine el Rule Tile.
