/**
 * ! Patrón Flyweight
 * Es un patrón de diseño estructural que nos permite usar objetos compartidos
 * para soportar eficientemente grandes cantidades de objetos.
 *
 * * Es útil cuando necesitamos una gran cantidad de objetos y queremos reducir
 * * la cantidad de memoria que utilizan.
 *
 * https://refactoring.guru/es/design-patterns/flyweight
 */

import { COLORS } from "../helpers/colors.ts";

interface location {
    display( coordinates:{ x: number, y: number } ): void;
}

//Flyweight
class locationIcon implements location {
    private type: string;
    private iconImage:string;

    constructor( type: string, iconImage:string ) {
        this.type = type;
        this.iconImage = iconImage;
    }

    display(coordinates: { x: number; y: number; }): void {
        console.log( 
            `Coord: ${this.type} en ${coordinates.x}, ${coordinates.y} con icono %c[${this.iconImage}]`, COLORS.green
         );
    }

}

//Flyweight Factory
class locationIconFactory {
    private icons:Record<string, locationIcon> = {};
    getLocationIcon( type: string): locationIcon {
        if( !this.icons[type] ) {
            console.log( `%cCreando icono de tipo: ${type}`, COLORS.red );
            const iconImage = `imaenen_${type.toLowerCase()}.png`;
            this.icons[type] = new locationIcon( type, iconImage );
        }
        return this.icons[type];
    }
}

class MapLocation {
    private coordinates: { x: number; y: number; };
    private icon: locationIcon;

    constructor( x: number, y: number, icon: locationIcon ) {
        this.coordinates = { x, y };
        this.icon = icon;
    }

    display(): void {
        this.icon.display( this.coordinates );
    }
}

function main() {
    const factory = new locationIconFactory();
    const location:MapLocation[] = [
        new MapLocation( 10, 20, factory.getLocationIcon( 'Hospital') ),
        new MapLocation( 20, 40, factory.getLocationIcon( 'Hospital') ),
        new MapLocation( 30, 60, factory.getLocationIcon( 'Hospital') ),
        
        new MapLocation( 35, 65, factory.getLocationIcon( 'Parque') ),
        new MapLocation( 35, 65, factory.getLocationIcon( 'Parque') ),
        new MapLocation( 35, 65, factory.getLocationIcon( 'Parque') ),
        new MapLocation( 35, 65, factory.getLocationIcon( 'Parque') ),
        new MapLocation( 35, 65, factory.getLocationIcon( 'Parque') ),

        new MapLocation( 35, 65, factory.getLocationIcon( 'Escuela') ),
        new MapLocation( 35, 65, factory.getLocationIcon( 'Escuela') ),
        new MapLocation( 35, 65, factory.getLocationIcon( 'Escuela') ),
    ];
    location.forEach( loc => loc.display() );
}
main();