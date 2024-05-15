import { Asteroid } from './asteroid.js';
import { Sector, SolarSystem } from './app.js';

export class Planetoid extends Asteroid {
    radius: number;
    color = 'cyan';
    mass = 1;
    name: string;
    constructor(system: SolarSystem, name: string) {
        let sector = new Sector(0);
        super(system,sector);
        this.radius = 30;
        this.mass = this.radius * 0.0005;
        this.name = name;
    }
}
