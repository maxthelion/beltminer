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
import Player from '../player.js';
import { GameCanvas } from './gamecanvas.js';
import { Mob } from '../sprites/mob.js';
var LongGameCanvas = /** @class */ (function (_super) {
    __extends(LongGameCanvas, _super);
    function LongGameCanvas(app, width) {
        var _this = _super.call(this, app, width) || this;
        _this.canvas = document.getElementById('longcanvas');
        _this.canvas.width = 100;
        _this.canvas.height = 1000;
        _this.ctx = _this.canvas.getContext('2d');
        _this.height = _this.canvas.height;
        _this.width = _this.canvas.width;
        return _this;
    }
    LongGameCanvas.prototype.draw = function (app) {
        var _this = this;
        this.ctx.clearRect(0, 0, this.width, this.height);
        var player = this.app.sprites[0];
        // console.log((sprite.angle / (Math.PI * 2)) * this.app.solarSystem.midRadius());
        // console.log('drawing long canvas',sprite.distanceFromCenter,sprite.angle);
        var y = this.radiansToDeimmal(player.angle);
        // console.log(y, sprite.angle, this.scaleY(y));
        this.app.sprites.forEach(function (sprite) {
            // console.log(sprite.distanceFromCenter,sprite.angle)
            if (sprite instanceof Planetoid) {
                _this.drawSprite(sprite, 'orange', 10);
            }
            else if (sprite instanceof Asteroid) {
                _this.drawSprite(sprite, sprite.color, 1);
            }
            else if (sprite instanceof Mob) {
                _this.drawSprite(sprite, 'white', 3);
                _this.ctx.beginPath();
                _this.ctx.strokeStyle = 'white';
                var destx = sprite.destination.relativeX();
                var desty = _this.radiansToDeimmal(sprite.destination.angle);
                _this.ctx.moveTo(_this.scaleX(destx), _this.scaleY(desty));
                _this.ctx.lineTo(_this.scaleX(sprite.relativeX()), _this.scaleY(_this.radiansToDeimmal(sprite.angle)));
                _this.ctx.stroke();
                _this.drawSprite(sprite.destination, 'yellow', 3);
            }
            else if (sprite instanceof Player) {
                _this.drawSprite(sprite, 'red', 5);
            }
            else {
                _this.drawSprite(sprite, 'cyan', 5);
            }
        });
    };
    LongGameCanvas.prototype.drawSprite = function (sprite, color, size) {
        if (color === void 0) { color = 'white'; }
        if (size === void 0) { size = 1; }
        this.ctx.beginPath();
        var x = sprite.relativeX();
        var y = this.radiansToDeimmal(sprite.angle);
        this.ctx.fillStyle = color;
        // console.log(x, y);
        this.ctx.fillRect(this.scaleX(x) - size / 2, this.scaleY(y) - size / 2, size, size);
        // this.ctx.fill();
        this.ctx.closePath();
    };
    LongGameCanvas.prototype.radiansToDeimmal = function (radians) {
        return (radians / (Math.PI * 2));
    };
    LongGameCanvas.prototype.scaleX = function (x) {
        return this.width - (this.width * x);
    };
    LongGameCanvas.prototype.scaleY = function (y) {
        return this.height - (this.height * y);
    };
    return LongGameCanvas;
}(GameCanvas));
export { LongGameCanvas };
