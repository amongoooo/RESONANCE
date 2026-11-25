# RESONANCIA

Plataformero educativo de física del sonido: el mundo está desafinado y lo arreglas igualando ondas con un sintonizador (frecuencia, amplitud y fase). Proyecto para Infomatrix / SOLACYT, categoría Desarrollo de Software, hecho en Unity.

**Página de registro del proyecto:** https://amongoooo.github.io/RESONANCE/

## Estructura del repo

- `bitacora/`: página de registro (estado, árbol de metas, ruta de 32 semanas, bitácora y decisiones), hecha con React + Vite. Su estilo viene de [teoria-musical](https://github.com/amongoooo/teoria-musical) y es **solo de esta página**: el juego tiene su propio estilo visual.
  - `bitacora/src/datos.js`: todo el contenido de la página. **Este es el archivo que se edita día a día.**
  - `bitacora/public/img/`: capturas, GIFs y fotos de bocetos para la bitácora (créala cuando subas la primera; en `imagen` se escribe `"img/archivo.gif"`).
  - `bitacora/src/secciones/`: cada parte de la página; `bitacora/src/logica/`: árbol de metas y fechas, con pruebas.
- `docs/`: la página anterior en HTML. Se borra cuando la nueva ya esté publicada.
- La raíz queda reservada para el proyecto de Unity (`Assets/`, `Packages/`, `ProjectSettings/`). El `.gitignore` ya es la plantilla de Unity.

## Publicar la página con GitHub Pages

Se publica sola con cada cambio en `bitacora/` que llegue a `main` (`.github/workflows/bitacora.yml`). Una sola vez: Settings > Pages > Source: **GitHub Actions**.

Para verla en tu computadora: `cd bitacora`, `npm install` (la primera vez) y `npm run dev`. Pruebas: `npm test`.

## Rutina (5 minutos)

1. En `bitacora/src/datos.js`, cambia `hecha: false` por `hecha: true` en las semanas terminadas.
2. Agrega una entrada en `bitacora` (hasta arriba) con lo que lograste. Si tienes una captura o GIF, súbelo a `bitacora/public/img/` y ponlo en `imagen`.
3. Si decidiste algo importante, agrégalo a `decisiones`.
4. En el árbol de `metas`, marca los pasos cumplidos con `hecho: true`. El avance de cada rama se calcula solo y «Próxima meta» muestra la rama pendiente más cercana. Para una meta nueva, agrega una rama con `titulo`, `fecha` y sus `ramas` (pasos).
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

- Decidido el 23 de noviembre de 2026: 2D lateral en pixel art.
- Sala de estilo de la zona 1 (Ritmo): 14 de diciembre de 2026.
- Congelamiento de funciones: 1 de mayo de 2027.
- Versión 1.0: principios de julio de 2027.
