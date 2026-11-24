# Leyenda de la plantilla propia (74 tiles)

Generada por `tiles_propios.py` desde `plantilla_propia_zona1.png`. Corrige los nombres en el script.

- La hoja se corta siempre en la rejilla de 16×16: `col,fila` es la celda y `x,y` su esquina en píxeles.
- `pieza`: tamaño del dibujo dentro de la celda y el lado o esquina al que va pegado (los bloques pequeños miden 8 px).
- Lados de la celda: **aire** (blanco) = borde visible, lleva contorno de sombra; **une** (naranja) = el dibujo continúa con el vecino; **relleno** (magenta) = se une con relleno; **vacío** = la pieza no toca ese lado. «½» = la pieza cubre solo esa mitad del lado.
- Variante = azul más claro en la plantilla: mismo tile con otro dibujo; debe tener las mismas uniones que su base.

| id | nombre | col,fila | x,y | pieza | arriba | derecha | abajo | izquierda | variante de |
|---|---|---|---|---|---|---|---|---|---|
| B1 | esq sup-izq | 0,0 | 0,0 | 16×16 | aire | une | une | aire | - |
| B2 | borde sup a | 1,0 | 16,0 | 16×16 | aire | une | relleno | une | - |
| B3 | borde sup b | 2,0 | 32,0 | 16×16 | aire | une | relleno | une | B2 |
| B4 | esq sup-der | 3,0 | 48,0 | 16×16 | aire | aire | une | une | - |
| B5 | borde izq a | 0,1 | 0,16 | 16×16 | une | relleno | une | aire | - |
| B6 | relleno 1 | 1,1 | 16,16 | 16×16 | relleno | relleno | relleno | relleno | - |
| B7 | relleno 2 | 2,1 | 32,16 | 16×16 | relleno | relleno | relleno | relleno | B6 |
| B8 | borde der a | 3,1 | 48,16 | 16×16 | une | aire | une | relleno | - |
| B9 | borde izq b | 0,2 | 0,32 | 16×16 | une | relleno | une | aire | B5 |
| B10 | relleno 3 | 1,2 | 16,32 | 16×16 | relleno | relleno | relleno | relleno | B6 |
| B11 | relleno 4 | 2,2 | 32,32 | 16×16 | relleno | relleno | relleno | relleno | B6 |
| B12 | borde der b | 3,2 | 48,32 | 16×16 | une | aire | une | relleno | B8 |
| B13 | esq inf-izq | 0,3 | 0,48 | 16×16 | une | une | aire | aire | - |
| B14 | borde inf a | 1,3 | 16,48 | 16×16 | relleno | une | aire | une | - |
| B15 | borde inf b | 2,3 | 32,48 | 16×16 | relleno | une | aire | une | B14 |
| B16 | esq inf-der | 3,3 | 48,48 | 16×16 | une | aire | aire | une | - |
| I1 | esquina interior, hueco abajo-der | 4,0 | 64,0 | 16×16 | relleno | une | une | relleno | - |
| I2 | esquina interior, hueco abajo-izq | 5,0 | 80,0 | 16×16 | relleno | relleno | une | une | - |
| I3 | esquina interior, hueco arriba-der | 4,1 | 64,16 | 16×16 | une | une | relleno | relleno | - |
| I4 | esquina interior, hueco arriba-izq | 5,1 | 80,16 | 16×16 | une | relleno | relleno | une | - |
| U1 | 1×1 esq sup-izq | 6,0 | 96,0 | 16×16 | aire | une | une | aire | - |
| U2 | 1×1 horizontal | 7,0 | 112,0 | 16×16 | aire | une | aire | une | - |
| U3 | 1×1 esq sup-der | 8,0 | 128,0 | 16×16 | aire | aire | une | une | - |
| U4 | 1×1 vertical | 6,1 | 96,16 | 16×16 | une | aire | une | aire | - |
| U5 | 1×1 suelto | 7,1 | 112,16 | 16×16 | aire | aire | aire | aire | - |
| U6 | 1×1 esq inf-izq | 6,2 | 96,32 | 16×16 | une | une | aire | aire | - |
| U7 | 1×1 esq inf-der | 8,2 | 128,32 | 16×16 | une | aire | aire | une | - |
| U8 | 1×1 horizontal (variante) | 7,2 | 112,32 | 16×16 | aire | une | aire | une | U2 |
| U9 | 1×1 vertical (variante) | 8,1 | 128,16 | 16×16 | une | aire | une | aire | U4 |
| L1 | L | 9,0 | 144,0 | 16×16 | aire | une | aire | aire | - |
| L2 | L | 10,0 | 160,0 | 16×16 | aire | aire | aire | une | - |
| L3 | L | 9,1 | 144,16 | 16×16 | aire | aire | une | aire | - |
| L4 | L | 9,2 | 144,32 | 16×16 | une | aire | aire | aire | - |
| X1 | cruz arriba | 12,0 | 192,0 | 16×16 | aire | une | une | une | - |
| X2 | cruz izquierda | 11,1 | 176,16 | 16×16 | une | une | une | aire | - |
| X3 | cruz centro | 12,1 | 192,16 | 16×16 | une | une | une | une | - |
| X4 | cruz derecha | 13,1 | 208,16 | 16×16 | une | aire | une | une | - |
| X5 | cruz abajo | 12,2 | 192,32 | 16×16 | une | une | aire | une | - |
| M1 | cuartos sueltos, pieza abajo-der | 0,4 | 0,64 | 8×8 abajo-der | vacío | aire ½ abajo | aire ½ der | vacío | - |
| M2 | cuartos sueltos, pieza abajo-izq | 1,4 | 16,64 | 8×8 abajo-izq | vacío | vacío | aire ½ izq | aire ½ abajo | - |
| M3 | cuartos sueltos, pieza arriba-der | 0,5 | 0,80 | 8×8 arriba-der | aire ½ der | aire ½ arriba | vacío | vacío | - |
| M4 | cuartos sueltos, pieza arriba-izq | 1,5 | 16,80 | 8×8 arriba-izq | aire ½ izq | vacío | vacío | aire ½ arriba | - |
| M5 | cuartos unidos en horizontal, pieza abajo-der | 2,4 | 32,64 | 8×8 abajo-der | vacío | une ½ abajo | aire ½ der | vacío | - |
| M6 | cuartos unidos en horizontal, pieza abajo-izq | 3,4 | 48,64 | 8×8 abajo-izq | vacío | vacío | aire ½ izq | une ½ abajo | - |
| M7 | cuartos unidos en horizontal, pieza arriba-der | 2,5 | 32,80 | 8×8 arriba-der | aire ½ der | une ½ arriba | vacío | vacío | - |
| M8 | cuartos unidos en horizontal, pieza arriba-izq | 3,5 | 48,80 | 8×8 arriba-izq | aire ½ izq | vacío | vacío | une ½ arriba | - |
| M9 | cuartos unidos en vertical, pieza abajo-der | 4,4 | 64,64 | 8×8 abajo-der | vacío | aire ½ abajo | une ½ der | vacío | - |
| M10 | cuartos unidos en vertical, pieza abajo-izq | 5,4 | 80,64 | 8×8 abajo-izq | vacío | vacío | une ½ izq | aire ½ abajo | - |
| M11 | cuartos unidos en vertical, pieza arriba-der | 4,5 | 64,80 | 8×8 arriba-der | une ½ der | aire ½ arriba | vacío | vacío | - |
| M12 | cuartos unidos en vertical, pieza arriba-izq | 5,5 | 80,80 | 8×8 arriba-izq | une ½ izq | vacío | vacío | aire ½ arriba | - |
| M13 | cuartos unidos en las dos, pieza abajo-der | 6,4 | 96,64 | 8×8 abajo-der | vacío | une ½ abajo | une ½ der | vacío | - |
| M14 | cuartos unidos en las dos, pieza abajo-izq | 7,4 | 112,64 | 8×8 abajo-izq | vacío | vacío | une ½ izq | une ½ abajo | - |
| M15 | cuartos unidos en las dos, pieza arriba-der | 6,5 | 96,80 | 8×8 arriba-der | une ½ der | une ½ arriba | vacío | vacío | - |
| M16 | cuartos unidos en las dos, pieza arriba-izq | 7,5 | 112,80 | 8×8 arriba-izq | une ½ izq | vacío | vacío | une ½ arriba | - |
| T1 | tira suelta, pegada abajo | 0,6 | 0,96 | 16×8 abajo | vacío | aire ½ abajo | aire | aire ½ abajo | - |
| T2 | tira centro, pegada abajo | 1,6 | 16,96 | 16×8 abajo | vacío | une ½ abajo | aire | une ½ abajo | - |
| T3 | tira extremo izq, pegada abajo | 2,6 | 32,96 | 16×8 abajo | vacío | une ½ abajo | aire | aire ½ abajo | - |
| T4 | tira extremo der, pegada abajo | 3,6 | 48,96 | 16×8 abajo | vacío | aire ½ abajo | aire | une ½ abajo | - |
| T5 | tira suelta, pegada arriba | 0,7 | 0,112 | 16×8 arriba | aire | aire ½ arriba | vacío | aire ½ arriba | - |
| T6 | tira centro, pegada arriba | 1,7 | 16,112 | 16×8 arriba | aire | une ½ arriba | vacío | une ½ arriba | - |
| T7 | tira extremo izq, pegada arriba | 2,7 | 32,112 | 16×8 arriba | aire | une ½ arriba | vacío | aire ½ arriba | - |
| T8 | tira extremo der, pegada arriba | 3,7 | 48,112 | 16×8 arriba | aire | aire ½ arriba | vacío | une ½ arriba | - |
| P1 | pilar extremo sup, pegado der | 4,6 | 64,96 | 8×16 der | aire ½ der | aire | une ½ der | vacío | - |
| P2 | pilar extremo sup, pegado izq | 5,6 | 80,96 | 8×16 izq | aire ½ izq | vacío | une ½ izq | aire | - |
| P3 | pilar extremo inf, pegado der | 4,7 | 64,112 | 8×16 der | une ½ der | aire | aire ½ der | vacío | - |
| P4 | pilar extremo inf, pegado izq | 5,7 | 80,112 | 8×16 izq | une ½ izq | vacío | aire ½ izq | aire | - |
| P5 | pilar suelto, pegado der | 0,8 | 0,128 | 8×16 der | aire ½ der | aire | aire ½ der | vacío | - |
| P6 | pilar suelto, pegado izq | 1,8 | 16,128 | 8×16 izq | aire ½ izq | vacío | aire ½ izq | aire | - |
| P7 | pilar centro, pegado der | 0,9 | 0,144 | 8×16 der | une ½ der | aire | une ½ der | vacío | - |
| P8 | pilar centro, pegado izq | 1,9 | 16,144 | 8×16 izq | une ½ izq | vacío | une ½ izq | aire | - |
| A1 | anillo sup-izq | 6,6 | 96,96 | 16×16 | aire | une ½ arriba | une ½ izq | aire | - |
| A2 | anillo sup-der | 7,6 | 112,96 | 16×16 | aire | aire | une ½ der | une ½ arriba | - |
| A3 | anillo inf-izq | 6,7 | 96,112 | 16×16 | une ½ izq | une ½ abajo | aire | aire | - |
| A4 | anillo inf-der | 7,7 | 112,112 | 16×16 | une ½ der | aire | aire | une ½ abajo | - |
