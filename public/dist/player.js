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
        _this.acceleration = 0.0005;
        _this.rotationalAcceleration = 0.05;
        _this.color = 'grey';
        _this.accelerating = false;
        _this.direction = Math.random() * Math.PI * 2;
        _this.lockedAsteroid = null;
        return _this;
    }
    Player.prototype.update = function () {
        // if near an asteroid, lock to its speed and direction
        this.x += this.dx;
        this.y += this.dy;
        if (this.lockedAsteroid !== null) {
            this.direction += this.lockedAsteroid.rotationSpeed;
        }
    };
    Player.prototype.shipLength = function () {
        return 3;
    };
    return Player;
}(Sprite));
export default Player;
