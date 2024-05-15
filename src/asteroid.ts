import { Sector, SolarSystem } from './app.js';
import AsteroidRenderer from './asteroidrenderer.js';
import { Sprite } from './sprites.js';

export class Asteroid extends Sprite {
    radius: number;
    angle = 0; // Initial angle
    a; // Semi-major axis length
    b; // Semi-minor axis length
    cx; // Center x
    cy; // Center y
    speed = 0.1; // Speed of rotation
    color = 'white';
    asteroidPoints: { x: number; y: number; }[];
    mass = 1;
    rotation: number;
    rotationSpeed: number;

    

    constructor(system: SolarSystem, sector: Sector) {
        super();
        let totalSectors = 10;
        // color generated based on sector
        this.color = `hsl(${(sector.percentage) * 360}, 100%, 50%)`;
        this.radius = Math.random() + 0.02;
        this.mass = this.radius * 0.0005;
        // angle based on sector

        this.angle = Math.random() * (sector.maxAngle - sector.minAngle) + sector.minAngle;
        // this.angle = Math.random() * Math.PI * 2;
        this.cx = system.centerX;
        this.cy = system.centerY;
        this.a = Math.random() * (system.maxRadius - system.minRadius) + system.minRadius;
        this.b = Math.random() * (system.maxRadius - system.minRadius) + system.minRadius;
        this.speed = Math.random() * 0.0000001 + 0.0000001;
        this.asteroidPoints = AsteroidRenderer.generateAsteroidShape(10, this.radius);
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = Math.random() * 0.001 + 0.002;
    }

    update() {
        this.rotation += this.rotationSpeed;

        this.x = this.cx + this.a * Math.cos(this.angle);
        this.y = this.cy + this.b * Math.sin(this.angle);
        this.angle += this.speed;
        this.angle %= Math.PI * 2;
        this.distanceFromCenter = Math.sqrt(Math.pow(this.x - this.cx, 2) + Math.pow(this.y - this.cy, 2));
    }

}
