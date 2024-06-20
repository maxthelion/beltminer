import { Planetoid } from '../sprites/planetoid.js';
import { Asteroid } from '../sprites/asteroid.js';
import Player from '../player.js';
import { GameCanvas } from './gamecanvas.js';
import App from '../app.js';
import { Sprite } from '../sprites/sprites.js';
import SolarSystem from '../solarsystem.js';
import { Actor } from '../sprites/actor.js';
import { Mob } from '../sprites/mob.js';

export class LongGameCanvas extends GameCanvas {
    constructor(app: App, width: number) {
        super(app, width);
        this.canvas = document.getElementById('longcanvas') as HTMLCanvasElement;
        this.canvas.width = 100;
        this.canvas.height = 1000;
        this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;
        this.height = this.canvas.height;
        this.width = this.canvas.width;
    }

    draw(app: App) {
        this.ctx.clearRect(0, 0, this.width, this.height);

        let player = this.app.sprites[0] as Player;
        // console.log((sprite.angle / (Math.PI * 2)) * this.app.solarSystem.midRadius());
        // console.log('drawing long canvas',sprite.distanceFromCenter,sprite.angle);
        let y = this.radiansToDeimmal(player.angle);
        // console.log(y, sprite.angle, this.scaleY(y));

        this.app.sprites.forEach(sprite => {
            // console.log(sprite.distanceFromCenter,sprite.angle)
            if (sprite instanceof Planetoid) {
                this.drawSprite(sprite, 'orange', 10);
            } else if (sprite instanceof Asteroid) {
                this.drawSprite(sprite, sprite.color, 1);
            } else if (sprite instanceof Mob) {
                this.drawSprite(sprite, 'white', 3);
                this.ctx.beginPath();
                this.ctx.strokeStyle = 'white';
                let destx = sprite.destination.relativeX();
                let desty = this.radiansToDeimmal(sprite.destination.angle);
                this.ctx.moveTo(this.scaleX(destx), this.scaleY(desty));
                this.ctx.lineTo(this.scaleX(sprite.relativeX()), this.scaleY(this.radiansToDeimmal(sprite.angle)));
                this.ctx.stroke();
                this.drawSprite(sprite.destination, 'yellow', 3);
            } else if (sprite instanceof Player) {
                this.drawSprite(sprite, 'red', 5);

            } else {
                this.drawSprite(sprite, 'cyan', 5);
            }
        });
    }

    drawSprite(sprite: Sprite, color: string = 'white', size: number = 1) {
        this.ctx.beginPath();
        let x = sprite.relativeX();
        let y = this.radiansToDeimmal(sprite.angle);
        this.ctx.fillStyle = color;

        // console.log(x, y);
        this.ctx.fillRect(
            this.scaleX(x) - size/2,
            this.scaleY(y) - size/2,
            size,
            size
        );
        // this.ctx.fill();
        this.ctx.closePath();
    }

    radiansToDeimmal(radians: number) {
        return (radians / (Math.PI * 2));
    }

    scaleX(x: number) {
        return this.width - (this.width * x);
    }

    scaleY(y: number) {
        return this.height - (this.height * y);
    }
}
