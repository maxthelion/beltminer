import App from "./app.js";
import { Asteroid } from "./sprites/asteroid.js";
import SolarSystem  from "./solarsystem.js";
import { StationBuilder } from "./sprites/bodies/bodybuilder.js";
import { Planetoid } from "./sprites/planetoid.js";
import { Sprite } from "./sprites/sprites.js";

export class Sector {
    static sectorNum: number = 10;
    arcIndex: number;
    minAngle: number;
    maxAngle: number;
    percentage: number;
    asteroids: Asteroid[] = [];
    planetoids: Planetoid[] = [];
    subSectorsAsteroids: Asteroid[][][] = [];
    sprites: Sprite[] = [];
    app: App;

    constructor(app: App, arcIndex: number) {
        this.app = app;
        this.arcIndex = arcIndex;
        let totalSectors = Sector.sectorNum;
        this.percentage = arcIndex / totalSectors;
        this.minAngle = (this.percentage) * Math.PI * 2;
        this.maxAngle = ((arcIndex + 1) / totalSectors) * Math.PI * 2;
    }

    populate(app: App){
        console.log(this.arcIndex)
        this.planetoids = [ ];
        this.asteroids = [ ];
        this.sprites = [ ];
        // density increases in the middle of the range
        let densityFactor = this.radialDistanceFromOrigin();
        if (densityFactor >= 0.5) {
            let numStations = Math.random() * densityFactor * densityFactor;
            for (let i = 0; i < numStations; i++) {
                // let station = new Station(app, app.solarSystem, this);
                this.addStation();
            }
        }
        if (densityFactor >= 0.8) {
            let numStations = Math.random() * densityFactor * densityFactor + (densityFactor * 10);
            for (let i = 0; i < numStations; i++) {
                // let station = new Station(app, app.solarSystem, this);
                this.addAlienStation();
            }
        }
        let baseDensity = 100;
        let densityMultiplier = 10;
        let density = baseDensity + (densityMultiplier * densityFactor * densityFactor);
        density = Math.log(density) * 10;
        // let density = 100 * (this.arcIndex + 1);
        for (let i = 0; i < density; i++) {
            let asteroid = new Asteroid(app, this);
            this.addAsteroid(asteroid);
        }
        this.populatePlanetoids(app);
        // this.asteroids = this.asteroids.concat(this.sectors[sectorNum].asteroids);
        return this.sprites;
    }

    populatePlanetoids(app: App) {
        let densityFactor = this.radialDistanceFromOrigin();
        if (densityFactor <= 0.5) {
            let density = 1 - densityFactor * 5; 
            for (let i = 0; i < density; i++) {
                let planetoid = new Planetoid(this.app, this, "Ceres");
                this.sprites.push(planetoid);
                this.planetoids.push(planetoid);
            }
        }
    }

    addAsteroid(asteroid: Asteroid) {
        this.asteroids.push(asteroid);
        this.sprites.push(asteroid);
    }

    addStation() {
        let station = StationBuilder.buildStation(this.app, this);
        this.sprites.push(station);
    }

    addAlienStation() {
        let station = StationBuilder.buildAlienStation(this.app, this);
        this.sprites.push(station);
    }

    radialDistanceFromOrigin() {
        let sectorNum = Sector.sectorNum;
        return 1 - Math.abs((this.arcIndex + 1) - sectorNum / 2) / (sectorNum / 2)
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