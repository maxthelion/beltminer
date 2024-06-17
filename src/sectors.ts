import App from "./app.js";
import { Asteroid } from "./sprites/asteroid.js";
import SolarSystem  from "./solarsystem.js";

export class Sector {
    static sectorNum: number = 10;
    arcIndex: number;
    minAngle: number;
    maxAngle: number;
    percentage: number;
    asteroids: Asteroid[] = [];
    subSectorsAsteroids: Asteroid[][][] = [];
    constructor(arcIndex: number) {
        this.arcIndex = arcIndex;
        let totalSectors = Sector.sectorNum;
        this.percentage = arcIndex / totalSectors;
        this.minAngle = (this.percentage) * Math.PI * 2;
        this.maxAngle = ((arcIndex + 1) / totalSectors) * Math.PI * 2;
    }


    populate(app: App){
        let density = 100 * (this.arcIndex + 1);
        for (let i = 0; i < density; i++) {
            let asteroid = new Asteroid(app, app.solarSystem, this);
            app.addAsteroid(asteroid);
            this.asteroids.push(asteroid);
        }
        // this.asteroids = this.asteroids.concat(this.sectors[sectorNum].asteroids);
    }
}

export class SubSector extends Sector {
    static subSectorNum: number = 10;
    static radialDivisions: number = 10;
    radialIndex: number;
    minRadius: number;
    maxRadius: number;
    constructor(arcIndex: number, radialIndex: number) {
        super(arcIndex);
        this.arcIndex = arcIndex;
        let totalSectors = Sector.sectorNum * SubSector.subSectorNum;
        this.percentage = arcIndex / totalSectors;
        this.minAngle = (this.percentage) * Math.PI * 2;
        this.maxAngle = ((arcIndex + 1) / totalSectors) * Math.PI * 2;
        this.radialIndex = radialIndex;
        let minRadius = SolarSystem.minRadius;
        let maxRadius = SolarSystem.maxRadius;
        let radialDivisions = SubSector.radialDivisions;
        this.minRadius = radialIndex * (maxRadius - minRadius) / radialDivisions + minRadius;
        this.maxRadius = (radialIndex + 1) * (maxRadius - minRadius) / radialDivisions + minRadius;
    }
}