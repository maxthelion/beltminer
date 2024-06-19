import { Asteroid } from './asteroid.js';
import SolarSystem  from '../solarsystem.js';
import { Sector } from '../sectors.js';
import App from '../app.js';
import { PlanetaryBody } from './planetarybody.js';
import { SmallGameCanvas } from '../ui/smallgamecanvas.js';

export class Planetoid extends PlanetaryBody {
    radius: number;
    color = 'orange';
    mass = 1;
    name: string;

    constructor(app: App, sector: Sector, name: string) {
        super(app, sector);
        
        this.radius = 30;
        this.mass = this.radius * 0.0005;
        this.name = name;
        this.update();
    }

    update() {
        super.update();
        // console.log('updating planetoid', this.x, this.y)
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
