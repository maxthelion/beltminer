import { Planetoid } from '../sprites/planetoid.js';
import { Asteroid } from '../sprites/asteroid.js';
import Player from '../player.js';
import App from '../app.js';
import { GameCanvas } from './gamecanvas.js';
import { Sprite } from '../sprites/sprites.js';

export class LargeGameCanvas extends GameCanvas {
    spriteSheet: HTMLImageElement;
    constructor(app: App, width: number, spriteSheet: HTMLImageElement) {
        super(app, width);
        this.spriteSheet = spriteSheet;
        this.canvas = document.getElementById('canvas2') as HTMLCanvasElement;
        this.canvas.width = width;
        this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;
    }



    draw(app: App) {
        this.ctx.clearRect(0, 0, this.width, this.height);
        // this.ctx.fillStyle = "rgba(0, 0, 0, 0.01)"
        //this.ctx.fillRect(0, 0, this.width, this.height);
        let player = this.app.sprites[0] as Player;
        this.ctx.beginPath();
        this.app.asteroids.forEach(asteroid => {
            if (this.app.viewPort.containsEntity(asteroid) === false) return;
            this.drawNormalAsteroid(asteroid, player);
        });
        this.app.planetoids.forEach(planetoid => {
            if (this.app.viewPort.containsEntity(planetoid) === false) return;
            this.drawPlanetoid(planetoid, player);
        });
        this.app.actors.forEach(actor => {
            // if (this.app.viewPort.containsEntity(actor) === false) return;
            this.drawSprite(actor, player);
        });
        if (player.lockedAsteroid) {
            this.drawLockedAsteroid(player.lockedAsteroid, player);
        }
        if (this.app.focussedSprite !== undefined) {
            this.drawFocussedSprite(this.app.focussedSprite, player);
        }
        this.drawPlayer(player);
    }

    drawFocussedSprite(sprite: Sprite, player: Player) {
        this.ctx.beginPath();
        this.centerOnSpriteAndDraw(sprite as Asteroid, player, (spritetorender) => { 
            let asteroid = spritetorender as Asteroid;
            this.ctx.strokeStyle = 'cyan';
            this.ctx.lineWidth = 2;
            let w = asteroid.radius * 4;
            let h = asteroid.radius * 4;
            this.ctx.strokeRect(    
                this.scaleFactorX(-w / 2),
                this.scaleFactorY(-h / 2),
                this.scaleFactorX(w),
                this.scaleFactorY(h)
            );
        });   
    }


    drawLockedAsteroid(asteroid: Asteroid, player: Player) {
        this.ctx.strokeStyle = 'red';
        this.ctx.lineWidth = 10;
        this.drawAsteroid(asteroid, player);
    }

    drawNormalAsteroid(asteroid: Asteroid, player: Player) {
        this.ctx.strokeStyle = 'white';
        this.ctx.lineWidth = 3;
        this.drawAsteroid(asteroid, player);
    }

    drawSprite(sprite: Sprite, player: Player) {
        // console.log(sprite)
        this.ctx.beginPath();
        this.centerOnSpriteAndDraw(sprite as Asteroid, player, (spritetorender) => { 
            this.drawTriangle(spritetorender);
        });
    }

    drawTriangle(sprite: Sprite) {
        // this.ctx.fillStyle = sprite.color;
        this.ctx.beginPath();
        this.ctx.moveTo(0, 0);
        this.ctx.lineTo(20, 0);
        this.ctx.lineTo(5, 10);
        this.ctx.closePath();
        this.ctx.stroke();
        this.ctx.fill();
    }

