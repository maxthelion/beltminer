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
import { Sprite } from './sprites.js';
var Player = /** @class */ (function (_super) {
    __extends(Player, _super);
    function Player() {
        var _this = _super.call(this) || this;
        _this.acceleration = 0.005;
        _this.rotationalAcceleration = 0.05;
        _this.color = 'grey';
        _this.accelerating = false;
        _this.x = 200;
        _this.y = 50;
        _this.angle = 0;
        _this.distanceFromCenter = 200;
        _this.cx = 0;
        _this.cy = 0;
        _this.direction = Math.random() * Math.PI * 2;
        _this.lockedAsteroid = null;
        _this.inventory = [];
        return _this;
    }
    Player.prototype.update = function () {
        if (this.lockedAsteroid !== null) {
            this.direction += this.lockedAsteroid.rotationSpeed;
            this.angle = this.lockedAsteroid.angle;
            this.distanceFromCenter = this.lockedAsteroid.distanceFromCenter;
        }
        else {
            // if near an asteroid, lock to its speed and direction
            this.angle -= this.dy / 1000;
            this.angle %= Math.PI * 2;
            this.distanceFromCenter -= (this.dx);
            //let radius = 200;
            this.x = this.distanceFromCenter * Math.cos(this.angle);
            this.y = this.distanceFromCenter * Math.sin(this.angle);
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
