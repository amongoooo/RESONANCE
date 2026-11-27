# Los 5 bloques de una mecánica
editado: 2026-11-26
etiquetas: diseño, mecánicas, unity

Cualquier mecánica se arma combinando cinco bloques. Antes de programar una, escribo qué hace en cada bloque: así se ve qué falta y qué se puede reusar entre mecánicas. No toda mecánica usa los cinco. Salió de un video y quedó como regla el 26 de noviembre.

## Los cinco bloques

1. **Entrada:** cómo la controla o la dispara el jugador (un botón, una perilla, pararse encima) o algo del mundo (el reloj, un temporizador).
2. **Detección:** cómo un objeto se entera de lo que pasa a su alrededor (quién lo toca, quién está cerca, qué está sonando).
3. **Estado y lógica:** las reglas y lo que recuerda (abierto o cerrado, sonando o en silencio, en qué pulso va).
4. **Transformación:** cómo se mueve, cambia de aspecto o de estado físico (rebota, se hunde, gana color, empuja).
5. **Comunicación:** cómo se avisan los objetos entre sí: una referencia directa (este objeto conoce a aquel), una señal que cualquiera puede escuchar (un evento) o una llamada.

## Ejemplo: el bombo de la tribu del ritmo

El bombo es la pieza grave de la zona 1: golpea el suelo a tiempo con el reloj (semana 6, del 28 dic. al 3 ene.). Este desglose es un ejemplo para pensar, no el diseño final.

- **Entrada:** no lo dispara un botón, lo dispara el reloj musical. El jugador entra en juego al pararse encima o junto a él.
- **Detección:** sabe en qué pulso va el reloj y si el jugador está en su zona de golpe (un collider en modo trigger).
- **Estado y lógica:** recuerda si está en silencio (gris) o ya sonando y en qué pulso del compás va. La regla: golpea en el «1»; si el jugador está encima en ese momento, lo lanza hacia arriba.
- **Transformación:** se aplasta y rebota, el suelo tiembla un poco y gana color cuando suena; al jugador lo empuja hacia arriba.
- **Comunicación:** escucha el aviso del reloj («llegó un pulso») y, al golpear, manda su propio aviso («el bombo golpeó») para que lo oigan las criaturas, la cámara (una sacudida chica) y la telemetría. Cuántos golpes y en qué pulsos sale de los datos del ritmo (un ScriptableObject), no del código.

## Qué se reusa

- El aviso del reloj sirve igual para la caja, el hi-hat y el patrón de campana: cambia el pulso en que golpean, no el código.
- «Lanzar al jugador hacia arriba» es la misma transformación que puede usar cualquier plataforma que rebote.
- Si una mecánica nueva no cabe en estos cinco bloques, probablemente son dos mecánicas.
