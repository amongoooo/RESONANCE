import { LayoutGroup, motion } from 'motion/react'
import { cambiarOpcion, restablecer } from '../logica/opciones.js'
import { BotonInstalar, pedirLado, useInstalar, useOpciones } from '../ui/Navegacion.jsx'
import { RESORTE } from '../ui/movimiento.js'
import Pulsable from '../ui/Pulsable.jsx'

// Ajustes ordenados por grupos, como las Opciones de teoria-musical (y los Ajustes de iOS): un título corto por
// grupo y, debajo, una tarjeta con sus filas (nombre · control · una frase corta de qué hace).
// Son de quien visita la página y se guardan solo en su navegador. Para agregar uno: src/logica/opciones.js.

const AJUSTES = [
  {
    grupo: 'Pantalla',
    filas: [
      {
        id: 'tema',
        nombre: 'Apariencia',
        valores: [
          ['claro', 'Claro', 'Fondo claro.'],
          ['oscuro', 'Oscuro', 'Fondo oscuro, más cómodo de noche.'],
          ['sistema', 'Sistema', 'Sigue el modo claro u oscuro de tu teléfono.'],
        ],
      },
      {
        id: 'letra',
        nombre: 'Tamaño de letra',
        valores: [
          ['normal', 'Normal', null],
          ['grande', 'Grande', 'Todo un poco más grande: textos, botones y tarjetas.'],
        ],
      },
      {
        id: 'vidrio',
        nombre: 'Material de las barras',
        valores: [
          ['desenfoque', 'Vidrio', 'Las barras que flotan dejan ver el contenido desenfocado.'],
          ['opaco', 'Sólidas', 'Barras sólidas: más contraste y menos trabajo para el teléfono.'],
        ],
      },
      {
        id: 'movimiento',
        nombre: 'Animaciones',
        valores: [
          ['normal', 'Normales', null],
          ['reducido', 'Reducidas', 'Sin desplazamientos ni rebotes; solo cambios suaves.'],
        ],
      },
    ],
  },
  {
    grupo: 'Navegación',
    filas: [
      {
        id: 'nombres',
        nombre: 'Nombres en la barra',
        valores: [
          ['elegida', 'Solo la elegida', 'La pestaña en la que estás crece y muestra su nombre; las demás, solo el ícono.'],
          ['todas', 'Todas', 'Cada pestaña muestra su nombre debajo del ícono.'],
        ],
      },
      {
        id: 'navegacion',
        nombre: 'Tipo de navegación',
        valores: [
          ['barra', 'Barra', 'Toca una pestaña o arrastra la barra de lado para pasar por ellas.'],
          ['ruleta', 'Ruleta', 'Gírala de lado: la opción que se detiene en el centro es la elegida. Si todas caben a la vista, la ruleta tiene tope.'],
        ],
      },
      {
        id: 'lado',
        nombre: 'Lado de la barra',
        // Usa la misma animación que el gesto (src/ui/Navegacion.jsx).
        alElegir: pedirLado,
        valores: [
          ['abajo', 'Abajo', 'Las páginas abajo, junto al pulgar, y los apartados (como Bitácora | Decisiones) arriba. También puedes jalar la barra hacia abajo para mandarla arriba.'],
          ['arriba', 'Arriba', 'Las páginas arriba y los apartados abajo. También puedes jalar la barra hacia arriba para mandarla abajo.'],
        ],
      },
      {
        id: 'abrir',
        nombre: 'Al abrir la página',
        valores: [
          ['inicio', 'Inicio', 'Siempre empieza en Inicio.'],
          ['ultima', 'La última', 'Vuelve a la última página que viste.'],
        ],
      },
    ],
  },
]

