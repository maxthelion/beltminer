import { Asteroid } from './asteroid.js';
import SolarSystem  from '../solarsystem.js';
import { Sector } from '../sectors.js';
import App from '../app.js';

export class Planetoid extends Asteroid {
    radius: number;
    color = 'orange';
    mass = 1;
    name: string;
    constructor(app: App, system: SolarSystem, name: string) {
        let sector = new Sector(0);
        super(app, system,sector);
        this.radius = 30;
        this.mass = this.radius * 0.0005;
        this.name = name;
    }
}
