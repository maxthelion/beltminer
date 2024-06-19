import App from "../app.js";
import { Sector } from "../sectors.js";
import SolarSystem from "../solarsystem";
import { Sprite } from "./sprites.js";

export class PlanetaryBody extends Sprite{
    radius: number;
    color = 'pink';
    mass = 1;
    sector: Sector;
    angle: number;
    speed = 0;
    rotation: number = 0;
    rotationSpeed: number = 0.001;

    constructor(app: App, sector: Sector) {
        super(app);
        this.sector = sector;
        this.radius = 30;
        this.mass = this.radius * 0.0005;
        this.angle = Math.random() * (sector.maxAngle - sector.minAngle) + sector.minAngle;
        this.setAngle();
        this.distanceFromCenter = (Math.random() * app.solarSystem.radialRange()) + app.solarSystem.minRadius;
    }

    setAngle() {
        this.angle = Math.random() * (this.sector.maxAngle - this.sector.minAngle) + this.sector.minAngle;
    }

    update() {
        this.rotation += this.rotationSpeed;
        this.angle += this.speed;
        this.x = this.distanceFromCenter * Math.cos(this.angle);
        this.y = this.distanceFromCenter * Math.sin(this.angle);
    }

    systemX() {
        return this.x;
    }

    systemY() {
        return this.y;
    }

    bandX(): number {
        return this.distanceFromCenter - this.app.solarSystem.minRadius;
    }

    bandY(): number {
        return this.app.solarSystem.circumference() * (this.angle / (Math.PI * 2));
    }
}