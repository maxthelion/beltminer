var GameCanvas = /** @class */ (function () {
    function GameCanvas(app, width) {
        if (width === void 0) { width = 800; }
        this.app = app;
        this.width = width;
        this.height = width;
    }
    GameCanvas.prototype.draw = function (app) {
        throw new Error('Method not implemented.');
    };
    // set width(width: number) {
    //     this.canvas.width = width;
    // }
    // set height(height: number) {
    //     this.canvas.height = height;
    // }
    // get width() {
    //     return this.canvas.width;
    // }
    // get height() {
    //     return this.canvas.height;
    // }
    GameCanvas.prototype.setDimensions = function (width, height) {
        console.log('setting dimensions GameCanvas', width, height);
        this.width = width;
        this.height = height;
        // this.canvas.width = width;
        this.canvas.setAttribute('width', width.toString());
        this.canvas.setAttribute('height', height.toString());
    };
    return GameCanvas;
}());
export { GameCanvas };
