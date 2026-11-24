# Leyenda de la plantilla propia (54 tiles)

Generada por `tiles_propios.py` desde `plantilla_propia_zona1.png`. Corrige los nombres en el script.

- `x,y` son píxeles de la esquina superior izquierda; `col,fila` es la celda de 16×16 (con decimales si el tile está corrido 8 px).
- Lados: **aire** (blanco) = borde visible, lleva contorno de sombra; **une** (naranja) = el dibujo continúa con el vecino; **relleno** (magenta) = se une con relleno.
- Variante = azul más claro en la plantilla: mismo tile con otro dibujo; debe tener las mismas uniones que su base.
- Los tiles corridos (M, T, P1-P2... ver columna `corrido`) quedan pegados a un lado a 8 px de la rejilla; es así a propósito.

| id | nombre | x,y | col,fila | corrido | arriba | derecha | abajo | izquierda | variante de |
|---|---|---|---|---|---|---|---|---|---|
| B1 | esq sup-izq | 0,0 | 0,0 | - | aire | une | une | aire | - |
| B2 | borde sup a | 16,0 | 1,0 | - | aire | une | relleno | une | - |
| B3 | borde sup b | 32,0 | 2,0 | - | aire | une | relleno | une | B2 |
| B4 | esq sup-der | 48,0 | 3,0 | - | aire | aire | une | une | - |
| B5 | borde izq a | 0,16 | 0,1 | - | une | relleno | une | aire | - |
| B6 | relleno 1 | 16,16 | 1,1 | - | relleno | relleno | relleno | relleno | - |
| B7 | relleno 2 | 32,16 | 2,1 | - | relleno | relleno | relleno | relleno | B6 |
| B8 | borde der a | 48,16 | 3,1 | - | une | aire | une | relleno | - |
| B9 | borde izq b | 0,32 | 0,2 | - | une | relleno | une | aire | B5 |
| B10 | relleno 3 | 16,32 | 1,2 | - | relleno | relleno | relleno | relleno | B6 |
| B11 | relleno 4 | 32,32 | 2,2 | - | relleno | relleno | relleno | relleno | B6 |
| B12 | borde der b | 48,32 | 3,2 | - | une | aire | une | relleno | B8 |
| B13 | esq inf-izq | 0,48 | 0,3 | - | une | une | aire | aire | - |
| B14 | borde inf a | 16,48 | 1,3 | - | relleno | une | aire | une | - |
| B15 | borde inf b | 32,48 | 2,3 | - | relleno | une | aire | une | B14 |
| B16 | esq inf-der | 48,48 | 3,3 | - | une | aire | aire | une | - |
| I1 | esquina interior (?) | 64,0 | 4,0 | - | relleno | une | une | relleno | - |
| I2 | esquina interior (?) | 80,0 | 5,0 | - | relleno | relleno | une | une | - |
| I3 | esquina interior (?) | 64,16 | 4,1 | - | une | une | relleno | relleno | - |
| I4 | esquina interior (?) | 80,16 | 5,1 | - | une | relleno | relleno | une | - |
| U1 | 1×1 esq sup-izq | 96,0 | 6,0 | - | aire | une | une | aire | - |
| U2 | 1×1 horizontal | 112,0 | 7,0 | - | aire | une | aire | une | - |
| U3 | 1×1 esq sup-der | 128,0 | 8,0 | - | aire | aire | une | une | - |
| U4 | 1×1 vertical | 96,16 | 6,1 | - | une | aire | une | aire | - |
| U5 | 1×1 suelto | 112,16 | 7,1 | - | aire | aire | aire | aire | - |
| U6 | 1×1 esq inf-izq | 96,32 | 6,2 | - | une | une | aire | aire | - |
| U7 | 1×1 esq inf-der | 128,32 | 8,2 | - | une | aire | aire | une | - |
| U8 | 1×1 horizontal (variante) | 112,32 | 7,2 | - | aire | une | aire | une | U2 |
| U9 | 1×1 vertical (variante) | 128,16 | 8,1 | - | une | aire | une | aire | U4 |
| L1 | L | 144,0 | 9,0 | - | aire | une | aire | aire | - |
| L2 | L | 160,0 | 10,0 | - | aire | aire | aire | une | - |
| L3 | L | 144,16 | 9,1 | - | aire | aire | une | aire | - |
| L4 | L | 144,32 | 9,2 | - | une | aire | aire | aire | - |
| X1 | cruz arriba | 192,0 | 12,0 | - | aire | une | une | une | - |
| X2 | cruz izquierda | 176,16 | 11,1 | - | une | une | une | aire | - |
| X3 | cruz centro | 192,16 | 12,1 | - | une | une | une | une | - |
| X4 | cruz derecha | 208,16 | 13,1 | - | une | aire | une | une | - |
| X5 | cruz abajo | 192,32 | 12,2 | - | une | une | aire | une | - |
| M1 | 4 mitades: sin unir | 8,72 | 0.5,4.5 | x+8 y+8 | aire | aire | aire | aire | - |
| M2 | 4 mitades: unidas en vertical | 40,72 | 2.5,4.5 | x+8 y+8 | aire | aire | aire | aire | - |
| M3 | 4 mitades: unidas en horizontal | 72,72 | 4.5,4.5 | x+8 y+8 | aire | aire | aire | aire | - |
| M4 | 4 mitades: unidas en las dos | 104,72 | 6.5,4.5 | x+8 y+8 | aire | aire | aire | aire | - |
| T1 | tira horizontal | 0,104 | 0,6.5 | y+8 | aire | aire | aire | aire | - |
| T2 | tira horizontal | 16,104 | 1,6.5 | y+8 | aire | une | aire | une | - |
| T3 | tira horizontal | 32,104 | 2,6.5 | y+8 | aire | une | aire | aire | - |
| T4 | tira horizontal | 48,104 | 3,6.5 | y+8 | aire | aire | aire | une | - |
| P1 | pilar vertical | 72,96 | 4.5,6 | x+8 | aire | aire | une | aire | - |
| P2 | pilar vertical | 72,112 | 4.5,7 | x+8 | une | aire | aire | aire | - |
| P3 | pilar vertical | 8,128 | 0.5,8 | x+8 | aire | aire | aire | aire | - |
| P4 | pilar vertical | 8,144 | 0.5,9 | x+8 | une | aire | une | aire | - |
| A1 | anillo | 96,96 | 6,6 | - | aire | une | une | aire | - |
| A2 | anillo | 112,96 | 7,6 | - | aire | aire | - | une | - |
| A3 | anillo | 96,112 | 6,7 | - | une | - | aire | aire | - |
| A4 | anillo | 112,112 | 7,7 | - | - | aire | aire | - | - |
