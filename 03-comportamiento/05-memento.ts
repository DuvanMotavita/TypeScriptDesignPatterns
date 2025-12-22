/**
 * !Patrón Memento
 * Permite capturar y externalizar un estado interno de un objeto,
 * de manera que el objeto pueda ser restaurado a ese estado más tarde.
 *
 * * Es útil cuando se necesita guardar el estado de un objeto para poder
 * * volver a él en un futuro.
 *
 * https://refactoring.guru/es/design-patterns/memento
 */

import { COLORS } from "../helpers/colors.ts";

class GameMemento{
    private level: number;
    private health: number;
    private position: string;

    constructor(level: number, health: number, position: string){
        this.level = level;
        this.health = health;
        this.position = position;
    }
    getLevel(): number{
        return this.level;
    }
    getHealth(): number{
        return this.health;
    }
    getPosition(): string{
        return this.position;
    }
}

class Game {
    private level: number = 1;
    private health: number = 100;
    private position: string = "Inicio";

    constructor(){
        console.log(`Jugando en el nivel ${this.level} con salud ${this.health} en la posición ${this.position}`);
    }

    save(): GameMemento{
        return new GameMemento(this.level, this.health, this.position);
    }
    play(level: number, health: number, position: string): void{
        this.level = level;
        this.health = health;
        this.position = position;

        console.log(`Jugando en el nivel ${this.level} con salud ${this.health} en la posición ${this.position}`);
    }
    restore(memento: GameMemento): void{
        this.level = memento.getLevel();
        this.health = memento.getHealth();
        this.position = memento.getPosition();

        console.log(`%cJuego restaurado al nivel ${this.level} con salud ${this.health} en la posición ${this.position}`,COLORS.yellow);
    }
}

class GameHistory{
    private mementos: GameMemento[] = [];

    push(memento: GameMemento): void{
        this.mementos.push(memento);
    }
    pop(): GameMemento | null{
        return this.mementos.pop() ?? null; 
    }

}

function main(){
    const game = new Game();
    const history = new GameHistory();

    history.push(game.save());
    //Player start a game and advance to level 2
    game.play(2, 90, "Bosque Encantado");
    history.push(game.save());
    
    //Player advance to level 3
    game.play(3, 80, "Cueva Oscura");
    history.push(game.save());
    
    //Player advance to level 4
    game.play(4, 70, "Castillo Abandonado");
    console.log(`%c\nEstado actual`, COLORS.green);
    
    game.restore(history.pop()!);
    console.log(`%c\nDespues de restaurar ultimo estado`, COLORS.green);
    
    game.restore(history.pop()!);
    console.log(`%c\nDespues de restaurar ultimo estado`, COLORS.green);
    console.log("\n\n");
}
main();
