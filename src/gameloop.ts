import Player from './player.js';
import App from './app.js';

export class GameLoop {
    app: App;

    constructor(app: App) {
        this.app = app;
    }
    update() {
        this.processInput();
        if (this.app.newViewPort !== undefined) {
            let deltaWidth = this.app.newViewPort.width - this.app.viewPort.width;
            let deltaHeight = this.app.newViewPort.height - this.app.viewPort.height;

            if (Math.abs(deltaWidth) > 0.1 && Math.abs(deltaHeight) > 0.1) {
                this.app.viewPort.width += deltaWidth * 0.1;
                this.app.viewPort.height += deltaHeight * 0.1;
            } else {
                this.app.viewPort.width = this.app.newViewPort.width;
                this.app.viewPort.height = this.app.newViewPort.height;
                this.app.newViewPort = undefined;
            }
        }
        this.app.asteroids.forEach(sprite => {
            sprite.update();
        });
        this.app.planetoids.forEach(sprite => {
            sprite.update();
        });
        let influenceDistance = 100;
        let influenceBase = 0.001;
        let proximityAsteroids = this.app.asteroids.filter(asteroid => {
            return asteroid.x > this.app.viewPort.x - influenceDistance &&
                asteroid.x < this.app.viewPort.x + this.app.viewPort.width + influenceDistance &&
                asteroid.y > this.app.viewPort.y - influenceDistance &&
                asteroid.y < this.app.viewPort.y + this.app.viewPort.height + influenceDistance;
        });
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
                            this.app.lockOn(asteroid);
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
        this.app.infoPane.render();
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
