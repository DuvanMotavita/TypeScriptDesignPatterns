/**
 * ! Patrón State
 * Este patrón permite a un objeto cambiar su comportamiento
 * cuando su estado interno cambia.
 *
 * * Es útil cuando un objeto tiene un comportamiento que depende de su estado
 * * y debe cambiar su comportamiento en tiempo de ejecución dependiendo de ese estado.
 *
 * https://refactoring.guru/es/design-patterns/state
 */

import { COLORS } from "../helpers/colors.ts";
import { sleep } from "../helpers/sleep.ts";

/**
 * * Objetivo: Implementar el patrón State para simular el funcionamiento
 * * de una máquina expendedora.
 * * La máquina tiene diferentes estados,
 *  * Como Esperando Dinero,
 *  * Seleccionando Producto,
 *  * Entregando Producto,
 * * y su comportamiento varía dependiendo del estado actual.
 */


interface state {
    name: string

    inserMoney(): void;
    selectProduct(): void
    dispenseProduct(): void
}

class VendingMachine {
    private state: state;

    constructor() {
        this.state = new WaitingForMoneyState(this);
        console.log(`%cMáquina expendedora iniciada en el estado: ${this.state.name}`, COLORS.yellow);
    }

    insertMoney(): void {
        this.state.inserMoney();
    }

    selectProduct(): void {
        this.state.selectProduct();
    }

    dispenseProduct(): void {
        this.state.dispenseProduct();
    }

    setState(newState: state): void {
        this.state = newState;
        console.log(`%cEstado de la máquina cambiado a: ${newState.name}`, COLORS.yellow);
    }

    getStateName(): string {
        return this.state.name;
    }

}

class WaitingForMoneyState implements state {
    public name: string = 'WaitingForMoneyState';
    private vendingMachine: VendingMachine;

    constructor(vendingMachine: VendingMachine) {
        this.vendingMachine = vendingMachine;
    }

    inserMoney(): void {
        console.log("Dinero insertado. %cAhora puedes seleccionar el producto.",
            COLORS.green
        );
        this.vendingMachine.setState(new ProductSelected(this.vendingMachine));
    }
    selectProduct(): void {
        console.log("%cPor favor, inserta dinero primero.", COLORS.red);
    }
    dispenseProduct(): void {
        console.log("%cPor favor, inserta dinero y selecciona un producto primero.", COLORS.red);
    }
}

class ProductSelected implements state {
    public name: string = 'SelectingProductState';
    private vendingMachine: VendingMachine;

    constructor(vendingMachine: VendingMachine) {
        this.vendingMachine = vendingMachine;
    }

    inserMoney(): void {
        console.log("%cPor favor selecciona un producto. - dinero ya insertado", COLORS.red);
    }
    selectProduct(): void {
        this.vendingMachine.setState(new DispensingProduct(this.vendingMachine));
    }
    dispenseProduct(): void {
        console.log("%cPor favor selecciona un producto - antes de despacharlo", COLORS.red);
    }
}

class DispensingProduct implements state {
    public name: string = 'DispensingProductState';
    private vendingMachine: VendingMachine;

    constructor(vendingMachine: VendingMachine) {
        this.vendingMachine = vendingMachine;
    }

    inserMoney(): void {
        console.log("%cPor favor espera a que se entregue el producto. - dinero ya insertado", COLORS.red);
    }
    selectProduct(): void {
        console.log("%cProducto ya seleccionado y despachando", COLORS.red);
    }
    dispenseProduct(): void {
        console.log("%cProducto despachado. ¡Gracias por tu compra!", COLORS.green);
        this.vendingMachine.setState(new WaitingForMoneyState(this.vendingMachine));
    }
}


async function main() {
    const vendingMachine = new VendingMachine();
    let selectedOption: string | null = '';

    do {

        console.clear();
        console.log(`Selecciona una opción: %c${vendingMachine.getStateName()}`, COLORS.blue);
        selectedOption = prompt(`
            1. Insertar Dinero
            2. Seleccionar Producto
            3. Despachar Producto
            4. Salir
            opción:
            `);

        switch (selectedOption) {
            case '1':
                vendingMachine.insertMoney();
                break;
            case '2':
                vendingMachine.selectProduct();
                break;
            case '3':
                vendingMachine.dispenseProduct();
                break;
            case '4':
                console.log("Saliendo del programa.");
                break;
            default:
                console.log("Opción no válida. Inténtalo de nuevo.");
                break;
        }

       await sleep(3000);

    } while (selectedOption != '4');

}

main();



