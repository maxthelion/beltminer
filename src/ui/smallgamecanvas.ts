import { Asteroid, Planetoid } from '../sprites.js';
import Player from '../player.js';
import { GameCanvas } from './gamecanvas.js';
import App from '../app.js';

export class SmallGameCanvas extends GameCanvas {
    viewPort = {
        x: 0,
        y: 0,
        width: 10,
        height: 10
    };

    constructor(app: App) {
        super(app);
        this.canvas = document.getElementById('canvas') as HTMLCanvasElement;
        this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;
    }

    draw(app: App) {
        this.ctx.clearRect(0, 0, this.width, this.height);
        app.asteroids.forEach(asteroid => {
            this.drawSprite(asteroid);
        });
        app.planetoids.forEach(planetoid => {
            this.drawPlanetoid(planetoid);
        });
        this.ctx.strokeStyle = 'white';
        // draw the viewport
        this.ctx.strokeRect(
            this.gtlx(app.viewPort.x),
            this.gtly(app.viewPort.y),
            this.scaleFactorX(app.viewPort.width),
            this.scaleFactorY(app.viewPort.height)
        );
        this.drawPlayer(app.sprites[0] as Player);
    }

    drawPlanetoid(planetoid: Planetoid) {
        this.ctx.beginPath();
        this.ctx.arc(
            this.gtlx(planetoid.x),
            this.gtly(planetoid.y),
            this.scaleFactorX(planetoid.radius),
            0,
            Math.PI * 2
        );
        this.ctx.fillStyle = planetoid.color;
        this.ctx.fill();
        this.ctx.closePath();
    }

    drawSprite(asteroid: Asteroid) {
        this.ctx.beginPath();
        this.ctx.arc(
            this.gtlx(asteroid.x),
            this.gtly(asteroid.y),
            this.scaleFactorX(asteroid.radius),
            0,
            Math.PI * 2
        );
        this.ctx.fillStyle = asteroid.color;
        this.ctx.fill();
        this.ctx.closePath();
    }

    scaleFactorX(x: number) {
        return x * (this.width / this.app.solarSystem.width);
    }

    scaleFactorY(y: number) {
        return y * (this.height / this.app.solarSystem.height);
    }

    gtlx(x: number) {
        return this.scaleFactorX(x) + this.width / 2;
    }

    gtly(y: number) {
        return this.scaleFactorY(y) + this.height / 2;
    }

    drawPlayer(player: Player) {
        this.ctx.beginPath();
        this.ctx.fillStyle = 'red';
        let angle = player.direction;
        this.ctx.translate(
            this.gtlx(player.x),
            this.gtly(player.y)
        );
        //this.ctx.transform(Math.cos(angle), Math.sin(angle), -Math.sin(angle), Math.cos(angle), player.x, player.y);
        this.ctx.rotate(angle);
        let length = player.shipLength();
        this.ctx.rect(0, -2, length / 2, 4);
        this.ctx.rect(length / 2 * -1, -3, length / 2, 6);
        this.ctx.resetTransform();
        // this.ctx.lineTo(player.x - 10, player.y + 20);
        // this.ctx.lineTo(player.x + 10, player.y + 20);
        // this.ctx.closePath();
        this.ctx.fill();
        this.ctx.closePath();
    }
}