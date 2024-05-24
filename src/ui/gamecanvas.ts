import App from '../app.js';

export class GameCanvas {
    canvas!: HTMLCanvasElement;
    ctx!: CanvasRenderingContext2D;
    app: App;
    width: number
    height: number
    constructor(app: App, width: number = 800) {
        this.app = app;
        this.width = width;
        this.height = width;
    }

    draw(app: App) {
        throw new Error('Method not implemented.');
    }

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

    setDimensions(width: number, height: number) {
        console.log('setting dimensions GameCanvas', width, height);
        this.width = width;
        this.height = height;
        // this.canvas.width = width;
        this.canvas.setAttribute('width', width.toString());
        this.canvas.setAttribute('height', height.toString());
    }

}
