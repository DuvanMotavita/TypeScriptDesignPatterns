/**
 * ! Patrón Strategy
 *
 * El patrón Strategy es un patrón de diseño de software que define una
 * familia de algoritmos, los encapsula y los hace intercambiables.
 *
 *
 * * Es útil cuando se tiene una clase que tiene un comportamiento que puede
 * * cambiar en tiempo de ejecución y se quiere delegar la responsabilidad de
 * * la implementación a otra clase.
 *
 * https://refactoring.guru/es/design-patterns/strategy
 */

import { COLORS } from "../helpers/colors.ts";

/**
 * !Objetivo: Explicar el patrón Strategy usando un ejemplo donde varios
 * ! patitos compiten en una carrera y cada uno tiene su propia
 * ! estrategia de movimiento (por ejemplo, nadar, volar o caminar).
 */

interface MovementStrategy {
  move(): void;
}


// Estrategia 1 - Nadar - rapida pero costosa
class SwimStrategy implements MovementStrategy {
  move(): void {
    console.log('%cEl patito está nadando.\n',COLORS.blue);
  }
}
// Estrategia 2 - Volar -no tan rapida pero no tan costosa
class FlyStrategy implements MovementStrategy {
  move(): void {
    console.log('%cEl patito está volando.\n',COLORS.pink);
  }
}
// Estrategia 3 - Caminar - lenta pero economica
class WalkClumsy implements MovementStrategy {
  move(): void {
    console.log('%cEl patito está caminando.\n',COLORS.green);
  }
}

// Consumir las estrategias
class Duck {
    private name: string;
    private movementStrategy: MovementStrategy;

    constructor(name: string, movementStrategy: MovementStrategy) {
        this.name = name;
        this.movementStrategy = movementStrategy;
        console.log(`%c${this.name} %ccreado con estrategia de movimiento: ${this.movementStrategy.constructor.name}`, COLORS.green, COLORS.white);
    }

    performMove(): void {
        console.log(`%c${this.name} se prepara para moverse...`, COLORS.yellow);
        this.movementStrategy.move();
    }
    setMovementStrategy(movementStrategy: MovementStrategy): void {
        this.movementStrategy = movementStrategy;
        console.log(`%c${this.name} ha cambiado su estrategia de movimiento a: ${this.movementStrategy.constructor.name}`, COLORS.orange);
    }

}

function main(){

    const duck1 = new Duck('Patito rapido', new SwimStrategy());
    const duck2 = new Duck('Patito volador', new FlyStrategy());
    const duck3 = new Duck('Patito torpe', new WalkClumsy());

    console.log('%cComienza la carrera de patitos!', COLORS.red);
    duck1.performMove();
    duck2.performMove();
    duck3.performMove();

    duck3.setMovementStrategy(new FlyStrategy());
    duck3.performMove();

    duck3.setMovementStrategy(new SwimStrategy());
    duck3.performMove();

}

main();