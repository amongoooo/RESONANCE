# Guía por fases para dibujar una hoja de material

Orden y calendario para dibujar una hoja con la plantilla propia (hasta 74 tiles). Cómo dibujar no va aquí. Los ids (B1, U2…) están en `LEYENDA.md`.

## Cómo encaja

- La plantilla es el formato de todo tileset de material (laterita, pasto, piedra, arena…). Las piezas que un material no use se dejan vacías.
- El terreno con collider se arma solo con la plantilla, para ver la jugabilidad. Las hojas de material van en otra grid encima, sin collider. Lo que dibujas aquí nunca toca la hitbox.
- Llamo «paleta de colores» a la de `arte/paletas/` y «paleta de tiles» a la de Unity.

## Fases

| Fase | Tiles | N | Acum. | Fechas |
|---|---|---|---|---|
| 1 Bloque base | B1 B2 B4 B5 B6 B8 B13 B14 B16 | 9 | 9 | 25 a 28 nov |
| 2 Esquinas y delgado | I1 a I4, U1 a U7 | 11 | 20 | 29 nov a 3 dic |
| 3 Conectores y variedad | L1 a L4, X1 a X5 y las variantes B3 B7 B9 B10 B11 B12 B15 U8 U9 | 18 | 38 | 4 a 10 dic |
| 4 Piezas de 1/2 | M1 a M16, T1 a T8, P1 a P8, A1 a A4 | 36 | 74 | semana 11 (1 a 7 feb) |

- **Fase 4 pendiente de decidir:** piezas dentro de la celda de 16 o grid hija de 0,5. No hace falta decidir antes de la semana 11.
- **Orden:** las variantes van después de su base (deben tener las mismas uniones). Dentro de cada fase, rellenos, bordes y esquinas; así el revisor compara cada borde con su vecino ya dibujado.
- Las fases siguen los grupos del revisor: B+I, U+L+X y las piezas de 8 px.

## Cada sesión

1. Dibuja en la capa `tiles`.
2. Exporta sin la capa `guia` (PNG indexado, 224×160).
3. `python3 arte/plantillas/revisar_tiles.py hoja.png --imagen errores.png`
4. Corrige lo que marque y haz commit.

Las celdas vacías cuentan como pendientes, así que el revisor sirve a medio dibujar. Todavía no distingue «pendiente» de «esta hoja no la usa».

## Calendario y cortes

- Las fechas suponen 2 a 3 tiles por día (supuesto, no medido). La fase 1 mide el ritmo real y se recalcula.
- **Para el 14 de dic.:** fases 1 y 2 de la hoja del primer material de la zona 1.
- **Corte del 4 de dic.:** si la fase 2 está cerrada, la 3 sigue hasta el 10; si no, pasa a la semana 11 junto con la 4.
- Los 74 antes del 14 de dic. pedirían unos 4 por día, todos los días.
- El Rule Tile del terreno puede empezar ya desde la plantilla (los 38 tiles de las fases 1 a 3), sin esperar el arte.
