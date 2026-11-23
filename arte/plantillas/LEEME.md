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
