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
        fecha: "2026-12-06",
        limite: "2026-12-20",
        nota: "La decisión de 2D se cerró el 23 de nov. Las 32 semanas se rehicieron y aprobaron el 26 de nov. La lista de especies y enemigos de la zona 1 se propuso el 26 de nov. y espera mi OK. Faltan aprobarla y las primeras 5 preguntas del examen (vie 4 dic); el resto del examen tiene su propia meta.",
        ramas: [
          { titulo: "Prueba de capas 2D en Unity: pixel perfect a 480×270, cuatro planos y paso de gris a color.", hecho: true },
          { titulo: "Decidir: 2D lateral, casi todo procedural.", hecho: true },
          { titulo: "Cerrar la historia hasta enemigos y puzzles (obstáculos, mapa, enemigos y puzzles).", hecho: false },
          { titulo: "Rehacer las 32 semanas con la historia nueva (tribus y música), en 2D y con lo jugable antes que lo visual (aprobadas el 26 nov.).", hecho: true },
          { titulo: "Primeras 5 preguntas conceptuales del examen pre/post (vie 4 dic.).", hecho: false },
        ],
      },
      {
        titulo: "Sala de estilo de la zona 1 (Ritmo)",
        nota: "Una sala de la zona 1 que sirve de molde técnico para todo el juego. Ya no se pule al máximo antes de seguir: primero lo jugable (collider, movimiento, bombo) y lo visual (luz, shader y arte) al final, porque el arte va a seguir cambiando. Por eso los pasos se hacen en el orden 1, 4, 3 y 2 (fechas aprobadas el 26 de nov.). Un paso por sesión, con plan y OK antes de cada uno.",
        ramas: [
          {
            titulo: "Paso 1: Tilemap de la zona 1",
            ramas: [
              { titulo: "Tamaño de tile: 16×16 (un tile = una unidad de Unity).", hecho: true },
              { titulo: "Plantilla de tiles con marcas de conexión (arte/plantillas).", hecho: true },
              { titulo: "Estudiar tiles en Shovel Knight, Celeste, Terraria y Animal Well.", hecho: true },
              { titulo: "Cerrar la paleta: casillas por material y hora del día (23 casillas, abierta a cambios).", hecho: true },
              { titulo: "Plantilla propia de 38 tiles con leyenda, revisor y orden de trabajo (arte/plantillas).", hecho: true },
              { titulo: "Proyecto base en Unity (URP 2D, Pixel Perfect 480×270, 16 PPU, Git LFS), 25 nov.", hecho: true },
              { titulo: "Cámara Pixel Perfect y sala de prueba pintada a mano (25 nov).", hecho: true },
              { titulo: "Collider sobre la sala pintada a mano, para mover al personaje (30 nov).", hecho: false },
              { titulo: "Rule Tile del terreno desde la plantilla, justo antes de armar salas en serie (semana 9, 18 a 24 ene.).", hecho: false },
              { titulo: "Primeros tiles de arte del material de la zona 1 (bloque base), en el pase de arte después del congelamiento (semana 24, 3 a 9 may.).", hecho: false },
            ],
          },
          {
            titulo: "Paso 2: Luz 2D estilo t3ssel8r y paso de gris a color",
            fecha: "2027-02-28",
            nota: "Va al último (semana 14, 22 a 28 feb.), cuando la zona 1 ya se juega en gris. Se prueba sobre la sala de la plantilla, antes de tener arte. Ahí entran también 2 skins de prueba como filas de la paleta.",
            ramas: [
              { titulo: "Shader de paleta por casillas: fila de silencio a fila de color.", hecho: false },
              { titulo: "Luz 2D sobre los tiles sin ensuciar el pixel art.", hecho: false },
            ],
          },
          {
            titulo: "Paso 3: Protagonista con cuerpo procedural",
            fecha: "2027-02-21",
            nota: "Correr y saltar ya no van aquí: se hacen antes con un rectángulo (semana del 30 nov., en el prototipo). Este paso le pone el cuerpo a ese movimiento (semana 13, 15 a 21 feb.).",
            ramas: [
              { titulo: "Cuerpo procedural (sin cuadros de animación) sobre el rectángulo que ya corre y salta.", hecho: false },
            ],
          },
          {
            titulo: "Paso 4: El bombo de la tribu del ritmo",
            fecha: "2027-01-03",
            nota: "Es lo jugable de la sala, así que va antes que los pasos 2 y 3: el metrónomo en la semana 5 (21 a 27 dic.) y el bombo en la 6 (28 dic. a 3 ene.).",
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
          { titulo: "Publicación automática con GitHub Actions (cambiar la fuente de Pages).", hecho: true },
          { titulo: "Revisarla en el celular y anotar lo que no me guste.", hecho: false },
        ],
      },
      {
        titulo: "Prototipo del sintonizador y prueba de diversión",
        fecha: "2026-12-20",
        ramas: [
          { titulo: "Rectángulo con física que corre, con salto variable, coyote time y buffer (30 nov. a 3 dic.).", hecho: false },
          { titulo: "Cámara que sigue al personaje sin temblar (4 dic.).", hecho: false },
          { titulo: "Sintonizador v0: onda senoidal dibujada y sonando; perilla de frecuencia (7 a 13 dic.).", hecho: false },
          { titulo: "Primer puzzle: puerta que abre al igualar frecuencia (14 a 20 dic.).", hecho: false },
          { titulo: "Prueba de diversión con alguien que no conozca el juego (14 a 20 dic.).", hecho: false },
        ],
      },
      {
        titulo: "Zona 1 (Ritmo) jugable de punta a punta, en gris",
        fecha: "2027-02-07",
        nota: "Aprobada el 26 de nov. Todo con formas simples y sin arte: lo que se juega primero. La semana 12 (8 a 14 feb.) queda de margen.",
        ramas: [
          { titulo: "Transición entre salas y reloj musical (21 a 27 dic.).", hecho: false },
          { titulo: "Datos con ScriptableObjects y el bombo que golpea el suelo a tiempo (28 dic. a 3 ene.).", hecho: false },
          { titulo: "La tribu enseña su ritmo pieza por pieza: bombo, caja, hi-hat y juntos (4 a 10 ene.).", hecho: false },
          { titulo: "Depredadores: el enjambre y el que siente el suelo (11 a 17 ene.).", hecho: false },
          { titulo: "Rule Tile y 8 a 10 salas en papel y bloqueadas (18 a 24 ene.).", hecho: false },
          { titulo: "El maestro del ritmo, pulsos y atajo al caracol (25 a 31 ene.).", hecho: false },
          { titulo: "Guardado, pausa, volumen y telemetría básica (1 a 7 feb.).", hecho: false },
          { titulo: "Árbol de los ritmos v0 en el caracol: se llena con las piezas de la zona 1 y queda guardado (1 a 7 feb.).", hecho: false },
        ],
      },
      {
        titulo: "Examen pre/post de música y sonido",
        fecha: "2027-06-13",
        nota: "Fechas aprobadas el 26 de nov. Mide lo que enseña el juego: sobre todo música, con algunas preguntas de cómo funciona el sonido. El grupo se pide en enero y se confirma en abril, no a fines de mayo: el semestre de bachillerato se acaba en junio.",
        ramas: [
          { titulo: "Primeras 5 preguntas conceptuales (vie 4 dic.).", hecho: false },
          { titulo: "Preguntas 6 a 12, cada una con su respuesta y por qué las otras están mal (21 a 27 dic.).", hecho: false },
          { titulo: "Revisión con un maestro de Física o Música y primer contacto con la escuela para el grupo de junio (11 a 17 ene.).", hecho: false },
          { titulo: "Piloto con los estudiantes del playtest de la zona 1: ¿se entienden las preguntas? (8 a 14 mar.).", hecho: false },
          { titulo: "Ajustar las preguntas que no se entendieron (15 a 21 mar.).", hecho: false },
          { titulo: "Grupo, fecha y permisos de la escuela y de los padres confirmados (5 a 11 abr.).", hecho: false },
          { titulo: "Versión final lista para aplicar (24 a 30 may.).", hecho: false },
          { titulo: "Aplicar pre-test, sesión de juego y post-test (7 a 13 jun.).", hecho: false },
        ],
      },
    ],
  },

  // Metas diarias (Plan > Ruta): cuánto tiempo planeo al día para el juego. Es un cálculo bajo a propósito para no
  // confiarme; si me sobra tiempo, adelanto lo del día siguiente. Las tareas de cada día están en contenido/tareas/.
  tiempo: {
    minutos: 60,
    opcionales: ["sáb"], // días en los que trabajar es opcional
  },

  // Fases del calendario. "id" se usa en las semanas.
  fases: [
    { id: 0, nombre: "Preproducción", inicio: "2026-11-23", fin: "2026-12-20", meta: "Prototipo del sintonizador y prueba de diversión" },
    { id: 1, nombre: "Zona 1 jugable", inicio: "2026-12-21", fin: "2027-02-14", meta: "La zona 1 (Ritmo) se juega de punta a punta en gris: pulso, bombo, depredadores, salas y maestro, con guardado y telemetría" },
    { id: 2, nombre: "Zona 1 se ve y suena", inicio: "2027-02-15", fin: "2027-03-14", meta: "Cuerpo procedural, paso de gris a color, música de la zona 1 y playtest con estudiantes" },
    { id: 3, nombre: "Producción", inicio: "2027-03-15", fin: "2027-05-02", meta: "Zonas 2, 3 y 4 en versión corta y el caracol con la Gran Canción. Congelamiento el 1 de mayo" },
    { id: 4, nombre: "Pulido", inicio: "2027-05-03", fin: "2027-06-06", meta: "Pase de arte, música que falte, bugs y playtest completo, sin funciones nuevas" },
    { id: 5, nombre: "Validación y reporte", inicio: "2027-06-07", fin: "2027-07-04", meta: "Pre/post test, reporte científico y versión 1.0" },
  ],

  // Las 32 semanas. Cambia "hecha" a true cuando termines cada una.
  // Rehechas y aprobadas el 26 de nov. con la historia nueva y lo jugable antes que lo visual.
  semanas: [
    { n: 1, fase: 0, inicio: "2026-11-23", meta: "Proyecto base en Unity con Git LFS, cámara Pixel Perfect y sala de prueba pintada a mano con la plantilla; historia hasta enemigos y puzzles.", hecha: false },
    { n: 2, fase: 0, inicio: "2026-11-30", meta: "Movimiento con un rectángulo sobre la sala pintada a mano: collider, correr, salto variable, coyote time y buffer; cámara que lo sigue.", hecha: false },
    { n: 3, fase: 0, inicio: "2026-12-07", meta: "Sintonizador v0: onda senoidal dibujada y sonando, perilla de frecuencia y una onda objetivo que igualar.", hecha: false },
    { n: 4, fase: 0, inicio: "2026-12-14", meta: "Primer puzzle (puerta que abre al igualar la onda) y prueba de diversión con alguien que no conozca el juego.", hecha: false },
    { n: 5, fase: 1, inicio: "2026-12-21", meta: "Transición entre salas y reloj musical: un metrónomo ajustable que marca el pulso de todo el juego. Preguntas 6 a 12 del examen. Semana ligera por Navidad.", hecha: false },
    { n: 6, fase: 1, inicio: "2026-12-28", meta: "Datos con ScriptableObjects (tribu, ritmo y criatura) y el bombo que golpea el suelo a tiempo con el reloj.", hecha: false },
    { n: 7, fase: 1, inicio: "2027-01-04", meta: "La tribu enseña su ritmo pieza por pieza (bombo, caja, hi-hat y juntos); si lo aprendes, confía más en ti.", hecha: false },
    { n: 8, fase: 1, inicio: "2027-01-11", meta: "Depredadores de la zona 1 con eventos de sonido: el enjambre (te deja pasar si igualas su ritmo) y el que siente el suelo (lo atraen los graves). Revisión del examen y primer contacto con la escuela.", hecha: false },
    { n: 9, fase: 1, inicio: "2027-01-18", meta: "Rule Tile del terreno y las 8 a 10 salas de la zona 1: en papel y bloqueadas en Unity.", hecha: false },
    { n: 10, fase: 1, inicio: "2027-01-25", meta: "El maestro del ritmo en el corazón de la zona, pulsos coleccionables y atajo de vuelta al caracol: la zona 1 se juega de punta a punta en gris.", hecha: false },
    { n: 11, fase: 1, inicio: "2027-02-01", meta: "Guardado, menú de pausa, volumen y telemetría básica (lo que el playtest y el examen van a medir); árbol de los ritmos v0 en el caracol.", hecha: false },
    { n: 12, fase: 1, inicio: "2027-02-08", meta: "Margen 1: lo que se haya atrasado de la zona 1. Si no hace falta, se adelanta el cuerpo procedural.", hecha: false },
    { n: 13, fase: 2, inicio: "2027-02-15", meta: "Cuerpo procedural del protagonista sobre el rectángulo y la primera criatura de la tribu: segmentos, resortes y patas que buscan el suelo.", hecha: false },
    { n: 14, fase: 2, inicio: "2027-02-22", meta: "Shader de paleta (de gris a color cuando suena), luz 2D y 2 skins de prueba como filas de la paleta.", hecha: false },
    { n: 15, fase: 2, inicio: "2027-03-01", meta: "Música de la zona 1 en capas: importador de MIDI y stems sonando con el reloj; luces y partículas siguen la música.", hecha: false },
    { n: 16, fase: 2, inicio: "2027-03-08", meta: "Playtest de la zona 1 con 5 a 10 estudiantes y piloto del examen.", hecha: false },
    { n: 17, fase: 3, inicio: "2027-03-15", meta: "Correcciones del playtest y del examen; mecánica de la zona 2 (Melodía): perilla de frecuencia y la cuerda (si mide la mitad, suena más agudo).", hecha: false },
    { n: 18, fase: 3, inicio: "2027-03-22", meta: "Zona 2: 4 a 5 salas, el imitador (entrenar el oído) y su maestro. Semana Santa: ver si deja más o menos tiempo.", hecha: false },
    { n: 19, fase: 3, inicio: "2027-03-29", meta: "Mecánica de la zona 3 (Armonía): varias notas a la vez que se dejan espacio; si se satura, llega el que llega con el escándalo.", hecha: false },
    { n: 20, fase: 3, inicio: "2027-04-05", meta: "Zona 3: 4 a 5 salas y su maestro. Grupo, fecha y permisos del examen confirmados.", hecha: false },
    { n: 21, fase: 3, inicio: "2027-04-12", meta: "Zona 4 (La mezcla): 3 salas que combinan lo aprendido, y el caracol: la Gran Canción en luna llena.", hecha: false },
    { n: 22, fase: 3, inicio: "2027-04-19", meta: "Margen 2: lo que falte de las zonas 2 a 4 y del final.", hecha: false },
    { n: 23, fase: 3, inicio: "2027-04-26", meta: "Margen 3. Congelamiento de funciones el sábado 1 de mayo: lo que no esté, no entra en la 1.0.", hecha: false },
    { n: 24, fase: 4, inicio: "2027-05-03", meta: "Pase de arte 1: tiles de la zona 1 dibujados viéndolos en la sala, con los trucos del estudio de tiles.", hecha: false },
    { n: 25, fase: 4, inicio: "2027-05-10", meta: "Música de las zonas 2 a 4 en capas.", hecha: false },
    { n: 26, fase: 4, inicio: "2027-05-17", meta: "Pase de arte 2: zonas 2 a 4 (paleta y props), partículas por instrumento y el caracol con color.", hecha: false },
    { n: 27, fase: 4, inicio: "2027-05-24", meta: "Bugs, versión final del examen y playtest completo de inicio a fin con 5 o más personas.", hecha: false },
    { n: 28, fase: 4, inicio: "2027-05-31", meta: "Margen 4: correcciones del playtest completo y build para la validación.", hecha: false },
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
      fecha: "2026-11-26",
      hora: "23:10",
      titulo: "Las especies de la zona 1, una por pestaña",
      texto:
        "Adelanté lo del sábado: la lista de enemigos y obstáculos de la zona 1, sacada del bestiario. Quedó en un documento aparte con una pestaña por especie (el protagonista, el bombo, la caja, el hi-hat, el enjambre y el que siente el suelo), cada una con cómo se comporta el animal real en que se inspira y su mecánica en los 5 bloques. Los datos reales van marcados «por verificar». Lo que más me gustó es que tres piezas se programan una sola vez y sirven para todas: un aviso de «sonó algo» que dice dónde, qué tan grave y qué tan fuerte; ser presa sin vidas (si te atrapan, vuelves a la entrada de la sala) y una sala donde el sonido no viaja. Con eso, el que siente el suelo usa al bombo de cebo sin tocar el código del bombo. Fuera de la zona 1 quedan el cazador de oído, el imitador, el que llega con el escándalo, la fauna del eco y las tribus que se tapan, porque enseñan lo de otras zonas. También le pregunté a Claude si el plan por semanas me sirve, porque me gusta ir cambiando de foco: propone quedarse con las fechas que no dependen de mí y, en vez de semanas, una lista de lo que sigue ordenada por dependencias, y que el enjambre sea el primer puzzle en lugar de la puerta. Después Claude hizo una página donde cada especie se puede probar (no lo había pedido todavía, pero se queda), y al final pedí lo que de verdad quería: un almanaque técnico, como el de un juego de plantas y zombis, con una rejilla de retratos y la ficha de cada especie para ir escribiendo todo: mundo real, juego, 5 bloques, estados, los datos de su ScriptableObject, los avisos que manda y escucha, riesgos y notas. Ya trae 15 entradas: las 6 especies, 4 reglas y obstáculos de la zona 1 y 5 de otras zonas o para después de la 1.0. Todo lo de diseño sigue esperando mi OK.",
      enlace: { texto: "Abrir el almanaque", url: "https://claude.ai/artifact/6AAnoQvQ6wnz2gt2Q3qKrg" },
      etiquetas: ["diseño", "planeación"],
    },
    {
      fecha: "2026-11-26",
      hora: "22:20",
      titulo: "Apuntes: un lugar para lo que aprendo",
      texto:
        "Registro ya tiene su tercera vista, Apuntes, junto a Bitácora y Decisiones. Cada tema es un archivo .md en contenido/apuntes/ y sale como tarjeta con su título, la fecha de la última vez que lo edité, sus etiquetas y el primer párrafo; al tocarla se abre completa. Arriba hay un buscador que no se fija en acentos ni mayúsculas y pide que estén todas las palabras, y debajo las etiquetas para filtrar. Los primeros tres apuntes salen de lo que ya tenía regado: los 5 bloques de una mecánica con el bombo de ejemplo, el estudio de tiles de Shovel Knight, Celeste, Terraria y Animal Well, y «Para escuchar: el ritmo», que se mudó de Juego > Música porque es algo que estudio yo, no un dato del juego; en Música queda un enlace que lo abre directo. El prompt de NotebookLM de la historia del ritmo no entra. Para agregar uno desde el teléfono hay un LEEME en la misma carpeta con una plantilla; lo único que hay que recordar es cambiar la fecha de «editado:» cada vez.",
      enlace: { texto: "Ver los apuntes", url: "#/registro/apuntes" },
      etiquetas: ["herramientas"],
    },
    {
      fecha: "2026-11-26",
      hora: "17:30",
      titulo: "Música para entrenar el oído del ritmo",
      texto:
        "Le pedí a Claude música para escuchar el ritmo y quedó en Juego > Música, en «Para escuchar: el ritmo», con fuentes. Va de la raíz a los descendientes: Olatunji, Mamady Keïta, King Sunny Adé, Fela Kuti con Tony Allen y los tambores ewe de Ghana; Steve Reich para la polirritmia; y después rumba, salsa, samba-reggae, funk, la 808, rap, dembow y son jarocho, que son las ramas del árbol de los ritmos. Lo más útil es la forma de escuchar: una pieza a la vez y en el orden de los minijuegos (pulso, el «1», lo que le contesta, lo que parte el pulso y el patrón disparejo). Si a mí me cuesta encontrar una pieza en una canción, a un estudiante también, y ese minijuego necesita más ayuda. Antes también hice un boceto jugable de los 7 minijuegos, que se queda como artefacto hasta que lo apruebe.",
      enlace: { texto: "Ver el boceto de los minijuegos", url: "https://claude.ai/artifact/ER1um4oRxjfqZKyU2RhRZN" },
      etiquetas: ["música", "investigación"],
    },
    {
      fecha: "2026-11-26",
      hora: "02:15",
      titulo: "Aprobadas las 32 semanas y el alcance",
      texto:
        "Le di el OK a las 32 semanas rehechas y al alcance: zona 1 completa, zonas 2 a 4 cortas, el caracol con la Gran Canción y el modo director después de la 1.0. Con eso el plan definitivo solo espera la historia (sáb 28) y las primeras 5 preguntas del examen (vie 4 dic.). Siguen pendientes tres propuestas: que la zona 1 se juegue con el pulso y la frecuencia sea de la zona 2, la pregunta de validación con «música y sonido», y los géneros como recetas de piezas. Lo que sigue es diseñar los minijuegos del ritmo: primero en un documento aparte y, cuando quede bien, en esta página.",
      etiquetas: ["planeación"],
    },
    {
      fecha: "2026-11-26",
      hora: "01:30",
      titulo: "El árbol de los ritmos y los 5 bloques de toda mecánica",
      texto:
        "Aprobé una parte de la propuesta de zonas y géneros: en el caracol va a crecer un árbol de los ritmos que se llena con cada pieza y cada receta de género que encuentre, de los tambores de África occidental a la salsa, el rap y el reggaetón. Lo demás de esa propuesta (clanes por pieza, géneros como recetas, llevar ritmos entre tribus) sigue pendiente. El árbol entra en la semana 11, junto con el guardado. También adopté una regla de un video: toda mecánica se arma con cinco bloques (entrada, detección, estado y lógica, transformación y comunicación), y antes de programar una escribo qué hace en cada bloque. Los minijuegos del ritmo y la historia de la música se diseñan en otro chat.",
      etiquetas: ["diseño", "planeación"],
    },
    {
      fecha: "2026-11-26",
      hora: "00:30",
      titulo: "Las 32 semanas, rehechas con la historia y lo jugable primero",
      texto:
        "Adelanté lo del domingo y rehice con Claude las 32 semanas; queda como propuesta hasta que le dé el OK. Las semanas 5 a 11 arman la zona 1 jugable en gris: reloj musical, el bombo, la tribu que me enseña su ritmo pieza por pieza, el enjambre y el que siente el suelo, las 8 a 10 salas con el Rule Tile y el maestro del ritmo, más guardado y telemetría. Lo visual va después: cuerpo procedural en la 13, shader de gris a color y luz en la 14, y los tiles de arte en mayo, ya congelado. Como la historia no tiene villano, ya no hay jefes: cada zona termina con su maestro. Lo más difícil fue el alcance: con una hora al día no caben 4 zonas de 8 a 10 salas, así que la propuesta deja la zona 1 completa, las zonas 2 y 3 de 4 a 5 salas, la 4 de 3 salas y el caracol con la Gran Canción, y el modo director después de la 1.0. Quedan 4 semanas de margen (12, 22, 23 y 28) y ya no hay funciones nuevas después del 1 de mayo. El examen tiene fechas: el grupo se pide en enero, se pilotea en el playtest de marzo y se confirma en abril. También planeé día por día la semana del sintonizador v0 (7 dic.).",
      etiquetas: ["planeación"],
    },
    {
      fecha: "2026-11-25",
      hora: "23:55",
      titulo: "El plan, al día con «primero lo funcional»",
      texto:
        "Revisé con Claude que Plan y Ruta dijeran lo mismo que lo que hice y decidí hoy. Semanas: la 1 ya no promete correr y saltar, sino lo que sí salió (proyecto base, cámara y sala pintada a mano); la 2 es la del movimiento con un rectángulo; el sintonizador v0 pasa a la 3 y el primer puzzle con la prueba de diversión a la 4, así que todo el prototipo se recorre una semana y queda justo antes del 20 de diciembre. La plataforma de cuerda sale de la semana 3 y va a la 5; la cámara ya no aparece en la 5 porque está hecha, y el Rule Tile pasa a la 12, la semana en que armo las 8 a 10 salas. Metas: la sala de estilo ya no se pule al máximo para el 14 de diciembre; queda sin fecha hasta el domingo, con lo jugable antes que la luz y el arte. Correr y saltar salen del paso 3 (ese paso solo le pone el cuerpo al rectángulo). El plan definitivo vencía hoy y pasa al 6 de diciembre: le faltan la historia, las 32 semanas y el examen. Marqué como hecha la publicación automática de esta página. Elegir los trucos del estudio de tiles ya no es el 10 de diciembre, sino cuando empiece el arte. Lo de más adelante se acomoda el domingo.",
      etiquetas: ["planeación"],
    },
    {
      fecha: "2026-11-25",
      hora: "23:35",
      titulo: "Primero lo que se juega",
      texto:
        "Reordené lo que sigue. La ruta ponía toda la semana del 30 de noviembre en el Rule Tile y después luces, shader y tiles de arte, y el movimiento y el sintonizador quedaban para después. Pero el arte va a seguir cambiando hasta el final y no es lo prioritario: primero quiero algo que se juegue y luego pulirlo. Pintar la sala a mano me tomó 5 minutos, así que el Rule Tile puede esperar a cuando arme salas en serie. La semana nueva: collider sobre la sala pintada a mano, un rectángulo con física que camina, corre, hace salto variable, coyote time y buffer, y la cámara siguiéndolo para ver si se mantiene estable. El sábado, si me sobra, una primera luz 2D, y el domingo planeo el sintonizador v0. Las 32 semanas se rehacen el domingo con este orden.",
      etiquetas: ["planeación"],
    },
    {
      fecha: "2026-11-25",
      hora: "23:18",
      titulo: "Estudio de tiles de cuatro juegos, sin elegir todavía",
      texto:
        "Adelanté lo del viernes. Con Claude revisé capturas a tamaño real de Shovel Knight (tiles de 16), Celeste, Terraria y Animal Well (tiles de 8, así que una celda mía de 16 son 2×2 de los suyos), con la rejilla encima. Comparé seis cosas: cómo esconden la repetición del relleno, el borde que da al aire, las esquinas interiores, el final de las plataformas delgadas, la decoración que sale de la celda y la luz. Lo que más me sirvió: Shovel Knight acepta celdas idénticas y dibuja las piezas delgadas más chicas que la celda; Celeste deja el relleno casi liso y pone la textura solo en la orilla; Terraria usa 1 px casi negro hacia el aire con el pasto dentro del tile; y en Animal Well la luz hace que bloques iguales se vean distintos. Salieron tres trucos candidatos por juego, pero no elegí ninguno: la plantilla de 38 tiles no cambia y el estudio solo dice cómo pintarla, algo que importa hasta que empiece a dibujar. Lo decido el 10 de diciembre, al empezar el arte del bloque base, viendo la sala en Unity. Lo primero a decidir ese día es si el contorno es de sombra (como dice la paleta) o de luz, y si el relleno lleva variantes o va casi liso, porque eso cambia cuánto dibujo. Las capturas no se suben al repo.",
      etiquetas: ["arte"],
    },
    {
      fecha: "2026-11-25",
      hora: "21:55",
      titulo: "Primera sala pintada con la plantilla",
      texto:
        "Me sobró tiempo y adelanté lo del jueves. Corté la plantilla del terreno en la rejilla de 16×16 con el Sprite Editor y salieron los 38 tiles; las celdas vacías no se crean. Hice la paleta de tiles Terreno_Zona1: al arrastrar el PNG cortado, Unity crea un tile por sprite (los guardé en Assets/Arte/Tiles/Terreno) y el PNG se queda en Plantillas. Después creé un Tilemap llamado Terreno y pinté a mano una sala simple con un solo bloque, todavía sin Rule Tile ni collider. Cortar y pintar me tomó unos 5 minutos. Moví la cámara a mano en la vista Scene mirando el resultado en Game y no vi rayitas entre tiles ni nada raro. Así ya tengo una sala vista por la cámara Pixel Perfect; lo siguiente es que el Rule Tile ponga solo cada pieza.",
      enlace: { texto: "Ver el PR de Unity", url: "https://github.com/amongoooo/RESONANCE/pull/13" },
      etiquetas: ["herramientas", "arte"],
    },
    {
      fecha: "2026-11-25",
      hora: "21:40",
      titulo: "La cámara Pixel Perfect ya está en la escena",
      texto:
        "Puse la Pixel Perfect Camera de URP en la cámara principal: 16 píxeles por unidad y resolución de referencia de 480×270. Para tener algo que mirar copié la plantilla del terreno a Assets/Arte/Plantillas (filtro Point, sin compresión, 16 PPU) y la puse en el centro. Elegí Windowbox: si la ventana no es múltiplo exacto de 480×270 salen barras negras en vez de estirar la imagen o mostrar más mundo, así una sala siempre mide 30×17 tiles a la vista. También Upscale Render Texture: todo se dibuja a 480×270 y luego se amplía, para que lo que gire siga pegado a la rejilla. Lo probé en la vista Game: a 480×270, 960×540 y 1920×1080 la escala fue 1, 2 y 4, sin barras, y a 1280×720 se quedó en 2 con barras alrededor; al arrastrar la ventana solo salta de entero en entero. En todos los tamaños los píxeles miden lo mismo y nada se ve borroso. En esta versión del componente ya no existen las casillas «Run In Edit Mode» ni «Filter Mode» (esta solo aparece con Stretch Fill): siempre funciona en el editor. Trabajo en la rama unity-camara.",
      etiquetas: ["herramientas", "arte"],
    },
    {
      fecha: "2026-11-25",
      hora: "11:30",
      titulo: "Metas diarias en la Ruta",
      texto:
        "Plan > Ruta ahora empieza con «Día por día»: las tareas de esta semana y la siguiente, cada día con su tiempo contra una hora diaria para el juego (el sábado es opcional). En realidad puedo trabajar 2 a 3 horas, pero planeo con 1 para no confiarme; si me sobra, adelanto lo del día siguiente. Las tareas siguen en contenido/tareas/ y ahora llevan cuánto piden (por ejemplo «· 45 min»); la página avisa si un día se pasa de la hora o si algo quedó pendiente. Repartí por días lo que falta de esta semana (cámara Pixel Perfect, importar la plantilla, sala de prueba, estudiar tiles y rehacer las 32 semanas) y la semana del Rule Tile. También mezclé el PR de la navegación nueva.",
      etiquetas: ["planeación", "herramientas"],
    },
    {
      fecha: "2026-11-25",
      hora: "09:40",
      titulo: "La barra cambia de lado jalándola, y llega la ruleta",
      texto:
        "Cambié la navegación de esta página. Si jalas la barra de páginas hacia su orilla, sale de la pantalla y entra por el lado contrario; si la jalas hacia el centro, rebota. Mientras la jalas, la otra barra se va escondiendo para avisar que van a cambiar de lugar. Antes de programarlo probé tres animaciones en una página de prueba y me quedé con la Lanzada: sale acelerando y entra frenando con un rebote chiquito. Basta jalarla 30 px o soltarla a 500 px por segundo. En Ajustes hay ahora «Tipo de navegación: Barra o Ruleta» y «Lado de la barra». La ruleta gira de lado y la opción que se detiene en el centro es la elegida; si todas caben a la vista tiene tope, si no gira sin fin. Al cambiar de página, la barra de apartados se esconde y vuelve a salir con los apartados nuevos. Al probarlo en el celular, la marca blanca de la pestaña elegida salía volando de una orilla a la otra al cambiar de lado; ahora se va y vuelve con su barra.",
      etiquetas: ["herramientas"],
    },
    {
      fecha: "2026-11-24",
      hora: "23:51",
      titulo: "Repo listo para el proyecto de Unity",
      texto:
        "Preparé el repo antes de mi primer commit de Unity. Con el nuevo .gitattributes, las texturas, el audio (con los bancos de FMOD), los modelos y los .aseprite que estén dentro de Assets/ van por Git LFS, y los archivos de texto de Unity se guardan siempre con saltos de línea LF, también en Windows. bitacora/ y arte/ siguen como Git normal. La carpeta .vscode/ que Unity creó en la raíz queda fuera del repo. El proyecto es Universal 2D en Unity 6000.4.2f1, con 2D Tilemap Extras 7.0.1 (trae el Rule Tile) y 2D Aseprite Importer 4.0.2, instalados desde el Unity Registry. Antes del primer commit compruebo que Git LFS esté instalado en mi equipo.",
      etiquetas: ["herramientas", "planeación"],
    },
    {
      fecha: "2026-11-24",
      hora: "22:21",
      titulo: "Plantilla de 38 tiles y Unity primero",
      texto:
        "Cambié la plantilla propia a una de 38 tiles de 16×16 (bloque 4×4, esquinas interiores, anillo hueco, cruz, suelto y puntas) y quité las piezas de 1/2. El verde es decoración de pasto: sobresale de la celda y no lleva hitbox. También cambió el orden: no voy a dibujar hojas completas antes de verlas, así que primero trabajo en Unity con la plantilla como terreno (hitbox, luces y shader) y el arte se dibuja y se actualiza viéndolo en la sala. Actualicé la lista de tiles, la leyenda y el revisor, y saqué una versión limpia de la plantilla para Unity. Las fases de dibujo con fechas se cayeron.",
      etiquetas: ["arte", "planeación"],
    },
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
    { fecha: "2026-11-27", hora: "00:05", decision: "En el almanaque, cada criatura tiene una lista de mecánicas y cada mecánica usa solo los bloques que necesite", porque: "Una mecánica va desde un botón que se presiona hasta un superpoder del jugador, así que una criatura casi nunca tiene una sola. Cada ficha conserva sus mismos datos, pero en vez de un solo juego de 5 bloques tiene mecánicas que puedo agregar, ordenar y quitar, cada una con nombre, qué hace y los 5 bloques posibles, sin obligación de llenarlos todos; la ficha dice cuáles no usa. Ya se separaron las de las 6 especies; por ejemplo, el protagonista tiene correr, salto variable, coyote time y buffer, perilla del pulso, brillo al pulso, aterrizaje fuerte y volver a la entrada." },
    { fecha: "2026-11-27", hora: "00:05", decision: "Pendiente: las mecánicas globales van en un apartado propio del almanaque, aparte del bestiario", porque: "Propuesta de Claude: el reloj musical, la perilla del pulso, el aviso «sonó algo», ser presa, la sala donde el sonido no viaja y la confianza de la tribu no son de una criatura: las usan varias. En el bestiario se repetirían o quedarían en la ficha de quien no les toca. En un apartado propio cada una se escribe una vez, con sus 5 bloques, y las mecánicas de cada criatura solo dicen cuál usan. Las del protagonista se quedan en su ficha, porque son suyas. Hoy esas reglas están en el bestiario como entradas de tipo Regla y Obstáculo; se mudarían.", pendiente: true },
    { fecha: "2026-11-26", hora: "23:55", decision: "Las especies, reglas y obstáculos se escriben en el almanaque técnico", porque: "Lo pedí así: un almanaque con una rejilla de retratos y una ficha por entrada que puedo editar y que se guarda sola. Cada ficha tiene tipo, zona, estado (idea, propuesta, aprobada, en Unity, hecha o fuera de la 1.0), altura, qué enseña, en qué se inspira, cuándo, el mundo real, cómo funciona en el juego, los 5 bloques, los estados, los datos de su ScriptableObject (campo, valor, unidad y nota), los avisos que manda y escucha, riesgos y notas. Es la fuente de verdad del diseño de cada criatura; lo que se apruebe ahí pasa a esta página como decisión. El documento y la página jugable del 26 nov. se quedan como estaban. https://claude.ai/artifact/6AAnoQvQ6wnz2gt2Q3qKrg" },
    { fecha: "2026-11-26", hora: "23:10", decision: "Pendiente: las especies de la zona 1 son el protagonista, el bombo, la caja, el hi-hat, el enjambre y el que siente el suelo", porque: "Propuesta sacada del bestiario, sin villano ni jefes, en el documento «Especies de la zona 1» (una pestaña por especie, con su comportamiento real y sus 5 bloques). Cabe en las semanas 5 a 11: el bombo (6), la caja, el hi-hat y el orgullo de la tribu (7), el enjambre, el que siente el suelo y ser presa (8) y una o dos salas donde el sonido no viaja (9). No entran en la zona 1: el cazador de oído (pide sonar más o menos fuerte; después de la 1.0 o en la zona 4 si sobra el margen de la semana 22), el imitador (zona 2), el que llega con el escándalo y las tribus que se tapan (zona 3), la fauna del eco (después de la 1.0) y la frontera de tierra muerta (pasillo corto al empezar la zona 2). La luna en la zona 1 es solo un dato guardado. La semana 8 queda apretada: si se atrasa, el que siente el suelo solo sigue al bombo o pasa al margen de la 12. Las ideas de los troncos de la caja y la escalera de hojas del hi-hat no están probadas.", pendiente: true },
    { fecha: "2026-11-26", hora: "23:10", decision: "Pendiente: un solo aviso «sonó algo» para todas las criaturas, desde la semana 6", porque: "Propuesta: cada vez que algo suena manda un aviso con dónde, qué tan grave o agudo y qué tan fuerte, y cada criatura decide si le importa (al que siente el suelo solo lo grave, al enjambre el pulso). Así un depredador nuevo es casi solo datos, y el que siente el suelo usa al bombo de cebo sin código nuevo en el bombo. La sala donde el sonido no viaja es una regla del aviso, no de cada criatura. Nace con el bombo, que ya iba a mandar «el bombo golpeó». El reloj de la semana 5 debe avisar también los pedazos del pulso, para el hi-hat.", pendiente: true },
    { fecha: "2026-11-26", hora: "23:10", decision: "Pendiente: sin vidas ni daño; si un depredador te atrapa, vuelves a la entrada de la sala", porque: "Propuesta: el protagonista es presa y no se defiende. Perder progreso castiga sin enseñar; lo que enseña es volver a intentar con lo que oíste. Cada regreso se anota en la telemetría (cuántas veces y en qué sala), que dice qué sala es demasiado difícil. Va en la semana 8, con los depredadores." , pendiente: true },
    { fecha: "2026-11-26", hora: "23:10", decision: "Pendiente: el primer puzzle (semana 4) es el enjambre en vez de la puerta", porque: "Propuesta: el enjambre te deja pasar si igualas su ritmo, así que es un puzzle igual de chico que la puerta, pero ya es un enemigo de verdad y la prueba de diversión se hace con algo del juego real. Los enemigos llegan en diciembre y no en enero, sin agregar trabajo. Programar enemigos antes no conviene: necesitan el movimiento (semana 2) y el reloj para tener a quién perseguir y a qué pulso ir.", pendiente: true },
    { fecha: "2026-11-26", hora: "23:10", decision: "Pendiente: planear por hitos y una lista de lo que sigue, en vez de semanas", porque: "Propuesta: me gusta ir cambiando de foco y un plan por semanas no me ayuda tanto. Se quedan las fechas que no dependen de mí (congelamiento el 1 de mayo, examen con la escuela, playtest) y el hito de cada fase (prototipo el 20 dic., zona 1 en gris el 7 feb.). La semana deja de ser compromiso: una lista de lo que sigue, ordenada por qué depende de qué, y cada día elijo de lo que ya esté desbloqueado. El domingo, 15 minutos para ver si voy bien para el siguiente hito; si no, toca enfocarse. Lo adelantado se tacha y listo. Cambiar cómo se ve la Ruta toca el código de la página, así que va cuando lo pida.", pendiente: true },
    { fecha: "2026-11-26", hora: "22:20", decision: "«Para escuchar: el ritmo» se muda de Juego > Música a Registro > Apuntes", porque: "Es música que escucho yo para entrenar el oído, no un dato que vaya a contar el juego; Juego > Música se queda con la historia real que cuentan los pulsos y deja un enlace al apunte. El prompt de NotebookLM de la historia del ritmo no se guarda en los apuntes." },
    { fecha: "2026-11-26", hora: "22:11", decision: "Un apartado «Apuntes» en Registro para lo que aprendo", reemplaza: "Pendiente: un apartado «Apuntes» en Registro para lo que aprendo", porque: "Aprobé la propuesta: Registro tendrá tres vistas, Bitácora (lo que hice), Decisiones (lo que decidí) y Apuntes (lo que aprendí). Un archivo .md por tema en contenido/apuntes/, cada uno como tarjeta con fecha de última edición y etiquetas, y un buscador sencillo; se edita igual que musica.md, también desde el teléfono. Va en Registro y no en una página propia porque la barra de abajo ya tiene 5. Se construye en otro chat; ahí se decide si «Para escuchar» se muda de Juego > Música y se guarda el prompt de NotebookLM de la historia del ritmo." },
    { fecha: "2026-11-26", hora: "17:30", decision: "Pendiente: un apartado «Apuntes» en Registro para lo que aprendo", porque: "Propuesta: hoy la página tiene dónde va lo que hice (Bitácora, por fecha) y lo que decidí (Decisiones), pero no lo que aprendí, que se queda regado en entradas, decisiones y documentos aparte. «Apuntes» sería la tercera pestaña de Registro: un archivo .md por tema en contenido/apuntes/ (por ejemplo, los 5 bloques de una mecánica, el estudio de tiles de cuatro juegos, la música para escuchar o lo que aprendo de Unity), cada uno como tarjeta con su fecha de última edición y etiquetas, y un buscador sencillo. Se escribe como musica.md, así que no pide nada nuevo para editarlo desde el teléfono. No va en una página propia porque la barra de abajo ya tiene 5 y una sexta la aprieta. La lista para escuchar se queda en Juego > Música hasta que exista el apartado, y ahí se decide si se muda. Pide tocar el código de la página, por eso espera mi OK.", pendiente: true },
    { fecha: "2026-11-26", hora: "02:15", decision: "Las 32 semanas con la historia nueva y lo jugable primero", reemplaza: "Pendiente: las 32 semanas rehechas con la historia nueva y lo jugable primero", porque: "Aprobé la propuesta tal cual: sintonizador v0 en la semana 3 y puzzle con prueba de diversión en la 4; zona 1 jugable en gris en las semanas 5 a 11; cuerpo procedural en la 13; shader de paleta, luz y skins en la 14; tiles de arte en la 24, después del congelamiento; Rule Tile en la 9 con las salas; sin jefes (cada zona cierra con su maestro); la cuerda en la zona 2; nada de funciones nuevas después del 1 de mayo; margen en las semanas 12, 22, 23 y 28, y si se gasta, se recorta primero la zona 4 (queda el caracol) y luego la zona 3 baja a 3 salas. Incluye las fechas del examen y de los pasos de la sala de estilo." },
    { fecha: "2026-11-26", hora: "02:15", decision: "Lo que cabe hasta el 1 de mayo: zona 1 completa, zonas 2 a 4 cortas y el modo director después de la 1.0", reemplaza: "Pendiente: lo que cabe hasta el 1 de mayo es la zona 1 completa y las zonas 2 a 4 cortas; el modo director va después de la 1.0", porque: "Con 1 h al día no caben 4 zonas de 8 a 10 salas: la zona 1 queda completa (8 a 10 salas), las zonas 2 y 3 con 4 a 5, la zona 4 con 3 que mezclan lo aprendido, más el caracol con la Gran Canción. El modo director libre va después de la 1.0. El arte de las zonas 2 a 4 usa otra fila de la paleta y solo se dibujan props nuevos." },
    { fecha: "2026-11-26", hora: "02:15", decision: "Los minijuegos del ritmo se diseñan primero en un documento aparte y pasan a la página cuando queden bien", porque: "Es diseño que va a cambiar mucho mientras lo platico con Claude. En un documento aparte (como el de historia y bestiario) se puede editar y comentar sin llenar la página de decisiones a medias; cuando quede bien, lo que se decidió pasa a decisiones, metas y semanas." },
    { fecha: "2026-11-26", hora: "01:30", decision: "En el caracol crece un árbol de los ritmos", porque: "Cada pieza (pulso, bombo, caja, hi-hat, patrón de campana…) y cada receta de género que encuentro llena una rama, de los tambores de África occidental a la salsa, la samba, el blues, el rap y el reggaetón. Da ganas de explorar para completarlo y cuenta la historia real de la música, que es lo que mide el examen. Como los ritmos ya se guardan como datos, cada rama es un dato más y no una pantalla nueva. Va en la semana 11, junto con el guardado, porque el árbol tiene que recordar lo que encontré; puede comerse parte del margen de la semana 12." },
    { fecha: "2026-11-26", hora: "01:30", decision: "Toda mecánica se describe con 5 bloques: entrada, detección, estado y lógica, transformación y comunicación", porque: "Salió de un video: cualquier mecánica se arma combinando cinco bloques. Entrada: cómo la controla o la dispara el jugador. Detección: cómo un objeto se entera de lo que pasa a su alrededor. Estado y lógica: las reglas y lo que recuerda (abierto o cerrado). Transformación: cómo se mueve, cambia de aspecto o de estado físico. Comunicación: cómo se avisan los objetos entre sí (referencias, señales o llamadas). No toda mecánica usa los cinco, pero antes de programar una se escribe qué hace en cada bloque; así se ve qué falta y qué se puede reusar entre mecánicas." },
    { fecha: "2026-11-26", hora: "00:35", decision: "Pendiente: cada zona enseña un concepto con piezas, y los géneros son recetas de esas piezas", porque: "Propuesta para enseñar pop, rap o salsa sin meterlo todo de golpe. (1) La zona 1 no es un género: es el concepto ritmo en su raíz (África occidental). Se aprende una pieza a la vez, cada una con su clan y su altura: el pulso, el bombo abajo, la caja en medio, el hi-hat arriba, el patrón de campana, la llamada y respuesta, y al final la polirritmia con el maestro. Cada pieza sigue el mismo camino: la ves tocar a una criatura, la pruebas sin peligro, la usas para pasar y luego la juntas con las anteriores. (2) Los clanes conviven con ritmos distintos porque comparten el pulso, no el patrón: si todos van al mismo pulso, pueden tocar cosas diferentes y encajan; si cada uno va a su propio pulso, es ruido. Eso es justo lo que perdieron y lo que les devuelves. (3) Un género es una receta: las mismas piezas en otro orden, otra velocidad y otra mezcla. Si la caja cae en el 2 y el 4, suena a pop o rock; si baja la velocidad y la voz va encima del bombo y la caja, se acerca al rap; si el patrón de campana se vuelve clave, sale la salsa; el tresillo está en la habanera y en el dembow del reggaetón. Las recetas se descubren en ramas opcionales, en la zona 4 y en el final de música y tecnología. (4) Tu especie lleva y trae música entre tribus (ya está en la historia): si llevas una pieza de una zona a otra, la tribu la mezcla con lo suyo y aparece algo nuevo (una criatura, un camino, un ritmo). Así el jugador hace las mezclas, no solo las ve. (5) El árbol de los ritmos en el caracol ya se aprobó aparte (26 nov. 01:30). (6) Para que el mundo se sienta vivo: se oye antes de verse (música detrás de las paredes que te jala a explorar), las criaturas tocan aunque no las mires, las salas grises esconden pulsos y ritmos raros, hay caminos que se abren al volver con lo que aprendiste en otra zona, y el caracol y la luna cambian cada vez que regresas. Las tribus se inspiran en cómo se organiza la música real, no en disfraces ni estereotipos.", pendiente: true },
    { fecha: "2026-11-26", hora: "00:30", decision: "Pendiente: las 32 semanas rehechas con la historia nueva y lo jugable primero", reemplaza: "Pendiente: el prototipo se recorre una semana y el Rule Tile pasa a la semana 12", porque: "Propuesta: (1) el prototipo se queda como estaba en la decisión anterior: sintonizador v0 en la semana 3 y puzzle con prueba de diversión en la 4. (2) Las semanas 5 a 11 arman la zona 1 jugable en gris (reloj, bombo, la tribu que enseña su ritmo, depredadores, salas y maestro, guardado y telemetría); el cuerpo procedural pasa a la 13, el shader de paleta, la luz y las skins a la 14 y los tiles de arte a la 24, después del congelamiento. Así, si el arte cambia, no tira nada de lo jugable. (3) El Rule Tile pasa de la 12 a la 9 porque las salas de la zona 1 se arman antes. (4) Sin jefes: la historia no tiene villano, así que cada zona cierra con su maestro y los enemigos son los depredadores del bestiario. Salen El Gran Diapasón, los Zumbidos, Ecófagos, Estáticos, El Estudio y los Retos de Afinación, que eran del diseño anterior. (5) La cuerda deja la semana 5 y va a la zona 2, donde enseña que una cuerda más corta suena más aguda. (6) Después del 1 de mayo ya no hay funciones nuevas; antes la zona final, los retos y las skins caían ahí. (7) Cuatro semanas de margen: la 12, la 22, la 23 y la 28. Si una no se usa, se adelanta lo que sigue; si se usan todas, lo primero que se recorta es la zona 4 (queda solo el caracol) y después la zona 3 baja a 3 salas.", pendiente: true },
    { fecha: "2026-11-26", hora: "00:30", decision: "Pendiente: lo que cabe hasta el 1 de mayo es la zona 1 completa y las zonas 2 a 4 cortas; el modo director va después de la 1.0", porque: "Propuesta: con 1 h al día caben unas 6 a 7 h por semana. La zona 1 completa (8 a 10 salas) se lleva unas 11 semanas entre lo jugable, lo visual, la música y el playtest, y cada zona corta (mecánica, 4 a 5 salas y maestro) unas 2. Con 8 a 10 salas en cada zona, como dice la historia, las zonas 2 a 4 pedirían unas 4 semanas más y el margen desaparecería. Por eso: zona 1 completa, zonas 2 y 3 de 4 a 5 salas, zona 4 de 3 salas que mezcla lo aprendido y el caracol con la Gran Canción. El modo director libre (piano roll y caja de ritmos) va después de la 1.0; la tribu que enseña su ritmo pieza por pieza ya usa una caja de ritmos chica. El arte de las zonas 2 a 4 aprovecha que la paleta es una tabla: otro color de zona es otra fila, no otro dibujo, y solo se dibujan props nuevos. Si en realidad trabajo 2 a 3 h al día, el margen crece solo, pero el plan no cuenta con eso.", pendiente: true },
    { fecha: "2026-11-26", hora: "00:30", decision: "Pendiente: la zona 1 se juega con el pulso y la perilla de frecuencia es de la zona 2", porque: "Propuesta: la historia dice que la tribu del ritmo perdió el pulso común y que la zona 2 es de escalas (lo agudo arriba, lo grave abajo). El sintonizador v0 del prototipo usa la perilla de frecuencia porque es lo más rápido de probar (si la perilla sube, la onda se aprieta y suena más aguda) y basta para la prueba de diversión, pero su lugar en el juego es la zona 2. En la zona 1 lo que se ajusta es el tiempo: si el pulso va más rápido, los golpes se juntan; si va más lento, se separan. El prototipo no cambia; solo dónde vive cada perilla.", pendiente: true },
    { fecha: "2026-11-26", hora: "00:30", decision: "Pendiente: la pregunta de validación habla de música y sonido, no solo de ondas", porque: "Propuesta: la página pregunta «¿Jugar RESONANCIA mejora la comprensión de conceptos de ondas y sonido en estudiantes de bachillerato?», pero con la historia nueva el examen mide sobre todo música, con algunas preguntas de cómo funciona el sonido. Quedaría «¿Jugar RESONANCIA mejora la comprensión de conceptos de música y sonido en estudiantes de bachillerato?». Se cambia en la página cuando lo apruebe.", pendiente: true },
    { fecha: "2026-11-26", hora: "00:25", decision: "La publicación de main y la vista previa de cada PR van en filas separadas", porque: "El 25 de nov. fusioné #11, #12 y #13 casi al mismo tiempo y la página en línea se quedó sin lo del #12: GitHub deja una sola publicación en espera por fila, y el aviso de «PR cerrada» llegó un segundo después y canceló la de main. Por lo mismo no se borraron las vistas previas de #6 y #11. Con una fila para main y otra por PR, una publicación solo cancela a otra del mismo destino, que siempre trae lo más nuevo. Si dos escriben a la vez, la acción de publicar vuelve a intentar." },
    { fecha: "2026-11-26", hora: "00:10", decision: "Con Claude se trabaja en GitHub, no en mi computadora", porque: "Cambio entre sesiones en el teléfono y en la computadora, así que el trabajo tiene que vivir en el repo y no en una carpeta de un equipo. La computadora queda para Unity. Si algo se hace en local, se sube a su rama al terminar." },
    { fecha: "2026-11-25", hora: "23:55", decision: "Reparto día por día del 25 de nov. al 6 de dic.: primero lo funcional", reemplaza: "Pendiente: el reparto día por día del 25 de nov. al 6 de dic.", porque: "Esta semana salió adelantada: el mié 25 hice la cámara, corté la plantilla, pinté la sala de prueba y estudié tiles; quedan la historia (sáb, opcional) y rehacer las 32 semanas con la revisión de la semana (dom). La siguiente ya no es del Rule Tile: collider y rectángulo que camina (lun, lo adelanto el jue 26), correr (mar), salto variable (mié), coyote time y buffer (jue), cámara que sigue al personaje y primeras 5 preguntas del examen (vie), luz 2D opcional (sáb) y plan del sintonizador v0 (dom). Los tiempos siguen siendo estimados sin medir." },
    { fecha: "2026-11-25", hora: "23:55", decision: "Pendiente: el prototipo se recorre una semana y el Rule Tile pasa a la semana 12", porque: "Propuesta hasta el replanteo del dom 29: como la semana 2 ahora es del movimiento, el sintonizador v0 pasa a la 3 (7 dic.) y el primer puzzle con la prueba de diversión a la 4 (14 dic.); la fecha del prototipo sigue en el 20 de dic., pero la semana 4 queda apretada (puzzle y una persona que lo pruebe en la misma semana). La plataforma de cuerda sale de la 3 y va a la 5. El Rule Tile va en la semana 12, cuando armo las 8 a 10 salas: si lo pongo antes, ahorro tiempo que todavía no gasto. La sala de estilo queda sin fecha (antes, 14 dic.) y sin «pulida al máximo» hasta fechar sus pasos el domingo.", pendiente: true },
    { fecha: "2026-11-25", hora: "23:35", decision: "Primero lo funcional; lo visual se pule al final", porque: "El arte va a seguir cambiando y nunca será lo prioritario: primero tiene que haber algo que se juegue (movimiento, sintonizador, puzzles) y cuando eso esté se pule lo visual. Por eso el Rule Tile ya no va antes del movimiento: pintar una sala a mano me toma minutos y el Rule Tile solo ahorra tiempo cuando arme salas en serie. La semana del 30 de nov. es de collider y movimiento con un rectángulo; la luz 2D queda como opcional el sábado." },
    { fecha: "2026-11-25", hora: "21:40", decision: "Cámara Pixel Perfect con Windowbox y Upscale Render Texture", porque: "Con Windowbox, si la ventana no es múltiplo de 480×270 salen barras en vez de estirar o mostrar más mundo, así cada sala se ve siempre igual (30×17 tiles). Con Upscale Render Texture todo se dibuja a 480×270 y se amplía, así que lo que gira con la animación procedural se queda en la rejilla. El costo es que la cámara se mueve a saltos de un píxel (1/16 de unidad); se juzga cuando la cámara siga al personaje. Lo aprobé después de probarla en 1:1, 2:1 y 4:1." },
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
    { fecha: "2026-11-24", hora: "22:06", decision: "La plantilla es el formato de todo tileset de material; las piezas que no existan se dejan vacías", reemplaza: "Pendiente: medios bloques como tiles aparte dentro de la grid de 16×16 (no una grid de 8×8)", porque: "La misma plantilla de 38 tiles sirve para piedra, pasto, arena o lo que venga, y cada hoja usa solo lo que necesita: un material puede quedarse sin esquinas interiores o sin cruz, y una tubería puede quedarse con las líneas y las cruces. Las celdas de piezas que no existan se dejan vacías. Responde a la pendiente de medios bloques de las 12:00: las piezas de 1/2 ya no van dentro de la plantilla de 16×16 (se quitaron esa noche); si hacen falta, serán una grid aparte." },
    { fecha: "2026-11-24", hora: "22:06", decision: "Dos capas: el terreno con collider se arma solo con la plantilla y la decoración va en otra grid encima, sin collider", porque: "La paleta de tiles del terreno se define al inicio y es la hitbox del mapa: se juega y se ve la jugabilidad con las piezas de la plantilla, cuyo contorno da el collider. Encima va otra grid con un Order in Layer mayor y sin collider, donde se ponen las hojas de material (pasto, piedra, laterita…). Así un tile de pasto o de decoración nunca tiene hitbox y el arte puede actualizarse con el tiempo sin tocar la jugabilidad. En los textos, «paleta de colores» es la de arte/paletas y «paleta de tiles» es la de Unity. La capa de terreno usa plantilla_terreno_zona1.png, la versión limpia sin marcas." },
    { fecha: "2026-11-24", hora: "22:06", decision: "Pendiente: objetos de 1/2, ¿pieza dentro de la celda de 16 o grid hija de 0,5?", reemplaza: "Pendiente: decoración de 8×8 en capa aparte; mecánicas con objetos y snap a 0,5", porque: "Recomendación sin probar en Unity: con una pieza por celda de 16 no se pueden hacer ramificaciones (T o cruz) ni dos piezas de 1/2 en la misma celda; una grid hija de 0,5 sí, y además bastaría el grupo U+L+X a 8 px (18 tiles) en vez de las 36 piezas por material. La plantilla de 1/2 se conserva para losas de 1/2 dentro del terreno. Mi objeción anterior a una grid de 8×8 (más trabajo) pesa menos ahora que arte y hitbox van en capas separadas. No hace falta decidir antes de la semana 11: las fases 1 a 3 son iguales en las dos opciones. Regla: si el primer objeto de 1/2 necesita ramificarse o juntar dos piezas en una celda, grid de 0,5." },
    { fecha: "2026-11-24", hora: "22:06", decision: "Pendiente: un solo script genera el Rule Tile del terreno y el de cada material", reemplaza: "Pendiente: autotile, dibujo el terreno con un solo bloque y Unity elige la pieza", porque: "Propuesta: el script lee las marcas de LEYENDA.md y arma el Rule Tile del terreno (sprites de la plantilla, con collider) y el de cada hoja de material (mismas reglas, otros sprites, sin collider). Como el terreno no depende del arte, su Rule Tile puede empezar ya con los 38 tiles de las fases 1 a 3. Las piezas de 8 px no caben en reglas de vecinos de 16 y se colocan a mano o en otra capa. Idea para después: pintar solo el terreno y que la decoración siga sola, con el material elegido por mapa. Se decide en la tarea del Rule Tile.", pendiente: true },
    { fecha: "2026-11-24", hora: "22:06", decision: "Pendiente: congelar la silueta sólida del terreno antes de la semana 12", porque: "Propuesta: en el terreno se pueden agregar piezas en celdas vacías, pero no cambiar la silueta sólida de una pieza ya usada, porque mueve la hitbox de las salas (es la misma idea que agregar casillas solo al final de la paleta de colores). El dibujo de adentro sí se puede retocar. La fecha es antes de las 8 a 10 salas de la semana 12 (8 de feb.)." },
    { fecha: "2026-11-24", hora: "22:06", decision: "Pendiente: cada hoja de material declara qué piezas usa", porque: "Propuesta: un archivo pequeño por hoja con los ids que sí existen, para que el revisor distinga «pendiente» (falta dibujar) de «no existe» (esta hoja no la usa), y para que el script de Rule Tile no genere reglas de piezas ausentes. Hoy el revisor trata toda celda vacía como pendiente. Va después de la fase 1, cuando haga falta.", pendiente: true },
    { fecha: "2026-11-24", hora: "22:21", decision: "La plantilla propia pasa a 38 tiles: se quitan las piezas de 1/2 y los anillos", reemplaza: "La plantilla propia no se modifica y se corta siempre en la rejilla de 16×16: 74 tiles", porque: "La plantilla nueva (288×192) conserva el bloque 4×4 (16), las 4 esquinas interiores, el anillo de 3×3 con el centro hueco (8), la cruz (5), el suelto (1) y las dos parejas de puntas (4); se van los cuartos, las tiras, los pilares y los anillos (36 tiles). Todos los tiles son cuadrados sólidos de 16×16, así que la hitbox es siempre la celda entera. Se sigue cortando en la rejilla de 16 y las variantes se reconocen por su lugar, porque ya no se pintan de otro azul. El verde es decoración de pasto: sobresale unos 4 px fuera de la celda y no lleva hitbox. Lista y leyenda en arte/plantillas/LEYENDA.md." },
    { fecha: "2026-11-24", hora: "22:21", decision: "Unity primero: se trabaja con la plantilla como terreno y el arte se dibuja y actualiza con Unity abierto", reemplaza: "Los 74 tiles se dibujan por hoja de material en cuatro fases, con corte el 4 de diciembre", porque: "No quiero dibujar y cerrar toda una hoja para que a la hora de verla en la sala algo no se vea bien. Orden: proyecto base de Unity, Tilemap y Rule Tile del terreno con la plantilla (versión limpia, con collider), luces y shader sobre ese Tilemap, y después el arte del primer material, tile por tile y viéndolo en la sala, en el orden bloque base, esquinas y delgado, conectores y variantes. Se cae el calendario de fases de dibujo y el corte del 4 de dic. Fechas tentativas (supuesto): proyecto base 25 a 29 nov., Rule Tile 30 nov. a 4 dic., luces 5 a 9 dic., primeros tiles 10 a 13 dic. Esto quita unos 8 días de dibujo del camino crítico del 14 de dic., pero no el trabajo de Unity: los pasos 3 y 4 de la sala (protagonista y bombo) siguen sin caber, y se decide con cifras al terminar el Rule Tile. Unity no dibuja pixel art: se edita en Aseprite y se reimporta (por verificar el 2D Aseprite Importer). Detalle en arte/plantillas/GUIA.md." },
    { fecha: "2026-11-24", hora: "22:21", decision: "La hitbox del terreno es siempre la celda entera de 16×16", reemplaza: "Pendiente: congelar la silueta sólida del terreno antes de la semana 12", porque: "Con la plantilla de 38, todos los tiles son cuadrados sólidos de 16×16, así que no hay siluetas que congelar: el collider de cada celda es la celda completa. Agregar piezas con otra forma (como las de 1/2) sería abrir esta decisión." },
    { fecha: "2026-11-24", hora: "22:21", decision: "Pendiente: objetos de 1/2 (tuberías), solo si hacen falta, en una grid hija de 0,5", reemplaza: "Pendiente: objetos de 1/2, ¿pieza dentro de la celda de 16 o grid hija de 0,5?", porque: "Propuesta sin probar en Unity: la plantilla de 38 ya no trae piezas de 1/2. Si un objeto las necesita, iría en una grid hija de 0,5 con su propia plantilla, y la misma de 38 a 8 px sirve para tuberías (líneas, esquinas, cruz). Se decide cuando aparezca el primer objeto de 1/2.", pendiente: true },
    { fecha: "2026-11-24", hora: "22:21", decision: "Pendiente: la decoración de pasto sobresale unos 4 px y su hoja necesita su propia plantilla", porque: "Propuesta: el pasto cae fuera de la celda de 16 y en celdas vecinas, así que la hoja de decoración usaría celdas mayores (por ejemplo 24×24 con margen de 4 px por lado) y su Rule Tile, con sprites más grandes que la celda y pivote centrado. Se decide en la capa de decoración, después del Rule Tile del terreno.", pendiente: true },
    { fecha: "2026-11-24", hora: "22:21", decision: "Las variantes se reconocen por su lugar en la plantilla, no por un azul más claro", reemplaza: "Los tiles de azul más claro son variantes: el mismo tile con otro dibujo, para dar variedad", porque: "La plantilla nueva pinta todos los bordes del mismo azul. Siguen siendo variantes (mismo tile con otro dibujo y las mismas uniones que su base): B3, B7, B9, B10, B11, B12, B15, U8 y U9, es decir, el segundo borde de cada lado, los rellenos 2 a 4 y la segunda pieza horizontal y vertical del anillo. El revisor las comprueba contra su base." },
    { fecha: "2026-11-24", hora: "23:51", decision: "Git LFS solo para los archivos pesados dentro de Assets/", porque: "Texturas (png, jpg, tga, psd, tif, exr, hdr, bmp), Aseprite (.aseprite, .ase), audio (wav, mp3, ogg, aif, flac y los .bank de FMOD) y modelos (fbx, obj, blend, dae, glb) se guardan fuera del historial normal: en el repo queda un puntero pequeño y el archivo real va al almacén de LFS. Así cada versión de un audio o una textura no engorda el repo para siempre. Fuera de Assets/ todo sigue como Git normal, porque la publicación de la bitácora y las plantillas de arte/ usan PNG normales. LFS gasta la cuota de GitHub (en la cuenta gratuita, 1 GiB de espacio y 1 GiB de descarga al mes, por confirmar en Settings > Billing); la publicación de la página no descarga LFS. Video y fuentes se agregan a la lista si hacen falta." },
    { fecha: "2026-11-24", hora: "23:51", decision: "Los archivos de texto de Unity se guardan siempre con saltos de línea LF", porque: "Unity escribe sus archivos de texto (.cs, .meta, escenas, prefabs, assets) con LF, y GitHub Desktop en Windows avisaba que los convertiría a CRLF. Con eol=lf en .gitattributes, Git los guarda y los saca en LF en cualquier equipo, así los cambios no se llenan de líneas que solo cambiaron el salto. Aplica solo a Assets/, Packages/ y ProjectSettings/; Git detecta solo qué archivos son de texto (text=auto)." },
    { fecha: "2026-11-24", hora: "23:51", decision: ".vscode/ fuera del repo", porque: "Unity lo generó en la raíz y es configuración de mi editor, no del proyecto." },
    { fecha: "2026-11-25", hora: "09:40", decision: "Página de bitácora: la barra cambia de lado jalándola y se puede navegar con barra o con ruleta", porque: "Probé el gesto en una página de prueba antes de programarlo. La barra se jala hacia su orilla para mandarla al otro lado: cambia si la llevas 30 px o la sueltas a 500 px por segundo; hacia el centro siempre rebota. Animación «Lanzada»: sale acelerando con la velocidad del dedo hasta quedar fuera de la pantalla y entra por la orilla contraria frenando con un rebote chiquito. Mientras jalas, la otra barra se va escondiendo para que se entienda que van a cambiar de lugar. Al cambiar de página, la barra de apartados se esconde y vuelve a salir ya actualizada. La ruleta usa el mismo vidrio: si todas las opciones caben a la vista tiene tope y solo eliges entre las que se ven; si no, gira sin fin. Es solo de esta página, no del juego." },
    { fecha: "2026-11-25", hora: "09:40", decision: "Detalles de la navegación nueva de la bitácora", porque: "Los propuse con el cambio y los confirmé el 25 de nov. después de probarlo en el celular: (1) el lado que se elige es el de las páginas y los apartados van del lado contrario, también en Inicio y Ajustes; (2) en computadora el gesto se hace arrastrando con el mouse, y Ajustes > Lado de la barra sirve para quien no pueda hacer el gesto, con la misma animación; (3) la ruleta también cambia de lado con el gesto; (4) la ruleta navega cuando una opción se detiene en el centro, no mientras gira, y tocar una opción de un lado la gira hasta el centro; (5) el lado y el tipo de navegación se recuerdan solo en tu navegador, y «Orden de las barras» pasa a «Lado de la barra»; (6) con «reducir movimiento», las barras se desvanecen y aparecen sin rebote, y la ruleta se acomoda sin girar por inercia." },
    { fecha: "2026-11-25", hora: "11:30", decision: "Metas diarias: 1 h al día para el juego, con el sábado opcional, en Plan > Ruta", porque: "Puedo trabajar unas 2 a 3 horas al día, pero planeo con 1 para no confiarme; si me sobra tiempo, adelanto lo del día siguiente. Las metas salen de los archivos de tareas de cada semana (contenido/tareas/), que ya iban por día, así que hay un solo lugar donde anotarlas; cada tarea dice cuánto pide y la página avisa si un día se pasa de la hora o si algo quedó pendiente. Se planea solo esta semana y la siguiente. En la página no aparece nada de otros proyectos." },
    { fecha: "2026-11-25", hora: "11:30", decision: "Pendiente: el reparto día por día del 25 de nov. al 6 de dic.", porque: "Propuesta: esta semana, cámara Pixel Perfect (hoy), importar la plantilla y pintar una sala de prueba (jueves), estudiar tiles (viernes), lista de obstáculos y enemigos de la zona 1 (sábado, opcional) y rehacer las 32 semanas con Claude más la revisión de la semana (domingo). La siguiente, el Rule Tile del terreno por grupos de piezas (lunes a miércoles), el collider (jueves), el corte con cifras y las primeras 5 preguntas del examen pre/post (viernes) y las primeras pruebas de luz 2D y del shader de paleta (fin de semana). Los tiempos son estimados míos sin medir. Ojo: las semanas 2 a 4 de la Ruta (sintonizador, primer puzzle y prueba de diversión para el 20 de dic.) ya no coinciden con la sala de estilo; por eso rehacer las 32 semanas va este domingo.", pendiente: true },
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
