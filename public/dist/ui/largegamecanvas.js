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
import { Planetoid } from '../sprites/planetoid.js';
import { Asteroid } from '../sprites/asteroid.js';
import { GameCanvas } from './gamecanvas.js';
import { Station } from '../sprites/station.js';
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
    LargeGameCanvas.prototype.draw = function (app) {
        var _this = this;
        this.ctx.clearRect(0, 0, this.width, this.height);
        // this.ctx.fillStyle = "rgba(0, 0, 0, 0.01)"
        //this.ctx.fillRect(0, 0, this.width, this.height);
        var player = this.app.sprites[0];
        this.ctx.beginPath();
        this.app.proximateBodies().forEach(function (body) {
            if (body instanceof Asteroid) {
                _this.drawNormalAsteroid(body, player);
            }
            if (body instanceof Planetoid) {
                _this.drawPlanetoid(body, player);
            }
            if (body instanceof Station) {
                _this.drawSprite(body, player);
            }
        });
        this.app.actors.forEach(function (actor) {
            _this.drawSprite(actor, player);
        });
        if (player.lockedAsteroid) {
            this.drawLockedAsteroid(player.lockedAsteroid, player);
        }
        if (this.app.focussedSprite !== undefined) {
            this.drawFocussedSprite(this.app.focussedSprite, player);
        }
        this.drawPlayer(player);
        this.drawSubSectors();
    };
    LargeGameCanvas.prototype.drawSubSectors = function () {
        var _this = this;
        this.app.currentSubSectors.forEach(function (subSector) {
            _this.drawSector(subSector);
        });
    };
    LargeGameCanvas.prototype.drawSector = function (sector) {
        // let sector = this.app.getSector();
        this.ctx.strokeStyle = 'white';
        this.ctx.lineWidth = 1;
        this.ctx.beginPath();
        // console.log(sector.minAngle, sector.maxAngle)
        // let relativeY = this.scaleFactorY(sector.minAngle);
        var relativeYMin = (sector.minAngle - this.app.player.angle) / this.app.viewPort.arcLength;
        var relativeYMax = (sector.maxAngle - this.app.player.angle) / this.app.viewPort.arcLength;
        var ymin = this.height - (this.height / 2 + (relativeYMin * this.height));
        var ymax = this.height - (this.height / 2 + (relativeYMax * this.height));
        var relativeXMin = (sector.minRadius - this.app.player.distanceFromCenter) / this.app.viewPort.radialWidth;
        var relativeXMax = (sector.maxRadius - this.app.player.distanceFromCenter) / this.app.viewPort.radialWidth;
        var xmin = this.width - (this.width / 2 + (relativeXMin * this.width));
        var xmax = this.width - (this.width / 2 + (relativeXMax * this.width));
        // let x = this.width - (this.width/ 2 + (relativeX * this.width)); 
        xmax = Math.round(xmax);
        xmin = Math.round(xmin);
        ymax = Math.round(ymax);
        ymin = Math.round(ymin);
        this.ctx.moveTo(xmin, ymin);
        this.ctx.lineTo(xmax, ymin);
        this.ctx.lineTo(xmax, ymax);
        this.ctx.lineTo(xmin, ymax);
        this.ctx.closePath();
        this.ctx.stroke();
        // let firstAngle =    this.scaleFactorY(sector.minAngle);
        // let lastAngle =     this.scaleFactorY(sector.maxAngle);
        // let outerRadius = this.scaleFactorX( this.app.solarSystem.minRadius ) ;
        // let innerRadius = this.scaleFactorX( this.app.solarSystem.maxRadius ) ;
        // this.ctx.beginPath();
        // this.ctx.moveTo(firstAngle, outerRadius);
        // this.ctx.lineTo(lastAngle, outerRadius);
        // this.ctx.lineTo(lastAngle, innerRadius);
        // this.ctx.lineTo(firstAngle, innerRadius);
        // this.ctx.stroke();
        // console.log(firstAngle, lastAngle, outerRadius, innerRadius);
    };
    LargeGameCanvas.prototype.drawFocussedSprite = function (sprite, player) {
        var _this = this;
        this.ctx.beginPath();
        this.centerOnSpriteAndDraw(sprite, player, function (spritetorender) {
            var asteroid = spritetorender;
            _this.ctx.strokeStyle = 'cyan';
            _this.ctx.lineWidth = 2;
            var w = asteroid.radius * 4;
            var h = asteroid.radius * 4;
            _this.ctx.strokeRect(_this.scaleFactorX(-w / 2), _this.scaleFactorY(-h / 2), _this.scaleFactorX(w), _this.scaleFactorY(h));
        });
    };
    LargeGameCanvas.prototype.drawLockedAsteroid = function (asteroid, player) {
        this.ctx.strokeStyle = 'red';
        this.ctx.lineWidth = 10;
        this.drawAsteroid(asteroid, player);
    };
    LargeGameCanvas.prototype.drawNormalAsteroid = function (asteroid, player) {
        this.ctx.strokeStyle = 'white';
        this.ctx.lineWidth = 3;
        this.drawAsteroid(asteroid, player);
    };
    LargeGameCanvas.prototype.drawSprite = function (sprite, player) {
        var _this = this;
        // console.log(sprite)
        this.ctx.beginPath();
        this.centerOnSpriteAndDraw(sprite, player, function (spritetorender) {
            _this.drawTriangle(spritetorender);
        });
    };
    LargeGameCanvas.prototype.drawTriangle = function (sprite) {
        // this.ctx.fillStyle = sprite.color;
        var width = 10;
        var height = sprite.length;
        this.ctx.beginPath();
        this.ctx.moveTo(width / 2 * -1, 0);
        this.ctx.lineTo(0, height);
        this.ctx.lineTo(width / 2, 0);
        this.ctx.closePath();
        this.ctx.stroke();
        this.ctx.fill();
    };
    LargeGameCanvas.prototype.centerOnSpriteAndDraw = function (asteroid, player, drawFunction) {
        var _a;
        this.ctx.beginPath();
        this.ctx.fillStyle = asteroid.color;
        if (((_a = this.app.focussedSprite) === null || _a === void 0 ? void 0 : _a.uuid) === asteroid.uuid) {
            this.ctx.fillStyle = 'red';
            this.ctx.strokeStyle = 'cyan';
            this.ctx.lineWidth = 2;
            // console.log(asteroid.uuid)
        }
        else {
            this.ctx.strokeStyle = 'white';
            this.ctx.lineWidth = 1;
        }
        // console.log(asteroid.color)
        var relativeX = this.app.viewPort.relativeX(asteroid) / this.app.viewPort.radialWidth;
        var relativeY = this.app.viewPort.relativeY(asteroid) / this.app.viewPort.arcLength;
        var x = this.width - (this.width / 2 + (relativeX * this.width));
        var y = this.height - (this.height / 2 + (relativeY * this.height));
        this.ctx.translate(x, y);
        this.ctx.rotate(asteroid.rotation);
        drawFunction(asteroid);
        // this.ctx.arc(normalizedAsteroid.x, normalizedAsteroid.y, asteroid.radius * this.scaleFactor(), 0, Math.PI * 2);
        this.ctx.resetTransform();
        this.ctx.fill();
        this.ctx.stroke();
    };
    LargeGameCanvas.prototype.drawAsteroid = function (asteroid, player) {
        var _this = this;
        this.centerOnSpriteAndDraw(asteroid, player, function (sprite) { _this.drawAsteroidPoints(sprite); });
    };
    LargeGameCanvas.prototype.drawPlanetoid = function (planetoid, player) {
        var _this = this;
        // console.log(planetoid)
        this.centerOnSpriteAndDraw(planetoid, player, function (sprite) { _this.drawCircle(sprite); });
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
        var angle = player.rotation;
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
    return LargeGameCanvas;
}(GameCanvas));
export { LargeGameCanvas };
