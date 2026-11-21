# RESONANCIA

Plataformero educativo de física del sonido: el mundo está desafinado y lo arreglas igualando ondas con un sintonizador (frecuencia, amplitud y fase). Proyecto para Infomatrix / SOLACYT, categoría Desarrollo de Software, hecho en Unity.

**Página de registro del proyecto:** https://amongoooo.github.io/resonance/

## Estructura del repo

- `docs/`: página de registro (estado, ruta de 32 semanas, bitácora y decisiones). GitHub Pages la publica desde aquí.
  - `docs/index.html`: diseño y lógica de la página. Casi nunca hay que tocarlo.
  - `docs/datos.js`: todo el contenido de la página. **Este es el archivo que se edita cada semana.**
  - `docs/img/`: capturas, GIFs y fotos de bocetos para la bitácora (créala cuando subas la primera).
- La raíz queda reservada para el proyecto de Unity (`Assets/`, `Packages/`, `ProjectSettings/`). El `.gitignore` ya es la plantilla de Unity.

## Publicar la página con GitHub Pages

Settings > Pages > Source: **Deploy from a branch** > rama `main`, carpeta **`/docs`** > Save. En uno o dos minutos queda en la dirección de arriba.

Para verla en tu computadora, abre `docs/index.html` con doble clic.

## Rutina semanal (domingo, 5 minutos)

1. En `docs/datos.js`, cambia `hecha: false` por `hecha: true` en las semanas terminadas.
2. Agrega una entrada en `bitacora` (hasta arriba) con lo que lograste. Si tienes una captura o GIF, súbelo a `docs/img/` y ponlo en `imagen`.
3. Si decidiste algo importante, agrégalo a `decisiones`.
4. En `metas`, marca los pasos cumplidos con `hecho: true`. Cuando termines una meta, ponle `cumplida: true` y agrega la siguiente; la página siempre muestra la más cercana.
5. Haz commit con un mensaje tipo `Semana 3: primer puzzle de cuerda`.

El historial de commits más la bitácora son la evidencia de desarrollo por etapas para el reporte y la presentación.

### Ejemplo de entrada de bitácora

```js
{
  fecha: "2026-11-29",
  titulo: "El cuadro gris ya salta bien",
  texto: "Salto variable, coyote time y buffer funcionando. Lo probé con dos amigos y lo sintieron justo.",
  etiquetas: ["movimiento", "prototipo"],
  imagen: "img/semana1-salto.gif",
  enlace: { texto: "Ver build en itch.io", url: "https://..." },
},
```

## Fechas clave

- Decisión 2D o 2.5D: a más tardar el 25 de noviembre de 2026 (límite duro: 20 de diciembre).
- Congelamiento de funciones: 1 de mayo de 2027.
- Versión 1.0: principios de julio de 2027.
