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
        var _a;
        this.zoomLevel = 100;
        this.viewPort = {
            x: 0,
            y: 0,
            width: 100,
            height: 100
        };
        this.pressedKeys = {
            "ArrowLeft": false,
            "ArrowRight": false,
            "ArrowUp": false,
            "ArrowDown": false
        };
        var largeHolderWidth = (_a = document.getElementById("largeholder")) === null || _a === void 0 ? void 0 : _a.clientWidth;
        this.sprites = [];
        this.player = new Player();
        this.sprites.push(this.player);
        this.asteroids = [];
        this.solarSystem = new SolarSystem();
        for (var i = 0; i < this.solarSystem.asteroidNum; i++) {
            this.asteroids.push(new Asteroid(this.solarSystem));
        }
        this.smallGameCanvas = new SmallGameCanvas(this);
        this.largeGameCanvas = new LargeGameCanvas(this, largeHolderWidth || 800);
        this.gameLoop = new GameLoop(this);
        window.addEventListener("resize", function () {
            var _a;
            console.log("resize");
            largeHolderWidth = (_a = document.getElementById("largeholder")) === null || _a === void 0 ? void 0 : _a.clientWidth;
            _this.largeGameCanvas.setWidth(largeHolderWidth || 800);
        });
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
    function GameCanvas(app, width) {
        if (width === void 0) { width = 800; }
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
        this.centerX = 0;
        this.centerY = 0;
        this.minRadius = 150;
        this.maxRadius = 250;
        this.width = this.maxRadius * 2 + 100;
        this.height = this.maxRadius * 2 + 100;
    }
    return SolarSystem;
}());
export { SolarSystem };
var LargeGameCanvas = /** @class */ (function (_super) {
    __extends(LargeGameCanvas, _super);
    function LargeGameCanvas(app, width) {
        var _this = _super.call(this, app, width) || this;
        _this.canvas = document.getElementById('canvas2');
        _this.canvas.width = width;
        _this.ctx = _this.canvas.getContext('2d');
        return _this;
    }
    LargeGameCanvas.prototype.setWidth = function (width) {
        console.log("setting width", width);
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
            _this.drawNormalAsteroid(asteroid, player);
        });
        if (player.lockedAsteroid) {
            this.drawLockedAsteroid(player.lockedAsteroid, player);
        }
        this.drawPlayer(player);
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
        return this.width / this.app.viewPort.width;
    };
    return LargeGameCanvas;
}(GameCanvas));
var SmallGameCanvas = /** @class */ (function (_super) {
    __extends(SmallGameCanvas, _super);
    function SmallGameCanvas(app) {
        var _this = _super.call(this, app) || this;
        _this.viewPort = {
            x: 0,
            y: 0,
            width: 10,
            height: 10
        };
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
        // draw the viewport
        this.ctx.strokeRect(this.gtlx(app.viewPort.x), this.gtly(app.viewPort.y), this.scaleFactorX(app.viewPort.width), this.scaleFactorY(app.viewPort.height));
        this.drawPlayer(app.sprites[0]);
    };
    SmallGameCanvas.prototype.drawSprite = function (asteroid) {
        this.ctx.beginPath();
        this.ctx.arc(this.gtlx(asteroid.x), this.gtly(asteroid.y), this.scaleFactorX(asteroid.radius), 0, Math.PI * 2);
        this.ctx.fillStyle = asteroid.color;
        this.ctx.fill();
        this.ctx.closePath();
    };
    SmallGameCanvas.prototype.scaleFactorX = function (x) {
        return x * (this.width / this.app.solarSystem.width);
    };
    SmallGameCanvas.prototype.scaleFactorY = function (y) {
        return y * (this.height / this.app.solarSystem.height);
    };
    SmallGameCanvas.prototype.gtlx = function (x) {
        return this.scaleFactorX(x) + this.width / 2;
    };
    SmallGameCanvas.prototype.gtly = function (y) {
        return this.scaleFactorY(y) + this.height / 2;
    };
    SmallGameCanvas.prototype.drawPlayer = function (player) {
        this.ctx.beginPath();
        this.ctx.fillStyle = 'red';
        var angle = player.direction;
        this.ctx.translate(this.gtlx(player.x), this.gtly(player.y));
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
        player.accelerating = false;
        if (this.app.pressedKeys["ArrowLeft"]) {
            player.direction -= player.rotationalAcceleration;
        }
        if (this.app.pressedKeys["ArrowRight"]) {
            player.direction += player.rotationalAcceleration;
        }
        if (this.app.pressedKeys["ArrowUp"]) {
            player.lockedAsteroid = null;
            player.accelerating = true;
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
