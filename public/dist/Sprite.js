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
var Sprite = /** @class */ (function () {
    function Sprite() {
        this.x = 50;
        this.y = 50;
        this.dx = 0;
        this.dy = 0;
    }
    Sprite.prototype.update = function () {
        this.x += this.dx;
        this.y += this.dy;
    };
    return Sprite;
}());
export { Sprite };
var Asteroid = /** @class */ (function (_super) {
    __extends(Asteroid, _super);
    function Asteroid() {
        var _this = _super.call(this) || this;
        _this.angle = 0; // Initial angle
        _this.a = 150; // Semi-major axis length
        _this.b = 100; // Semi-minor axis length
        _this.cx = 200; // Center x
        _this.cy = 200; // Center y
        _this.distance = 50; // Distance from the center of the ellipse
        _this.speed = 0.1; // Speed of rotation
        _this.color = 'white';
        _this.color = "rgb(" +
            Math.floor(Math.random() * 255) + "," +
            Math.floor(Math.random() * 255) + "," +
            Math.floor(Math.random() * 255) + ")";
        _this.radius = Math.random() * 10;
        _this.angle = Math.random() * Math.PI * 2;
        _this.a = Math.random() * 100 + 50;
        _this.b = Math.random() * 100 + 50;
        _this.distance = Math.random() * 50 + 50;
        _this.speed = Math.random() * 0.001 + 0.001;
        _this.asteroidPoints = AsteroidRenderer.generateAsteroidShape(10, _this.radius);
        return _this;
    }
    Asteroid.prototype.update = function () {
        this.x = this.cx + this.a * Math.cos(this.angle);
        this.y = this.cy + this.b * Math.sin(this.angle);
        this.angle += this.speed;
    };
    return Asteroid;
}(Sprite));
export { Asteroid };
