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
import { GameCanvas } from './gamecanvas.js';
var FakeAsteroid = /** @class */ (function () {
    function FakeAsteroid(asteroid) {
        this.x = asteroid.distanceFromCenter;
        this.y = (asteroid.angle % (Math.PI * 2)) * 100;
        this.radius = asteroid.radius;
        this.color = asteroid.color;
        this.rotation = asteroid.rotation;
        this.asteroidPoints = asteroid.asteroidPoints;
    }
    return FakeAsteroid;
}());
var LargeGameCanvas = /** @class */ (function (_super) {
    __extends(LargeGameCanvas, _super);
    function LargeGameCanvas(app, width, spriteSheet) {
        var _this = _super.call(this, app, width) || this;
        _this.spriteSheet = spriteSheet;
        _this.canvas = document.getElementById('canvas2');
        _this.canvas.width = width;
        _this.ctx = _this.canvas.getContext('2d');
        return _this;
    }
    LargeGameCanvas.prototype.setWidth = function (width) {
        this.width = width;
        this.canvas.width = width;
        this.canvas.setAttribute('width', width.toString());
    };
    Object.defineProperty(LargeGameCanvas.prototype, "width", {
        get: function () {
            return this.canvas.width;
        },
        set: function (width) {
            this.canvas.width = width;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(LargeGameCanvas.prototype, "height", {
        get: function () {
            return this.canvas.height;
        },
        set: function (height) {
            this.canvas.height = height;
        },
        enumerable: false,
        configurable: true
    });
    LargeGameCanvas.prototype.draw = function (app) {
        this.ctx.clearRect(0, 0, this.width, this.height);
        // this.ctx.fillStyle = "rgba(0, 0, 0, 0.01)"
        //this.ctx.fillRect(0, 0, this.width, this.height);
        this.centerOnPlayer(app.sprites[0]);
    };
    LargeGameCanvas.prototype.centerOnPlayer = function (player) {
        var _this = this;
        this.ctx.beginPath();
        this.app.asteroids.forEach(function (asteroid) {
            if (_this.app.viewPort.containsEntity(asteroid) === false)
                return;
            _this.drawNormalAsteroid(asteroid, player);
        });
        // this.app.planetoids.forEach(planetoid => {
        //     if (this.app.viewPort.containsEntity(planetoid) === false) return;
        //     this.drawPlanetoid(planetoid, player);
        // });
        if (player.lockedAsteroid) {
            this.drawLockedAsteroid(player.lockedAsteroid, player);
        }
        this.drawPlayer(player);
    };
    LargeGameCanvas.prototype.drawPlanetoid = function (planetoid, player) {
        this.ctx.beginPath();
        this.ctx.arc(this.app.viewPort.relativeX(planetoid) * this.scaleFactor(), this.app.viewPort.relativeY(planetoid) * this.scaleFactor(), this.scaleFactor() * planetoid.radius, 0, Math.PI * 2);
        this.ctx.fillStyle = planetoid.color;
        this.ctx.fill();
        this.ctx.closePath();
    };
    LargeGameCanvas.prototype.drawLockedAsteroid = function (asteroid, player) {
        this.ctx.strokeStyle = 'red';
        this.ctx.lineWidth = 10;
        this.drawAsteroid(asteroid, player);
        this.ctx.stroke();
    };
    LargeGameCanvas.prototype.drawNormalAsteroid = function (asteroid, player) {
        this.ctx.strokeStyle = 'white';
        this.ctx.lineWidth = 5;
        this.drawAsteroid(asteroid, player);
    };
    LargeGameCanvas.prototype.drawAsteroid = function (asteroid, player) {
        this.ctx.beginPath();
        this.ctx.fillStyle = asteroid.color;
        // console.log(asteroid.color)
        var relativeX = this.app.viewPort.relativeX(asteroid) / this.app.viewPort.radialWidth;
        var relativeY = this.app.viewPort.relativeY(asteroid) / this.app.viewPort.arcLength;
        var x = this.width - (this.width / 2 + (relativeX * this.width));
        var y = this.height - (this.height / 2 + (relativeY * this.height));
        this.ctx.translate(x, y);
        this.ctx.rotate(asteroid.rotation);
        // this.drawCircle(asteroid);
        this.drawAsteroidPoints(asteroid);
        // this.ctx.arc(normalizedAsteroid.x, normalizedAsteroid.y, asteroid.radius * this.scaleFactor(), 0, Math.PI * 2);
        this.ctx.resetTransform();
        this.ctx.fill();
    };
    LargeGameCanvas.prototype.drawCircle = function (asteroid) {
        this.ctx.arc(0, 0, asteroid.radius * this.scaleFactor(), 0, Math.PI * 2);
    };
    LargeGameCanvas.prototype.drawAsteroidPoints = function (asteroid) {
        this.ctx.beginPath();
        var points = asteroid.asteroidPoints.slice();
        var na = {
            x: asteroid.radius / 2,
            y: asteroid.radius / 2
        };
        this.ctx.moveTo((points[0].x * this.scaleFactor()) + na.x, (points[0].y * this.scaleFactor()) + na.y);
        for (var i = 1; i < points.length; i++) {
            var p = points[i];
            var newp = {
                x: (p.x * this.scaleFactor()) + na.x,
                y: (p.y * this.scaleFactor()) + na.y
            };
            this.ctx.lineTo(newp.x, newp.y);
        }
        this.ctx.closePath();
        this.ctx.stroke();
        this.ctx.fill();
    };
    // normalizedSpritePosition(asteroid: Asteroid, player: Player) {
    //     let xScale = this.width / this.app.viewPort.width;
    //     let yScale = this.height / this.app.viewPort.height;
    //     let x = asteroid.distanceFromCenter - player.distanceFromCenter;
    //     let y = asteroid.angle - player.angle;
    //     return {
    //         x: x,
    //         y: y
    //     };
    // }
    LargeGameCanvas.prototype.drawPlayer = function (player) {
        this.ctx.beginPath();
        this.ctx.fillStyle = player.color;
        var angle = player.direction;
        this.ctx.translate(this.width / 2, this.height / 2);
        this.ctx.rotate(angle);
        // draw sprite from sprite sheet
        // this.ctx.drawImage(this.spriteSheet,
        //     628, 30, 150, 300,
        //     -35, -100, 70, 200
        // );
        var length = player.shipLength();
        var halfLength = length / 2;
        var scaledHalfLength = halfLength * this.scaleFactor();
        this.ctx.fillRect(0, -2, scaledHalfLength, 4);
        this.ctx.fillRect(scaledHalfLength * -1, -3, scaledHalfLength, 6);
        if (player.accelerating === true) {
            this.ctx.fillStyle = 'orange';
            var flameLength = 0.5;
            this.ctx.fillRect(scaledHalfLength * -1 * (1 + flameLength), -1, scaledHalfLength * (flameLength), 2);
        }
        this.ctx.resetTransform();
    };
    LargeGameCanvas.prototype.scaleFactor = function () {
        return this.width / this.app.viewPort.radialWidth;
    };
    LargeGameCanvas.prototype.scaleFactorX = function (x) {
        return x * this.scaleFactor();
    };
    LargeGameCanvas.prototype.scaleFactorY = function (y) {
        return y * this.scaleFactor();
    };
    LargeGameCanvas.prototype.gtlx = function (x) {
        return this.scaleFactorX(x - this.app.viewPort.x);
    };
    LargeGameCanvas.prototype.gtly = function (y) {
        return this.scaleFactorY(y - this.app.viewPort.y);
    };
    return LargeGameCanvas;
}(GameCanvas));
export { LargeGameCanvas };
