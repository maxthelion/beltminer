import Player from './player.js';
import App from './app.js';
import Renderable from './ui/renderable.js';

export class GameLoop {
    app: App;

    constructor(app: App) {
        this.app = app;
    }
    update() {
        this.processInput();

        if (this.app.newViewPort !== undefined) {
            let deltaWidth = this.app.newViewPort.radialWidth - this.app.viewPort.radialWidth;
            let deltaHeight = this.app.newViewPort.arcLength - this.app.viewPort.arcLength;

            if (Math.abs(deltaWidth) > 0.1 && Math.abs(deltaHeight) > 0.1) {
                this.app.viewPort.radialWidth += deltaWidth * 0.1;
                this.app.viewPort.arcLength += deltaHeight * 0.1;
            } else {
                this.app.viewPort.radialWidth = this.app.newViewPort.radialWidth;
                this.app.viewPort.arcLength = this.app.newViewPort.arcLength;
                this.app.newViewPort = undefined;
            }
        }
        this.app.asteroids.forEach(sprite => {
            sprite.update();
        });
        this.app.planetoids.forEach(sprite => {
            sprite.update();
        });
        
        let proximityAsteroids = this.app.proximateAsteroids();
        // console.log(proximityAsteroids.length)
        let player = this.app.sprites[0] as Player;
        if (player.lockedAsteroid) {
            player.x = player.lockedAsteroid.x;
            player.y = player.lockedAsteroid.y;
        } else {
            let influenceDistance = 100;
            proximityAsteroids.forEach(asteroid => {
                let dx = asteroid.x - player.x;
                let dy = asteroid.y - player.y;
                let distance = Math.sqrt(dx * dx + dy * dy);
                // if (distance < influenceDistance) {
                //     // if similar direction, match speed
                //     if (distance < 10 &&
                //         Math.abs(player.dx - asteroid.dx) < 10 &&
                //         Math.abs(player.dy - asteroid.dy) < 10) {
                //         if (distance < 1 && !player.isThrusting()) {
                //             this.app.lockOn(asteroid);
                //             console.log("influence distance", distance)

                //         }
                //         let inverseDistance = 1 / distance * 0.1;
                //         player.x += (asteroid.x - player.x) * inverseDistance;
                //         player.y += (asteroid.y - player.y) * inverseDistance;
                //     } 
                // }
            });

        }
        this.app.player.update();
        this.app.viewPort.update(player);
        this.app.updateGame();
        // render stuff
        Renderable.renderables.forEach(renderable => {
            renderable.render();
        })
        this.app.largeGameCanvas.draw(this.app);
        this.app.smallGameCanvas.draw(this.app);
        // this.app.infoPane.render();
    }

    processInput() {
        let player = this.app.sprites[0] as Player;
        player.accelerating = false;
        let keyHandler = this.app.keyHandler;
        if (keyHandler.pressedKeys["ArrowLeft"]) {
            player.direction -= player.rotationalAcceleration;
        }
        if (keyHandler.pressedKeys["ArrowRight"]) {
            player.direction += player.rotationalAcceleration;
        }
        if (keyHandler.pressedKeys["Tab"]) {
            keyHandler.pressedKeys["Tab"] = false;
            this.app.cycleProximateObjects();
        }

        if (keyHandler.pressedKeys["ArrowUp"]) {
            if (player.lockedAsteroid !== null) {
                this.app.detachBody();
            }
            player.accelerate();
        }
        if (keyHandler.pressedKeys["ArrowDown"]) {
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
