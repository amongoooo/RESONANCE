# Leyenda de la plantilla propia (38 tiles)

Generada por `tiles_propios.py` desde `plantilla_propia_zona1.png`. Corrige los nombres en el script.

- La hoja se corta siempre en la rejilla de 16×16: `col,fila` es la celda y `x,y` su esquina en píxeles.
- `pieza`: tamaño del dibujo dentro de la celda (los 38 tiles ocupan la celda entera, 16×16).
- Lados de la celda: **aire** (blanco) = borde visible, lleva contorno de sombra; **une** (naranja) = el dibujo continúa con el vecino; **relleno** (magenta) = se une con relleno.
- Variante: mismo tile con otro dibujo; debe tener las mismas uniones que su base. La plantilla nueva ya no las pinta de otro azul: se reconocen por su lugar (el segundo borde de cada lado, los rellenos 2 a 4, y la segunda pieza horizontal y vertical del anillo).
- El verde de la plantilla es la decoración de pasto: va fuera de las celdas y no es un tile ni lleva hitbox.

| id | nombre | col,fila | x,y | pieza | arriba | derecha | abajo | izquierda | variante de |
|---|---|---|---|---|---|---|---|---|---|
| B1 | esq sup-izq | 1,1 | 16,16 | 16×16 | aire | une | une | aire | - |
| B2 | borde sup a | 2,1 | 32,16 | 16×16 | aire | une | relleno | une | - |
| B3 | borde sup b | 3,1 | 48,16 | 16×16 | aire | une | relleno | une | B2 |
| B4 | esq sup-der | 4,1 | 64,16 | 16×16 | aire | aire | une | une | - |
| B5 | borde izq a | 1,2 | 16,32 | 16×16 | une | relleno | une | aire | - |
| B6 | relleno 1 | 2,2 | 32,32 | 16×16 | relleno | relleno | relleno | relleno | - |
| B7 | relleno 2 | 3,2 | 48,32 | 16×16 | relleno | relleno | relleno | relleno | B6 |
| B8 | borde der a | 4,2 | 64,32 | 16×16 | une | aire | une | relleno | - |
| B9 | borde izq b | 1,3 | 16,48 | 16×16 | une | relleno | une | aire | B5 |
| B10 | relleno 3 | 2,3 | 32,48 | 16×16 | relleno | relleno | relleno | relleno | B6 |
| B11 | relleno 4 | 3,3 | 48,48 | 16×16 | relleno | relleno | relleno | relleno | B6 |
| B12 | borde der b | 4,3 | 64,48 | 16×16 | une | aire | une | relleno | B8 |
| B13 | esq inf-izq | 1,4 | 16,64 | 16×16 | une | une | aire | aire | - |
| B14 | borde inf a | 2,4 | 32,64 | 16×16 | relleno | une | aire | une | - |
| B15 | borde inf b | 3,4 | 48,64 | 16×16 | relleno | une | aire | une | B14 |
| B16 | esq inf-der | 4,4 | 64,64 | 16×16 | une | aire | aire | une | - |
| I1 | esquina interior, hueco abajo-der | 6,1 | 96,16 | 16×16 | relleno | une | une | relleno | - |
| I2 | esquina interior, hueco abajo-izq | 7,1 | 112,16 | 16×16 | relleno | relleno | une | une | - |
| I3 | esquina interior, hueco arriba-der | 6,2 | 96,32 | 16×16 | une | une | relleno | relleno | - |
| I4 | esquina interior, hueco arriba-izq | 7,2 | 112,32 | 16×16 | une | relleno | relleno | une | - |
| U1 | 1×1 esq sup-izq | 9,1 | 144,16 | 16×16 | aire | une | une | aire | - |
| U2 | 1×1 horizontal | 10,1 | 160,16 | 16×16 | aire | une | aire | une | - |
| U3 | 1×1 esq sup-der | 11,1 | 176,16 | 16×16 | aire | aire | une | une | - |
| U4 | 1×1 vertical | 9,2 | 144,32 | 16×16 | une | aire | une | aire | - |
| U5 | 1×1 suelto | 10,6 | 160,96 | 16×16 | aire | aire | aire | aire | - |
| U6 | 1×1 esq inf-izq | 9,3 | 144,48 | 16×16 | une | une | aire | aire | - |
| U7 | 1×1 esq inf-der | 11,3 | 176,48 | 16×16 | une | aire | aire | une | - |
| U8 | 1×1 horizontal (variante) | 10,3 | 160,48 | 16×16 | aire | une | aire | une | U2 |
| U9 | 1×1 vertical (variante) | 11,2 | 176,32 | 16×16 | une | aire | une | aire | U4 |
| L1 | punta izq, une der | 13,6 | 208,96 | 16×16 | aire | une | aire | aire | - |
| L2 | punta der, une izq | 14,6 | 224,96 | 16×16 | aire | aire | aire | une | - |
| L3 | punta arriba, une abajo | 10,9 | 160,144 | 16×16 | aire | aire | une | aire | - |
| L4 | punta abajo, une arriba | 10,10 | 160,160 | 16×16 | une | aire | aire | aire | - |
| X1 | cruz arriba | 15,1 | 240,16 | 16×16 | aire | une | une | une | - |
| X2 | cruz izquierda | 14,2 | 224,32 | 16×16 | une | une | une | aire | - |
| X3 | cruz centro | 15,2 | 240,32 | 16×16 | une | une | une | une | - |
| X4 | cruz derecha | 16,2 | 256,32 | 16×16 | une | aire | une | une | - |
| X5 | cruz abajo | 15,3 | 240,48 | 16×16 | une | une | aire | une | - |
