// ============================================================
//  DATOS DE RESONANCIA (página de bitácora)
//  Este es el único archivo que necesitas editar día a día.
//  - Árbol de metas: cada meta puede tener "ramas" (sub-metas) y las ramas más ramas.
//    Una rama sin ramas es un paso: márcalo con  hecho: true.
//    El avance de una rama sale solo de sus pasos (no hace falta marcarla).
//  - Para marcar una semana como terminada: cambia  hecha: false  por  hecha: true
//  - Para agregar una entrada a la bitácora: copia un bloque { ... } de "bitacora"
//    y pégalo hasta arriba de la lista (las más nuevas van primero).
//  - Para registrar una decisión: agrega un bloque a "decisiones".
//  Fechas siempre como "AAAA-MM-DD" y, en bitácora y decisiones, hora "HH:MM" (hora de CDMX)
//  de cuando se subió. Cuida las comas entre bloques y las comillas.
// ============================================================

export default {
  proyecto: {
    nombre: "RESONANCIA",
    resumen:
      "Un plataformero de física del sonido: el mundo está desafinado y lo arreglas igualando ondas.",
    autor: "amongo",
    escuela: "TecNM campus Celaya",
    competencia: "Infomatrix / SOLACYT, categoría Desarrollo de Software",
    congelamiento: "2027-05-01",
    version1: "2027-07-04",
  },

  // Árbol de metas. La raíz es la meta grande; sus ramas, las metas con fecha; sus hojas, los pasos.
  // Campos: titulo, fecha (opcional), limite (opcional, límite duro), nota (opcional),
  //         ramas: [ ... ]  o, si es un paso,  hecho: true/false.
  // "Próxima meta" muestra la rama pendiente con la fecha más cercana.
  metas: {
    titulo: "RESONANCIA 1.0",
    fecha: "2027-07-04",
    ramas: [
      {
        titulo: "Tener el plan definitivo (ya decidido: 2D)",
        fecha: "2026-11-25",
        limite: "2026-12-20",
        ramas: [
          { titulo: "Prueba de capas 2D en Unity: pixel perfect a 480×270, cuatro planos y paso de gris a color.", hecho: true },
          { titulo: "Decidir: 2D lateral, casi todo procedural.", hecho: true },
          { titulo: "Cerrar la historia hasta enemigos y puzzles (obstáculos, mapa, enemigos y puzzles).", hecho: false },
          { titulo: "Rehacer las 32 semanas con la historia nueva (tribus y música) en 2D.", hecho: false },
          { titulo: "Borrador del examen pre/post de música: 10 a 15 preguntas conceptuales.", hecho: false },
        ],
      },
      {
        titulo: "Sala de estilo de la zona 1 (Ritmo)",
        fecha: "2026-12-14",
        nota: "Una sola sala pulida al máximo: el molde visual y técnico de todo el juego. Un paso por sesión, con plan y OK antes de cada uno.",
        ramas: [
          {
            titulo: "Paso 1: Tilemap de la zona 1",
            ramas: [
              { titulo: "Tamaño de tile: 16×16 (un tile = una unidad de Unity).", hecho: true },
              { titulo: "Plantilla de tiles con marcas de conexión (arte/plantillas).", hecho: true },
              { titulo: "Estudiar tiles en Shovel Knight, Celeste, Terraria y Animal Well.", hecho: false },
              { titulo: "Cerrar la paleta: casillas por material y hora del día.", hecho: false },
              { titulo: "Dibujar los tiles de la plantilla en Aseprite.", hecho: false },
              { titulo: "Tilemap con Rule Tile y cámara Pixel Perfect en Unity.", hecho: false },
            ],
          },
          {
            titulo: "Paso 2: Luz 2D estilo t3ssel8r y paso de gris a color",
            ramas: [
              { titulo: "Shader de paleta por casillas: fila de silencio a fila de color.", hecho: false },
              { titulo: "Luz 2D sobre los tiles sin ensuciar el pixel art.", hecho: false },
            ],
          },
          {
            titulo: "Paso 3: Protagonista con cuerpo procedural",
            ramas: [
              { titulo: "Correr y saltar.", hecho: false },
              { titulo: "Cuerpo procedural (sin cuadros de animación).", hecho: false },
            ],
          },
          {
            titulo: "Paso 4: El bombo de la tribu del ritmo",
            ramas: [
              { titulo: "Metrónomo ajustable.", hecho: false },
              { titulo: "El bombo golpea el suelo a tiempo.", hecho: false },
            ],
          },
        ],
      },
      {
        titulo: "Bitácora nueva, fase 1: React y árbol de metas",
        fecha: "2026-11-29",
        nota: "Solo después de la tarea de Unity del día. Con esta lista completa, la fase terminó.",
        ramas: [
          { titulo: "Página en React con los estilos de teoria-musical.", hecho: true },
          { titulo: "Todo lo de la página anterior, sin perder nada.", hecho: true },
          { titulo: "Árbol de metas con ramas y avance por rama.", hecho: true },
          { titulo: "Publicación automática con GitHub Actions (cambiar la fuente de Pages).", hecho: false },
          { titulo: "Revisarla en el celular y anotar lo que no me guste.", hecho: false },
        ],
      },
      {
        titulo: "Prototipo del sintonizador y prueba de diversión",
        fecha: "2026-12-20",
        ramas: [
          { titulo: "Proyecto base en Unity; correr, salto variable, coyote time y buffer.", hecho: false },
          { titulo: "Sintonizador v0: onda senoidal dibujada y sonando; perilla de frecuencia.", hecho: false },
          { titulo: "Primer puzzle: puerta que abre al igualar frecuencia.", hecho: false },
          { titulo: "Prueba de diversión con alguien que no conozca el juego.", hecho: false },
        ],
      },
    ],
  },

  // Fases del calendario. "id" se usa en las semanas.
  fases: [
    { id: 0, nombre: "Preproducción", inicio: "2026-11-23", fin: "2026-12-20", meta: "Prototipo del sintonizador y prueba de diversión" },
    { id: 1, nombre: "Sistemas base", inicio: "2026-12-21", fin: "2027-01-31", meta: "Tiles, datos, skins, animación procedural y ecosistema" },
    { id: 2, nombre: "Zona 1 completa", inicio: "2027-02-01", fin: "2027-03-14", meta: "Zona 1 (Ritmo) terminada, pulida y probada con alumnos" },
    { id: 3, nombre: "Producción", inicio: "2027-03-15", fin: "2027-05-02", meta: "Zonas 2, 3 y 4 con sus jefes" },
    { id: 4, nombre: "Contenido final y pulido", inicio: "2027-05-03", fin: "2027-06-06", meta: "Zona final, arte, bugs y playtest completo" },
    { id: 5, nombre: "Validación y reporte", inicio: "2027-06-07", fin: "2027-07-04", meta: "Pre/post test, reporte científico y versión 1.0" },
  ],

  // Las 32 semanas. Cambia "hecha" a true cuando termines cada una.
  semanas: [
    { n: 1, fase: 0, inicio: "2026-11-23", meta: "Proyecto base en Unity y repo en Git; correr, salto variable, coyote time y buffer.", hecha: false },
    { n: 2, fase: 0, inicio: "2026-11-30", meta: "Sintonizador v0: onda senoidal dibujada y sonando; perilla de frecuencia.", hecha: false },
    { n: 3, fase: 0, inicio: "2026-12-07", meta: "Primer puzzle (puerta que abre al igualar frecuencia) y plataforma de cuerda.", hecha: false },
    { n: 4, fase: 0, inicio: "2026-12-14", meta: "Prueba de diversión; paleta, resolución y primer tileset de prueba.", hecha: false },
    { n: 5, fase: 1, inicio: "2026-12-21", meta: "Rule Tile con autotiling, cámara Pixel Perfect y transición entre salas.", hecha: false },
    { n: 6, fase: 1, inicio: "2026-12-28", meta: "ScriptableObjects: BiomaData, CriaturaData, SkinData.", hecha: false },
    { n: 7, fase: 1, inicio: "2027-01-04", meta: "Personaje por partes con Sprite Library; shader de paleta; 2 skins de prueba.", hecha: false },
    { n: 8, fase: 1, inicio: "2027-01-11", meta: "Animación procedural: criatura de segmentos con resortes y patas con IK.", hecha: false },
    { n: 9, fase: 1, inicio: "2027-01-18", meta: "Ecosistema v1: eventos de sonido y criaturas que se acercan o huyen.", hecha: false },
    { n: 10, fase: 1, inicio: "2027-01-25", meta: "Guardado, menú de pausa, ajustes de volumen y telemetría básica.", hecha: false },
    { n: 11, fase: 2, inicio: "2027-02-01", meta: "Tileset final y props de la zona 1 (Ritmo).", hecha: false },
    { n: 12, fase: 2, inicio: "2027-02-08", meta: "8 a 10 salas de la zona 1: en papel y bloqueadas en Unity.", hecha: false },
    { n: 13, fase: 2, inicio: "2027-02-15", meta: "Arte final del protagonista y animaciones clave.", hecha: false },
    { n: 14, fase: 2, inicio: "2027-02-22", meta: "Zumbidos con arte final; diseño del jefe.", hecha: false },
    { n: 15, fase: 2, inicio: "2027-03-01", meta: "Jefe: El Gran Diapasón.", hecha: false },
    { n: 16, fase: 2, inicio: "2027-03-08", meta: "Música de la zona 1 en capas; playtest con 5 a 10 estudiantes.", hecha: false },
    { n: 17, fase: 3, inicio: "2027-03-15", meta: "Correcciones del playtest; mecánica de amplitud y tileset de la zona 2.", hecha: false },
    { n: 18, fase: 3, inicio: "2027-03-22", meta: "Salas de la zona 2, Ecófagos y medidor de fatiga auditiva.", hecha: false },
    { n: 19, fase: 3, inicio: "2027-03-29", meta: "Jefe El Amplificador y música de la zona 2.", hecha: false },
    { n: 20, fase: 3, inicio: "2027-04-05", meta: "Mecánica de interferencia (dos emisores) y tileset de la zona 3.", hecha: false },
    { n: 21, fase: 3, inicio: "2027-04-12", meta: "Salas de la zona 3, Estáticos y jefe El Gemelo Desfasado.", hecha: false },
    { n: 22, fase: 3, inicio: "2027-04-19", meta: "Resonancia: columpios y cristales, tileset y salas de la zona 4.", hecha: false },
    { n: 23, fase: 3, inicio: "2027-04-26", meta: "Jefe El Puente que Baila. Congelamiento de funciones el 1 de mayo.", hecha: false },
    { n: 24, fase: 4, inicio: "2027-05-03", meta: "Zona final El Estudio y cierre de la historia.", hecha: false },
    { n: 25, fase: 4, inicio: "2027-05-10", meta: "Retos de Afinación semi-procedurales y skins desbloqueables.", hecha: false },
    { n: 26, fase: 4, inicio: "2027-05-17", meta: "Pase de arte: partículas, iluminación y música completa del hub.", hecha: false },
    { n: 27, fase: 4, inicio: "2027-05-24", meta: "Examen pre/post con el maestro de Física; grupo confirmado; bugs.", hecha: false },
    { n: 28, fase: 4, inicio: "2027-05-31", meta: "Playtest completo de inicio a fin con 5 o más personas.", hecha: false },
    { n: 29, fase: 5, inicio: "2027-06-07", meta: "Aplicar pre-test, sesión de juego y post-test.", hecha: false },
    { n: 30, fase: 5, inicio: "2027-06-14", meta: "Analizar resultados y telemetría.", hecha: false },
    { n: 31, fase: 5, inicio: "2027-06-21", meta: "Reporte en formato avanzado (científico).", hecha: false },
    { n: 32, fase: 5, inicio: "2027-06-28", meta: "Tráiler, build final v1.0 y registro en la convocatoria.", hecha: false },
  ],

  // Bitácora: lo más nuevo hasta arriba.
  // Campos opcionales: imagen (ruta dentro del repo, p. ej. "img/semana1.gif"),
  // enlace: { texto: "Ver video", url: "https://..." }
  bitacora: [
    {
      fecha: "2026-11-23",
      hora: "12:00",
      titulo: "Empieza la sala de estilo de la zona 1",
      texto:
        "Arranqué la sala de estilo: una sola sala de la tribu del ritmo pulida al máximo, que será el molde de todo el juego (fecha: 14 de diciembre). Definí tiles de 16×16 y la lista mínima de tiles, hice una plantilla con las marcas de conexión y propuse dibujar con una paleta por casillas, para que el gris del silencio, el color de cada zona y las skins sean solo filas de una tabla. Para aprender de tiles voy a estudiar Shovel Knight (paleta limitada y contraste), Celeste (uniones y esquinas), Terraria (variantes al azar) y Animal Well (luz sobre pixel art); y para atmósfera, Kingdom Two Crowns, Rain World, Owlboy, Blasphemous, Gris y los devlogs de t3ssel8r.",
      etiquetas: ["arte", "diseño"],
    },
    {
      fecha: "2026-11-23",
      hora: "00:55",
      titulo: "Cómo entra la música al juego",
      texto:
        "Terminé la prueba de estilo visual y diseñé el camino de la música: compongo en mi DAW, exporto MIDI y stems, y Unity los convierte en datos. Un solo reloj musical mueve el sonido, las luces y las partículas.",
      etiquetas: ["diseño", "audio"],
    },
    {
      fecha: "2026-11-20",
      titulo: "La bitácora pasa a React",
      texto:
        "Rehice esta página en React con el estilo de mi app de teoría musical y le agregué un árbol de metas con ramas: cada meta se parte en pasos y su avance se calcula solo. Siguen el calendario y el registro de commits.",
      etiquetas: ["bitácora", "planeación"],
    },
    {
      fecha: "2026-11-20",
      titulo: "Nace RESONANCIA",
      texto:
        "Después del segundo lugar con ECHO, decidí empezar con tiempo. Definí el concepto (un plataformero donde afinas ondas para avanzar), el documento de diseño y un calendario de 32 semanas con congelamiento de funciones el 1 de mayo.",
      etiquetas: ["diseño", "planeación"],
    },
  ],

  // Decisiones importantes y por qué se tomaron.
  decisiones: [
    { fecha: "2026-11-20", decision: "Motor: Unity", porque: "Ya lo domino por ECHO y trae Tilemap, 2D Animation, Pixel Perfect Camera y ScriptableObjects. Lo propio se programa donde se nota: sintetizador, animación procedural y ecosistema." },
    { fecha: "2026-11-20", decision: "Audio: sintetizador propio + FMOD + música propia", porque: "Lo que el jugador manipula debe sonar exactamente como se ve; FMOD da capas y música adaptativa; la música por capas la produzco yo." },
    { fecha: "2026-11-20", decision: "Validación con examen pre/post y telemetría", porque: "Demostrar con datos que el juego enseña, no solo mostrarlo." },
    { fecha: "2026-11-20", decision: "Congelamiento de funciones el 1 de mayo de 2027", porque: "Después de esa fecha solo se pule, se arregla y se valida." },
    { fecha: "2026-11-20", decision: "Bitácora en React + Vite", porque: "Ya la uso en mis otras apps; trae animaciones y datos ordenados. El estilo viene de teoria-musical y es solo para esta página, no para el juego." },
    { fecha: "2026-11-23", hora: "02:22", decision: "Juego en 2D lateral (plataformero), casi todo procedural", porque: "Lo decidí el 22 de noviembre en la noche y la prueba de capas 2D lo confirmó: pixel art a 480×270 con animación procedural tipo Rain World y luces y shaders que reaccionan a la música. El 2.5D pedía una prueba de cámara 3D y modelar en Blender, y eso se come semanas que necesito para las tribus." },
    { fecha: "2026-11-23", hora: "00:55", decision: "Música: el MIDI es la fuente de verdad; fondo en stems y lo que toca el jugador con samples propios", porque: "Lo visual necesita saber qué nota suena, y las tribus enseñan ritmos por partes, así que esas capas no pueden ser una grabación cerrada. El fondo conserva la mezcla del DAW." },
    { fecha: "2026-11-23", hora: "01:01", decision: "Compongo y exporto solo desde FL Studio (sin Ableton); en el juego sigue Unity + FMOD", porque: "FL Studio exporta todas las pistas en un solo MIDI, que es la fuente de verdad de la música. FMOD se queda para el audio del juego, como en la decisión de audio del 20 de noviembre. (Corregido el 23 de noviembre: antes decía «sin FMOD» por error.)" },
    { fecha: "2026-11-23", hora: "12:00", decision: "La zona 1 es la tribu del Ritmo; las zonas siguen a las tribus", porque: "La historia cerrada ordena el mundo por tribus: 1 Ritmo (África occidental), 2 Melodía, 3 Armonía, 4 La mezcla (Latinoamérica y México) y el caracol al centro. «Las Cuerdas» y las zonas extra eran del diseño anterior." },
    { fecha: "2026-11-23", hora: "12:00", decision: "Tiles de 16×16", porque: "Con 16 PPU un tile es una unidad de Unity: posiciones y saltos sin decimales. A 480×270 se ven 30×17 tiles, suficiente para ver una sala entera con lo grave abajo y lo agudo arriba." },
    { fecha: "2026-11-23", hora: "12:00", decision: "Pendiente: dibujar con una paleta por casillas", porque: "Propuesta: dibujo a color y el código trata cada color como una casilla. El gris del silencio, el color de cada zona y las skins son filas de una tabla en el Inspector. Si dibujara en gris, dos materiales con el mismo brillo se volverían el mismo y no se podrían colorear distinto. Falta decidir las casillas por material y la hora del día de la zona 1.", pendiente: true },
    { fecha: "2026-11-23", hora: "12:00", decision: "Pendiente: los mapas se arman en el Tilemap de Unity, no en Tiled", porque: "Propuesta: las luces, el bombo, el metrónomo y el Rule Tile viven en Unity; Tiled agregaría un paso de importación que puede fallar y repetiría el autotiling. Aseprite (con capas de tilemap) queda para todo el arte.", pendiente: true },
  ],

  // Zonas del juego (las marcadas como extra solo si sobra tiempo).
  zonas: [
    { nombre: "Zona 1 · Ritmo", concepto: "Tribu de tambores inspirada en África occidental: recuperar el pulso común (bombo abajo, caja en medio, hi-hat arriba)." },
    { nombre: "Zona 2 · Melodía", concepto: "Tribu de las escalas: notas que suben y bajan (lo agudo arriba, lo grave abajo)." },
    { nombre: "Zona 3 · Armonía", concepto: "Tribu de los acordes: varias notas a la vez que se dejan espacio." },
    { nombre: "Zona 4 · La mezcla", concepto: "Inspirada en Latinoamérica y México: mezcla lo aprendido y prepara la Gran Canción." },
    { nombre: "El caracol", concepto: "Lugar central y caja de resonancia: ahí suena la Gran Canción y el mundo recupera el color." },
  ],

  validacion: {
    pregunta: "¿Jugar RESONANCIA mejora la comprensión de conceptos de ondas y sonido en estudiantes de bachillerato?",
    estado: "Se aplicará en junio de 2027 con un examen conceptual antes y después de jugar.",
    resultados: null, // Cuando tengas datos: "Promedio antes: X / 10. Promedio después: Y / 10."
  },
};
