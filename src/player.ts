import {Sprite} from './sprites/sprites.js';
import { Asteroid } from './sprites/asteroid.js';
import SolarSystem  from './solarsystem.js';
import App from './app.js';
import { Vector } from './sprites/vector.js';
import { Actor } from './sprites/actor.js';


type InventorySlot = {
    itemType: string,
    quantity: number,
}
export default class Player extends Actor {
    color = 'grey';
    lockedAsteroid: Asteroid | null;
    inventory: InventorySlot[];


    constructor(app: App, system: SolarSystem) {
        super(app);
        this.system = system;
        this.x = 0;
        this.y = 0;
        this.angle = 0;
        this.distanceFromCenter = system.midRadius();
        this.rotation = Math.random() * Math.PI * 2;
        this.lockedAsteroid = null;
        this.inventory = [];
        this.velocity = 0;
    }

    update() {
        if (this.lockedAsteroid !== null) {
            this.rotation += this.lockedAsteroid.rotationSpeed;
            this.angle = this.lockedAsteroid.angle;
            this.distanceFromCenter = this.lockedAsteroid.distanceFromCenter;
        } else {
            this.updateCoordinates();
        }
    }

    shipLength() {
        return 3;
    }

    lockOn(asteroid: Asteroid) {
        this.lockedAsteroid = asteroid;
        this.dx = 0;
        this.dy = 0;
    }

    isLocked() {
        return this.lockedAsteroid !== null;
    }

    isThrusting() {
        return this.accelerating;
    }
}
