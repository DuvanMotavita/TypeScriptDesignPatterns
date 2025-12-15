/**
 * ! Patrón Facade
 * Este patrón proporciona una interfaz unificada para un conjunto de interfaces
 * en un subsistema.
 *
 * Facade define una interfaz de nivel más alto que hace que el subsistema
 * sea más fácil de usar.
 *
 * * Es útil cuando un subsistema es complejo o difícil de entender para
 * * proporcionar una interfaz simplificada para el cliente.
 *
 * https://refactoring.guru/es/design-patterns/facade
 */

import { COLORS } from "../helpers/colors.ts";


class Projector {

    turnOn(): void {
        console.log('Proyector encendido');
    }

    turnOff(): void {
        console.log('Proyector apagado');
    }
}

class SoundSystem {
    on(): void {
        console.log('Sistema de sonido encendido');
    }
    off(): void {
        console.log('Sistema de sonido apagado');
    }
}

class VideoPlayer {

    on(): void {
        console.log('Reproductor encendido');
    }

    play(movie: string): void {
        console.log(`Reproduciendo la película: %c${movie}`, COLORS.blue);
    }

    stop(): void {
        console.log('Reproductor detenido');
    }
    off(): void {
        console.log('Reproductor apagado');
    }
}

class PopcornMaker {
    popingPopcorn(): void {
        console.log('Haciendo palomitas');
    }
    turnOffPopingPopcorn(): void {
        console.log('Palomitas detenidas');
    }
}

interface HomeTheaterOptions {
    projector: Projector;
    soundSystem: SoundSystem;
    videoPlayer: VideoPlayer
    popcornMaker: PopcornMaker;

}

class HomeTheaterFacade {
    private projector: Projector;
    private soundSystem: SoundSystem;
    private videoPlayer: VideoPlayer
    private popcornMaker: PopcornMaker;

    constructor({ projector, soundSystem, videoPlayer, popcornMaker }: HomeTheaterOptions) {
        this.projector = projector;
        this.soundSystem = soundSystem;
        this.videoPlayer = videoPlayer;
        this.popcornMaker = popcornMaker;
    }


    watchMovie(movie: string): void {
        console.log('%cPreparando para ver la película...', COLORS.yellow);
        this.projector.turnOn();
        this.soundSystem.on();
        this.popcornMaker.popingPopcorn();
        this.videoPlayer.on();
        this.videoPlayer.play('Lo aventuras de Facade');
        console.log('%cDisfruta la película!', COLORS.green);   
    }

    endWatchingMovie(movie: string): void {
        console.log('%cPreparando para detener la película...', COLORS.yellow);
        this.projector.turnOff();
        this.soundSystem.off();
        this.popcornMaker.turnOffPopingPopcorn();
        this.videoPlayer.stop();
        this.videoPlayer.off();
        console.log('%cSistema apagado!', COLORS.green);
    }
}

function main(){
    const videoPlayer = new VideoPlayer();
    const projector = new Projector();
    const soundSystem = new SoundSystem();
    const popcornMaker = new PopcornMaker(); 
    
    const homeTheater = new HomeTheaterFacade({
        videoPlayer,
        projector,
        soundSystem,
        popcornMaker
    });

    homeTheater.watchMovie('Lo aventuras de Facade 2');
    console.log('\n...Película en progreso...\n');
    homeTheater.endWatchingMovie('Lo aventuras de Facade 2');
    
}

main();




