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
import { Actor } from './sprites/actor.js';
var Player = /** @class */ (function (_super) {
    __extends(Player, _super);
    function Player(app, system) {
        var _this = _super.call(this, app) || this;
        _this.color = 'grey';
        _this.system = system;
        _this.x = 0;
        _this.y = 0;
        _this.angle = 0;
        _this.distanceFromCenter = system.midRadius();
        _this.rotation = Math.random() * Math.PI * 2;
        _this.lockedAsteroid = null;
        _this.inventory = [];
        _this.velocity = 0;
        return _this;
    }
    Player.prototype.update = function () {
        if (this.lockedAsteroid !== null) {
            this.rotation += this.lockedAsteroid.rotationSpeed;
            this.angle = this.lockedAsteroid.angle;
            this.distanceFromCenter = this.lockedAsteroid.distanceFromCenter;
        }
        else {
            this.updateCoordinates();
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
    Player.prototype.isThrusting = function () {
        return this.accelerating;
    };
    return Player;
}(Actor));
export default Player;
