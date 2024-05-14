import { Planetoid } from '../planetoid.js';
import { Asteroid } from '../asteroid.js';
import Player from '../player.js';
import App from '../app.js';
import { GameCanvas } from './gamecanvas.js';

class FakeAsteroid {
    x: number;
    y: number;
    radius: number;
    color: string;
    rotation: number;
    asteroidPoints: { x: number; y: number; }[];
    constructor(asteroid: Asteroid) {
        this.x =  asteroid.distanceFromCenter;
        this.y = (asteroid.angle % (Math.PI * 2)) * 100;
        this.radius = asteroid.radius;
        this.color = asteroid.color;
        this.rotation = asteroid.rotation;
        this.asteroidPoints = asteroid.asteroidPoints;
    }

}

export class LargeGameCanvas extends GameCanvas {
    spriteSheet: HTMLImageElement;
    constructor(app: App, width: number, spriteSheet: HTMLImageElement) {
        super(app, width);
        this.spriteSheet = spriteSheet;
        this.canvas = document.getElementById('canvas2') as HTMLCanvasElement;
        this.canvas.width = width;
        this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;
    }

    setWidth(width: number) {
        this.width = width;
        this.canvas.width = width;
        this.canvas.setAttribute('width', width.toString());
    }

    set width(width: number) {
        this.canvas.width = width;
    }
    set height(height: number) {
        this.canvas.height = height;
    }

    get width() {
        return this.canvas.width;
    }
    get height() {
        return this.canvas.height;
    }

    draw(app: App) {
        this.ctx.clearRect(0, 0, this.width, this.height);
        // this.ctx.fillStyle = "rgba(0, 0, 0, 0.01)"
        //this.ctx.fillRect(0, 0, this.width, this.height);
        this.centerOnPlayer(app.sprites[0] as Player);
    }

    centerOnPlayer(player: Player) {
        // this.ctx.translate(this.width / 2, this.height / 2);
        // this.ctx.scale(1 + app.zoomLevel, 1 + app.zoomLevel);
        // this.ctx.translate(-player.x, -player.y);
        this.ctx.beginPath();
        this.app.asteroids.forEach(asteroid => {
            if (this.app.viewPort.containsEntity(asteroid) === false) return;
            this.drawNormalAsteroid(asteroid, player);
        });
        // this.app.planetoids.forEach(planetoid => {
        //     if (this.app.viewPort.containsEntity(planetoid) === false) return;
        //     this.drawPlanetoid(planetoid, player);
        // });
        // if (player.lockedAsteroid) {
        //     this.drawLockedAsteroid(player.lockedAsteroid, player);
        // }
        this.drawPlayer(player);
    }

    drawPlanetoid(planetoid: Planetoid, player: Player) {
        this.ctx.beginPath();
        this.ctx.arc(
            this.app.viewPort.relativeX(planetoid) * this.scaleFactor(),
            this.app.viewPort.relativeY(planetoid) * this.scaleFactor(),
            this.scaleFactor() * planetoid.radius,
            0,
            Math.PI * 2
        );
        this.ctx.fillStyle = planetoid.color;
        this.ctx.fill();
        this.ctx.closePath();
    }

    drawLockedAsteroid(asteroid: Asteroid, player: Player) {
        this.ctx.strokeStyle = 'red';
        this.ctx.lineWidth = 10;
        this.drawAsteroid(asteroid, player);
        this.ctx.stroke();
    }

    drawNormalAsteroid(asteroid: Asteroid, player: Player) {
        this.ctx.strokeStyle = 'white';
        this.ctx.lineWidth = 5;
        this.drawAsteroid(asteroid, player);
    }

    drawAsteroid(asteroid: Asteroid, player: Player) {
        this.ctx.beginPath();
        this.ctx.fillStyle = asteroid.color;
        // console.log(asteroid.color)
        let relativeX = this.app.viewPort.relativeX(asteroid) / this.app.viewPort.radialWidth;
        let relativeY = this.app.viewPort.relativeY(asteroid) / this.app.viewPort.arcLength;
        
        let x = this.width - (this.width/ 2 + (relativeX * this.width)); 
        let y = this.height - (this.height / 2 + (relativeY * this.height)); 
        this.ctx.translate(x, y);
        this.ctx.rotate(asteroid.rotation);
        this.drawCircle(asteroid);
        // this.drawNormalizedAsteroid(normalizedAsteroid, asteroid);
        // this.ctx.arc(normalizedAsteroid.x, normalizedAsteroid.y, asteroid.radius * this.scaleFactor(), 0, Math.PI * 2);
        this.ctx.resetTransform();
        this.ctx.fill();
    }

    drawCircle(asteroid: Asteroid) {
        this.ctx.arc(0, 0, asteroid.radius * this.scaleFactor(), 0, Math.PI * 2);
    }

    drawNormalizedAsteroid(normalized: { x: number; y: number; }, asteroid: FakeAsteroid) {
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

    gtlx(x: number) {
        return this.scaleFactorX(x - this.app.viewPort.x);
    }

    gtly(y: number) {
        return this.scaleFactorY(y - this.app.viewPort.y);
    }
}
