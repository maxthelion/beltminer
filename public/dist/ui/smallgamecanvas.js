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
        app.asteroids.forEach(function (asteroid) {
            _this.drawSprite(asteroid);
        });
        app.planetoids.forEach(function (planetoid) {
            _this.drawPlanetoid(planetoid);
        });
        this.drawViewPort();
        this.drawPlayer(app.sprites[0]);
    };
    SmallGameCanvas.prototype.drawViewPort = function () {
        // draw the viewport
        this.ctx.translate(this.width / 2, this.height / 2);
        this.ctx.rotate(-this.app.player.angle + Math.PI);
        this.ctx.strokeStyle = 'white';
        this.ctx.lineWidth = 1;
        this.ctx.beginPath();
        var firstAngle = this.app.viewPort.getMinArc();
        var lastAngle = this.app.viewPort.getMaxArc();
        var outerRadius = this.scaleFactorX(this.app.viewPort.getMaxRadius());
        var innerRadius = this.scaleFactorX(this.app.viewPort.getMinRadius());
        // draw a slice of the circle starting converting x to radius and y to angle
        this.ctx.arc(0, 0, innerRadius, firstAngle, lastAngle);
        // move to start of outer arc
        this.ctx.lineTo(0 + outerRadius * Math.cos(lastAngle), 0 + outerRadius * Math.sin(lastAngle));
        // draw outer arc
        this.ctx.arc(0, 0, outerRadius, lastAngle, firstAngle, true);
        this.ctx.lineTo(0 + innerRadius * Math.cos(firstAngle), 0 + innerRadius * Math.sin(firstAngle));
        this.ctx.stroke();
        this.ctx.resetTransform();
        // this.ctx.strokeRect(
        //     this.gtlx(app.viewPort.x),
        //     this.gtly(app.viewPort.y),
        //     this.scaleFactorX(app.viewPort.width),
        //     this.scaleFactorY(app.viewPort.height)
        // );
    };
    SmallGameCanvas.prototype.drawPlanetoid = function (planetoid) {
        this.ctx.beginPath();
        this.ctx.arc(this.gtlx(planetoid.x), this.gtly(planetoid.y), this.scaleFactorX(planetoid.radius), 0, Math.PI * 2);
        this.ctx.fillStyle = planetoid.color;
        this.ctx.fill();
        this.ctx.closePath();
    };
    SmallGameCanvas.prototype.drawSprite = function (asteroid) {
        this.ctx.translate(this.width / 2, this.height / 2);
        this.ctx.rotate(-this.app.player.angle + Math.PI);
        this.ctx.beginPath();
        this.ctx.arc(this.gtlx(asteroid.x), this.gtly(asteroid.y), this.scaleFactorX(asteroid.radius), 0, Math.PI * 2);
        this.ctx.fillStyle = asteroid.color;
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
