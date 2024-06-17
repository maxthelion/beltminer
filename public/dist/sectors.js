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
import { Asteroid } from "./sprites/asteroid.js";
import SolarSystem from "./solarsystem.js";
var Sector = /** @class */ (function () {
    function Sector(arcIndex) {
        this.asteroids = [];
        this.subSectorsAsteroids = [];
        this.arcIndex = arcIndex;
        var totalSectors = Sector.sectorNum;
        this.percentage = arcIndex / totalSectors;
        this.minAngle = (this.percentage) * Math.PI * 2;
        this.maxAngle = ((arcIndex + 1) / totalSectors) * Math.PI * 2;
    }
    Sector.prototype.populate = function (app) {
        var density = 100 * (this.arcIndex + 1);
        for (var i = 0; i < density; i++) {
            var asteroid = new Asteroid(app, app.solarSystem, this);
            app.addAsteroid(asteroid);
            this.asteroids.push(asteroid);
        }
        // this.asteroids = this.asteroids.concat(this.sectors[sectorNum].asteroids);
    };
    Sector.sectorNum = 10;
    return Sector;
}());
export { Sector };
var SubSector = /** @class */ (function (_super) {
    __extends(SubSector, _super);
    function SubSector(arcIndex, radialIndex) {
        var _this = _super.call(this, arcIndex) || this;
        _this.arcIndex = arcIndex;
        var totalSectors = Sector.sectorNum * SubSector.subSectorNum;
        _this.percentage = arcIndex / totalSectors;
        _this.minAngle = (_this.percentage) * Math.PI * 2;
        _this.maxAngle = ((arcIndex + 1) / totalSectors) * Math.PI * 2;
        _this.radialIndex = radialIndex;
        var minRadius = SolarSystem.minRadius;
        var maxRadius = SolarSystem.maxRadius;
        var radialDivisions = SubSector.radialDivisions;
        _this.minRadius = radialIndex * (maxRadius - minRadius) / radialDivisions + minRadius;
        _this.maxRadius = (radialIndex + 1) * (maxRadius - minRadius) / radialDivisions + minRadius;
        return _this;
    }
    SubSector.subSectorNum = 10;
    SubSector.radialDivisions = 10;
    return SubSector;
}(Sector));
export { SubSector };
