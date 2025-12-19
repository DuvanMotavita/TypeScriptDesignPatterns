/**
 * ! Patrón mediator
 * Es un patrón de diseño de comportamiento que ayuda a reducir
 * las dependencias desordenadas entre objetos.
 * Este patrón limita la comunicación directa entre ellos,
 * haciendo que solo interactúen a través de un objeto mediador.
 *
 * * Es útil reducir la complejidad de las relaciones entre objetos
 *
 * https://refactoring.guru/es/design-patterns/mediator
 */
//chatroom

import { COLORS } from "../helpers/colors.ts";

class ChatRoom {
    private users: User[] = [];
    public title: string;
    
    constructor(title: string) {
        this.title = title;
    }

    addUser(user: User): void {
        this.users.push(user);
    }

    sendMessage(message: string, sender: User): void {
        const usersToSend = this.users.filter(user => user !== sender);
        for (const user of usersToSend) {
            user.receiveMessage(sender, message);
            // if (user !== sender) {
            //     // user.receiveMessage(message, sender);
            //     console.log(`Mensaje de ${sender['username']} a ${user['username']}: ${message}`);
            // }
        }
    }


}

class User {
    private username: string;
    private chatRoom: ChatRoom;

    constructor(username: string, chatRoom: ChatRoom) {
        this.username = username;
        this.chatRoom = chatRoom;
        chatRoom.addUser(this);
    }

    sendMessage(message: string): void {
        console.log(`\n\n\n%c${this.username} envía: %c${message}`,COLORS.blue,COLORS.white);
        this.chatRoom.sendMessage(message, this);
    }

    receiveMessage(sender: User, message: string): void {
        console.log(`%c${this.username} recibe mensaje de ${sender['username']}: %c${message}`,COLORS.blue,COLORS.white);
    }


}

function main(): void {
    const chatRoom = new ChatRoom('Patrones de Diseño');
    const user1 = new User('Alice', chatRoom);
    const user2 = new User('Bob', chatRoom);
    const user3 = new User('Charlie', chatRoom);

    user1.sendMessage('Hola a todos!');
    user2.sendMessage('¡Hola Alice! ¿Cómo estás?');
    user3.sendMessage('¡Hola a ambos! ¿Qué están haciendo?');

    console.log('\n');
}

main();