    centerOnSpriteAndDraw(asteroid: Asteroid, player: Player, drawFunction: (sprite: Sprite) => void) {
        this.ctx.beginPath();
        this.ctx.fillStyle = asteroid.color;
        if(this.app.focussedSprite?.uuid === asteroid.uuid) {
            this.ctx.fillStyle = 'red';
            this.ctx.strokeStyle = 'cyan';
            this.ctx.lineWidth = 2;

            // console.log(asteroid.uuid)
        } else {
            this.ctx.strokeStyle = 'white';
            this.ctx.lineWidth = 1;
        }
        // console.log(asteroid.color)
        let relativeX = this.app.viewPort.relativeX(asteroid) / this.app.viewPort.radialWidth;
        let relativeY = this.app.viewPort.relativeY(asteroid) / this.app.viewPort.arcLength;
        
        let x = this.width - (this.width/ 2 + (relativeX * this.width)); 
        let y = this.height - (this.height / 2 + (relativeY * this.height)); 
        this.ctx.translate(x, y);
        this.ctx.rotate(asteroid.rotation);
        drawFunction(asteroid as Sprite);
        // this.ctx.arc(normalizedAsteroid.x, normalizedAsteroid.y, asteroid.radius * this.scaleFactor(), 0, Math.PI * 2);
        this.ctx.resetTransform();
        this.ctx.fill();
        this.ctx.stroke();
    }

    drawAsteroid(asteroid: Asteroid, player: Player) {
        this.centerOnSpriteAndDraw(asteroid, player, (sprite: Sprite) => { this.drawAsteroidPoints(sprite as Asteroid) });
    }

    drawPlanetoid(planetoid: Planetoid, player: Player) {
        // console.log(planetoid)
        this.centerOnSpriteAndDraw(planetoid, player, (sprite: Sprite) => { this.drawCircle(sprite as Asteroid) });
    }

    drawCircle(asteroid: Asteroid) {
        this.ctx.arc(0, 0, asteroid.radius * this.scaleFactor(), 0, Math.PI * 2);
    }

    drawAsteroidPoints(asteroid: Asteroid) {
        this.ctx.beginPath();
        let points = asteroid.asteroidPoints.slice();
        let na = {
            x: asteroid.radius / 2,
            y: asteroid.radius / 2
        };
        this.ctx.moveTo(
            (points[0].x * this.scaleFactor()) + na.x,
            (points[0].y * this.scaleFactor()) + na.y
        );
        for (let i = 1; i < points.length; i++) {
            let p: { x: number; y: number; } = points[i];
            let newp: { x: number; y: number; } = {
                x: (p.x * this.scaleFactor()) + na.x,
                y: (p.y * this.scaleFactor()) + na.y
            };
            this.ctx.lineTo(newp.x, newp.y);
        }
        this.ctx.closePath();
        this.ctx.stroke();
        this.ctx.fill();
    }

    // normalizedSpritePosition(asteroid: Asteroid, player: Player) {
    //     let xScale = this.width / this.app.viewPort.width;
    //     let yScale = this.height / this.app.viewPort.height;
    //     let x = asteroid.distanceFromCenter - player.distanceFromCenter;
    //     let y = asteroid.angle - player.angle;
    //     return {
    //         x: x,
    //         y: y
    //     };
    // }

    drawPlayer(player: Player) {
        this.ctx.beginPath();

        this.ctx.fillStyle = player.color;
        let angle = player.direction;
        this.ctx.translate(this.width / 2, this.height / 2);
        this.ctx.rotate(angle);
        // draw sprite from sprite sheet
        // this.ctx.drawImage(this.spriteSheet,
        //     628, 30, 150, 300,
        //     -35, -100, 70, 200
        // );


        let length = player.shipLength();
        let halfLength = length / 2;
        let scaledHalfLength = halfLength * this.scaleFactor();
        this.ctx.fillRect(0, -2, scaledHalfLength, 4);
        this.ctx.fillRect(scaledHalfLength * -1, -3, scaledHalfLength, 6);
        if (player.accelerating === true) {
            this.ctx.fillStyle = 'orange';
            let flameLength = 0.5;
            this.ctx.fillRect(scaledHalfLength * -1 * (1 + flameLength), -1, scaledHalfLength * (flameLength), 2);
        }
        this.ctx.resetTransform();
    }

    scaleFactor() {
        return this.width / this.app.viewPort.radialWidth;
    }

    scaleFactorX(x: number) {
        return x * this.scaleFactor();
    }

    scaleFactorY(y: number) {
        return y * this.scaleFactor();
    }

    // gtlx(x: number) {
    //     return this.scaleFactorX(x - this.app.viewPort.x);
    // }

    // gtly(y: number) {
    //     return this.scaleFactorY(y - this.app.viewPort.y);
    // }
}
