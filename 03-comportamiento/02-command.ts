import { COLORS } from "../helpers/colors.ts";

/**
 * ! Patrón Command
 * Este patrón encapsula una solicitud como un objeto,
 * lo que le permite parametrizar otros objetos con diferentes solicitudes,
 * encolar solicitudes, o registrar solicitudes, y soporta operaciones que pueden deshacerse.
 *
 * Me gustó mucho la explicación de Refactoring Guru
 * https://refactoring.guru/es/design-patterns/command
 *
 * * Es útil cuando se necesita desacoplar el objeto que invoca
 * * la operación del objeto que sabe cómo realizarla.
 *
 *
 */
interface Command {
    execute():void;
}

class Light {
    turnOn():void{
        console.log('%cLa luz está encendida', COLORS.yellow)
    }
    turnOff():void{
        console.log('%cLa luz está apagada', COLORS.yellow)
    }
}

class Fan {
    on():void{
        console.log('%cEl ventilador está encendido', COLORS.green)
    }
    off():void{
        console.log('%cEl ventilador está apagado', COLORS.green)
    }
}

// Commands 

class LightOnCommand implements Command {
    constructor(private light:Light){
        
    }
    execute(): void {
        this.light.turnOn();
    }
}

class LightOffCommand implements Command {
    constructor(private light:Light){
        
    }
    execute(): void {
        this.light.turnOff();
    }
}

class FanOnCommand implements Command {
    constructor(private fan:Fan){
        
    }
    execute(): void {
        this.fan.on();
    }
}

class FanOffCommand implements Command {
    constructor(private fan:Fan){
        
    }
    execute(): void {
        this.fan.off();
    }
}

class RemoteControl {
    private commands:Record<string,Command> = {};
    setCommand(button:string,command:Command){
        this.commands[button] = command;
    }

    pressButton(button:string):void{
        if(this.commands[button])
        {
            this.commands[button].execute();
            return;
        }
        console.log('%cNo se ha asignado un comando a ese boton',COLORS.red);
    }
}


function main(){
    const remoteControl = new RemoteControl();
    const light = new Light();
    const fan = new Fan();
    // creating commands for devices
    const ligthOnCommand = new LightOnCommand(light);
    const ligthOffCommand = new LightOffCommand(light);

    const fanOnCommand = new FanOnCommand(fan);
    const fanOffCommand = new FanOffCommand(fan);
    //Assigning the actions
    remoteControl.setCommand('1',ligthOnCommand);
    remoteControl.setCommand('2', ligthOffCommand);
    remoteControl.setCommand('3', fanOnCommand);
    remoteControl.setCommand('4', fanOffCommand);

    let continueProgram = true;

    do {
        console.clear();
        const pressedButton = prompt(
            `Presiona un botón del control:
                1. Encender la luz
                2. Apagar la luz
                3. Encender ventilador
                4. Apagar ventilador

                Botton:
            `
        ) ?? '';
        remoteControl.pressButton(pressedButton);
        const continueProgramResponse = prompt(
            `\n ¿Deseas continuar? (y/n):`

        )?.toLocaleLowerCase();

        continueProgram =  continueProgramResponse === 'y' ? true:false;

    } while (continueProgram);
}

main();

