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
        // console.log(this.height)
        for (var i = 0; i < 100; i++) {
            this.ctx.beginPath();
            this.ctx.fillStyle = 'white';
            var yHeight = this.height / 100;
            this.ctx.fillRect(20, i * yHeight, 1, 1);
            this.ctx.closePath();
        }
        var sprite = this.app.sprites[0];
        // console.log((sprite.angle / (Math.PI * 2)) * this.app.solarSystem.midRadius());
        // console.log('drawing long canvas',sprite.distanceFromCenter,sprite.angle);
        var y = this.radiansToDeimmal(sprite.angle);
        // console.log(y, sprite.angle, this.scaleY(y));
        this.app.sprites.forEach(function (sprite) {
            // console.log(sprite.distanceFromCenter,sprite.angle)
            _this.drawSprite(sprite);
        });
        this.drawSprite(sprite, 'red', 10);
    };
    LongGameCanvas.prototype.drawSprite = function (sprite, color, size) {
        if (color === void 0) { color = 'white'; }
        if (size === void 0) { size = 1; }
        this.ctx.beginPath();
        var x = sprite.relativeX();
        var y = this.radiansToDeimmal(sprite.angle);
        this.ctx.fillStyle = sprite.color || color;
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
