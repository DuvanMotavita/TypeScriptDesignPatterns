import { COLORS } from "../helpers/colors.ts";

/**
 * ! Patrón Observer
 * El patrón Observer es un patrón de diseño de comportamiento que establece
 * una relación de uno a muchos entre un objeto, llamado sujeto,
 * y otros objetos, llamados observadores, que son notificados
 * y actualizados automáticamente por el sujeto
 * cuando se producen cambios en su estado.
 *
 * * Es útil cuando necesitamos que varios objetos estén
 * * pendientes de los cambios
 *
 * !No confundirlo con RXJS Observables
 *
 * https://refactoring.guru/es/design-patterns/observer
 */
interface Observer {
    notify(videoTitle: string): void;
}

class YouTubeChannel {
    private subscribers: Observer[] = [];
    private name: string;

    constructor(name: string) {
        this.name = name;
    }

    subscribe(observer: Observer): void {
        this.subscribers.push(observer);
        console.log(`Nuevo suscriptor se ha inscrito al canal %c${this.name}`, COLORS.green);
    }

    unsubscribe(observer: Observer): void {
        this.subscribers = this.subscribers.filter(sub => sub !== observer);
        console.log(`Un suscriptor se ha dado de baja del canal %c${this.name}`, COLORS.red);
    }
    
    uploadVideo(videoTitle: string): void {
        console.log(`\nNuevo video subido al canal %c${this.name}: %c${videoTitle}`, COLORS.green, COLORS.yellow);
        for (const subscriber of this.subscribers) {
            subscriber.notify(videoTitle);
        }
    }
}

class Subscriber implements Observer {
    private name:string;

    constructor(name: string) {
        this.name = name;
    }

    notify(videoTitle: string): void {
        console.log(`%c${this.name}, nuevo video disponible: %c${videoTitle}`, COLORS.cyan, COLORS.yellow);
    }
}

function main(){
    const channel = new YouTubeChannel("Tech Reviews");
    const sara = new Subscriber("Sara");
    const john = new Subscriber("John");
    const emma = new Subscriber("Emma");
    channel.subscribe(sara);
    channel.subscribe(john);
    channel.uploadVideo("Top 10 Gadgets of 2024");
    channel.subscribe(emma);
    channel.uploadVideo("Review of the Latest Smartphone");
    channel.unsubscribe(john);
    channel.uploadVideo("Best Laptops for Programming");
    channel.unsubscribe(emma);
    channel.uploadVideo("Understanding Design Patterns in TypeScript");
    console.log("\n\n")
}


main();