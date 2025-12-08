/**
 * ! Patrón Builder:
 * Es un patrón de diseño creacional que nos permite construir objetos complejos
 * paso a paso.
 *
 * El patrón nos permite producir distintos tipos y representaciones
 * de un objeto empleando el mismo código de construcción.
 *
 * * Es útil cuando necesitamos construir un objeto complejo con muchas partes
 * * y queremos que el proceso de construcción sea independiente de las partes
 * * que lo componen.
 *
 * https://refactoring.guru/es/design-patterns/builder
 */

import { COLORS } from "../helpers/colors.ts";

class Computer{
    public cpu: string = 'cpu - not found';
    public ram: string = 'ram - not found';
    public storage: string = 'storage - not found';
    public gpu?: string ;
    
    displayConfiguration(): void {
        console.log(`
            CPU: ${this.cpu}
            RAM: ${this.ram}
            STORAGE: ${this.storage}
            GPU: ${this.gpu ?? 'gpu - not found'}
        `);
    }
    
}

class ComputerBuilder{
    private computer: Computer;
    constructor(){
        this.computer = new Computer();
    }

    setCPU(cpu: string): ComputerBuilder{ 
        this.computer.cpu = cpu;
        return this;
    }

    setRAM(ram: string): ComputerBuilder{ 
        this.computer.ram = ram;
        return this;
     }

     setStorage(storage: string): ComputerBuilder{ 
        this.computer.storage = storage;
        return this;
     }
     setGPU(gpu: string): ComputerBuilder{ 
        this.computer.gpu = gpu;
        return this;
     }
     build(): Computer{ 
        return this.computer;
     }
 }

 function main(){
    const basicComputer:Computer = new ComputerBuilder().setCPU('Intel Core i3')
    .setRAM('8GB')
    .setStorage('256GB SSD')
    .build();
    console.log('%Basic Computer Configuration:', COLORS.blue);
    basicComputer.displayConfiguration();
    const gamingComputer:Computer = new ComputerBuilder().setCPU('Intel Core i9')
    .setRAM('32GB')
    .setStorage('1TB SSD')
    .setGPU('NVIDIA RTX 4090')
    .build();
    console.log('%Gaming Computer Configuration:', COLORS.blue);
    gamingComputer.displayConfiguration();
}

 main();