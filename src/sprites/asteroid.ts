import { Sector, SubSector } from '../sectors.js';
import AsteroidRenderer from '../asteroidrenderer.js';
import { Sprite } from './sprites.js';
import SolarSystem  from '../solarsystem.js';
import { GameCanvas } from '../ui/gamecanvas.js';
import { SmallGameCanvas } from '../ui/smallgamecanvas.js';
import App from '../app.js';
import { PlanetaryBody } from './planetarybody.js';

export class Asteroid extends PlanetaryBody {
    radius: number;
    // a; // Semi-major axis length
    // b; // Semi-minor axis length
    // cx; // Center x
    // cy; // Center y
    speed = 0.1; // Speed of rotation
    color = 'white';
    asteroidPoints: { x: number; y: number; }[];
    mass = 1;
    rotation: number;
    rotationSpeed: number;
    subSector!: SubSector;
    

    constructor(app: App, sector: Sector) {
        super(app, sector);
        let system = app.solarSystem;
        // color generated based on sector
        this.color = `hsl(${(sector.percentage) * 360}, 100%, 80%)`;
        let minAsteroidRadius = 1;
        this.radius = minAsteroidRadius + 
                            (Math.random() * sector.radialDistanceFromOrigin()) 
                            + 0.02 
                            + Math.pow(sector.radialDistanceFromOrigin(), 4);
        this.mass = this.radius * 0.0005;
        // angle based on sector

        // this.angle = Math.random() * (sector.maxAngle - sector.minAngle) + sector.minAngle;
        // let sectorArcWidth = sector.maxAngle - sector.minAngle;
        // this.sector = sector;
        // this.angle = Math.random() * Math.PI * 2;

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
        this.angle += this.speed;
        this.x = this.distanceFromCenter * Math.cos(this.angle);
        this.y = this.distanceFromCenter * Math.sin(this.angle);
    }

    render(gamecanvas: SmallGameCanvas) {
        let sprite = this;
        // this.ctx.beginPath();
        let ctx = gamecanvas.ctx;
        ctx.fillStyle = sprite.color;
        // console.log(sprite.radius);
        let width = Math.ceil(gamecanvas.scaleFactorX(sprite.radius)) * 2;
        let height = Math.ceil(gamecanvas.scaleFactorY(sprite.radius)) * 2;
        ctx.fillRect(
            gamecanvas.gtlx(sprite.x) - (width / 2),
            gamecanvas.gtly(sprite.y) - (height / 2),
            width,
            height
        );
        
        // ctx.arc(
        //     this.gtlx(asteroid.x),
        //     this.gtly(asteroid.y),
        //     Math.round(this.scaleFactorX(asteroid.radius)),
        //     0,
        //     Math.PI * 2
        // );
        ctx.fill();
        ctx.closePath();
    }

}