/** Botones de opción en una píldora, con la marca blanca que se desliza a la elegida. */
function Segmentado({ id, valores, valor, etiqueta, alElegir = (v) => cambiarOpcion(id, v) }) {
  return (
    <LayoutGroup id={`ajuste-${id}`}>
      <div role="radiogroup" aria-labelledby={etiqueta} className="flex w-full gap-1 rounded-full bg-zinc-100 p-1">
        {valores.map(([v, nombre]) => {
          const activo = v === valor
          return (
            <button
              key={v}
              type="button"
              role="radio"
              aria-checked={activo}
              onClick={() => alElegir(v)}
              className={`relative flex min-h-11 min-w-0 flex-1 items-center justify-center rounded-full px-2 text-base font-bold transition-colors ${activo ? 'text-zinc-900' : 'text-zinc-500'}`}
              style={{ touchAction: 'manipulation' }}
            >
              {activo && (
                <motion.span
                  layoutId={`marca-ajuste-${id}`}
                  transition={RESORTE.pulsar}
                  className="absolute inset-0 rounded-full bg-white shadow-[0_1px_4px_rgb(16_18_28/0.14)]"
                />
              )}
              <span className="relative truncate">{nombre}</span>
            </button>
          )
        })}
      </div>
    </LayoutGroup>
  )
}

function Grupo({ titulo, children }) {
  return (
    <section aria-label={titulo} className="flex flex-col gap-2">
      <h2 className="px-1 text-sm font-semibold tracking-wider text-zinc-500 uppercase">{titulo}</h2>
      <div className="flex flex-col rounded-3xl border border-zinc-200 bg-white">{children}</div>
    </section>
  )
}

function Fila({ children }) {
  return <div className="flex flex-col gap-2.5 border-t border-zinc-100 px-5 py-4 first:border-t-0">{children}</div>
}

function Instalar() {
  const { puede, instalada } = useInstalar()
  return (
    <Fila>
      <span className="font-titulo text-lg leading-tight font-bold tracking-tight">Como app en tu celular</span>
      {instalada ? (
        <span className="text-base leading-snug text-bien-tinta">Ya la estás usando como app.</span>
      ) : puede ? (
        <>
          <span className="text-base leading-snug text-zinc-600">Queda con su ícono en tu pantalla de inicio y abre aunque no tengas internet.</span>
          <BotonInstalar className="self-start" />
        </>
      ) : (
        <span className="text-base leading-snug text-zinc-600">
          En Android, abre el menú de Chrome (⋮) y elige «Instalar app» o «Agregar a la pantalla principal». En iPhone, toca Compartir y luego «Agregar a
          inicio».
        </span>
      )}
    </Fila>
  )
}

export default function Ajustes({ proyecto }) {
  const actuales = useOpciones()
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h1 className="font-titulo text-4xl leading-none font-extrabold tracking-tight">Ajustes</h1>
        <p className="text-lg leading-snug text-zinc-600">Se guardan solo en este navegador.</p>
      </div>

      {AJUSTES.map((g) => (
        <Grupo key={g.grupo} titulo={g.grupo}>
          {g.filas.map((f) => {
            const nota = f.valores.find(([v]) => v === actuales[f.id])?.[2]
            return (
              <Fila key={f.id}>
                <span id={`et-${f.id}`} className="font-titulo text-lg leading-tight font-bold tracking-tight">
                  {f.nombre}
                </span>
                <Segmentado id={f.id} valores={f.valores} valor={actuales[f.id]} etiqueta={`et-${f.id}`} alElegir={f.alElegir} />
                {nota && <span className="text-base leading-snug text-zinc-600">{nota}</span>}
              </Fila>
            )
          })}
        </Grupo>
      ))}

      <Grupo titulo="App">
        <Instalar />
        <Fila>
          <span className="font-titulo text-lg leading-tight font-bold tracking-tight">Volver a como viene</span>
          <span className="text-base leading-snug text-zinc-600">Regresa todos los ajustes a sus valores de inicio.</span>
          <Pulsable onClick={restablecer} className="min-h-11 self-start rounded-full bg-zinc-100 px-4 text-base font-bold text-zinc-900">
            Restablecer
          </Pulsable>
        </Fila>
      </Grupo>

      <Grupo titulo="Acerca de">
        <Fila>
          <span className="font-juego text-xl font-bold tracking-wide">{proyecto.nombre}</span>
          <span className="text-base leading-snug text-zinc-600">
            {proyecto.resumen} Por {proyecto.autor}, {proyecto.escuela}. {proyecto.competencia}.
          </span>
          <a href="https://github.com/amongoooo/RESONANCE" className="self-start font-semibold text-sky-500 underline underline-offset-4">
            Código en GitHub
          </a>
          <span className="font-dato text-sm text-zinc-500">Versión de la página: {__VERSION__}</span>
        </Fila>
      </Grupo>
    </div>
  )
}
