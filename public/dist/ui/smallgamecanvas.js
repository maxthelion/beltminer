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
        // this.ctx.fillStyle = "rgba(0, 0, 0, 0.01)"
        // this.ctx.fillRect(0, 0, this.width, this.height);
        app.asteroids.forEach(function (asteroid) {
            _this.drawSprite(asteroid);
        });
        app.planetoids.forEach(function (planetoid) {
            _this.drawSprite(planetoid);
        });
        this.drawViewPort();
        this.drawSector();
        this.drawSubSectors();
        this.drawPlayer(app.sprites[0]);
    };
    SmallGameCanvas.prototype.drawSubSectors = function () {
        var _this = this;
        this.app.subSectors.forEach(function (radialSectors) {
            radialSectors.forEach(function (subSector) {
                var firstAngle = subSector.minAngle;
                var lastAngle = subSector.maxAngle;
                var outerRadius = _this.scaleFactorX(subSector.minRadius);
                var innerRadius = _this.scaleFactorX(subSector.maxRadius);
                // console.log(firstAngle, lastAngle, innerRadius, outerRadius);
                _this.drawPie(firstAngle, lastAngle, innerRadius, outerRadius);
            });
        });
    };
    SmallGameCanvas.prototype.drawSector = function () {
        var sector = this.app.getSector();
        var firstAngle = sector.minAngle;
        var lastAngle = sector.maxAngle;
        var outerRadius = this.scaleFactorX(this.app.solarSystem.minRadius);
        var innerRadius = this.scaleFactorX(this.app.solarSystem.maxRadius);
        this.drawPie(firstAngle, lastAngle, innerRadius, outerRadius);
    };
    SmallGameCanvas.prototype.drawPie = function (firstAngle, lastAngle, innerRadius, outerRadius) {
        // draw the viewport
        this.ctx.translate(this.width / 2, this.height / 2);
        this.ctx.rotate(-this.app.player.angle + Math.PI);
        this.ctx.strokeStyle = 'white';
        this.ctx.lineWidth = 1;
        this.ctx.beginPath();
        // draw a slice of the circle starting converting x to radius and y to angle
        this.ctx.arc(0, 0, innerRadius, firstAngle, lastAngle);
        // move to start of outer arc
        this.ctx.lineTo(0 + outerRadius * Math.cos(lastAngle), 0 + outerRadius * Math.sin(lastAngle));
        // draw outer arc
        this.ctx.arc(0, 0, outerRadius, lastAngle, firstAngle, true);
        this.ctx.lineTo(0 + innerRadius * Math.cos(firstAngle), 0 + innerRadius * Math.sin(firstAngle));
        this.ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
        this.ctx.stroke();
        // this.ctx.clip();
        this.ctx.fill();
        this.ctx.resetTransform();
    };
    SmallGameCanvas.prototype.drawViewPort = function () {
        var firstAngle = this.app.viewPort.getMinArc();
        var lastAngle = this.app.viewPort.getMaxArc();
        var outerRadius = this.scaleFactorX(this.app.viewPort.getMaxRadius());
        var innerRadius = this.scaleFactorX(this.app.viewPort.getMinRadius());
        this.drawPie(firstAngle, lastAngle, innerRadius, outerRadius);
    };
    // drawPlanetoid(planetoid: Planetoid) {
    //     this.ctx.beginPath();
    //     this.ctx.arc(
    //         this.gtlx(planetoid.x),
    //         this.gtly(planetoid.y),
    //         this.scaleFactorX(planetoid.radius),
    //         0,
    //         Math.PI * 2
    //     );
    //     this.ctx.fillStyle = planetoid.color;
    //     this.ctx.fill();
    //     this.ctx.closePath();
    // }
    SmallGameCanvas.prototype.drawSprite = function (sprite) {
        this.ctx.translate(this.width / 2, this.height / 2);
        this.ctx.rotate(-this.app.player.angle + Math.PI);
        // this.ctx.beginPath();
        this.ctx.fillStyle = sprite.color;
        this.ctx.fillRect(this.gtlx(sprite.x), this.gtly(sprite.y), Math.ceil(this.scaleFactorX(sprite.radius)), Math.ceil(this.scaleFactorY(sprite.radius)));
        // this.ctx.arc(
        //     this.gtlx(asteroid.x),
        //     this.gtly(asteroid.y),
        //     Math.round(this.scaleFactorX(asteroid.radius)),
        //     0,
        //     Math.PI * 2
        // );
        this.ctx.fill();
        this.ctx.closePath();
        this.ctx.resetTransform();
    };
    SmallGameCanvas.prototype.scaleFactorX = function (x) {
        return x * (this.width / this.app.solarSystem.width);
    };
    SmallGameCanvas.prototype.scaleFactorY = function (y) {
        return y * (this.height / this.app.solarSystem.height);
    };
    SmallGameCanvas.prototype.gtlx = function (x) {
        return this.scaleFactorX(x);
    };
    SmallGameCanvas.prototype.gtly = function (y) {
        return this.scaleFactorY(y);
    };
    SmallGameCanvas.prototype.drawPlayer = function (player) {
        var nine = 90 * (Math.PI / 180);
        // nine %= Math.PI / 2;
        this.ctx.translate(this.width / 2, this.height / 2);
        this.ctx.rotate(nine);
        this.ctx.beginPath();
        this.ctx.fillStyle = 'red';
        var angle = player.direction;
        var radius = player.distanceFromCenter;
        var x = radius * Math.cos(nine);
        var y = radius * Math.sin(nine);
        this.ctx.translate(this.gtlx(x), this.gtly(y));
        // this.ctx.rotate(nine);
        var length = player.shipLength();
        this.ctx.fillRect(0, -2, length / 2, 4);
        this.ctx.fillRect(length / 2 * -1, -3, length / 2, 6);
        this.ctx.resetTransform();
        this.ctx.closePath();
    };
    return SmallGameCanvas;
}(GameCanvas));
export { SmallGameCanvas };
