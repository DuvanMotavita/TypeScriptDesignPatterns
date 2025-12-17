import { COLORS } from '../helpers/colors.ts';

/**
 * ! Patron Chain of Responsibility
 * Es un patrón de diseño de comportamiento que te permite pasar solicitudes
 * a lo largo de una cadena de manejadores.
 *
 * * Es útil cuando se necesita procesar datos de diferentes maneras, pero no
 * * se sabe de antemano qué tipo de procesamiento se necesita o en qué orden
 * * pero se sabe que se necesita procesar en una secuencia.
 *
 * https://refactoring.guru/es/design-patterns/chain-of-responsibility
 */
interface Handler {
    setNext(handler:Handler):Handler;
    handle(request:string):void;
}
abstract class BaseHandler implements Handler{
    private nextHandler?:Handler;

    setNext(handler: Handler): Handler {
        this.nextHandler = handler
        return handler;
    }
    handle(request: string): void {
        if(this.nextHandler){
            this.nextHandler.handle(request);
        }
    }
    
}

//Basic support
class BasicSupport extends BaseHandler {
    override handle(request: string): void {
        if(request === 'basic'){
            console.log('%cResolviendo problema basico',COLORS.green);
            return;
        }
        console.log('Soporte basico pasando problema a soporte avanzado');
        super.handle(request);
    }
}
//Advance support
class AdvancedSupport extends BaseHandler {
    override handle(request: string): void {
        if(request === 'advanced'){
            console.log('%cSoporte avanzado: Resolviendo problema avanzado.',COLORS.yellow);
            return;
        }
        console.log('Soporte avanzado pasando problema a soporte experto');
        super.handle(request);
    }
}
//Expert support
class ExpertSupport extends BaseHandler {
    override handle(request: string): void {
        if(request === 'expert'){
            console.log('%cSoporte experto: Resolviendo problema experto.',COLORS.red);
            return;
        }
        console.log('Soporte experto: No hay nada que hacer');
        super.handle(request);
    }
}

function main(){
    const basicSupport = new BasicSupport();
    const advanceSupport = new AdvancedSupport();
    const expertSupport = new ExpertSupport();

    basicSupport.setNext(advanceSupport).setNext(expertSupport);
    basicSupport.handle('basic');
    basicSupport.handle('advanced');
    basicSupport.handle('expert');
    basicSupport.handle('nuclear');


}
main();