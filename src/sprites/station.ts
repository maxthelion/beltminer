import App from "../app.js";
import { Sector } from "../sectors.js";
import { GameCanvas } from "../ui/gamecanvas.js";
import { SmallGameCanvas } from "../ui/smallgamecanvas.js";
import { PlanetaryBody } from "./planetarybody.js";
import { Sprite } from "./sprites.js";

export class Station extends PlanetaryBody{
    color = 'blue';
    constructor(app: App, sector: Sector) {
        super(app, sector);
    }

    render(gamecanvas: SmallGameCanvas) {
        let sprite = this;
        // this.ctx.beginPath();
        let ctx = gamecanvas.ctx;
        ctx.fillStyle = sprite.color;
        // console.log(sprite.radius);
        let width = Math.ceil(gamecanvas.scaleFactorX(sprite.radius)) * 2;
        let height = Math.ceil(gamecanvas.scaleFactorY(sprite.radius)) * 2;
        ctx.fillRect(
            gamecanvas.gtlx(sprite.x) - (width / 2),
            gamecanvas.gtly(sprite.y) - (height / 2),
            width,
            height
        );
        
        // ctx.arc(
        //     this.gtlx(asteroid.x),
        //     this.gtly(asteroid.y),
        //     Math.round(this.scaleFactorX(asteroid.radius)),
        //     0,
        //     Math.PI * 2
        // );
        ctx.fill();
        ctx.closePath();
    }
}

export class AlienStation extends Station {
    color = 'purple';
    constructor(app: App, sector: Sector) {
        super(app, sector);
    }
}