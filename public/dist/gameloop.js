var GameLoop = /** @class */ (function () {
    function GameLoop(app) {
        this.app = app;
    }
    GameLoop.prototype.update = function () {
        var _this = this;
        this.processInput();
        if (this.app.newViewPort !== undefined) {
            var deltaWidth = this.app.newViewPort.radialWidth - this.app.viewPort.radialWidth;
            var deltaHeight = this.app.newViewPort.arcLength - this.app.viewPort.arcLength;
            if (Math.abs(deltaWidth) > 0.1 && Math.abs(deltaHeight) > 0.1) {
                this.app.viewPort.radialWidth += deltaWidth * 0.1;
                this.app.viewPort.arcLength += deltaHeight * 0.1;
            }
            else {
                this.app.viewPort.radialWidth = this.app.newViewPort.radialWidth;
                this.app.viewPort.arcLength = this.app.newViewPort.arcLength;
                this.app.newViewPort = undefined;
            }
        }
        this.app.asteroids.forEach(function (sprite) {
            sprite.update();
        });
        this.app.planetoids.forEach(function (sprite) {
            sprite.update();
        });
        var proximityAsteroids = this.app.proximateAsteroids();
        // console.log(proximityAsteroids.length)
        var player = this.app.sprites[0];
        if (player.lockedAsteroid) {
            player.x = player.lockedAsteroid.x;
            player.y = player.lockedAsteroid.y;
        }
        else {
            var influenceDistance_1 = 100;
            proximityAsteroids.forEach(function (asteroid) {
                var dx = asteroid.x - player.x;
                var dy = asteroid.y - player.y;
                var distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < influenceDistance_1) {
                    // if similar direction, match speed
                    if (distance < 10 &&
                        Math.abs(player.dx - asteroid.dx) < 10 &&
                        Math.abs(player.dy - asteroid.dy) < 10) {
                        if (distance < 1 && !player.isThrusting()) {
                            _this.app.lockOn(asteroid);
                            console.log("influence distance", distance);
                        }
                        var inverseDistance = 1 / distance * 0.1;
                        player.x += (asteroid.x - player.x) * inverseDistance;
                        player.y += (asteroid.y - player.y) * inverseDistance;
                    }
                }
            });
        }
        this.app.player.update();
        this.app.viewPort.update(player);
        this.app.calculateSector();
        // render stuff
        this.app.largeGameCanvas.draw(this.app);
        this.app.smallGameCanvas.draw(this.app);
        this.app.infoPane.render();
    };
    GameLoop.prototype.processInput = function () {
        var player = this.app.sprites[0];
        player.accelerating = false;
        if (this.app.pressedKeys["ArrowLeft"]) {
            player.direction -= player.rotationalAcceleration;
        }
        if (this.app.pressedKeys["ArrowRight"]) {
            player.direction += player.rotationalAcceleration;
        }
        if (this.app.pressedKeys["ArrowUp"]) {
            if (player.lockedAsteroid !== null) {
                this.app.detachBody();
            }
            player.accelerate();
        }
        if (this.app.pressedKeys["ArrowDown"]) {
            player.dx = 0;
            player.dy = 0;
        }
    };
    GameLoop.prototype.start = function () {
        var _this = this;
        setInterval(function () {
            _this.update();
        }, 1000 / 60);
    };
    return GameLoop;
}());
export { GameLoop };
