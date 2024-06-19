var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { Sector, SubSector } from '../sectors.js';
import AsteroidRenderer from '../asteroidrenderer.js';
import SolarSystem from '../solarsystem.js';
import { PlanetaryBody } from './planetarybody.js';
var Asteroid = /** @class */ (function (_super) {
    __extends(Asteroid, _super);
    function Asteroid(app, sector) {
        var _this = _super.call(this, app, sector) || this;
        // a; // Semi-major axis length
        // b; // Semi-minor axis length
        // cx; // Center x
        // cy; // Center y
        _this.speed = 0.1; // Speed of rotation
        _this.color = 'white';
        _this.mass = 1;
        var system = app.solarSystem;
        // color generated based on sector
        _this.color = "hsl(".concat((sector.percentage) * 360, ", 100%, 80%)");
        var minAsteroidRadius = 1;
        _this.radius = minAsteroidRadius +
            (Math.random() * sector.radialDistanceFromOrigin())
            + 0.02
            + Math.pow(sector.radialDistanceFromOrigin(), 4);
        _this.mass = _this.radius * 0.0005;
        // angle based on sector
        // this.angle = Math.random() * (sector.maxAngle - sector.minAngle) + sector.minAngle;
        // let sectorArcWidth = sector.maxAngle - sector.minAngle;
        // this.sector = sector;
        // this.angle = Math.random() * Math.PI * 2;
        _this.speed = Math.random() * 0.0000001 + 0.0000001;
        _this.asteroidPoints = AsteroidRenderer.generateAsteroidShape(10, _this.radius);
        _this.rotation = Math.random() * Math.PI * 2;
        _this.rotationSpeed = Math.random() * 0.001 + 0.002;
        // initialize distance from center
        _this.update();
        _this.assignToSubSector();
        return _this;
    }
    Asteroid.prototype.assignToSubSector = function () {
        var _a, _b;
        var subSectors = SubSector.subSectorNum;
        var sectorSize = (2 * Math.PI) / (Sector.sectorNum * subSectors);
        var subSectorArcIndex = Math.floor(this.angle / sectorSize);
        var minRadius = SolarSystem.minRadius;
        var maxRadius = SolarSystem.maxRadius;
        var radialRange = maxRadius - minRadius;
        var radialSectorNum = SubSector.radialDivisions;
        var subSectorRadialIndex = Math.floor((this.distanceFromCenter - minRadius) / radialRange * radialSectorNum);
        // console.log(subSectorRadialIndex, subSectorArcIndex)
        this.subSector = new SubSector(subSectorArcIndex, subSectorRadialIndex);
        (_a = this.sector.subSectorsAsteroids)[subSectorArcIndex] || (_a[subSectorArcIndex] = []);
        (_b = this.sector.subSectorsAsteroids[subSectorArcIndex])[subSectorRadialIndex] || (_b[subSectorRadialIndex] = []);
        this.sector.subSectorsAsteroids[subSectorArcIndex][subSectorRadialIndex].push(this);
    };
    Asteroid.prototype.update = function () {
        this.rotation += this.rotationSpeed;
        this.angle += this.speed;
        this.x = this.distanceFromCenter * Math.cos(this.angle);
        this.y = this.distanceFromCenter * Math.sin(this.angle);
    };
    Asteroid.prototype.render = function (gamecanvas) {
        var sprite = this;
        // this.ctx.beginPath();
        var ctx = gamecanvas.ctx;
        ctx.fillStyle = sprite.color;
        // console.log(sprite.radius);
        var width = Math.ceil(gamecanvas.scaleFactorX(sprite.radius)) * 2;
        var height = Math.ceil(gamecanvas.scaleFactorY(sprite.radius)) * 2;
        ctx.fillRect(gamecanvas.gtlx(sprite.x) - (width / 2), gamecanvas.gtly(sprite.y) - (height / 2), width, height);
        // ctx.arc(
        //     this.gtlx(asteroid.x),
        //     this.gtly(asteroid.y),
        //     Math.round(this.scaleFactorX(asteroid.radius)),
        //     0,
        //     Math.PI * 2
        // );
        ctx.fill();
        ctx.closePath();
    };
    return Asteroid;
}(PlanetaryBody));
export { Asteroid };
