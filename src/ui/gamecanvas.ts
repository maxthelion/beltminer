import App from '../app.js';

export class GameCanvas {
    canvas!: HTMLCanvasElement;
    ctx!: CanvasRenderingContext2D;
    app: App;

    constructor(app: App, width: number = 800) {
        this.app = app;
    }

    draw(app: App) {
        throw new Error('Method not implemented.');
    }

    get width() {
        return this.canvas.width;
    }
    get height() {
        return this.canvas.height;
    }

}
