/**
 * ! Singleton:
 * Es un patrón de diseño creacional que garantiza que una clase
 * tenga una única instancia y proporciona un punto de acceso global a ella.
 *
 * * Es útil cuando necesitas controlar el acceso a una única instancia
 * * de una clase, como por ejemplo, en un objeto de base de datos o en un
 * * objeto de configuración.
 *
 * https://refactoring.guru/es/design-patterns/singleton
 */

import { COLORS } from "../helpers/colors.ts";

class DragonBalls {

    private static instance: DragonBalls | null = null;
    private ballsCollected: number = 0;
    private constructor() {
        this.ballsCollected = 0;
    }

    public static getInstance(): DragonBalls {
        if (!DragonBalls.instance) {
            DragonBalls.instance = new DragonBalls();
            console.log('%cNew DragonBalls instance created', COLORS.green);
        }
        return DragonBalls.instance;
    }

    collectBall(): void {
        if(this.ballsCollected < 7){
            this.ballsCollected++;
            console.log(`%cBall collected! Total: ${this.ballsCollected}`, COLORS.yellow);
            return;
        }
        console.log('%cAll 7 balls already collected!', COLORS.red);
    }

    summonShenLong():void{
        if(this.ballsCollected === 7){
            console.log('%cShen Long has been summoned!', COLORS.cyan);
            this.ballsCollected = 0;
            console.log('%cThe dragon balls have scattered again.', COLORS.cyan);
            return;
        }
        console.log(`%cYou need ${7 - this.ballsCollected} more balls to summon Shen Long.\n`, COLORS.red);
    }
}

function main(): void{
    const gokuDragonBall = DragonBalls.getInstance();
    gokuDragonBall.collectBall();
    gokuDragonBall.collectBall();
    gokuDragonBall.collectBall();
    gokuDragonBall.summonShenLong();

    const vegetaDragonBall = DragonBalls.getInstance();
    vegetaDragonBall.collectBall();
    vegetaDragonBall.collectBall();
    vegetaDragonBall.collectBall();
    vegetaDragonBall.collectBall();
    vegetaDragonBall.collectBall();
    gokuDragonBall.summonShenLong();
}

main();