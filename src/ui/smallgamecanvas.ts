import { Planetoid } from '../planetoid.js';
import { Asteroid } from '../asteroid.js';
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
        this.drawViewPort();
        this.drawPlayer(app.sprites[0] as Player);
        
    }

    drawViewPort() {
        // draw the viewport
        this.ctx.translate(this.width / 2, this.height / 2);

        this.ctx.rotate(-this.app.player.angle + Math.PI);
        this.ctx.strokeStyle = 'white';
        this.ctx.lineWidth = 1;
        this.ctx.beginPath();
        let firstAngle = this.app.viewPort.getMinArc();
        let lastAngle = this.app.viewPort.getMaxArc();

        let outerRadius = this.scaleFactorX( this.app.viewPort.getMaxRadius()) ;
        let innerRadius = this.scaleFactorX( this.app.viewPort.getMinRadius()) ;
        // draw a slice of the circle starting converting x to radius and y to angle
        this.ctx.arc(
            0, 
            0, 
            innerRadius, 
            firstAngle,
            lastAngle
        );
        // move to start of outer arc
        
        this.ctx.lineTo(
            0 + outerRadius * Math.cos(lastAngle),
            0 + outerRadius * Math.sin(lastAngle)
        );
        // draw outer arc
        this.ctx.arc(
            0, 
            0, 
            outerRadius, 
            lastAngle,
            firstAngle,
            true
        );
        this.ctx.lineTo(
            0 + innerRadius * Math.cos(firstAngle),
            0 + innerRadius * Math.sin(firstAngle)
        );
        this.ctx.stroke();
        this.ctx.resetTransform()
        // this.ctx.strokeRect(
        //     this.gtlx(app.viewPort.x),
        //     this.gtly(app.viewPort.y),
        //     this.scaleFactorX(app.viewPort.width),
        //     this.scaleFactorY(app.viewPort.height)
        // );
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
        this.ctx.translate(this.width / 2, this.height / 2);
        this.ctx.rotate(-this.app.player.angle + Math.PI);
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
        this.ctx.resetTransform();
    }

    scaleFactorX(x: number) {
        return x * (this.width / this.app.solarSystem.width);
    }

    scaleFactorY(y: number) {
        return y * (this.height / this.app.solarSystem.height);
    }

    gtlx(x: number) {
        return this.scaleFactorX(x);
    }

    gtly(y: number) {
        return this.scaleFactorY(y);
    }

    drawPlayer(player: Player) {
        let nine = 90 * (Math.PI / 180);
        // nine %= Math.PI / 2;
        this.ctx.translate(this.width / 2, this.height / 2);
        this.ctx.rotate(nine);
        this.ctx.beginPath();
        this.ctx.fillStyle = 'red';
        let angle = player.direction;

        let radius = player.distanceFromCenter;
        let x = radius * Math.cos(nine);
        let y = radius * Math.sin(nine);
        this.ctx.translate(
            this.gtlx(x),
            this.gtly(y)
        );
        // this.ctx.rotate(nine);
        let length = player.shipLength();
        this.ctx.fillRect(0, -2, length / 2, 4);
        this.ctx.fillRect(length / 2 * -1, -3, length / 2, 6);
        this.ctx.resetTransform();
        this.ctx.closePath();
    }
}
