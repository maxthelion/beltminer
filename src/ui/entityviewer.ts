import App from "../app.js";
import { Asteroid } from "../sprites/asteroid.js";
import { Sprite } from "../sprites/sprites.js";
import Renderable from "./renderable.js";

export default class EntityViewer extends Renderable {
    cachedObject: Sprite | undefined = undefined;
    constructor(app: App) {
        super(app);
        this.app = app;
        this.el = document.getElementById('entityviewer')!;
    }

    render() {
        if (this.cachedObject !== this.app.focussedSprite) {
            if (this.app.focussedSprite !== null ){
                this.cachedObject = this.app.focussedSprite;
                let sprite = this.app.focussedSprite as Asteroid;
                this.el.innerHTML = `
                <div>
                <p>Focussed object: ${sprite.uuid}</p>
                <p>Position: ${sprite.x}, ${sprite.y}</p>
                <p>Sector: ${sprite.sector}</p>
                <p>Radius: ${sprite.radius}</p>
                </div>
                <div id="entitycanvasholder">
                <canvas id="entitycanvas" width="100" height="100" style="background: black;"></canvas>
                </div>
                `;
                let canvas = document.getElementById('entitycanvas') as HTMLCanvasElement;
                let elHolder = document.getElementById('entitycanvasholder')!;
                canvas.width = elHolder.clientWidth;
                canvas.height = elHolder.clientHeight;
                let ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
                
                ctx.beginPath();
                let maxRadius = 100;
                let scaleFactor =  sprite.radius;
                ctx.arc(canvas.width/2, canvas.height/2, (canvas.height / 2) * scaleFactor, 0, 2 * Math.PI);
                ctx.fillStyle = sprite.color;
                ctx.fill();
                ctx.stroke();
            } else {
                this.el.innerHTML = 'NO object focussed';
                this.cachedObject = undefined;
            }
        } 

    }
}