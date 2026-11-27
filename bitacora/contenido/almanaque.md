# Cómo leer el almanaque

Copia del [almanaque](https://claude.ai/artifact/6AAnoQvQ6wnz2gt2Q3qKrg) tomada el 27 de noviembre de 2026. El almanaque es la fuente de verdad; esta copia se vuelve a generar cuando cambia.

- Primero van las especies, los depredadores y los obstáculos; después las mecánicas que usa todo el juego.
- **Estado:** «idea» es solo una idea, «propuesta» espera el OK, «aprobada» ya está decidida y «fuera de la 1.0» queda para después.
- Lo que dice «por verificar» todavía no está confirmado en fuentes reales.

# El protagonista

Protagonista · todas las zonas · estado: **propuesta** · Semanas 2 (movimiento), 5 (perilla) y 13 (cuerpo)

Una presa sin voz que no ataca: toca con su luz, siente el pulso del mundo y dirige a las tribus. Todas las demás especies reaccionan a él.

**Enseña:** Sentir el pulso

**Se inspira en:** Pájaro indicador de miel y coros de ranas

## Lo real

- Pájaro indicador de miel (África): guía a las personas hasta las colmenas con un canto especial y ellas le dejan la cera. Así guía el protagonista a las tribus hacia los pulsos, a cambio de protección.
- Luciérnagas y coros de ranas: cada individuo ajusta su destello o su canto al de sus vecinos hasta que todos van a tiempo, sin que nadie dirija.
- Las presas pequeñas sobreviven escondiéndose, quedándose quietas o en grupo, no peleando.

## En el juego

Se mueve, salta y brilla con una tecla en cada golpe: así toca los ritmos. La perilla da la velocidad del pulso. Con las piezas que aprende dirige a la tribu con su luz. Si su luz y la de otra criatura destellan juntas, van a tiempo. Si cae desde alto, el golpe suena grave.

## Mecánicas

- **Correr:** Se mueve a los lados.
- **Salto variable:** Salta más alto mientras se sostiene el botón.
- **Coyote time y buffer:** Perdona saltos que llegan un poco tarde o un poco antes.
- **Brillo con la tecla:** Brilla en cada golpe que el jugador presiona; así se juegan los minijuegos y se dirige a la tribu (ver «Brillar y dirigir con luz»).
- **Aterrizaje fuerte:** Caer desde alto suena grave y lo pueden sentir.
- **Volver al último checkpoint:** Si lo atrapan, reaparece en el último checkpoint que tocó (ver «Ser presa»).

## Vida

- **Dónde vive:** No tiene territorio: va de una tribu a otra. Duerme en huecos que resuenan (troncos, conchas, grietas), porque ahí siente mejor el pulso del mundo.
- **Cuándo sale:** Activo al atardecer y de noche, cuando su luz se ve mejor.
- **Qué come:** Néctar de flores que solo abren cuando hay música cerca. Base real (por verificar): la onagra hace su néctar más dulce en pocos minutos cuando oye el zumbido de una abeja. Por eso su especie casi desaparece cuando el mundo se queda en silencio: sin música no hay flores abiertas.
- **Con quién vive:** Adulto solitario. Su especie solo se junta para la Gran Canción, como las cigarras periódicas o los corales que desovan la misma noche.
- **Crías:** Las crías nacen cuando suena la Gran Canción. Nacen sin luz propia y la ganan al escuchar su primera música, como si «se afinaran».
- **Cómo suena:** No tiene voz. Siente las vibraciones con todo el cuerpo, como la línea lateral de los peces, que sienten el movimiento del agua a su alrededor. Se comunica con luz: destella al ritmo de lo que escucha, como las luciérnagas.
- **Con otras especies:** Presa del enjambre y del que siente el suelo. Mutualismo con las tribus: las guía hacia los pulsos y lleva música de una a otra (como el pájaro indicador de miel), y ellas lo protegen.

## Estados

- Libre: se mueve y salta.
- Atrapado: la pantalla se apaga a gris y vuelve a la entrada de la sala; no recibe controles mientras tanto.

## Datos

- `velocidadCorrer`: 6.9 tiles/s (de la prueba, sin medir en Unity)
- `velocidadDespacio`: 2.6 tiles/s (no hace ruido al caminar)
- `alturaSalto`: 3 tiles (con el botón sostenido)
- `coyoteTime`: 0.10 s
- `bufferSalto`: 0.12 s
- `umbralAterrizajeFuerte`: 20.6 tiles/s (a partir de aquí suena grave)
- `perillaPulsoMin`: 60 ppm
- `perillaPulsoMax`: 160 ppm

## Riesgos

- El cuerpo procedural (semana 13) puede pedir ajustar la hitbox del rectángulo.

## Notas

Perilla del pulso aprobada el 27 nov. Brillo con tecla y dirigir con luz aprobados el 27 nov.

# El bombo

Tribu · zona 1 · Ritmo · estado: **propuesta** · Semana 6 (28 dic. a 3 ene.)

El miembro grave de la tribu: grande y pesado, vive abajo y golpea el suelo en el «1». Primera pieza que se aprende y cebo del que siente el suelo.

**Enseña:** El «1» del compás

**Se inspira en:** Ratas canguro que tamborilean con las patas

## Lo real

- Ratas canguro (desiertos de Norteamérica): tamborilean el suelo con las patas traseras. Cada una tiene su propio patrón, como una firma, para marcar territorio y avisar a sus vecinas.
- También tamborilean frente a una serpiente: le dicen «ya te vi», y la serpiente suele irse.
- Los golpes viajan por el suelo y los vecinos los sienten con las patas.

## En el juego

En silencio está gris y quieto. Con el pulso golpea el suelo en el «1», y si el jugador está encima en ese momento lo lanza hacia arriba: una plataforma que salta a tiempo.

## Mecánicas

- **Golpe en el «1»:** Golpea el suelo en los pulsos de su patrón.
- **Lanzar al jugador:** Si el jugador está encima en el golpe, lo lanza hacia arriba.
- **Favor: la cosecha:** Con el protagonista, sacude un árbol a su ritmo hasta que cae la fruta; al terminar le regala el Pisotón.

## Vida

- **Dónde vive:** Abajo, en madrigueras cavadas en el suelo de laterita. Cada madriguera tiene un montículo encima que usa de escenario para tamborilear.
- **Cuándo sale:** Sale al atardecer. De día se queda en la madriguera, donde el suelo está fresco.
- **Qué come:** Semillas que junta y guarda en bolsas de las mejillas. Base real: las ratas canguro casi no beben agua; la sacan de las semillas que comen.
- **Con quién vive:** Solitario y territorial. Cada uno tiene su propio patrón de golpes, como una firma; los vecinos se reconocen sin verse.
- **Crías:** La madre cría en la madriguera. Las crías aprenden a tamborilear imitando a su madre antes de tener patrón propio (por verificar en ratas canguro reales).
- **Cómo suena:** Golpea el suelo con las patas traseras. Los golpes viajan por el suelo y los vecinos los sienten con las patas. Si el patrón es más lento, el golpe suena más grave y más grande.
- **Con otras especies:** Tamborilea frente a los depredadores para decirles «ya te vi» (las ratas canguro reales lo hacen con las serpientes). El que siente el suelo lo sigue, pero no lo caza: es demasiado grande y no es su presa.

## Estados

- En silencio: gris, no golpea.
- Sonando: golpea en los pulsos de su patrón.

## Datos

- `golpeaEn`: [1] pulsos del compás (sale de los datos del ritmo)
- `alturaLanzamiento`: 7.6 tiles
- `fuerzaAviso`: 1.0 0 a 1
- `sacudidaCamara`: 2 px
- `tamaño`: 3 × 1 tiles

## Riesgos

- Si el lanzamiento depende del cuadro exacto, puede fallar a veces: dar una ventana de unos milisegundos.

## Notas

Aquí nace el aviso «sonó algo» que usan todas las demás especies.

# La caja

Tribu · zona 1 · Ritmo · estado: **propuesta** · Semana 7 (4 a 10 ene.)

El miembro mediano de la tribu: cuerpo hueco, vive a media altura y contesta al bombo en el 2 y el 4. Enseña la llamada y respuesta.

**Enseña:** Contestar al bombo

**Se inspira en:** Gorilas y pájaros carpinteros

## Lo real

- Gorilas: los machos se golpean el pecho con las manos ahuecadas y el sonido se oye a más de un kilómetro. Si el gorila es más grande, el golpe suena más grave.
- Pájaros carpinteros: tamborilean troncos huecos (y hasta postes de metal) para marcar territorio y buscar pareja. Eligen lo que más resuena.
- En los dos casos lo hueco amplifica el golpe.

## En el juego

Propuesta sin probar: cuando la caja suena, los troncos huecos de su sala resuenan y son sólidos solo en su pulso (el 2 y el 4, con un cuarto de pulso de gracia). Si saltas en la respuesta, hay suelo.

## Mecánicas

- **Contestar en el 2 y el 4:** Responde al bombo en los pulsos de su patrón.
- **Troncos que resuenan:** Los troncos huecos son sólidos solo en el pulso de la caja (sin probar).
- **Favor: la cosecha:** Golpea el tronco en el 2 y el 4, entre los golpes del bombo, para oír dónde hay insectos; al terminar le regala el Eco hueco.

## Vida

- **Dónde vive:** A media altura, en troncos huecos y ramas gruesas. Elige siempre los troncos que más resuenan y los defiende.
- **Cuándo sale:** Activo de día y al atardecer.
- **Qué come:** Insectos que viven dentro de la corteza: golpea el tronco y escucha dónde suena hueco, porque ahí hay túneles. También fruta.
- **Con quién vive:** Grupos familiares. El más grande lleva el ritmo del grupo; su golpe es el más grave (base real: el golpe de pecho de los gorilas más grandes suena más grave).
- **Crías:** Las crías practican golpeando ramas delgadas que suenan agudo; al crecer pasan a troncos más gruesos y graves.
- **Cómo suena:** Se golpea el cuerpo hueco o el tronco. Lo hueco amplifica el golpe: mientras más grande el hueco, más grave y más lejos se oye.
- **Con otras especies:** Le contesta al bombo: el bombo llama desde abajo y la caja responde desde en medio. Comparte troncos con el hi-hat, que vive en sus hojas.

## Estados

- En silencio.
- Sonando.
- Tronco: resonando (sólido) o quieto (sin collider).

## Datos

- `contestaEn`: [2, 4] pulsos del compás
- `graciaSolido`: 0.25 pulsos (cuánto sigue sólido después de su pulso)
- `fuerzaAviso`: 0.7 0 a 1

## Riesgos

- La idea de los troncos no está probada. Si no divierte, la caja queda solo como pieza del minijuego.


# El hi-hat

Tribu · zona 1 · Ritmo · estado: **propuesta** · Semana 7 (4 a 10 ene.)

Los miembros agudos de la tribu: insectos pequeños que viven arriba y frotan su cuerpo. Parten el pulso en pedazos más chicos.

**Enseña:** Partir el pulso en pedazos

**Se inspira en:** Grillos que frotan las alas

## Lo real

- Grillos: el macho frota una orilla dura de un ala contra una fila de dientecitos de la otra, como pasar una uña por un peine.
- Si hace más calor, cantan más rápido; con frío, más lento.
- Su sonido es agudo y no viaja por el suelo.

## En el juego

Propuesta sin probar: cada pedazo del pulso enciende una hoja y la escalera se arma hacia arriba; se apaga en el «1» cada dos compases. Si partes el pulso en más pedazos, se arma más rápido.

## Mecánicas

- **Partir el pulso:** Toca 2 o 4 veces por cada pulso.
- **Escalera de hojas:** Cada pedazo enciende una hoja sólida; se apaga en el «1» cada dos compases (sin probar).
- **Favor: el lugar tibio:** El protagonista guía al coro a un lugar tibio para que cante (los grillos cantan más rápido con calor). Qué da a cambio está por decidir; no da habilidad.
- **Esconder o confundir (dirigido):** De noche, dirigido con la luz del protagonista: a su pulso lo esconde; a destiempo salta todo el coro y confunde al depredador.

## Vida

- **Dónde vive:** Arriba, en las hojas y en las puntas de las ramas.
- **Cuándo sale:** De noche y al atardecer. Base real: los grillos cantan más rápido cuando hace calor y más lento con frío; en el mundo del juego, aceleran cuando el día está más caliente.
- **Qué come:** Hojas tiernas y néctar.
- **Con quién vive:** Coros. Solo los machos cantan; las hembras eligen pareja por el canto.
- **Crías:** Las crías (ninfas) se parecen a los adultos pero sin alas, y mudan varias veces. No cantan hasta tener alas, porque cantan con ellas.
- **Cómo suena:** Frotan una orilla dura de un ala contra una fila de dientecitos de la otra: cada diente es un clic. Su sonido es agudo y se apaga pronto, así que no viaja por el suelo.
- **Con otras especies:** Viven en las hojas de los troncos de la caja. El que siente el suelo no los oye.

## Estados

- En silencio.
- Sonando: va encendiendo hojas.
- Escalera completa: espera al «1» para apagarse.

## Datos

- `pedazosPorPulso`: 2 o 4
- `hojas`: 6
- `apagaCada`: 2 compases
- `fuerzaAviso`: 0.3 0 a 1

## Riesgos

- Pide que el reloj de la semana 5 avise también los pedazos del pulso, no solo el golpe entero.


# El enjambre

Depredador · zona 1 · Ritmo · estado: **propuesta** · Semana 8 (o primer puzzle de la semana 4, pendiente)

Una nube de insectos que destellan juntos a su propio pulso. Si igualas su ritmo te deja pasar; si vas a destiempo, te caza.

**Enseña:** Igualar un ritmo

**Se inspira en:** Luciérnagas que destellan al mismo tiempo

## Lo real

- Luciérnagas sincronizadas: en las Great Smoky Mountains (Estados Unidos) y en manglares del sureste de Asia, miles destellan al mismo tiempo. Cada una adelanta o atrasa un poco su destello para acercarse al de sus vecinas.
- La que va a destiempo se nota de inmediato.
- Lo de depredador es inventado.

## En el juego

Tapa un paso angosto y destella a su pulso. El protagonista brilla al pulso de la perilla: si van juntos durante dos compases, la nube se calma y sube. Si entra a destiempo, lo atrapa.

## Mecánicas

- **Destellar a su pulso:** La nube destella junta a un pulso propio.
- **Calmarse al igualar:** Si el pulso del jugador se parece al suyo por dos compases, se calma y abre el paso.
- **Alborotarse:** Si el jugador se acerca a destiempo, se agita.
- **Atrapar:** Si el jugador entra sin que esté calmado, lo atrapa.

## Vida

- **Dónde vive:** Zonas húmedas y pasos angostos donde el aire está quieto. Las larvas viven bajo tierra.
- **Cuándo sale:** Solo al atardecer y de noche.
- **Qué come:** Carnívoro. Base real: las larvas de luciérnaga comen caracoles y babosas. Los adultos de esta especie cazan a la especie del protagonista: la reconocen porque su luz va a otro ritmo.
- **Con quién vive:** Enjambre: miles de individuos que destellan juntos. Ninguno manda; cada uno se ajusta a sus vecinos.
- **Crías:** Larva bajo tierra la mayor parte de su vida; de adulto vive poco y casi solo para reproducirse.
- **Cómo suena:** No hace sonido: se comunica con luz. Detecta lo que va fuera de ritmo, venga de donde venga.
- **Con otras especies:** Depredador especialista del protagonista. A las tribus no las toca, por eso pueden hacer ruido sin peligro.

## Estados

- A su pulso (el jugador lejos).
- Alborotado (el jugador cerca y a destiempo).
- Calmado (dos compases a tiempo): abre el paso.

## Datos

- `ppmPropio`: 72 a 132 ppm (uno por enjambre)
- `tolerancia`: ±4 ppm (la dificultad)
- `compasesParaCalmarse`: 2 compases
- `radioAlboroto`: 4.4 tiles

## Riesgos

- Que igualar el ritmo se sienta como adivinar. Ayudan las dos luces a la vista y una barra de «qué tan cerca».


# El que siente el suelo

Depredador · zona 1 · Ritmo · estado: **propuesta** · Semana 8 (11 a 17 ene.)

Un cazador bajo tierra que sigue las vibraciones graves. Lo atraen los golpes del bombo y no le importa el hi-hat.

**Enseña:** Graves contra agudos

**Se inspira en:** Escorpiones de arena y topos dorados

## Lo real

- Escorpiones de arena: sienten con sensores en las patas las vibraciones de un insecto en la arena y saben hacia dónde está.
- Topos dorados (Namibia): meten la cabeza en la arena para sentir el zumbido de las termitas.
- Las vibraciones graves viajan bien por el suelo y las agudas se apagan pronto.

## En el juego

Duerme bajo el camino. Si pasas corriendo cerca, siente tus pasos y te caza; caminando despacio, no. Un golpe grave lejos lo lleva hacia allá.

## Mecánicas

- **Sentir lo grave:** Solo hace caso a los avisos graves; mientras más fuerte, desde más lejos.
- **Ir al golpe:** Va bajo tierra hacia el último golpe grave.
- **Cazar y morder:** Si el golpe fue del jugador, lo sigue y muerde.

## Vida

- **Dónde vive:** Bajo tierra, en suelos de arena y laterita suelta, cerca de las madrigueras del bombo.
- **Cuándo sale:** Nocturno. Base real: los escorpiones brillan bajo la luz ultravioleta; en el juego brilla bajo la luna, y mientras más crece la luna, más se le ve.
- **Qué come:** Cazador de lo que se mueve en el suelo. Base real: los escorpiones de arena encuentran insectos por la vibración en la arena, sin verlos.
- **Con quién vive:** Solitario y territorial.
- **Crías:** Base real: las crías de escorpión viajan en la espalda de la madre hasta su primera muda.
- **Cómo suena:** No oye por el aire: siente las vibraciones del suelo con sensores en las patas. Sabe hacia dónde vino el golpe y qué tan fuerte fue.
- **Con otras especies:** Sigue los golpes del bombo, pero el bombo no es su presa. Caza a la especie del protagonista.

## Estados

- Dormido.
- Buscando: va hacia el último golpe grave; se duerme si no oye nada en 1.4 s.
- Cazando: sigue al jugador.
- Sale: muerde.

## Datos

- `alcancePorFuerza`: 25 tiles × fuerza (un golpe de fuerza 1 se siente a 25 tiles)
- `velocidad`: 4.5 tiles/s
- `distanciaMordida`: 0.4 tiles
- `tiempoParaDormir`: 1.4 s
- `soloOye`: grave

## Riesgos

- La semana 8 queda apretada. Si se atrasa, solo sigue al bombo (sin pasos) o pasa al margen de la semana 12.


# Cazador de oído

Depredador · zona 4 · La mezcla · estado: **fuera de la 1.0** · Después de la 1.0 (o zona 4 si sobra el margen de la semana 22)

Es ciego y caza por sonido. Hay que tocar suave o hacer que una tribu suene en otro lado.

**Enseña:** Volumen

**Se inspira en:** Murciélagos y búhos

## Notas

Pide sonar más o menos fuerte; la zona 1 se juega con el pulso.

# Imitador

Depredador · zona 2 · Melodía · estado: **idea** · Semana 18

Copia el brillo de tu especie o el ritmo de una tribu para atraerte, un poco fuera de tiempo o desafinado.

**Enseña:** Entrenar el oído

**Se inspira en:** Luciérnagas impostoras y ave lira


# El que llega con el escándalo

Depredador · zona 3 · Armonía · estado: **idea** · Semana 19

Solo aparece cuando hay demasiadas capas fuertes a la vez.

**Enseña:** No saturar

**Se inspira en:** Depredadores que espían el canto


# Fauna del eco

Neutra · todas las zonas · estado: **fuera de la 1.0** · Después de la 1.0

Criaturas con caparazón que rebotan el sonido hacia donde no viaja.

**Enseña:** Cómo viaja el sonido

**Se inspira en:** Superficies que reflejan el sonido

## Notas

La frontera de tierra muerta hacia la zona 2 va como pasillo corto en la semana 17, sin esta fauna.

# Reloj musical

Sistema · todas las zonas · estado: **aprobada** · Semana 5 (21 a 27 dic.)

Un solo reloj marca el pulso de todo el juego: el sonido, las criaturas, las luces y las partículas.

**Enseña:** El pulso

## En el juego

Avisa cada pulso y cada pedazo del pulso. Todo lo que se mueve a tiempo lo escucha, así nada se desfasa.

## Mecánicas

- **Marcar el pulso:** Avisa cada pulso y cada pedazo del pulso.

## Datos

- `ppm`: 96 ppm (lo cambia la perilla del pulso)
- `pulsosPorCompas`: 4
- `pedazosPorPulso`: 4 (los avisa todos; cada criatura escucha los que usa)

## Notas

Decidido el 23 nov.: un solo reloj musical mueve el sonido, las luces y las partículas.

# Aviso «sonó algo»

Sistema · todas las zonas · estado: **propuesta** · Semana 6, con el bombo

Un solo aviso que manda todo lo que suena y que cualquier criatura puede escuchar. Así un depredador nuevo es casi solo datos.

**Enseña:** Cómo se comunican las cosas

## En el juego

Cada vez que algo suena manda un aviso con dónde, qué tan grave o agudo y qué tan fuerte. Cada criatura decide si le importa.

## Mecánicas

- **Mandar y escuchar el aviso:** Todo lo que suena manda un aviso; cada criatura decide si le importa.

## Datos

- `posicion`: Vector2 tiles
- `altura`: grave | medio | agudo
- `fuerza`: 0 a 1
- `fuente`: texto
- `esDelJugador`: sí / no

## Notas

La sala sin sonido es una regla de este aviso, no de cada criatura.

# Perilla del pulso

Sistema · zona 1 · Ritmo · estado: **aprobada** · Semana 5, con el reloj

En la zona 1 el sintonizador ajusta el pulso: si va más rápido, los golpes se juntan; si va más lento, se separan.

**Enseña:** Tempo

## En el juego

El protagonista siente el pulso del mundo y lo devuelve a la tribu girando esta perilla. La perilla de frecuencia es de la zona 2.

## Mecánicas

- **Girar el pulso:** El jugador sube o baja los pulsos por minuto.

## Datos

- `ppmMin`: 60 ppm
- `ppmMax`: 160 ppm

## Notas

Aprobada el 27 nov.: la zona 1 se juega con el pulso y la frecuencia es de la zona 2.

# Brillar y dirigir con luz

Sistema · todas las zonas · estado: **aprobada**

El protagonista brilla con una tecla en cada golpe: así se juegan los minijuegos. Con las piezas que aprende puede dirigir con su luz a la tribu para armar piezas por capas.

**Enseña:** Tocar a tiempo y armar una pieza por capas

**Se inspira en:** La historia: el protagonista no tiene voz, se comunica destellando y dirige a las tribus

## Lo real

- En los ensambles de tambores de África occidental, el tambor guía toca una «llamada» para que el grupo entre, cambie o pare.
- Los pedales de loop de los músicos graban una frase y la repiten en bucle para tocar encima.
- Un coro de grillos tapa los sonidos chicos de alrededor (enmascaramiento).
- Efecto de confusión: cuando muchos se mueven a la vez, el depredador no logra fijarse en uno (cardúmenes, parvadas).

## En el juego

- La tecla toca: el protagonista brilla en cada golpe que presiona el jugador. La perilla del pulso da la velocidad del mundo. Como en una banda: el baterista toca y el director marca la velocidad.
- Dirigir: apunta su luz a un miembro y toca su pieza con la tecla; el miembro la repite en bucle y se suma a la música. Luego otro y otra capa: bombo, caja, hi-hat. Si una capa está mal, la quita y la vuelve a tocar.
- Solo puede dirigir piezas que ya aprendió, y a criaturas que ya están en el mundo: no llama a nadie.
- Sirve en todo el mundo. De noche, los hi-hats que viven ahí, dirigidos a tu pulso, te esconden; dirigidos a destiempo, saltan todos a la vez y confunden al depredador. No sirve contra el que siente el suelo, porque lo agudo no viaja por la tierra. De día, diriges al bombo de una madriguera cercana para que golpee lejos y el que siente el suelo se vaya hacia allá.

## Mecánicas

- **Brillar con la tecla:** El protagonista brilla en cada golpe que el jugador presiona.
- **Dirigir una capa:** Apunta a un miembro, toca su pieza y la repite en bucle.

## Notas

Aprobado el 27 nov.

# Ser presa

Regla · todas las zonas · estado: **aprobada** · Semana 8

Una vida, sin daño: si un depredador atrapa al protagonista, vuelve al último checkpoint. Caer debe dar ganas de volver a intentar, no miedo.

**Enseña:** Volver a intentar con lo que oíste

## En el juego

El protagonista no se defiende ni tiene barra de vida. Si lo atrapan, la pantalla se apaga a gris un momento y aparece en el último checkpoint que tocó. La dificultad se ajusta con la distancia entre checkpoints: lejos es más difícil, cerca es más fácil. Al caer se rompen las piezas para llevar que no estén a salvo (las que no has llevado a un hueco ni entregado). Lo aprendido y el oído nunca se pierden.

## Mecánicas

- **Volver al último checkpoint:** Si lo atrapan, reaparece en el último checkpoint que tocó.

## Datos

- `tiempoRegreso`: 0.5 s

## Notas

Decidido el 27 nov. (opción C del debate). Qué se pierde al caer: las piezas para llevar que no estén a salvo (27 nov.).

# Checkpoint

Sistema · todas las zonas · estado: **aprobada** · Semana 8 (con ser presa); se guarda en la semana 11

Los checkpoints son huecos que resuenan, donde duerme el protagonista. Al tocar uno se vuelve tu punto de regreso; dormir ahí cambia la hora del día.

**Enseña:** Volver a intentar

**Se inspira en:** La vida del protagonista: duerme en huecos que resuenan

## En el juego

Son los huecos donde duerme el protagonista (troncos, conchas y grietas que resuenan), porque ahí siente mejor el pulso del mundo. Al pasar junto a uno se vuelve el punto de regreso y las piezas para llevar que cargas quedan a salvo. Si duermes ahí, eliges a qué hora despertar. Se colocan a mano en cada sala: lejos entre sí para lo difícil, cerca para lo fácil.

## Mecánicas

- **Activar checkpoint:** Tocarlo lo vuelve el punto de regreso y pone a salvo lo que cargas.
- **Dormir:** Dormir en el hueco cambia la hora del día.

## Estados

- Inactivo (gris).
- Activo: es el punto de regreso.

## Riesgos

- Colocarlos bien pide probar cada sala; se hace en la semana 9, junto con las salas.

## Notas

Aprobado el 27 nov.: huecos que resuenan en vez de miembros de la tribu.

# Sala donde el sonido no viaja

Obstáculo · zona 1 · Ritmo · estado: **propuesta** · Semana 9 (una o dos salas)

Un área donde los avisos no entran ni salen. Refugio y obstáculo a la vez.

**Enseña:** El sonido necesita algo por donde viajar

## Lo real

- El sonido necesita aire, agua o algo sólido para viajar; en el vacío no se oye nada.
- Hay cuevas y cuartos que se «tragan» el eco porque sus paredes absorben el sonido.

## En el juego

Adentro no oyes al bombo de afuera, y el que siente el suelo no te oye a ti. La sala queda gris y apagada. Una o dos salas en la semana 9.

## Mecánicas

- **Cortar los avisos:** Dentro del área los avisos no entran ni salen.


# Confianza de la tribu

Sistema · zona 1 · Ritmo · estado: **propuesta** · Semana 7

No confían en un extraño sin voz. Se supera aprendiendo sus piezas.

**Enseña:** Las piezas del ritmo

## En el juego

Cada miembro te enseña su pieza con un minijuego. Mientras no confían, tapan el camino; cuando confían, se hacen a un lado y su pieza se une a la música.

## Mecánicas

- **Ganar confianza:** Por cada pieza aprendida en un minijuego, la tribu confía más.

## Datos

- `confianza`: 0 a 3 piezas aprendidas


# Oído (experiencia)

Progresión · todas las zonas · estado: **aprobada**

El oído del protagonista en ritmo, melodía y armonía. Sube según qué tan a tiempo o afinado lo hiciste, no por terminar, y nunca baja.

**Enseña:** Que practicar mejora el oído

## Lo real

- Practicar entrena el oído: los músicos distinguen diferencias de tiempo y de tono que otras personas no notan.

## En el juego

No es un número de nivel: es el oído del protagonista.
- Se gana por precisión: hacerlo limpio da mucho; repetir algo fácil casi no da. Nunca baja.
- Con más oído oye más: ritmos escondidos en salas grises, música lejana detrás de las paredes, el pulso propio de un enjambre.
- Con más oído ve menos ayuda: las ayudas visuales del pulso se van apagando, porque el juego confía en que ya escuchas. El oído crece y las muletas se van.
- No hay números en pantalla: la luz del protagonista gana anillos o capas, y en el caracol cada concepto tiene una raíz del árbol de los ritmos que crece.
- Un oído por zona: ritmo (zona 1), melodía (zona 2) y armonía (zona 3). La zona 4, la mezcla, sube los tres.

## Mecánicas

- **Ganar oído:** Completar un desafío sube el oído del concepto que se practicó, según la precisión.
- **Oír más, ver menos ayuda:** Con más oído aparecen sonidos escondidos y se apagan las ayudas visuales del pulso.

## Notas

Aprobado el 27 nov. Base para la validación: la telemetría compara el oído de cada concepto con su parte del examen.

# Regalos de la tribu

Progresión · todas las zonas · estado: **aprobada**

Cada miembro de la tribu da algo en escalera: su pieza al confiar, su regalo al hacerle un favor, un cambio en el mundo cuando confía toda la tribu y un adorno por un reto difícil.

**Enseña:** Que cada pieza del ritmo hace algo distinto

## Lo real

- Mutualismo: el pájaro indicador de miel guía a las personas a la colmena y ellas le dejan la cera; cada uno da algo a cambio.

## En el juego

La escalera de cada miembro:
1. Al aprender su pieza (su minijuego) confía en ti y te llevas su pieza para llevar a otras tribus.
2. Al hacerle un favor que sale de cómo vive, te da su regalo.
3. Cuando toda la tribu confía, cambia el mundo: se muda a un lugar nuevo, abre un atajo o llena un lugar de música.
4. La apariencia (piel o adorno, con las skins) es un premio opcional por tocar su pieza casi perfecta.
Regla: el favor da lo que tenga sentido para la especie. Solo da habilidad si sale de cómo se mueve; no todos regalan una. Pocas habilidades, pero que sirvan en todo el mundo.
Favores de la zona 1: el bombo y la caja comparten «La cosecha»; el hi-hat pide que lleves al coro a un lugar tibio para cantar.

## Mecánicas

- **Recibir un regalo:** Al hacerle su favor a un miembro que ya confía, te da su regalo.

## Notas

Aprobado el 27 nov. Falta decidir qué da el hi-hat por su favor (no da habilidad).

# La cosecha

Progresión · zona 1 · Ritmo · estado: **aprobada**

El favor que comparten el bombo y la caja: el bombo sacude un árbol a su ritmo para que caiga la fruta y la caja escucha en el 2 y el 4 dónde hay insectos.

**Enseña:** Resonancia, y por qué el bombo y la caja se alternan

**Se inspira en:** La vida del bombo (come semillas) y de la caja (busca insectos en la corteza)

## Lo real

- Las aceitunas y las almendras se cosechan con máquinas que sacuden el tronco; los elefantes sacuden árboles para tirar la fruta.
- Cada árbol se mece a su propio ritmo; empujones chicos a ese ritmo se suman (resonancia).
- El aye-aye golpea la madera y escucha el eco para encontrar larvas; los pájaros carpinteros también.
- Un sonido fuerte tapa a uno suave mientras suena y hasta un momento después (enmascaramiento).
- En la música, el bombo y la caja se alternan para que se oigan los dos.

## En el juego

- Bombo: golpea las raíces al ritmo propio de cada árbol. Si el árbol es grueso y bajo, se mece rápido; si es alto y delgado, lento. Si los golpes van a su ritmo, se suman como empujar un columpio y caen los frutos; si van a otro ritmo, se estorban y el árbol ni se mueve. El bombo no encuentra solo el ritmo del árbol: el protagonista se lo da con la perilla del pulso.
- Caja: golpea el tronco en el 2 y el 4 y escucha. Un tronco hueco contesta con un eco que dura un ratito (ahí hay túneles con insectos); uno sólido solo hace «tok». Temprano, el bum del bombo todavía suena y tapa tu golpe. Tarde, tu golpe se oye, pero el siguiente bombo cae encima del eco y no sabes si hay insectos. En el 2 y el 4 caben tu golpe y el eco.
- Al terminar, el bombo te da el Pisotón y la caja el Eco hueco.

## Notas

Aprobado el 27 nov. como base; se afina al diseñar los puzzles.

# Habilidades del protagonista

Progresión · todas las zonas · estado: **aprobada**

Las formas nuevas de moverse que dan algunos miembros de la tribu. Pocas, y cada una sirve en todo el mundo. Todas rinden más a tiempo con el pulso.

**Enseña:** Cada concepto musical es una forma de moverse

## En el juego

Regla: fuera de tiempo funcionan poquito; a tiempo, completas. Moverse bien es tocar bien, y la precisión da oído.
Zona 1:
- Pisotón (regalo del bombo): golpe grave al caer. Activa plataformas de bombo, atrae al que siente el suelo y rompe suelo frágil. A tiempo suena más grave y rompe más.
- Eco hueco (regalo de la caja): golpeas una pared o un tronco; si está hueco suena un eco largo, el hueco se ilumina un momento con la forma del túnel y se puede abrir. Si es sólido, solo suena «tok». Sirve para encontrar salas escondidas al volver a zonas viejas. A tiempo se oye más lejos.
El hi-hat no da habilidad. Referencia: los juegos de explorar tienen unas 8 a 12 habilidades en todo el juego.

## Mecánicas

- **Usar una habilidad:** Cada habilidad es una mecánica del protagonista que se agrega a su ficha al recibirla.

## Riesgos

- Cada habilidad pide salas pensadas para ella; se diseña junto con los puzzles.

## Notas

Aprobado el 27 nov. El Salto en pedazos se quitó: el hi-hat no da habilidad. El Eco hueco ya no vuelve sólido lo hueco: lo revela.

# Explorar el mundo

Mundo · todas las zonas · estado: **aprobada**

El caracol está al centro y cada zona sale de él. El camino principal va en orden, pero hay atajos entre zonas y salas grises que se abren al volver con algo nuevo.

**Enseña:** Curiosidad: que se oiga antes de verse

## En el juego

- El camino principal va en orden (ritmo, melodía, armonía, mezcla) porque cada concepto se apoya en el anterior.
- Hay atajos escondidos entre zonas vecinas que solo se abren con lo aprendido en otra, y salas grises opcionales por todos lados.
- Lo que abre caminos: una habilidad (Pisotón, Eco hueco), más oído (oír lo escondido), dirigir con luz lo que ya hay en la sala o llevar una pieza a otra tribu.
- La hora del día cambia qué hay en cada sala (ver «Hora del día»).
- Ya está en la historia, «guiar sin presionar»: el camino principal suena y tiene color; los opcionales están grises y en silencio. La música detrás de las paredes jala a explorar.

## Mecánicas

- **Volver con algo nuevo:** Un camino cerrado se abre al volver con lo que pide.

## Notas

Aprobado el 27 nov.

# Hora del día

Mundo · todas las zonas · estado: **aprobada**

Hay cuatro momentos: amanecer, día, atardecer y noche. La hora no corre sola: cambia al dormir en un hueco, y algunas misiones la fijan.

**Enseña:** Que cada especie tiene su momento

**Se inspira en:** La vida de cada especie (sección «Vida» del bestiario)

## En el juego

- Al dormir en un hueco que resuena eliges a qué momento despertar.
- Cada sala cambia según la hora: quién está, quién caza y qué se puede dirigir. El atardecer importa mucho: ahí salen el bombo, el enjambre y el protagonista.
- Algunas misiones o favores fijan la hora (por ejemplo, uno que pasa justo al oscurecer).

## Mecánicas

- **Cambiar la hora:** Dormir o una misión cambian el momento del día.

## Notas

Aprobado el 27 nov.

# Llevar música entre tribus

Mundo · todas las zonas · estado: **idea**

El protagonista lleva un ritmo de una tribu a otra; la tribu lo mezcla con lo suyo y aparece algo nuevo.

**Enseña:** Así nacen los géneros: mezclando piezas

## Lo real

- El canto de las ballenas jorobadas pasa de una población a otra: en pocos años cruza el Pacífico sur de oeste a este.

## En el juego

Ya está en la historia: la especie del protagonista lleva y trae música entre tribus para que siga viva. Si llevas una pieza de una zona a otra, aparece algo nuevo: una criatura, un camino o un ritmo. Así el jugador hace las mezclas en vez de solo verlas.
Aprobado el 27 nov.:
- La pieza aprendida es conocimiento: nunca se pierde y siempre la puedes tocar con tu luz.
- La pieza para llevar es un objeto: la tribu te da su sonido guardado en algo hueco que resuena (una concha, una semilla hueca).
- Puedes cargar varias a la vez.
- Al tocar un hueco (checkpoint) quedan a salvo, aunque sigues cargándolas; se entregan de verdad con la tribu que las mezcla.
- Si te atrapan, se rompen las que no estén a salvo y vuelves por otras.

## Notas

Falta decidir qué sale de cada mezcla. Relacionada con la decisión pendiente del 26 nov. sobre los géneros como recetas de piezas.

# Árbol de los ritmos

Progresión · todas las zonas · estado: **aprobada** · Semana 11, con el guardado

En el caracol crece un árbol que se llena con cada pieza y cada receta de género que encuentras.

**Enseña:** La historia real de la música

## En el juego

Va de los tambores de África occidental a la salsa, el rap y el reggaetón. Da ganas de explorar para completarlo.

## Notas

Aprobado el 26 nov.

# Pulsos (coleccionables)

Progresión · todas las zonas · estado: **aprobada**

Lugares donde se escucha el mundo. Cuentan historia real: de dónde vienen los ritmos y cómo usa la naturaleza el sonido.

**Enseña:** Historia de la música y del sonido

## En el juego

Están en ramas opcionales (2 o 3 por zona). Dan oído (experiencia) y llenan el árbol de los ritmos.

## Mecánicas

- **Encontrar un pulso:** Al tocarlo se escucha su historia.


# Mapa que se dibuja

Mundo · todas las zonas · estado: **idea**

El mapa se va dibujando conforme exploras; es un premio, no algo que se da al inicio.

**Enseña:** Orientarse por el sonido

## En el juego

Idea de la historia («ideas para después»). Las salas con música aparecen con color; las grises, como bocetos.


# Tribus que se tapan

Obstáculo · zona 3 · Armonía · estado: **idea**

Al juntarse quieren lucirse. Hay que enseñarles a dejarse espacio.

**Enseña:** No saturar

