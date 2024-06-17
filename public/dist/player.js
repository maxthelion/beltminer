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
import { Sprite } from './sprites/sprites.js';
var Player = /** @class */ (function (_super) {
    __extends(Player, _super);
    function Player(app, system) {
        var _this = _super.call(this, app) || this;
        _this.slowAcceleration = 0.0001;
        _this.fastAcceleration = 0.01;
        _this.acceleration = _this.fastAcceleration;
        _this.rotationalAcceleration = 0.05;
        _this.color = 'grey';
        _this.accelerating = false;
        _this.system = system;
        _this.x = 0;
        _this.y = 0;
        _this.angle = 0;
        _this.distanceFromCenter = system.midRadius();
        _this.cx = 0;
        _this.cy = 0;
        _this.direction = Math.random() * Math.PI * 2;
        _this.lockedAsteroid = null;
        _this.inventory = [];
        _this.velocity = 0;
        return _this;
    }
    Player.prototype.update = function () {
        if (this.lockedAsteroid !== null) {
            this.direction += this.lockedAsteroid.rotationSpeed;
            this.angle = this.lockedAsteroid.angle;
            this.distanceFromCenter = this.lockedAsteroid.distanceFromCenter;
        }
        else {
            var systemCircumference = Math.PI * 2 * this.system.midRadius();
            this.y -= this.dy;
            // console.log(this.y);
            this.angle = (this.y / systemCircumference) * Math.PI * 2;
            // if the angle is less that 0, add 2pi to it
            if (this.angle < 0) {
                this.angle += Math.PI * 2;
            }
            else if (this.angle > Math.PI * 2) {
                this.angle -= Math.PI * 2;
            }
            this.distanceFromCenter -= (this.dx);
            //let radius = 200;
            var oldX = this.x;
            var oldY = this.y;
            this.x = this.distanceFromCenter * Math.cos(this.angle);
            // this.y = this.distanceFromCenter * Math.sin(this.angle);
            this.velocity = Math.sqrt(Math.pow(this.x - oldX, 2) + Math.pow(this.y - oldY, 2));
        }
    };
    Player.prototype.shipLength = function () {
        return 3;
    };
    Player.prototype.lockOn = function (asteroid) {
        this.lockedAsteroid = asteroid;
        this.dx = 0;
        this.dy = 0;
    };
    Player.prototype.isLocked = function () {
        return this.lockedAsteroid !== null;
    };
    Player.prototype.accelerate = function () {
        this.accelerating = true;
        this.dx += this.acceleration * Math.cos(this.direction);
        this.dy += this.acceleration * Math.sin(this.direction);
    };
    Player.prototype.isThrusting = function () {
        return this.accelerating;
    };
    return Player;
}(Sprite));
export default Player;
var Ship = /** @class */ (function () {
    function Ship() {
        this.maxCargo = 10;
        this.cargoSlots = new Array(this.maxCargo);
        for (var i = 0; i < this.maxCargo; i++) {
        }
    }
    return Ship;
}());
export { Ship };
var cargoTypes = [
    'ironore',
    'goldore',
    'water',
    'ice',
    'food',
];
