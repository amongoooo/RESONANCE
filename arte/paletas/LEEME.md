# Paleta de la zona 1 (atardecer)

`resonancia_zona1.gpl` es la paleta para Aseprite: 23 casillas más el índice 0 (vacío). Está abierta a cambios; las casillas nuevas se agregan siempre **al final** (hasta 32) para no mover lo ya dibujado.

## Cómo usarla en Aseprite

1. En la barra de paleta, menú ☰ > Load Palette y elige el `.gpl`.
2. Sprite > Color Mode > Indexed. El índice 0 queda como transparente: no dibujes con él.
3. Dibuja con colores exactos: sin degradados, sin antialias y sin color fuera de la paleta.
4. En Unity: Filter Mode Point, sin compresión y sin mipmaps.

## Casillas por rol

| Rol (color zona 1) | Casillas | Material |
|---|---|---|
| Sombra | 1-3 | contorno de todo lo que da al aire |
| Suelo (laterita) | 4-7 | terreno y pelaje del bombo |
| Construido (sabana) | 8-11 | adobe, madera, parche del bombo |
| Aire (índigo) | 12-15 | cielo, fondo y cuerpo del protagonista |
| Vida (hoja) | 16-19 | pasto y plantas |
| Sonido (música) | 20-23 | solo luz de la música; ningún tile lo usa |

## Reglas

- Todo lo que da al aire lleva contorno de sombra.
- Bajo el pasto solo tocan suelo 1 y 2.
- Dibuja casi todo con los pasos 1 a 3 y deja el 4 como brillo.
- La madera siempre lleva contorno sombra-1.
- Hora del día: atardecer. La noche es una fila opcional de la tabla.
- Las distorsiones se aplican después de convertir casillas a color.
