# Música

Cómo entra la música al juego. Decidido el 23 de noviembre de 2026.

## La idea en corto

- **El MIDI es la fuente de verdad.** Compongo en FL Studio y exporto un solo `.mid` con todas las pistas. Así el juego sabe qué nota suena, cuándo y con qué fuerza.
- **Híbrido.** Las capas de fondo son stems (WAV) que conservan la mezcla del DAW. Lo que el jugador toca, aprende o compone (los ritmos de las tribus, el modo director) lo toca el juego con samples de mi propia biblioteca de sonidos.
- **Un solo reloj.** El mismo reloj musical mueve el sonido, las luces y las partículas: si la música va más rápido, todo lo visual va más rápido con ella.
- **Sin FMOD.** Toda la música va con el audio de Unity; las capas nuevas entran en la siguiente barra para que nunca se oigan a destiempo.

## Cómo se organizan las pistas

Las pistas del MIDI llevan un prefijo según su capa: `BAJOS_`, `ARMONIA_`, `TRIBU_` y `AGUDOS_`. Las notas se guardan en pulsos (no en segundos), así una canción puede cambiar de tempo sin romperse.

## Orden de trabajo

1. Proyecto real en Unity con Git LFS.
2. Una canción de prueba de 8 barras.
3. Importador de `.mid`.
4. Reloj y stems sonando juntos.
5. Lo visual siguiendo la música.
6. Un kit de batería tocado por el juego.
7. Patrones por pasos (los ritmos de las tribus).

[Documento completo: cómo entra la música al juego (privado)](https://claude.ai/artifact/UD4nvVJtPFJYg8sFcdgZ38)

# Estilo visual

Dirección visual, a partir de la prueba de capas del 23 de noviembre de 2026.

## La idea en corto

- **Sonido es color, silencio es gris.** Un lugar sin música está gris; cuando vuelve a sonar, recupera el color poco a poco (alrededor de un segundo y medio).
- **Pixel art de verdad.** Todo se dibuja a 480 × 270 y se agranda en múltiplos enteros, así ningún píxel se ve chueco. Las cosas sí pueden girar, estirarse o deformarse (lianas, fuego, partículas), siempre que el resultado final salga en pixel art.
- **Cuatro planos, uno por capa de la música:**
  - Bajos: el fondo, que se mueve poco.
  - Armonía: el plano medio.
  - Tribus: el plano del jugador.
  - Agudos: partículas al frente, que se mueven más rápido que el jugador.
- **Lo visual sigue una partitura.** Cada nota trae cuándo empieza, cuánto dura, qué tan fuerte suena y qué instrumento es; con eso se encienden luces y partículas. También queda la opción de reaccionar al volumen medido.
- **Cada instrumento tiene su forma de partícula,** como si tuviera su propio timbre visual.

[Documento completo: decisiones de dirección visual (privado)](https://claude.ai/artifact/L9tEwrZ3Aygsxr2YmmKchH)
