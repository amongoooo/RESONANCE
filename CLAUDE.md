# RESONANCIA: contexto para Claude

Videojuego educativo de física del sonido en Unity, para Infomatrix / SOLACYT (categoría Desarrollo de Software). Lo desarrollo yo solo, un rato diario.

## Concepto

Plataformero donde el jugador repara un mundo silenciado afinando ondas con un sintonizador (perillas de frecuencia, amplitud y fase). No se pelea con ondas: se afina el mundo para avanzar. Cada zona enseña un concepto: frecuencia, amplitud, interferencia, resonancia (y como extra timbre/armonía y eco).

## Decisiones fijas

- Motor: Unity. Audio: sintetizador propio en C# (`OnAudioFilterRead`) + FMOD + mi propia música por capas.
- Sistemas: animación procedural de criaturas, ecosistema que reacciona al sonido, todo por datos (ScriptableObjects), skins intercambiables (2D Animation: Sprite Library + Sprite Resolver).
- Validación: examen pre/post con estudiantes reales + telemetría del juego.
- Congelamiento de funciones: 1 de mayo de 2027. Después solo se pule, se arregla y se valida.
- Estilo: 2D lateral en pixel art, Unity 6000.4.2f1 con URP 2D, Pixel Perfect a 480×270 y 16 PPU con escalado entero, tiles de 16×16. Animación procedural (sin cuadros). Lo grave abajo y lo agudo arriba. Mundo gris y silencioso que gana color cuando suena (decidido el 23 de noviembre de 2026).
- Zonas: cada zona es una tribu musical: 1 Ritmo (África occidental), 2 Melodía, 3 Armonía, 4 La mezcla (Latinoamérica y México), más el caracol central.
- Referencias vivas: dirección visual https://claude.ai/artifact/L9tEwrZ3Aygsxr2YmmKchH e historia y bestiario https://claude.ai/artifact/EYGJrP2Z6kRUfM7fMsZnY2.

## Estructura

- `bitacora/` es la página de registro (React + Vite + Tailwind + Motion), publicada con GitHub Pages por `.github/workflows/bitacora.yml`. El contenido vive en `bitacora/src/datos.js` (árbol de metas, semanas, bitácora, decisiones); el resto del código de la página solo se toca si lo pido. Su estilo sale de mi repo teoria-musical y es solo de la página, no del juego.
- `docs/` es la página anterior en HTML; se borra cuando la nueva esté publicada. No se actualiza: las entradas de bitácora van en `bitacora/src/datos.js`.
- `arte/` guarda plantillas y archivos fuente de arte (Aseprite) fuera del proyecto de Unity.
- La raíz es para el proyecto de Unity. Cuando se agregue, configurar Git LFS para archivos pesados (texturas, audio, modelos).

## Cómo trabajar conmigo

- Sé honesto si algo no cabe en el tiempo; protege el alcance y el calendario.
- Explica con relaciones intuitivas ("si X sube, Y baja"), no con fórmulas.
- Todo lo que hablemos va a la página: decisiones, entradas de bitácora, metas y tareas de la semana (`bitacora/contenido/tareas/`). Si algo es solo una propuesta sin mi OK, va como decisión con `pendiente: true`.
- Los cambios van siempre en un PR desde la rama de trabajo. Nunca hagas push ni merge a `main` hasta que yo lo diga.
- Al final de cada mensaje dime: (1) si seguimos en este chat o conviene abrir otro por el contexto, y (2) qué modelo de Claude y qué nivel de esfuerzo recomiendas para la tarea que sigue.
