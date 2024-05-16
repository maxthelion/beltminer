import {Sprite} from './sprites.js';
import { Asteroid } from './asteroid.js';
import SolarSystem  from './solarsystem.js';


type InventorySlot = {
    itemType: string,
    quantity: number,
}
export default class Player extends Sprite {
    direction: number;
    slowAcceleration: number = 0.0001;
    fastAcceleration: number = 0.01;
    acceleration = this.fastAcceleration;
    rotationalAcceleration = 0.05;
    color = 'grey';
    lockedAsteroid: Asteroid | null;
    accelerating = false;
    inventory: InventorySlot[];
    angle: number;
    cx: number;
    cy: number;
    velocity: number;

    constructor(system: SolarSystem) {
        super();
        this.x = 0;
        this.y = 0;
        this.angle = 0;
        this.distanceFromCenter = system.minRadius + ((system.maxRadius - system.minRadius) / 2);
        this.cx = 0;
        this.cy = 0;
        this.direction = Math.random() * Math.PI * 2;
        this.lockedAsteroid = null;
        this.inventory = [];
        this.velocity = 0;
    }

    update() {
        if (this.lockedAsteroid !== null) {
            this.direction += this.lockedAsteroid.rotationSpeed;
            this.angle = this.lockedAsteroid.angle;
            this.distanceFromCenter = this.lockedAsteroid.distanceFromCenter;
        } else { 
                
            // if near an asteroid, lock to its speed and direction
            this.angle -= this.dy / 1000;
            this.angle %= Math.PI * 2;

            this.distanceFromCenter -= (this.dx);
            //let radius = 200;
            let oldX = this.x;
            let oldY = this.y;
            this.x = this.distanceFromCenter * Math.cos(this.angle);
            this.y = this.distanceFromCenter * Math.sin(this.angle);
            this.velocity = Math.sqrt(Math.pow(this.x - oldX, 2) + Math.pow(this.y - oldY, 2));
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

    accelerate() {
        this.accelerating = true;
        this.dx += this.acceleration * Math.cos(this.direction);
        this.dy += this.acceleration * Math.sin(this.direction);
    }

    isThrusting() {
        return this.accelerating;
    }
}

export class Ship {
    maxCargo: number = 10;
    cargoSlots: (CargoSlot | null)[];

    constructor() {
        this.cargoSlots = new Array(this.maxCargo);
        for (let i = 0; i < this.maxCargo; i++) {
            
        }
    }

}

type CargoSlot = {
    cargoType: string;
    cargoAmount: number; 
}

let cargoTypes = [
    'ironore',
    'goldore',
    'water',
    'ice',
    'food',
]