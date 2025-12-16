/**
 * ! Patrón Proxy
 * Este patrón se utiliza para controlar el acceso a un objeto, es decir,
 * se crea un objeto que actúa como intermediario entre el cliente y el objeto real.
 *
 * * Es útil cuando necesitamos controlar el acceso a un objeto,
 * * por ejemplo, para verificar si el cliente tiene permiso
 * * para acceder a ciertos métodos o propiedades.
 *
 * https://refactoring.guru/es/design-patterns/proxy
 *
 */

import { COLORS } from "../helpers/colors.ts";

class Player {
    name: string;
    level: number;
    constructor(name: string, level: number) {
        this.name = name;
        this.level = level;
    }
}

interface Room {
    enter(player: Player): void;
}

class SecretRoom implements Room {
    enter(player: Player): void {
        console.log(`%c${player.name} ha entrado en la sala secreta`, COLORS.blue);
        console.log(`Un gran enemigo te espera`);
    }
}

//3. Class Proxy    - Magic Portal

class MagicPortal implements Room {
    private secretRoom: Room;
    constructor(room: Room) {
        this.secretRoom = room;
    }
    enter(player: Player): void {
        if (player.level >= 10) {
            this.secretRoom.enter(player);
            return;
        }
        console.log(`%c${player.name} no tiene el nivel suficiente para entrar en la sala secreta`, COLORS.red);
    }
}

function main(){
    const portal = new MagicPortal(new SecretRoom());
    const player1 = new Player("HeroA", 5);
    const player2 = new Player("HeroB", 15);
    console.log("%cIntentando entrar en la sala secreta con player1", COLORS.blue);
    portal.enter(player1);
    console.log("%c\nIntentando entrar en la sala secreta con player2", COLORS.blue);
    portal.enter(player2);
}
main();
