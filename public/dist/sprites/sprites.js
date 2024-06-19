var Sprite = /** @class */ (function () {
    function Sprite(app) {
        this.color = "yellow";
        this.app = app;
        this.system = app.solarSystem;
        this.uuid = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        this.x = 50;
        this.y = 50;
        this.dx = 0;
        this.dy = 0;
        this.angle = 0;
        this.distanceFromCenter = 0;
    }
    Sprite.prototype.update = function () {
        this.x += this.dx;
        this.y += this.dy;
    };
    Sprite.prototype.render = function (gamecanvas) {
        gamecanvas.ctx.beginPath();
        gamecanvas.ctx.fillStyle = this.color || 'white';
        gamecanvas.ctx.arc(this.x, this.y, 10, 0, Math.PI * 2);
        gamecanvas.ctx.fill();
        gamecanvas.ctx.stroke();
    };
    Sprite.prototype.relativeX = function () {
        var min = this.app.solarSystem.minRadius;
        var max = this.app.solarSystem.maxRadius;
        return (this.distanceFromCenter - min) / (max - min);
    };
    Sprite.prototype.systemX = function () {
        throw new Error('Not implemented');
    };
    Sprite.prototype.systemY = function () {
        throw new Error('Not implemented');
    };
    Sprite.prototype.bandX = function () {
        throw new Error('Not implemented');
    };
    Sprite.prototype.bandY = function () {
        throw new Error('Not implemented');
    };
    return Sprite;
}());
export { Sprite };
