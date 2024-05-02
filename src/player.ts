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
    distanceFromCenter: number;
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
        // if near an asteroid, lock to its speed and direction
        this.angle += this.dy;
        this.distanceFromCenter =  200 //this.dx;
        let radius = 200;
        this.x = radius * Math.cos(this.angle) + this.cx;
        this.y = radius * Math.sin(this.angle) + this.cy;
        if (this.lockedAsteroid !== null) {
            this.direction += this.lockedAsteroid.rotationSpeed;
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