var GameCanvas = /** @class */ (function () {
    function GameCanvas(app, width) {
        if (width === void 0) { width = 800; }
        this.app = app;
    }
    GameCanvas.prototype.draw = function (app) {
        throw new Error('Method not implemented.');
    };
    Object.defineProperty(GameCanvas.prototype, "width", {
        get: function () {
            return this.canvas.width;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GameCanvas.prototype, "height", {
        get: function () {
            return this.canvas.height;
        },
        enumerable: false,
        configurable: true
    });
    return GameCanvas;
}());
export { GameCanvas };
