# Apuntes

Lo que aprendo, un archivo por tema. La página los muestra en Registro > Apuntes, cada uno como tarjeta con su título, la fecha de última edición y sus etiquetas, con un buscador arriba. Este LEEME no sale en la página.

## Cómo agregar un apunte desde el teléfono

1. Abre la app de GitHub (o github.com en el navegador) y entra al repo RESONANCE.
2. Cambia a la rama en la que estés trabajando (no a `main`).
3. Ve a `bitacora/contenido/apuntes/`.
4. Toca «+» o «Add file» > «Create new file».
5. Ponle un nombre corto, sin acentos ni espacios y que termine en `.md`, por ejemplo `luces-2d-en-unity.md`.
6. Pega esta plantilla y llénala:

```
# Título del apunte
editado: 2026-11-26
etiquetas: unity, arte

Primer párrafo: de qué trata. Sale en la tarjeta cerrada.

## Un subtítulo

- Una idea
- Otra idea, con **negritas** y [un enlace](https://ejemplo.com)
```

7. Toca «Commit changes». La página se actualiza sola cuando se publica.

## Las tres primeras líneas

- `# Título`: lo que se lee en la tarjeta. Si falta, se usa el nombre del archivo.
- `editado:` la fecha de la última vez que lo cambiaste, como `AAAA-MM-DD`. **Cámbiala cada vez que edites el apunte**: las tarjetas van de la más nueva a la más vieja. Si la fecha está mal escrita, el apunte se va al final.
- `etiquetas:` separadas por comas, en minúsculas. Sirven para filtrar. Usa las que ya existen cuando se pueda (diseño, mecánicas, unity, arte, tiles, música, ritmo…).

## Para editar uno

Abre el archivo, toca el lápiz, cambia lo que quieras, **actualiza `editado:`** y haz commit.

## Qué se puede escribir

El mismo Markdown que `musica.md`: párrafos, `## subtítulos`, listas con `-` o `1.`, sublistas con dos espacios antes del guion, `**negritas**`, `` `código` `` y `[enlaces](url)`. No hay tablas ni imágenes todavía.

Para enlazar un apunte desde otra parte de la página: `#/registro/apuntes?abrir=nombre-del-archivo` (sin el `.md`). Así se abre ya desplegado.
