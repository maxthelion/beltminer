import { Sector, SubSector } from './sectors.js';
import AsteroidRenderer from './asteroidrenderer.js';
import { Sprite } from './sprites.js';
import SolarSystem  from './solarsystem.js';

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
    sector: Sector;
    subSector!: SubSector;
    

    constructor(system: SolarSystem, sector: Sector) {
        super();
        
        // color generated based on sector
        this.color = `hsl(${(sector.percentage) * 360}, 100%, 50%)`;
        this.radius = Math.random() + 0.02;
        this.mass = this.radius * 0.0005;
        // angle based on sector

        this.angle = Math.random() * (sector.maxAngle - sector.minAngle) + sector.minAngle;
        // let sectorArcWidth = sector.maxAngle - sector.minAngle;
        this.sector = sector;
        // this.angle = Math.random() * Math.PI * 2;
        this.cx = system.centerX;
        this.cy = system.centerY;
        this.a = Math.random() * (system.maxRadius - system.minRadius) + system.minRadius;
        this.b = Math.random() * (system.maxRadius - system.minRadius) + system.minRadius;
        this.speed = Math.random() * 0.0000001 + 0.0000001;
        this.asteroidPoints = AsteroidRenderer.generateAsteroidShape(10, this.radius);
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = Math.random() * 0.001 + 0.002;
        // initialize distance from center
        this.update();
        this.assignToSubSector();
    }

    assignToSubSector() {
        let subSectors = SubSector.subSectorNum;
        let sectorSize = (2 * Math.PI) / (Sector.sectorNum * subSectors);
        let subSectorArcIndex = Math.floor(this.angle / sectorSize);

        let minRadius = SolarSystem.minRadius;
        let maxRadius = SolarSystem.maxRadius;
        let radialRange = maxRadius - minRadius;
        let radialSectorNum = SubSector.radialDivisions;
        let subSectorRadialIndex = Math.floor((this.distanceFromCenter - minRadius) / radialRange * radialSectorNum);
        // console.log(subSectorRadialIndex, subSectorArcIndex)
    
        this.subSector = new SubSector(subSectorArcIndex, subSectorRadialIndex);
        this.sector.subSectorsAsteroids[subSectorArcIndex] ||= [];
        this.sector.subSectorsAsteroids[subSectorArcIndex][subSectorRadialIndex] ||= [];
        this.sector.subSectorsAsteroids[subSectorArcIndex][subSectorRadialIndex].push(this);
    }

    update() {
        this.rotation += this.rotationSpeed;
        this.x = this.cx + this.a * Math.cos(this.angle);
        this.y = this.cy + this.b * Math.sin(this.angle);
        this.angle += this.speed;
        this.angle %= Math.PI * 2;
        this.distanceFromCenter = Math.sqrt(Math.pow(this.x - this.cx, 2) + Math.pow(this.y - this.cy, 2));
        this.setSubSector();
    }
    setSubSector() {
        
    }
}
