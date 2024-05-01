import { Asteroid, Planetoid } from '../sprites.js';
import Player from '../player.js';
import App from '../app.js';
import { GameCanvas } from './gamecanvas.js';

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
        console.log("setting width", width);
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
        this.centerOnPlayer(app.sprites[0] as Player);
    }

    centerOnPlayer(player: Player) {
        // this.ctx.translate(this.width / 2, this.height / 2);
        // this.ctx.scale(1 + app.zoomLevel, 1 + app.zoomLevel);
        // this.ctx.translate(-player.x, -player.y);
        this.ctx.beginPath();
        this.app.asteroids.forEach(asteroid => {
            if (asteroid.x < this.app.viewPort.x - 30) return;
            if (asteroid.x > this.app.viewPort.x + this.app.viewPort.width + 30) return;
            if (asteroid.y < this.app.viewPort.y - 30) return;
            if (asteroid.y > this.app.viewPort.y + this.app.viewPort.height + 30) return;

            this.drawNormalAsteroid(asteroid, player);
        });
        this.app.planetoids.forEach(planetoid => {
            if (planetoid.x < this.app.viewPort.x - 30) return;
            if (planetoid.x > this.app.viewPort.x + this.app.viewPort.width + 30) return;
            if (planetoid.y < this.app.viewPort.y - 30) return;
            if (planetoid.y > this.app.viewPort.y + this.app.viewPort.height + 30) return;

            this.drawPlanetoid(planetoid, player);
        });
        if (player.lockedAsteroid) {
            this.drawLockedAsteroid(player.lockedAsteroid, player);
        }
        this.drawPlayer(player);
    }

    drawPlanetoid(planetoid: Planetoid, player: Player) {
        this.ctx.beginPath();
        this.ctx.arc(
            this.gtlx(planetoid.x),
            this.gtly(planetoid.y),
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
        let normalizedAsteroid = this.normalizedSpritePosition(asteroid, player);
        this.ctx.fillStyle = asteroid.color;
        // console.log(asteroid.color)
        this.ctx.translate(normalizedAsteroid.x, normalizedAsteroid.y);
        this.ctx.rotate(asteroid.rotation);
        this.drawNormalizedAsteroid(normalizedAsteroid, asteroid);
        // this.ctx.arc(normalizedAsteroid.x, normalizedAsteroid.y, asteroid.radius * this.scaleFactor(), 0, Math.PI * 2);
        this.ctx.resetTransform();
        this.ctx.fill();
    }

    drawNormalizedAsteroid(normalized: { x: number; y: number; }, asteroid: Asteroid) {
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

    normalizedSpritePosition(asteroid: Asteroid, player: Player) {
        let xScale = this.width / this.app.viewPort.width;
        let yScale = this.height / this.app.viewPort.height;
        return {
            x: ((asteroid.x) - (this.app.viewPort.x)) * xScale,
            y: ((asteroid.y) - (this.app.viewPort.y)) * yScale
        };
    }

    drawPlayer(player: Player) {
        this.ctx.beginPath();

        this.ctx.fillStyle = player.color;
        let angle = player.direction;
        let angle90 = angle + 0.25 * Math.PI;
        this.ctx.translate(this.width / 2, this.height / 2);
        this.ctx.rotate(angle90);
        // draw sprite from sprite sheet
        this.ctx.drawImage(this.spriteSheet,
            628, 30, 150, 300,
            -35, -100, 70, 200
        );


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
        return this.width / this.app.viewPort.width;
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
