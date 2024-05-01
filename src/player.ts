import {Sprite, Asteroid} from './sprites.js';

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

    constructor() {
        super();
        this.direction = Math.random() * Math.PI * 2;
        this.lockedAsteroid = null;
        this.inventory = [];
    }

    update() {
        // if near an asteroid, lock to its speed and direction
        this.x += this.dx;
        this.y += this.dy;
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