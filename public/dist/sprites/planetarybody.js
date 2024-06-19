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
import { Sprite } from "./sprites.js";
var PlanetaryBody = /** @class */ (function (_super) {
    __extends(PlanetaryBody, _super);
    function PlanetaryBody(app, sector) {
        var _this = _super.call(this, app) || this;
        _this.color = 'pink';
        _this.mass = 1;
        _this.speed = 0;
        _this.rotation = 0;
        _this.rotationSpeed = 0.001;
        _this.sector = sector;
        _this.radius = 30;
        _this.mass = _this.radius * 0.0005;
        _this.angle = Math.random() * (sector.maxAngle - sector.minAngle) + sector.minAngle;
        _this.setAngle();
        _this.distanceFromCenter = (Math.random() * app.solarSystem.radialRange()) + app.solarSystem.minRadius;
        return _this;
    }
    PlanetaryBody.prototype.setAngle = function () {
        this.angle = Math.random() * (this.sector.maxAngle - this.sector.minAngle) + this.sector.minAngle;
    };
    PlanetaryBody.prototype.update = function () {
        this.rotation += this.rotationSpeed;
        this.angle += this.speed;
        this.x = this.distanceFromCenter * Math.cos(this.angle);
        this.y = this.distanceFromCenter * Math.sin(this.angle);
    };
    PlanetaryBody.prototype.systemX = function () {
        return this.x;
    };
    PlanetaryBody.prototype.systemY = function () {
        return this.y;
    };
    PlanetaryBody.prototype.bandX = function () {
        return this.distanceFromCenter - this.app.solarSystem.minRadius;
    };
    PlanetaryBody.prototype.bandY = function () {
        return this.app.solarSystem.circumference() * (this.angle / (Math.PI * 2));
    };
    return PlanetaryBody;
}(Sprite));
export { PlanetaryBody };
