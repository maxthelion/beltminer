import { Planetoid } from './planetoid.js';
import { Asteroid } from './asteroid.js';
import Player from './player.js';
import { GameLoop } from './gameloop.js';
import InfoPane from './ui/infopane.js';
import { LargeGameCanvas } from './ui/largegamecanvas.js';
import { SmallGameCanvas } from './ui/smallgamecanvas.js';
import ActionsBar from './ui/actioinsbar.js';
import { InventoryModalPane } from './ui/modalpane.js';
import { RadialViewPort } from './radialviewport.js';
import { Sector, SubSector } from './sectors.js';
import SolarSystem from './solarsystem.js';
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
        this.defaultViewPort = new RadialViewPort({
            minRadius: 0,
            radialWidth: 100,
            arcLength: 0.02 * Math.PI * 2,
            minArc: 0,
        });
        this.newViewPort = undefined;
        this.pressedKeys = {
            "ArrowLeft": false,
            "ArrowRight": false,
            "ArrowUp": false,
            "ArrowDown": false
        };
        this.showActions = false;
        this.currentSectorIndex = 0;
        this.sectors = [];
        this.subSectors = [];
        this.currentSubSector = new SubSector(0, 0);
        this.totalSectors = 10;
        this.newSubSectors = [];
        this.spriteSheet = spriteSheet;
        var largeHolderWidth = (_a = document.getElementById("largeholder")) === null || _a === void 0 ? void 0 : _a.clientWidth;
        this.solarSystem = new SolarSystem();
        this.viewPort = this.defaultViewPort;
        this.sprites = [];
        this.player = new Player(this.solarSystem);
        this.sprites.push(this.player);
        this.planetoids = [];
        var ceres = new Planetoid(this.solarSystem, "Ceres");
        this.sprites.push(ceres);
        this.planetoids.push(ceres);
        for (var i = 0; i < 10; i++) {
            var otherThing = new Planetoid(this.solarSystem, "Ceres");
            this.sprites.push(otherThing);
            this.planetoids.push(otherThing);
        }
        this.asteroids = [];
        // iterate through sections of the solar system and create asteroids in each section
        // let sectionWidth = 0.1 * Math.PI;
        var numSectors = this.totalSectors;
        for (var sectorNum = 0; sectorNum < numSectors; sectorNum++) {
            var sector = new Sector(sectorNum);
            this.sectors[sectorNum] = sector;
            var density = 100 * (sectorNum + 1);
            for (var i = 0; i < density; i++) {
                this.asteroids.push(new Asteroid(this.solarSystem, sector));
            }
            //this.asteroids.push(new Asteroid(this.solarSystem, sectorNum));
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
    App.prototype.detachBody = function () {
        this.player.lockedAsteroid = null;
        this.actionsBar.hide();
        this.setDefaultViewPort();
    };
    App.prototype.init = function () {
        this.gameLoop.start();
    };
    App.prototype.proximateAsteroids = function () {
        var _this = this;
        return this.asteroids.filter(function (asteroid) {
            return _this.areAnglesClose(asteroid.angle, _this.player.angle, 0.1 * Math.PI);
        });
    };
    App.prototype.areAnglesClose = function (theta1, theta2, thresholdAngle) {
        // Calculate the absolute difference between the angles
        var angleDifference = Math.abs(theta1 - theta2);
        // Normalize the difference to be within [0, π]
        angleDifference = Math.min(angleDifference, 2 * Math.PI - angleDifference);
        // Compare the angular difference to the threshold angle
        return angleDifference <= thresholdAngle;
    };
    App.prototype.setDefaultViewPort = function () {
        this.newViewPort = this.defaultViewPort;
    };
    App.prototype.newViewPortForEntity = function (entity) {
        console.log("new view port for entity", entity);
        this.newViewPort = new RadialViewPort({
            minArc: entity.angle - (entity.radius * 2 * Math.PI),
            minRadius: entity.distanceFromCenter - (entity.radius * 2),
            arcLength: 0.05 * Math.PI * 2,
            radialWidth: entity.radius * 4
        });
    };
    App.prototype.updateGame = function () {
        this.calculateSector();
        this.calculateSubSectors();
        this.calculateViewPort();
    };
    App.prototype.calculateSubSectors = function () {
        var subSectors = SubSector.subSectorNum;
        var sectorSize = (2 * Math.PI) / (this.totalSectors * subSectors);
        var subSectorArcIndex = Math.floor(this.player.angle / sectorSize);
        var minRadius = this.solarSystem.minRadius;
        var maxRadius = this.solarSystem.maxRadius;
        var radialRange = maxRadius - minRadius;
        var radialSectorNum = 10;
        var subSectorRadialIndex = Math.floor((this.player.distanceFromCenter - minRadius) / radialRange * radialSectorNum);
        if (subSectorArcIndex !== this.currentSubSector.arcIndex || subSectorRadialIndex !== this.currentSubSector.radialIndex) {
            this.currentSubSector = new SubSector(subSectorArcIndex, subSectorRadialIndex);
            this.subSectors[subSectorArcIndex] = this.subSectors[subSectorArcIndex] || [];
            this.subSectors[subSectorArcIndex][subSectorRadialIndex] = this.currentSubSector;
            console.log(subSectorRadialIndex);
            this.newSubSectors.push(this.currentSubSector);
        }
        //console.log(this.subSectors.length)
    };
    App.prototype.calculateViewPort = function () {
        // console.log(this.player.velocity)
        if (this.player.velocity > 2) {
            // console.log(this.viewPort.arcLength, this.viewPort.radialWidth)
            // this.viewPort.radialWidth = Math.abs(this.player.velocity * 10) + 100;
            // let radialAddition = (this.defaultViewPort.radialWidth) * this.player.velocity;
            // console.log(this.player.velocity, radialAddition)
            // this.viewPort.radialWidth = this.defaultViewPort.radialWidth + radialAddition;
            // this.viewPort.arcLength = Math.abs(this.player.velocity * 10);
        }
        else {
            this.viewPort.radialWidth = this.defaultViewPort.radialWidth;
            this.viewPort.arcLength = this.defaultViewPort.arcLength;
        }
    };
    App.prototype.calculateSector = function () {
        var sectorSize = (2 * Math.PI) / this.totalSectors;
        var sector = Math.floor(this.player.angle / sectorSize);
        if (sector !== this.currentSectorIndex) {
            this.currentSectorIndex = sector;
            // console.log("sector", sector);
        }
    };
    App.prototype.getSector = function () {
        return this.sectors[this.currentSectorIndex];
    };
    return App;
}());
export default App;
