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
import { Sprite } from './sprites.js';
import SolarSystem from '../solarsystem.js';
var Asteroid = /** @class */ (function (_super) {
    __extends(Asteroid, _super);
    function Asteroid(app, system, sector) {
        var _this = _super.call(this, app) || this;
        _this.angle = 0; // Initial angle
        _this.speed = 0.1; // Speed of rotation
        _this.color = 'white';
        _this.mass = 1;
        // color generated based on sector
        _this.color = "hsl(".concat((sector.percentage) * 360, ", 100%, 50%)");
        _this.radius = Math.random() + 0.02;
        _this.mass = _this.radius * 0.0005;
        // angle based on sector
        _this.angle = Math.random() * (sector.maxAngle - sector.minAngle) + sector.minAngle;
        // let sectorArcWidth = sector.maxAngle - sector.minAngle;
        _this.sector = sector;
        // this.angle = Math.random() * Math.PI * 2;
        _this.cx = system.centerX;
        _this.cy = system.centerY;
        _this.a = Math.random() * (system.maxRadius - system.minRadius) + system.minRadius;
        _this.b = Math.random() * (system.maxRadius - system.minRadius) + system.minRadius;
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
        this.x = this.cx + this.a * Math.cos(this.angle);
        this.y = this.cy + this.b * Math.sin(this.angle);
        this.angle += this.speed;
        this.angle %= Math.PI * 2;
        this.distanceFromCenter = Math.sqrt(Math.pow(this.x - this.cx, 2) + Math.pow(this.y - this.cy, 2));
        this.setSubSector();
    };
    Asteroid.prototype.setSubSector = function () {
    };
    Asteroid.prototype.render = function (gamecanvas) {
        var sprite = this;
        // this.ctx.beginPath();
        var ctx = gamecanvas.ctx;
        ctx.fillStyle = sprite.color;
        // console.log(sprite.radius);
        ctx.fillRect(gamecanvas.gtlx(sprite.x), gamecanvas.gtly(sprite.y), Math.ceil(gamecanvas.scaleFactorX(sprite.radius)) * 2, Math.ceil(gamecanvas.scaleFactorY(sprite.radius)) * 2);
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
}(Sprite));
export { Asteroid };
