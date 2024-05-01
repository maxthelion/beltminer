import { Asteroid, Planetoid } from './sprites.js';
import Player from './player.js';
import { GameLoop } from './gameloop.js';
import InfoPane from './ui/infopane.js';
import { LargeGameCanvas } from './ui/largegamecanvas.js';
import { SmallGameCanvas } from './ui/smallgamecanvas.js';
import ActionsBar from './ui/actioinsbar.js';
import { InventoryModalPane } from './ui/modalpane.js';
var ViewPort = /** @class */ (function () {
    function ViewPort(_a) {
        var x = _a.x, y = _a.y, width = _a.width, height = _a.height;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
    return ViewPort;
}());
var App = /** @class */ (function () {
    function App(spriteSheet) {
        var _this = this;
        var _a;
        this.zoomLevel = 100;
        this.viewPort = new ViewPort({
            x: 0,
            y: 0,
            width: 100,
            height: 100
        });
        this.newViewPort = undefined;
        this.pressedKeys = {
            "ArrowLeft": false,
            "ArrowRight": false,
            "ArrowUp": false,
            "ArrowDown": false
        };
        this.showActions = false;
        this.spriteSheet = spriteSheet;
        var largeHolderWidth = (_a = document.getElementById("largeholder")) === null || _a === void 0 ? void 0 : _a.clientWidth;
        this.solarSystem = new SolarSystem();
        this.sprites = [];
        this.player = new Player();
        this.sprites.push(this.player);
        var ceres = new Planetoid(this.solarSystem, "Ceres");
        this.sprites.push(ceres);
        this.planetoids = [];
        this.planetoids.push(ceres);
        this.asteroids = [];
        for (var i = 0; i < this.solarSystem.asteroidNum; i++) {
            this.asteroids.push(new Asteroid(this.solarSystem));
        }
        this.actionsBar = new ActionsBar(this);
        this.infoPane = new InfoPane(this);
        this.smallGameCanvas = new SmallGameCanvas(this);
        this.largeGameCanvas = new LargeGameCanvas(this, largeHolderWidth || 800, this.spriteSheet);
        this.gameLoop = new GameLoop(this);
        window.addEventListener("resize", function () {
            var _a;
            console.log("resize");
            largeHolderWidth = (_a = document.getElementById("largeholder")) === null || _a === void 0 ? void 0 : _a.clientWidth;
            _this.largeGameCanvas.setWidth(largeHolderWidth || 800);
        });
        document.addEventListener('keydown', function (e) {
            if (_this.pressedKeys[e.key] !== undefined) {
                _this.pressedKeys[e.key] = true;
            }
        });
        document.addEventListener('keyup', function (e) {
            if (_this.pressedKeys[e.key] !== undefined) {
                _this.pressedKeys[e.key] = false;
            }
            if (e.key === "e") {
                if (_this.modalPane) {
                    _this.modalPane = undefined;
                }
                else {
                    _this.showInventory();
                }
            }
        });
    }
    App.prototype.showInventory = function () {
        console.log("show inventory");
        this.modalPane = new InventoryModalPane(this);
        this.modalPane.show();
    };
    App.prototype.lockOn = function (asteroid) {
        this.actionsBar.show();
        this.player.lockOn(asteroid);
        this.newViewPortForEntity(asteroid);
    };
    App.prototype.init = function () {
        this.gameLoop.start();
    };
    App.prototype.newViewPortForEntity = function (entity) {
        this.newViewPort = new ViewPort({
            x: entity.x - (entity.radius * 2),
            y: entity.y - (entity.radius * 2),
            width: entity.radius * 4,
            height: entity.radius * 4
        });
    };
    return App;
}());
export default App;
var SolarSystem = /** @class */ (function () {
    function SolarSystem() {
        this.asteroidNum = 200;
        this.centerX = 0;
        this.centerY = 0;
        this.minRadius = 150;
        this.maxRadius = 250;
        this.width = this.maxRadius * 2 + 100;
        this.height = this.maxRadius * 2 + 100;
    }
    return SolarSystem;
}());
export { SolarSystem };
