# RESONANCIA: contexto para Claude

Videojuego educativo de física del sonido en Unity, para Infomatrix / SOLACYT (categoría Desarrollo de Software). Lo desarrollo yo solo, un rato diario.

## Concepto

Plataformero donde el jugador repara un mundo silenciado afinando ondas con un sintonizador (perillas de frecuencia, amplitud y fase). No se pelea con ondas: se afina el mundo para avanzar. Cada zona enseña un concepto: frecuencia, amplitud, interferencia, resonancia (y como extra timbre/armonía y eco).

## Decisiones fijas

- Motor: Unity. Audio: sintetizador propio en C# (`OnAudioFilterRead`) + FMOD + mi propia música por capas.
- Sistemas: animación procedural de criaturas, ecosistema que reacciona al sonido, todo por datos (ScriptableObjects), skins intercambiables (2D Animation: Sprite Library + Sprite Resolver).
- Validación: examen pre/post con estudiantes reales + telemetría del juego.
- Congelamiento de funciones: 1 de mayo de 2027. Después solo se pule, se arregla y se valida.
- Pendiente: 2D pixel art o 2.5D con look 3D pixelado (decisión a más tardar el 25 de noviembre de 2026; límite duro 20 de diciembre).

## Estructura

- `docs/` es la página de registro, publicada con GitHub Pages desde `main` + `/docs`. El contenido vive en `docs/datos.js`; `docs/index.html` solo se toca si lo pido.
- La raíz es para el proyecto de Unity. Cuando se agregue, configurar Git LFS para archivos pesados (texturas, audio, modelos).

## Cómo trabajar conmigo

- Sé honesto si algo no cabe en el tiempo; protege el alcance y el calendario.
- Explica con relaciones intuitivas ("si X sube, Y baja"), no con fórmulas.
- Cuando terminemos algo importante, propón la entrada de bitácora para `docs/datos.js`.
