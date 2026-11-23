# RESONANCIA: contexto para Claude

Videojuego educativo de física del sonido en Unity, para Infomatrix / SOLACYT (categoría Desarrollo de Software). Lo desarrollo yo solo, un rato diario.

## Concepto

Plataformero donde el jugador repara un mundo silenciado afinando ondas con un sintonizador (perillas de frecuencia, amplitud y fase). No se pelea con ondas: se afina el mundo para avanzar. Cada zona enseña un concepto: frecuencia, amplitud, interferencia, resonancia (y como extra timbre/armonía y eco).

## Decisiones fijas

- Motor: Unity. Audio: sintetizador propio en C# (`OnAudioFilterRead`) + mi propia música por capas, todo en el audio de Unity (sin FMOD, decidido 23 nov 2026).
- Música: el MIDI exportado de FL Studio es la fuente de verdad; fondo en stems y lo que toca el jugador con samples propios. Diseño: https://claude.ai/artifact/UD4nvVJtPFJYg8sFcdgZ38
- Sistemas: animación procedural de criaturas, ecosistema que reacciona al sonido, todo por datos (ScriptableObjects), skins intercambiables (2D Animation: Sprite Library + Sprite Resolver).
- Validación: examen pre/post con estudiantes reales + telemetría del juego.
- Congelamiento de funciones: 1 de mayo de 2027. Después solo se pule, se arregla y se valida.
- Pendiente: 2D pixel art o 2.5D con look 3D pixelado (decisión a más tardar el 25 de noviembre de 2026; límite duro 20 de diciembre).

## Estructura

- `bitacora/` es la página de registro (React + Vite + Tailwind + Motion), publicada con GitHub Pages por `.github/workflows/bitacora.yml`. El contenido vive en `bitacora/src/datos.js` (árbol de metas, semanas, bitácora, decisiones); el resto del código de la página solo se toca si lo pido. Su estilo sale de mi repo teoria-musical y es solo de la página, no del juego.
- `docs/` es la página anterior en HTML; se borra cuando la nueva esté publicada.
- La raíz es para el proyecto de Unity. Cuando se agregue, configurar Git LFS para archivos pesados (texturas, audio, modelos).

## Cómo trabajar conmigo

- Sé honesto si algo no cabe en el tiempo; protege el alcance y el calendario.
- Explica con relaciones intuitivas ("si X sube, Y baja"), no con fórmulas.
- Cuando terminemos algo importante, propón la entrada de bitácora para `bitacora/src/datos.js`.
