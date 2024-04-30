import { Sprite, Asteroid } from './sprites.js';
import Player from './player.js';

export default class App {
    gameLoop: GameLoop;
    sprites: Sprite[];
    asteroids: Asteroid[];
    smallGameCanvas: SmallGameCanvas;
    largeGameCanvas: LargeGameCanvas;
    zoomLevel = 100;
    viewPort = {
        x: 0,
        y: 0,
        width: 100,
        height: 100
    };
    pressedKeys = {
        "ArrowLeft": false,
        "ArrowRight": false,
        "ArrowUp": false,
        "ArrowDown": false
    };
    player: Player;
    solarSystem: SolarSystem;
    constructor() {
        let largeHolderWidth = document.getElementById("largeholder")?.clientWidth;
        
        this.sprites = [];
        this.player = new Player();
        this.sprites.push(this.player);
        this.asteroids = [ ];
        this.solarSystem = new SolarSystem();
        for (let i = 0; i < this.solarSystem.asteroidNum; i++) {
            this.asteroids.push(new Asteroid(this.solarSystem));
        }
        this.smallGameCanvas = new SmallGameCanvas(this);
        this.largeGameCanvas = new LargeGameCanvas(this, largeHolderWidth || 800);
        this.gameLoop = new GameLoop(this);
        window.addEventListener("resize", () => {
            console.log("resize");
            largeHolderWidth = document.getElementById("largeholder")?.clientWidth;
            this.largeGameCanvas.setWidth(largeHolderWidth || 800);
        });
        document.addEventListener('keydown', (e) => {
            if (this.pressedKeys[e.key] !== undefined) {
                this.pressedKeys[e.key] = true;
            }
        });
        document.addEventListener('keyup', (e) => {
            if (this.pressedKeys[e.key] !== undefined) {
                this.pressedKeys[e.key] = false;
            }
        });
    }

    init() {
        this.gameLoop.start();    
    }
}



class GameCanvas {
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

export class SolarSystem {
    asteroidNum = 200;
    centerX = 0;
    centerY = 0;
    minRadius = 150;
    maxRadius = 250;
    width: number;
    height: number;

    constructor(){
        this.width = this.maxRadius * 2 + 100;
        this.height = this.maxRadius * 2 + 100;
    }
}

class LargeGameCanvas extends GameCanvas {
    constructor(app: App, width: number) {
        super(app, width);
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
        if (player.lockedAsteroid) {
            this.drawLockedAsteroid(player.lockedAsteroid, player);
        }
        this.drawPlayer(player);
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

    drawNormalizedAsteroid(normalized: {x: number, y: number}, asteroid: Asteroid) {
        this.ctx.beginPath();
        let points = asteroid.asteroidPoints.slice();
        let na = {
            x: asteroid.radius/2,
            y: asteroid.radius/2
        };
        this.ctx.moveTo(
            (points[0].x * this.scaleFactor()) + na.x, 
            (points[0].y * this.scaleFactor()) + na.y
        )
        for (let i = 1; i < points.length; i++) {
            let p: { x: number, y: number } = points[i];
            let newp : {x: number, y: number} = {
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
            x: ((asteroid.x ) - (this.app.viewPort.x) ) * xScale,
            y: ((asteroid.y ) - (this.app.viewPort.y) ) * yScale
        };
    }

    drawPlayer(player: Player) {
        this.ctx.beginPath();

        this.ctx.fillStyle = player.color;
        let angle = player.direction;
        this.ctx.translate(this.width / 2, this.height / 2);
        this.ctx.rotate(angle);
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
}

class SmallGameCanvas extends GameCanvas {
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
        this.ctx.rect(length/2 * -1, -3, length / 2, 6);
        this.ctx.resetTransform();
        // this.ctx.lineTo(player.x - 10, player.y + 20);
        // this.ctx.lineTo(player.x + 10, player.y + 20);
        // this.ctx.closePath();
        this.ctx.fill();
        this.ctx.closePath();
    }
}

class GameLoop {
    app: App;

    constructor(app: App) {
        this.app = app;
    }
    update() {
        this.processInput();

        this.app.asteroids.forEach(sprite => {
            sprite.update();
        })
        let influenceDistance = 100;
        let influenceBase = 0.001;
        let proximityAsteroids = this.app.asteroids.filter(asteroid => {
            return asteroid.x > this.app.viewPort.x - influenceDistance &&
                     asteroid.x < this.app.viewPort.x + this.app.viewPort.width + influenceDistance &&
                    asteroid.y > this.app.viewPort.y - influenceDistance && 
                    asteroid.y < this.app.viewPort.y + this.app.viewPort.height + influenceDistance;
        })
        let player = this.app.sprites[0] as Player;
        if (player.lockedAsteroid) {
            player.x = player.lockedAsteroid.x;
            player.y = player.lockedAsteroid.y;
        } else {
            proximityAsteroids.forEach(asteroid => {
                let dx = asteroid.x - player.x;
                let dy = asteroid.y - player.y;
                let distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < influenceDistance) {
                    // if similar direction, match speed
                    if (distance < 10 && 
                        Math.abs(player.dx - asteroid.dx) < 10 && 
                        Math.abs(player.dy - asteroid.dy) < 10) {
                        if (distance < 0.5) {
                            player.dx = 0;
                            player.dy = 0;
                            player.lockedAsteroid = asteroid;
                        }
                        let inverseDistance = 1 / distance * 0.1;
                        player.x += (asteroid.x - player.x) * inverseDistance;
                        player.y += (asteroid.y - player.y) * inverseDistance;
                    } else {
                        let angle = Math.atan2(dy, dx);
                        let massInfluence = asteroid.mass * influenceBase * Math.log(distance);
                        player.dx += Math.cos(angle) * massInfluence;
                        player.dy += Math.sin(angle) * massInfluence;
                    }
                }
            });
            
        }
        this.app.player.update();
        this.app.viewPort.x = this.app.sprites[0].x - (this.app.viewPort.width / 2);
        this.app.viewPort.y = this.app.sprites[0].y - (this.app.viewPort.height / 2);
        this.app.largeGameCanvas.draw(this.app);
        this.app.smallGameCanvas.draw(this.app);
    }

    processInput() {
        let player = this.app.sprites[0] as Player;
        player.accelerating = false;
        if (this.app.pressedKeys["ArrowLeft"]) {
            player.direction -= player.rotationalAcceleration;
        }
        if (this.app.pressedKeys["ArrowRight"]) {
            player.direction += player.rotationalAcceleration;
        }

        if (this.app.pressedKeys["ArrowUp"]) {
            player.lockedAsteroid = null;
            player.accelerating = true;
            player.dx += player.acceleration * Math.cos(player.direction);
            player.dy += player.acceleration * Math.sin(player.direction);
        }
        if (this.app.pressedKeys["ArrowDown"]) {
            player.dx = 0;
            player.dy = 0;
        }
    }

    start() {
        setInterval(() => {
            this.update();
        }, 1000 / 60);
    }   
}