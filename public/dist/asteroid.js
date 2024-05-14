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
import AsteroidRenderer from './asteroidrenderer.js';
import { Sprite } from './sprites.js';
var Asteroid = /** @class */ (function (_super) {
    __extends(Asteroid, _super);
    function Asteroid(system) {
        var _this = _super.call(this) || this;
        _this.angle = 0; // Initial angle
        _this.speed = 0.1; // Speed of rotation
        _this.color = 'white';
        _this.mass = 1;
        _this.color = "rgb(" +
            Math.floor(Math.random() * 255) + "," +
            Math.floor(Math.random() * 255) + "," +
            Math.floor(Math.random() * 255) + ")";
        _this.radius = Math.random() * 4 + 2;
        _this.mass = _this.radius * 0.0005;
        _this.angle = Math.random() * Math.PI * 2;
        _this.cx = system.centerX;
        _this.cy = system.centerY;
        _this.a = Math.random() * (system.maxRadius - system.minRadius) + system.minRadius;
        _this.b = Math.random() * (system.maxRadius - system.minRadius) + system.minRadius;
        _this.distanceFromCenter = 200; // Math.random() * 50 + 50;
        _this.speed = Math.random() * 0.001 + 0.001;
        _this.asteroidPoints = AsteroidRenderer.generateAsteroidShape(10, _this.radius);
        _this.rotation = Math.random() * Math.PI * 2;
        _this.rotationSpeed = Math.random() * 0.001 + 0.0002;
        return _this;
    }
    Asteroid.prototype.update = function () {
        this.rotation += this.rotationSpeed;
        this.x = this.cx + this.a * Math.cos(this.angle);
        this.y = this.cy + this.b * Math.sin(this.angle);
        this.angle += this.speed;
        this.angle %= Math.PI * 2;
        this.distanceFromCenter = Math.sqrt(Math.pow(this.x - this.cx, 2) + Math.pow(this.y - this.cy, 2));
    };
    return Asteroid;
}(Sprite));
export { Asteroid };
