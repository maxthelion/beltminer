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
import { StationBuilder } from "./sprites/bodies/bodybuilder.js";
import { Planetoid } from "./sprites/planetoid.js";
var Sector = /** @class */ (function () {
    function Sector(app, arcIndex) {
        this.asteroids = [];
        this.planetoids = [];
        this.subSectorsAsteroids = [];
        this.sprites = [];
        this.app = app;
        this.arcIndex = arcIndex;
        var totalSectors = Sector.sectorNum;
        this.percentage = arcIndex / totalSectors;
        this.minAngle = (this.percentage) * Math.PI * 2;
        this.maxAngle = ((arcIndex + 1) / totalSectors) * Math.PI * 2;
    }
    Sector.prototype.populate = function (app) {
        console.log(this.arcIndex);
        this.planetoids = [];
        this.asteroids = [];
        this.sprites = [];
        // density increases in the middle of the range
        var densityFactor = this.radialDistanceFromOrigin();
        if (densityFactor >= 0.5) {
            var numStations = Math.random() * densityFactor * densityFactor;
            for (var i = 0; i < numStations; i++) {
                // let station = new Station(app, app.solarSystem, this);
                this.addStation();
            }
        }
        if (densityFactor >= 0.8) {
            var numStations = Math.random() * densityFactor * densityFactor + (densityFactor * 10);
            for (var i = 0; i < numStations; i++) {
                // let station = new Station(app, app.solarSystem, this);
                this.addAlienStation();
            }
        }
        var baseDensity = 100;
        var densityMultiplier = 10;
        var density = baseDensity + (densityMultiplier * densityFactor * densityFactor);
        density = Math.log(density) * 10;
        // let density = 100 * (this.arcIndex + 1);
        for (var i = 0; i < density; i++) {
            var asteroid = new Asteroid(app, this);
            this.addAsteroid(asteroid);
        }
        this.populatePlanetoids(app);
        // this.asteroids = this.asteroids.concat(this.sectors[sectorNum].asteroids);
        return this.sprites;
    };
    Sector.prototype.populatePlanetoids = function (app) {
        var densityFactor = this.radialDistanceFromOrigin();
        if (densityFactor <= 0.5) {
            var density = 1 - densityFactor * 5;
            for (var i = 0; i < density; i++) {
                var planetoid = new Planetoid(this.app, this, "Ceres");
                this.sprites.push(planetoid);
                this.planetoids.push(planetoid);
            }
        }
    };
    Sector.prototype.addAsteroid = function (asteroid) {
        this.asteroids.push(asteroid);
        this.sprites.push(asteroid);
    };
    Sector.prototype.addStation = function () {
        var station = StationBuilder.buildStation(this.app, this);
        this.sprites.push(station);
    };
    Sector.prototype.addAlienStation = function () {
        var station = StationBuilder.buildAlienStation(this.app, this);
        this.sprites.push(station);
    };
    Sector.prototype.radialDistanceFromOrigin = function () {
        var sectorNum = Sector.sectorNum;
        return 1 - Math.abs((this.arcIndex + 1) - sectorNum / 2) / (sectorNum / 2);
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
