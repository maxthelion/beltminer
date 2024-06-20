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
import { Vector } from "./vector.js";
var Actor = /** @class */ (function (_super) {
    __extends(Actor, _super);
    function Actor(app) {
        var _this = _super.call(this, app) || this;
        _this.radius = 10;
        _this.tickInterval = 50;
        _this.frame = 0;
        _this.length = 0;
        _this.rotation = 0;
        _this.slowAcceleration = 0.0001;
        _this.fastAcceleration = 0.01;
        _this.acceleration = _this.fastAcceleration;
        _this.rotationalAcceleration = 0.05;
        _this.accelerating = false;
        _this.velocity = 0;
        _this.vector = new Vector(0, 0);
        _this.x = 50;
        _this.y = 50;
        _this.dx = 0;
        _this.dy = 0;
        _this.angle = 0;
        _this.distanceFromCenter = 0;
        return _this;
    }
    Actor.prototype.render = function (gamecanvas) {
        var sprite = this;
        // this.ctx.beginPath();
        var ctx = gamecanvas.ctx;
        ctx.fillStyle = sprite.color;
        // console.log(sprite.radius);
        var width = Math.ceil(gamecanvas.scaleFactorX(sprite.radius)) * 2;
        var height = Math.ceil(gamecanvas.scaleFactorY(sprite.radius)) * 2;
        ctx.fillRect(gamecanvas.gtlx(sprite.systemX()) - (width / 2), gamecanvas.gtly(sprite.systemY()) - (height / 2), width, height);
        // ctx.arc(
        //     this.gtlx(asteroid.x),
        //     this.gtly(asteroid.y),
        //     Math.round(this.scaleFactorX(asteroid.radius)),
        //     0,
        //     Math.PI * 2
        // );
        ctx.fill();
        ctx.closePath();
    };
    Actor.prototype.accelerate = function () {
        this.accelerating = true;
        var thrustVector = new Vector(-this.acceleration, 0);
        thrustVector.rotate(this.rotation);
        this.vector.add(thrustVector);
    };
    Actor.prototype.updateCoordinates = function () {
        this.x += this.vector.x;
        this.y += this.vector.y;
        var systemCircumference = Math.PI * 2 * this.system.midRadius();
        // keep the y value within the system circumference
        // console.log(this.y);
        this.y = this.y % systemCircumference;
        // console.log(this.y / systemCircumference);
        this.angle = (this.y / systemCircumference) * Math.PI * 2;
        // if the angle is less that 0, add 2pi to it
        // if (this.angle < 0) {
        //     this.angle += Math.PI * 2;
        // } else if (this.angle > Math.PI * 2) {
        //     this.angle -= Math.PI * 2;
        // }
        this.distanceFromCenter = this.system.midRadius() + this.x;
        //let radius = 200;
        var oldX = this.x;
        var oldY = this.y;
        // this.x = this.distanceFromCenter * Math.cos(this.angle);
        // this.y = this.distanceFromCenter * Math.sin(this.angle);
        this.velocity = Math.sqrt(Math.pow(this.x - oldX, 2) + Math.pow(this.y - oldY, 2));
    };
    Actor.prototype.stop = function () {
        this.vector = new Vector(0, 0);
    };
    Actor.prototype.systemX = function () {
        return this.distanceFromCenter * Math.cos(this.angle);
    };
    Actor.prototype.systemY = function () {
        return this.distanceFromCenter * Math.sin(this.angle);
    };
    Actor.prototype.bandX = function () {
        return this.x;
    };
    Actor.prototype.bandY = function () {
        return this.y;
    };
    return Actor;
}(Sprite));
export { Actor };
