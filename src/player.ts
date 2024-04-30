import {Sprite, Asteroid} from './sprites.js';

export default class Player extends Sprite {
    direction: number;
    acceleration = 0.0005;
    rotationalAcceleration = 0.05;
    color = 'grey';
    lockedAsteroid: Asteroid | null;
    accelerating = false;

    constructor() {
        super();
        this.direction = Math.random() * Math.PI * 2;
        this.lockedAsteroid = null;
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


}