export default function Juego({ zonas, validacion }) {
  return (
    <div className="flex flex-col gap-5">
      <p className="text-lg leading-relaxed text-zinc-600">
        Tu herramienta no es un arma, es un sintonizador. Todo lo que está roto en el mundo está desafinado: giras perillas de frecuencia, amplitud y fase hasta que
        tu onda coincide con la del objeto, y el mundo reacciona. Cada zona enseña un concepto de física del sonido.
      </p>
      <ol className="grid gap-3 sm:grid-cols-2">
        {zonas.map((z, i) => (
          <li key={z.nombre} className={`flex flex-col gap-1 rounded-3xl border px-5 py-4 ${z.extra ? 'border-dashed border-zinc-300 bg-transparent' : 'border-zinc-200 bg-white'}`}>
            <span className="flex items-baseline gap-2">
              <span className="font-dato text-sm font-medium text-zinc-500">{i + 1}</span>
              <span className="font-titulo text-lg leading-tight font-bold tracking-tight">{z.nombre}</span>
            </span>
            <span className="text-base leading-snug text-zinc-600">{z.concepto}</span>
            {z.extra && <span className="text-sm font-semibold text-zinc-500">Extra: solo si sobra tiempo</span>}
          </li>
        ))}
      </ol>
      <div id="validacion" className="flex flex-col gap-2 rounded-3xl border border-zinc-200 bg-white px-5 py-5">
        <h3 className="font-titulo text-xl font-bold tracking-tight">Validación</h3>
        <p className="text-lg leading-relaxed">
          <strong>Pregunta de investigación:</strong> {validacion.pregunta}
        </p>
        <p className="text-lg leading-relaxed text-zinc-600">{validacion.resultados ?? validacion.estado}</p>
      </div>
    </div>
  )
}
