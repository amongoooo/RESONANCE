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
//    Si cambia una decisión vieja, no la borres: en la nueva pon  reemplaza: "<texto exacto de la vieja>"
//    y la página la mueve a «Cambiaron» con un enlace a la nueva.
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
    inicio: "2026-11-20", // el calendario de la bitácora empieza aquí
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
              { titulo: "Cerrar la paleta: casillas por material y hora del día (23 casillas, abierta a cambios).", hecho: true },
              {
                titulo: "Dibujar la hoja del primer material de la zona 1 en Aseprite (arte/plantillas/GUIA.md).",
                ramas: [
                  { titulo: "Fase 1, bloque base: 9 tiles, 25 a 28 nov.", hecho: false },
                  { titulo: "Fase 2, esquinas y delgado: 11 tiles, 29 nov a 3 dic.", hecho: false },
                  { titulo: "Fase 3, conectores y variedad: 18 tiles, 4 a 10 dic. (solo si el corte del 4 de dic. va en tiempo).", hecho: false },
                ],
              },
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
        titulo: "Piezas de 1/2 de la zona 1 (fase 4 de los tiles)",
        fecha: "2027-02-07",
        nota: "Va en la semana 11 (tileset final y props de la zona 1), no antes del 14 de dic.",
        ramas: [
          { titulo: "Decidir: piezas de 1/2 dentro de la celda de 16 o grid hija de 0,5.", hecho: false },
          { titulo: "Dibujar las piezas de 1/2 que la zona 1 necesite.", hecho: false },
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
      fecha: "2026-11-24",
      hora: "22:06",
      titulo: "Guía por fases y dos capas para los tiles",
      texto:
        "Escribí arte/plantillas/GUIA.md: cuatro fases para dibujar una hoja de material (bloque base, esquinas y delgado, conectores y variedad, piezas de 1/2) con fechas y un corte el 4 de diciembre; para el 14 de diciembre solo me comprometo con las fases 1 y 2. Aclaré cómo se usa la plantilla: es el formato de todo tileset y lo que un material no necesite se deja vacío. El terreno, con collider, se arma solo con la plantilla para ver la jugabilidad; encima va otra grid sin collider con las hojas de material, así el arte nunca toca la hitbox. Las piezas de 1/2 quedan pendientes de decidir entre la celda de 16 y una grid hija de 0,5.",
      etiquetas: ["arte", "planeación"],
    },
    {
      fecha: "2026-11-24",
      hora: "18:30",
      titulo: "Revisor de tiles listo",
      texto:
        "Hice arte/plantillas/revisar_tiles.py: lee mi hoja exportada y marca colores fuera de la paleta, semitransparencia, casillas de sonido, contornos que faltan, suelo equivocado bajo el pasto y uniones o variantes que no coinciden. Saca las marcas de la plantilla, así que no hay nada que copiar a mano, y sirve a medio dibujar. También anoté la idea de un autotile: pintar el terreno con un solo bloque y que Unity elija las esquinas.",
      etiquetas: ["arte", "herramientas"],
    },
    {
      fecha: "2026-11-24",
      hora: "02:08",
      titulo: "Paleta de la zona 1 cerrada (abierta a cambios)",
      texto:
        "Cerré la paleta de la zona 1: 23 casillas por rol (sombra, suelo, construido, aire, vida y sonido) para un atardecer, con el archivo .gpl para Aseprite. Dibujo a color y el código trata cada color como una casilla, así que el gris del silencio, el color de cada zona y las skins son filas de una tabla. Revisé que cada rampa se lea en gris y que lo que da al aire lleve contorno de sombra. Probé definir todos los colores de todas las zonas de una vez y me abrumó: mejor una zona por vez. Quedan pendientes dos ideas: criaturas con partes dibujadas y pelaje por código, y una luz que mueva cada píxel por su rampa.",
      etiquetas: ["arte", "diseño"],
    },
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
    { fecha: "2026-11-24", hora: "02:08", decision: "Dibujo a color con una paleta por casillas", porque: "El código trata cada color como una casilla: el gris del silencio, el color de cada zona y las skins son filas de una tabla. Si dibujara en gris, dos materiales con el mismo brillo se volverían el mismo. Cada objeto elige su propia tabla (la skin del protagonista no repinta el suelo), las casillas se nombran por rol y no por color, y las nuevas se agregan siempre al final (hasta 32) para no mover lo ya dibujado." },
    { fecha: "2026-11-24", hora: "02:08", decision: "Paleta de la zona 1: 23 casillas por rol, atardecer (abierta a cambios)", porque: "Sombra 3; suelo (laterita), construido (sabana), aire (índigo), vida (hoja) y sonido (música) 4 cada una. Cada material necesita unos 4 tonos para tener volumen en 16×16. Sonido es solo luz y ningún tile lo usa; todo lo que da al aire lleva contorno de sombra. Atardecer porque la luna de la historia está en su fase más delgada en la zona 1 y la luz 2D luce más con poca luz, pero oscuro sin llegar a negro (el suelo más oscuro no baja de 16 de gris). No habrá ciclo de día: la noche es una fila opcional de la tabla. Cada rampa se midió en gris: cada paso se separa 9 a 13 puntos del anterior. Las demás zonas se hacen una por una, cuando lleguen. Archivo: arte/paletas/resonancia_zona1.gpl." },
    { fecha: "2026-11-24", hora: "02:08", decision: "Las distorsiones y efectos van después de convertir casillas a color", porque: "Si se mezclan píxeles antes de la conversión, la casilla 5 y la 7 dan una «casilla 6» que no era ninguna de las dos y el color sale mal. Las texturas de arte se leen sin suavizado y los efectos trabajan sobre la imagen ya en color a 480×270." },
    { fecha: "2026-11-24", hora: "02:08", decision: "Pendiente: la luz 2D mueve cada píxel por su rampa en vez de pintar encima", porque: "Propuesta: un píxel «suelo-2» con mucha luz se ve como «suelo-3» y en sombra como «suelo-1», así la luz nunca crea colores fuera de la paleta y no ensucia el pixel art. Pide dibujar casi todo con los pasos 1 a 3 y dejar el 4 para el brillo. Se prueba en el Paso 2 con el shader de paleta.", pendiente: true },
    { fecha: "2026-11-23", hora: "12:00", decision: "Pendiente: los mapas se arman en el Tilemap de Unity, no en Tiled", porque: "Propuesta: las luces, el bombo, el metrónomo y el Rule Tile viven en Unity; Tiled agregaría un paso de importación que puede fallar y repetiría el autotiling. Aseprite (con capas de tilemap) queda para todo el arte.", pendiente: true },
    { fecha: "2026-11-24", hora: "00:14", decision: "Pendiente: criaturas híbridas (partes dibujadas más líneas por código)", porque: "Propuesta: cabeza, torso y patas como pocos sprites dibujados a mano (Sprite Library) y el pelaje, los hilos y las colas como líneas de 1 px que siguen una cadena con inercia. El pixel art sale de dibujar toda la escena a 480×270, así que las formas generadas por código también quedan pixeleadas. El riesgo es el parpadeo de los bordes al moverse a fracciones de píxel; se probará con una cadena de hilos en el Paso 3 antes de comprometerse. Si se aprueba, la regla «sin rotaciones libres de sprites» se relaja solo para criaturas.", pendiente: true },
    { fecha: "2026-11-24", hora: "00:14", decision: "Pendiente: dibujar en color y que Unity lo convierta a casillas", porque: "Propuesta: dibujar en Aseprite en modo indexado con la paleta (se ve el color real) y que un script de importación de Unity guarde cada píxel como el número de su casilla; el shader lo pinta con la tabla (gris del silencio, zona, skins). Plan B si el script se complica: un shader que compara el color exacto. Se decide en el Paso 2.", pendiente: true },
    { fecha: "2026-11-24", hora: "12:00", decision: "Pendiente: los tiles de la zona 1 se dibujan a mano, sin generador procedural", porque: "Propuesta: son 23 tiles obligatorios (10 variantes opcionales), unas pocas horas con Aseprite en modo Tiled; un generador necesita un estilo ya definido y la sala de estilo sirve justo para encontrarlo. Es además el molde que verán los jurados. Orden: relleno A5, bordes, esquinas, plataforma y muro, pasto e interiores, variantes al final. Si se revisa a futuro, solo para repetir un terreno en otra zona y después del congelamiento.", pendiente: true },
    { fecha: "2026-11-24", hora: "12:00", decision: "Pendiente: medios bloques como tiles aparte dentro de la grid de 16×16 (no una grid de 8×8)", porque: "Propuesta: la media-inferior (dibujo en los 8 px de abajo, contorno de sombra en la fila 8) y, solo si hace falta, la media-superior, como tiles nuevos en filas nuevas de la plantilla; el collider se ajusta a la mitad. No se dibujan hasta terminar los 23 obligatorios, y quizá la plataforma B ya cubra el caso. Una grid de 8×8 rompe «un tile = una unidad» y multiplica el trabajo." },
    { fecha: "2026-11-24", hora: "12:30", decision: "La plantilla de tiles es la mía de varios juegos (unos 50 tiles únicos), con medios bloques dentro de los 16×16", porque: "Ya la probé en otros juegos y cubre más formas que la primera plantilla de 33: bloque base de 4×4 (4 esquinas, 8 bordes, 4 de relleno), 4 esquinas interiores, bloques de 1×1 (suelto, esquinas y bordes), conectores en L y en cruz, 4 bloques de medio tile, tiras horizontales, pilares verticales y el anillo. Los medios bloques son mitades de 8 px dentro de tiles de 16×16, sin grid de 8×8. En la guía, naranja = se une, blanco = da al aire y magenta = se une con relleno; esas marcas van en una capa guia aparte porque son casillas de sonido (20, 21 y 23) y no deben exportarse. La primera plantilla (arte/plantillas) queda como referencia para el Rule Tile."},
    { fecha: "2026-11-24", hora: "12:30", decision: "Pendiente: dibujar los ~50 tiles en cuatro fases y revisar al final de cada una", porque: "Propuesta: fase 1 el 4×4 (16 tiles, ya da una sala); fase 2 esquinas interiores y bloques de 1×1; fase 3 tiras, pilares y anillo; fase 4 las 4 piezas pequeñas, la L y la cruz. Son de 2 a 3 tiles por día con un rato diario y quedan 20 días hasta el 14 de diciembre. Si el 4 de diciembre no voy por la fase 2, las fases 3 y 4 pasan al Paso 2 o a después del congelamiento." },
    { fecha: "2026-11-24", hora: "13:00", decision: "La plantilla propia no se modifica y se corta siempre en la rejilla de 16×16: 74 tiles", porque: "Los cortes solo caen en los bordes de color, y todos están en la rejilla de 16. Los bloques pequeños (16 cuartos de 8×8, 8 tiras de 16×8 y 8 pilares de 8×16) son piezas pegadas a un lado o a una esquina dentro de su celda de 16×16, así que cada celda con dibujo es un tile: 74 en total. La leyenda con celda, pieza y marca de cada lado está en arte/plantillas/LEYENDA.md."},
    { fecha: "2026-11-24", hora: "13:00", decision: "Los tiles de azul más claro son variantes: el mismo tile con otro dibujo, para dar variedad", porque: "Los rellenos gris, azul y negro de la plantilla no son colores del juego: distinguen vecinos. El azul claro marca variantes (B3, B9, B12, B15, U8 y U9, más los rellenos B7, B10 y B11), con las mismas uniones que su tile base; el revisor comprobará que coincidan."},
    { fecha: "2026-11-24", hora: "12:00", decision: "Pendiente: decoración de 8×8 en capa aparte; mecánicas con objetos y snap a 0,5", porque: "Propuesta: la decoración (tuberías, enredaderas) puede usar una grid hija de 0,5 con su propio PNG, plantilla y Rule Tile, con la misma paleta y sin collider; no rompe Pixel Perfect si queda a múltiplos de 8 px. Lo que tenga mecánica (por ejemplo una tubería que reacciona al sonido) va como objeto con ScriptableObject y snap a 0,5. Un Tilemap de 8×8 con collider solo si el prototipo de correr y saltar (Paso 3) lo pide. Antes de dibujar hay que definir qué hace el jugador con la pieza." },
    { fecha: "2026-11-24", hora: "18:02", decision: "Cómo revisa revisar_tiles.py los tiles dibujados", porque: "El script lee el PNG exportado (224×160, indexado o RGBA) y saca las marcas y la forma de cada pieza de la plantilla propia (reusa tiles_propios.py), así que nunca se copian a mano. Revisa por tile: colores exactos de la paleta, sin semitransparencia, sin casillas 0 ni 20-23 y, si el PNG es indexado, que el índice sea la casilla; aviso (no error) si hay algo dibujado fuera de la pieza; contorno de sombra en todo píxel que da al aire (lados blancos y huecos dentro de la celda); suelo solo 4-5 justo bajo el pasto. La regla de madera con contorno sombra-1 no se revisa todavía, porque ningún tile está asignado a madera ni a adobe; se agrega cuando haya un juego de tiles construidos. Uniones: dos lados que pueden tocarse (mismo tipo de lado, misma mitad y mismos vecinos al aire, y solo dentro del mismo grupo: B con I; U con L y X; las piezas de 8 px M, T, P y A) deben coincidir píxel a píxel en transparencia, contorno y material, no en el tono exacto, para que la textura pueda variar; las variantes, contra su base en los cuatro lados. Las celdas vacías se saltan, así sirve a medio dibujar, y opcionalmente saca una imagen ampliada con los errores marcados. Es sobre todo una red para errores de exportación (paleta reordenada, semitransparencia, casillas de sonido), que la experiencia no evita." },
    { fecha: "2026-11-24", hora: "18:30", decision: "Pendiente: autotile, dibujo el terreno con un solo bloque y Unity elige la pieza", porque: "Propuesta: es lo que hace el Rule Tile de Unity (2D Tilemap Extras), que ya está en el plan del Paso 1: pinto con un bloque y cada celda elige su esquina, borde o relleno según sus vecinos. Lo nuevo sería un script que arme el Rule Tile solo, leyendo las marcas de LEYENDA.md, en vez de configurar a mano las reglas de 74 tiles. Complejidad: baja para el 4×4, las esquinas interiores y los de 1×1, L y cruz; las piezas de 8 px (cuartos, tiras, pilares y anillo) no caben en reglas de vecinos de 16, así que se colocan a mano o en otra capa. Se decide en la tarea del Rule Tile, después de dibujar los tiles." },
    { fecha: "2026-11-24", hora: "22:06", decision: "Los 74 tiles se dibujan por hoja de material en cuatro fases, con corte el 4 de diciembre", reemplaza: "Pendiente: dibujar los ~50 tiles en cuatro fases y revisar al final de cada una", porque: "Fase 1, bloque base (B1 B2 B4 B5 B6 B8 B13 B14 B16, 9 tiles); fase 2, esquinas y delgado (I1-I4 y U1-U7, 11); fase 3, conectores y variedad (L1-L4, X1-X5 y las 9 variantes, 18); fase 4, piezas de 1/2 (M, T, P y A, 36). Las fases siguen los grupos del revisor (B+I, U+L+X y piezas de 8 px), que solo compara uniones dentro de su grupo, y las variantes van después de su base porque deben tener sus mismas uniones. Las fases 1 a 3 son los 38 tiles que un Rule Tile puede manejar. Fechas con un supuesto mío de 2 a 3 tiles por día (no medido): fase 1 del 25 al 28 de nov., fase 2 del 29 de nov. al 3 de dic., fase 3 del 4 al 10 de dic. Para el 14 de dic. el compromiso son las fases 1 y 2 de la hoja del primer material de la zona 1; el 4 de dic. es el corte: si la fase 2 está cerrada, la 3 sigue; si no, pasa a la semana 11. La fase 4 va en la semana 11 (tileset final y props de la zona 1). Terminar los 74 antes del 14 de dic. pediría unos 4 por día todos los días, además de los otros tres pasos de la sala. La fase 1 mide mi ritmo real y el calendario se recalcula con ese dato. Detalle en arte/plantillas/GUIA.md." },
    { fecha: "2026-11-24", hora: "22:06", decision: "La plantilla es el formato de todo tileset de material; las piezas que no existan se dejan vacías", reemplaza: "Pendiente: medios bloques como tiles aparte dentro de la grid de 16×16 (no una grid de 8×8)", porque: "La misma plantilla de hasta 74 tiles sirve para piedra, pasto, arena o lo que venga, y cada hoja usa solo lo que necesita: un material de arena puede quedarse sin cuartos de bloque, y una tubería puede ser solo la sección de piezas de 1/2. Las celdas de piezas que no existan se dejan vacías. Responde también a la pendiente de medios bloques de las 12:00: las piezas de 1/2 ya van dentro de la celda de 16×16, como decidió la plantilla de las 12:30." },
    { fecha: "2026-11-24", hora: "22:06", decision: "Dos capas: el terreno con collider se arma solo con la plantilla y la decoración va en otra grid encima, sin collider", porque: "La paleta de tiles del terreno se define al inicio y es la hitbox del mapa: se juega y se ve la jugabilidad con las piezas de la plantilla, cuyo contorno da el collider. Encima va otra grid con un Order in Layer mayor y sin collider, donde se ponen las hojas de material (pasto, piedra, laterita…). Así un tile de pasto o de decoración nunca tiene hitbox y el arte puede actualizarse con el tiempo sin tocar la jugabilidad. En los textos, «paleta de colores» es la de arte/paletas y «paleta de tiles» es la de Unity." },
    { fecha: "2026-11-24", hora: "22:06", decision: "Pendiente: objetos de 1/2, ¿pieza dentro de la celda de 16 o grid hija de 0,5?", reemplaza: "Pendiente: decoración de 8×8 en capa aparte; mecánicas con objetos y snap a 0,5", porque: "Recomendación sin probar en Unity: con una pieza por celda de 16 no se pueden hacer ramificaciones (T o cruz) ni dos piezas de 1/2 en la misma celda; una grid hija de 0,5 sí, y además bastaría el grupo U+L+X a 8 px (18 tiles) en vez de las 36 piezas por material. La plantilla de 1/2 se conserva para losas de 1/2 dentro del terreno. Mi objeción anterior a una grid de 8×8 (más trabajo) pesa menos ahora que arte y hitbox van en capas separadas. No hace falta decidir antes de la semana 11: las fases 1 a 3 son iguales en las dos opciones. Regla: si el primer objeto de 1/2 necesita ramificarse o juntar dos piezas en una celda, grid de 0,5.", pendiente: true },
    { fecha: "2026-11-24", hora: "22:06", decision: "Pendiente: un solo script genera el Rule Tile del terreno y el de cada material", reemplaza: "Pendiente: autotile, dibujo el terreno con un solo bloque y Unity elige la pieza", porque: "Propuesta: el script lee las marcas de LEYENDA.md y arma el Rule Tile del terreno (sprites de la plantilla, con collider) y el de cada hoja de material (mismas reglas, otros sprites, sin collider). Como el terreno no depende del arte, su Rule Tile puede empezar ya con los 38 tiles de las fases 1 a 3. Las piezas de 8 px no caben en reglas de vecinos de 16 y se colocan a mano o en otra capa. Idea para después: pintar solo el terreno y que la decoración siga sola, con el material elegido por mapa. Se decide en la tarea del Rule Tile.", pendiente: true },
    { fecha: "2026-11-24", hora: "22:06", decision: "Pendiente: congelar la silueta sólida del terreno antes de la semana 12", porque: "Propuesta: en el terreno se pueden agregar piezas en celdas vacías, pero no cambiar la silueta sólida de una pieza ya usada, porque mueve la hitbox de las salas (es la misma idea que agregar casillas solo al final de la paleta de colores). El dibujo de adentro sí se puede retocar. La fecha es antes de las 8 a 10 salas de la semana 12 (8 de feb.).", pendiente: true },
    { fecha: "2026-11-24", hora: "22:06", decision: "Pendiente: cada hoja de material declara qué piezas usa", porque: "Propuesta: un archivo pequeño por hoja con los ids que sí existen, para que el revisor distinga «pendiente» (falta dibujar) de «no existe» (esta hoja no la usa), y para que el script de Rule Tile no genere reglas de piezas ausentes. Hoy el revisor trata toda celda vacía como pendiente. Va después de la fase 1, cuando haga falta.", pendiente: true },
  ],

  // Página «El juego»: la idea en un párrafo y los sistemas que lo hacen distinto.
  juego: {
    idea:
      "Tu herramienta no es un arma, es un sintonizador. Todo lo que está roto en el mundo está desafinado: giras perillas de frecuencia, amplitud y fase hasta que tu onda coincide con la del objeto, y el mundo reacciona. Cada zona enseña un concepto de física del sonido.",
    pilares: [
      { nombre: "Sintetizador propio", texto: "Lo que el jugador mueve suena exactamente como se ve: la onda se genera en código, no es una grabación." },
      { nombre: "Música por capas", texto: "Compuesta por mí en FL Studio. Un solo reloj musical mueve el sonido, las luces y las partículas." },
      { nombre: "Criaturas procedurales", texto: "Se mueven con física (segmentos, resortes y patas que buscan el suelo), no con animaciones dibujadas cuadro por cuadro." },
      { nombre: "Ecosistema que escucha", texto: "Las criaturas se acercan o huyen según el sonido que hagas." },
      { nombre: "Todo por datos", texto: "Zonas, criaturas y skins se describen con datos, así agregar contenido no pide reprogramar." },
    ],
  },

  // Zonas del juego (las marcadas como extra solo si sobra tiempo).
  // zonasNota: aviso que sale arriba de las zonas; bórralo cuando las zonas estén al día.
  zonasNota: "Por rediseñar: estas zonas son del concepto anterior (física del sonido). Se van a redefinir con las tribus y el enfoque en música.",
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
