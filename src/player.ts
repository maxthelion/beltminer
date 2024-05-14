import {Sprite} from './sprites.js';
import { Asteroid } from './asteroid.js';

type InventorySlot = {
    itemType: string,
    quantity: number,
}
export default class Player extends Sprite {
    direction: number;
    acceleration = 0.005;
    rotationalAcceleration = 0.05;
    color = 'grey';
    lockedAsteroid: Asteroid | null;
    accelerating = false;
    inventory: InventorySlot[];
    angle: number;
    cx: number;
    cy: number;

    constructor() {
        super();
        this.x = 200;
        this.y = 50;
        this.angle = 0;
        this.distanceFromCenter = 200;
        this.cx = 0;
        this.cy = 0;
        this.direction = Math.random() * Math.PI * 2;
        this.lockedAsteroid = null;
        this.inventory = [];
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
            this.x = this.distanceFromCenter * Math.cos(this.angle);
            this.y = this.distanceFromCenter * Math.sin(this.angle);
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