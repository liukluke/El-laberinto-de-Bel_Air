# El laberinto de Bel Air

Juego hecho con html5 canvas.

https://liukluke.github.io/El-laberinto-de-Bel_Air/

## Propósito del juego

Ayuda a Will a alcanzar Bel-Air tratando de evitar al policía.

## Características del juego

Will se mueve con las flechas del teclado y el policía sigue automáticamente los movimientos del personaje. El laberinto tiene una sola salida.

## Técnica de implementación

El codigo utilizado por el movimento del policía sigue a Will con una función espejo: 

    if(positionPoliceX > positionWillX) {
        moveleft();
    }
    if(positionPoliceX < positionWillX) {
        moveRight();
    }
    if(positionPoliceY > positionWillY) {
        moveDown();
    }
    if(positionPoliceY < positionWillY) {
       moveUp();
    }

Para realizar el fondo con las caras que se "mueven" utilicé un segundo canvas. El laberinto está hecho con un array a dos dimensiones.  

