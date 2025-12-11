/**
 * ! Patrón Bridge
 * Este patrón nos permite desacoplar una abstracción de su implementación,
 * de tal forma que ambas puedan variar independientemente.
 *
 * * Es útil cuando se tienen múltiples implementaciones de una abstracción
 * * Se puede utilizar para separar la lógica de negocio de la lógica de presentación
 * * Se puede utilizar para separar la lógica de la interfaz de usuario también.
 *
 * https://refactoring.guru/es/design-patterns/bridge
 */

import { COLORS } from "../helpers/colors.ts";


interface Ability {
    use(): void;
}

class SwordAttack implements Ability {
    use(): void {
        console.log("Using %csword attack!", COLORS.blue);
    }
}

class AxeAttack implements Ability {
    use(): void {
        console.log("Using %caxe attack!", COLORS.red);
    }
}

class MagicSpell implements Ability {
    use(): void {
        console.log("Using %cmagic spell!", COLORS.green);
    }
}

class FireBallSpell implements Ability {
    use(): void {
        console.log("Using %cmagic fireball spell!", COLORS.green);
    }
}

abstract class Character {
    protected ability: Ability;
    constructor(ability: Ability) {
        this.ability = ability;
    }
    setAbility(ability: Ability): void {
        this.ability = ability;
    }
    abstract performAbility(): void;
}

class Warrior extends Character {
    override performAbility(): void {
        console.log("Warrior ready to fight:");
        this.ability.use();
    }
}

class Mage extends Character {
    override performAbility(): void {
        console.log("\nMage ready to fight:");
        this.ability.use();
    }
}


function main(){
    const warrior = new Warrior(new SwordAttack());
    warrior.performAbility();
    warrior.setAbility(new AxeAttack());
    warrior.performAbility();

    const mage = new Mage(new FireBallSpell());
    mage.performAbility();
  

}
main();