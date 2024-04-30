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
import { Asteroid } from './sprites.js';
import Player from './player.js';
var App = /** @class */ (function () {
    function App() {
        var _this = this;
        this.zoomLevel = 100;
        this.viewPort = {
            x: 0,
            y: 0,
            width: 40,
            height: 40
        };
        this.pressedKeys = {
            "ArrowLeft": false,
            "ArrowRight": false,
            "ArrowUp": false,
            "ArrowDown": false
        };
        this.sprites = [];
        this.player = new Player();
        this.sprites.push(this.player);
        this.asteroids = [];
        this.solarSystem = new SolarSystem();
        for (var i = 0; i < this.solarSystem.asteroidNum; i++) {
            this.asteroids.push(new Asteroid(this.solarSystem));
        }
        this.smallGameCanvas = new SmallGameCanvas(this);
        this.largeGameCanvas = new LargeGameCanvas(this);
        this.gameLoop = new GameLoop(this);
        document.addEventListener('keydown', function (e) {
            if (_this.pressedKeys[e.key] !== undefined) {
                _this.pressedKeys[e.key] = true;
            }
        });
        document.addEventListener('keyup', function (e) {
            if (_this.pressedKeys[e.key] !== undefined) {
                _this.pressedKeys[e.key] = false;
            }
        });
    }
    App.prototype.init = function () {
        this.gameLoop.start();
    };
    return App;
}());
export default App;
var GameCanvas = /** @class */ (function () {
    function GameCanvas(app) {
        this.app = app;
    }
    GameCanvas.prototype.draw = function (app) {
        throw new Error('Method not implemented.');
    };
    Object.defineProperty(GameCanvas.prototype, "width", {
        get: function () {
            return this.canvas.width;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GameCanvas.prototype, "height", {
        get: function () {
            return this.canvas.height;
        },
        enumerable: false,
        configurable: true
    });
    return GameCanvas;
}());
var SolarSystem = /** @class */ (function () {
    function SolarSystem() {
        this.asteroidNum = 200;
        this.centerX = 200;
        this.centerY = 200;
        this.minRadius = 150;
        this.maxRadius = 250;
    }
    return SolarSystem;
}());
export { SolarSystem };
var LargeGameCanvas = /** @class */ (function (_super) {
    __extends(LargeGameCanvas, _super);
    function LargeGameCanvas(app) {
        var _this = _super.call(this, app) || this;
        _this.canvas = document.getElementById('canvas2');
        _this.ctx = _this.canvas.getContext('2d');
        return _this;
    }
    Object.defineProperty(LargeGameCanvas.prototype, "width", {
        get: function () {
            return this.canvas.width;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(LargeGameCanvas.prototype, "height", {
        get: function () {
            return this.canvas.height;
        },
        enumerable: false,
        configurable: true
    });
    LargeGameCanvas.prototype.draw = function (app) {
        this.ctx.clearRect(0, 0, this.width, this.height);
        this.centerOnPlayer(app.sprites[0]);
    };
    LargeGameCanvas.prototype.centerOnPlayer = function (player) {
        var _this = this;
        // this.ctx.translate(this.width / 2, this.height / 2);
        // this.ctx.scale(1 + app.zoomLevel, 1 + app.zoomLevel);
        // this.ctx.translate(-player.x, -player.y);
        this.ctx.beginPath();
        this.app.asteroids.forEach(function (asteroid) {
            if (asteroid.x < _this.app.viewPort.x - 30)
                return;
            if (asteroid.x > _this.app.viewPort.x + _this.app.viewPort.width + 30)
                return;
            if (asteroid.y < _this.app.viewPort.y - 30)
                return;
            if (asteroid.y > _this.app.viewPort.y + _this.app.viewPort.height + 30)
                return;
            _this.drawAsteroid(asteroid, player);
        });
        this.drawPlayer(player);
    };
    LargeGameCanvas.prototype.drawAsteroid = function (asteroid, player) {
        this.ctx.beginPath();
        var normalizedAsteroid = this.normalizedSpritePosition(asteroid, player);
        this.ctx.fillStyle = asteroid.color;
        // console.log(asteroid.color)
        this.ctx.translate(normalizedAsteroid.x, normalizedAsteroid.y);
        this.ctx.rotate(asteroid.rotation);
        this.drawNormalizedAsteroid(normalizedAsteroid, asteroid);
        // this.ctx.arc(normalizedAsteroid.x, normalizedAsteroid.y, asteroid.radius * this.scaleFactor(), 0, Math.PI * 2);
        this.ctx.resetTransform();
        this.ctx.fill();
    };
    LargeGameCanvas.prototype.drawNormalizedAsteroid = function (normalized, asteroid) {
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
    LargeGameCanvas.prototype.normalizedSpritePosition = function (asteroid, player) {
        var xScale = this.width / this.app.viewPort.width;
        var yScale = this.height / this.app.viewPort.height;
        return {
            x: ((asteroid.x) - (this.app.viewPort.x)) * xScale,
            y: ((asteroid.y) - (this.app.viewPort.y)) * yScale
        };
    };
    LargeGameCanvas.prototype.drawPlayer = function (player) {
        this.ctx.beginPath();
        this.ctx.fillStyle = player.color;
        var angle = player.direction;
        this.ctx.translate(this.width / 2, this.height / 2);
        this.ctx.rotate(angle);
        var length = player.shipLength();
        var halfLength = length / 2;
        var scaledHalfLength = halfLength * this.scaleFactor();
        this.ctx.rect(0, -2, scaledHalfLength, 4);
        this.ctx.rect(scaledHalfLength * -1, -3, scaledHalfLength, 6);
        this.ctx.resetTransform();
        this.ctx.fill();
    };
    LargeGameCanvas.prototype.scaleFactor = function () {
        return this.width / this.app.viewPort.width;
    };
    return LargeGameCanvas;
}(GameCanvas));
var SmallGameCanvas = /** @class */ (function (_super) {
    __extends(SmallGameCanvas, _super);
    function SmallGameCanvas(app) {
        var _this = _super.call(this, app) || this;
        _this.canvas = document.getElementById('canvas');
        _this.ctx = _this.canvas.getContext('2d');
        return _this;
    }
    SmallGameCanvas.prototype.draw = function (app) {
        var _this = this;
        this.ctx.clearRect(0, 0, this.width, this.height);
        app.asteroids.forEach(function (asteroid) {
            _this.drawSprite(asteroid);
        });
        this.ctx.strokeStyle = 'white';
        this.ctx.strokeRect(app.viewPort.x, app.viewPort.y, app.viewPort.width, app.viewPort.height);
        this.drawPlayer(app.sprites[0]);
    };
    SmallGameCanvas.prototype.drawSprite = function (asteroid) {
        this.ctx.beginPath();
        this.ctx.arc(asteroid.x, asteroid.y, asteroid.radius, 0, Math.PI * 2);
        this.ctx.fillStyle = asteroid.color;
        this.ctx.fill();
        this.ctx.closePath();
    };
    SmallGameCanvas.prototype.drawPlayer = function (player) {
        this.ctx.beginPath();
        this.ctx.fillStyle = 'red';
        var angle = player.direction;
        this.ctx.translate(player.x, player.y);
        //this.ctx.transform(Math.cos(angle), Math.sin(angle), -Math.sin(angle), Math.cos(angle), player.x, player.y);
        this.ctx.rotate(angle);
        var length = player.shipLength();
        this.ctx.rect(0, -2, length / 2, 4);
        this.ctx.rect(length / 2 * -1, -3, length / 2, 6);
        this.ctx.resetTransform();
        // this.ctx.lineTo(player.x - 10, player.y + 20);
        // this.ctx.lineTo(player.x + 10, player.y + 20);
        // this.ctx.closePath();
        this.ctx.fill();
        this.ctx.closePath();
    };
    return SmallGameCanvas;
}(GameCanvas));
var GameLoop = /** @class */ (function () {
    function GameLoop(app) {
        this.app = app;
    }
    GameLoop.prototype.update = function () {
        var _this = this;
        this.processInput();
        this.app.asteroids.forEach(function (sprite) {
            sprite.update();
        });
        var influenceDistance = 100;
        var influenceBase = 0.001;
        var proximityAsteroids = this.app.asteroids.filter(function (asteroid) {
            return asteroid.x > _this.app.viewPort.x - influenceDistance &&
                asteroid.x < _this.app.viewPort.x + _this.app.viewPort.width + influenceDistance &&
                asteroid.y > _this.app.viewPort.y - influenceDistance &&
                asteroid.y < _this.app.viewPort.y + _this.app.viewPort.height + influenceDistance;
        });
        var player = this.app.sprites[0];
        if (player.lockedAsteroid) {
            player.x = player.lockedAsteroid.x;
            player.y = player.lockedAsteroid.y;
        }
        else {
            proximityAsteroids.forEach(function (asteroid) {
                var dx = asteroid.x - player.x;
                var dy = asteroid.y - player.y;
                var distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < influenceDistance) {
                    // if similar direction, match speed
                    if (distance < 10 &&
                        Math.abs(player.dx - asteroid.dx) < 10 &&
                        Math.abs(player.dy - asteroid.dy) < 10) {
                        if (distance < 0.5) {
                            player.dx = 0;
                            player.dy = 0;
                            player.lockedAsteroid = asteroid;
                        }
                        var inverseDistance = 1 / distance * 0.1;
                        player.x += (asteroid.x - player.x) * inverseDistance;
                        player.y += (asteroid.y - player.y) * inverseDistance;
                    }
                    else {
                        var angle = Math.atan2(dy, dx);
                        var massInfluence = asteroid.mass * influenceBase * Math.log(distance);
                        player.dx += Math.cos(angle) * massInfluence;
                        player.dy += Math.sin(angle) * massInfluence;
                    }
                }
            });
        }
        this.app.player.update();
        this.app.viewPort.x = this.app.sprites[0].x - (this.app.viewPort.width / 2);
        this.app.viewPort.y = this.app.sprites[0].y - (this.app.viewPort.height / 2);
        this.app.largeGameCanvas.draw(this.app);
        this.app.smallGameCanvas.draw(this.app);
    };
    GameLoop.prototype.processInput = function () {
        var player = this.app.sprites[0];
        if (this.app.pressedKeys["ArrowLeft"]) {
            player.direction -= player.rotationalAcceleration;
        }
        if (this.app.pressedKeys["ArrowRight"]) {
            player.direction += player.rotationalAcceleration;
        }
        if (this.app.pressedKeys["ArrowUp"]) {
            player.lockedAsteroid = null;
            player.dx += player.acceleration * Math.cos(player.direction);
            player.dy += player.acceleration * Math.sin(player.direction);
        }
        if (this.app.pressedKeys["ArrowDown"]) {
            player.dx = 0;
            player.dy = 0;
        }
    };
    GameLoop.prototype.start = function () {
        var _this = this;
        setInterval(function () {
            _this.update();
        }, 1000 / 60);
    };
    return GameLoop;
}());
