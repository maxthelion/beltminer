import { SolarSystem } from './app.js';
import AsteroidRenderer from './asteroidrenderer.js';


export class Sprite {
    x: number;
    y: number;
    dx: number;
    dy: number;
    constructor() {
        this.x = 50;
        this.y = 50;
        this.dx = 0;
        this.dy = 0;
    }

    update() {
        this.x += this.dx;
        this.y += this.dy;
    }
}
export class Asteroid extends Sprite {
    radius: number;
    angle = 0; // Initial angle
    a; // Semi-major axis length
    b; // Semi-minor axis length
    cx; // Center x
    cy; // Center y
    distance = 50; // Distance from the center of the ellipse
    speed = 0.1; // Speed of rotation
    color = 'white';
    asteroidPoints: { x: number; y: number; }[];
    mass = 1;
    rotation: number;
    rotationSpeed: number;

    constructor(system: SolarSystem) {
        super();
        this.color = "rgb(" +
            Math.floor(Math.random() * 255) + "," +
            Math.floor(Math.random() * 255) + "," +
            Math.floor(Math.random() * 255) + ")";
        this.radius = Math.random() * 10;
        this.mass = this.radius * 0.0005;
        this.angle = Math.random() * Math.PI * 2;
        this.cx = system.centerX;
        this.cy = system.centerY;
        this.a = Math.random() * (system.maxRadius - system.minRadius) + system.minRadius;
        this.b = Math.random() * (system.maxRadius - system.minRadius) + system.minRadius;
        this.distance = Math.random() * 50 + 50;
        this.speed = Math.random() * 0.001 + 0.001;
        this.asteroidPoints = AsteroidRenderer.generateAsteroidShape(10, this.radius);
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = Math.random() * 0.01 - 0.005;
    }

    update() {
        this.rotation += this.rotationSpeed;
        this.x = this.cx + this.a * Math.cos(this.angle);
        this.y = this.cy + this.b * Math.sin(this.angle);
        this.angle += this.speed;
    }

}
