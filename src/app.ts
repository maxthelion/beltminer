import { Sprite } from './sprites.js';
import { Planetoid } from './planetoid.js';
import { Asteroid } from './asteroid.js';
import Player from './player.js';
import { GameLoop } from './gameloop.js';
import InfoPane from './ui/infopane.js';
import { LargeGameCanvas } from './ui/largegamecanvas.js';
import { SmallGameCanvas } from './ui/smallgamecanvas.js';
import ActionsBar from './ui/actioinsbar.js';
import ModalPane, { InventoryModalPane } from './ui/modalpane.js';
import { RadialViewPort } from './radialviewport.js';
import { Sector, SubSector } from './sectors.js';
import SolarSystem from './solarsystem.js';
import KeyHandler from './keyhandler.js';
import EntityViewer from './ui/entityviewer.js';

class ViewPort {
    x: number;
    y: number;
    width: number;
    height: number;
    constructor({x, y, width, height}: {x: number, y: number, width: number, height: number}) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
}

export default class App {
    gameLoop: GameLoop;
    sprites: Sprite[];
    asteroids: Asteroid[];
    planetoids: Planetoid[];
    smallGameCanvas: SmallGameCanvas;
    largeGameCanvas: LargeGameCanvas;
    zoomLevel = 100;
    spriteSheet: HTMLImageElement;
    defaultViewPort: RadialViewPort = new RadialViewPort({
        minRadius: 0,
        radialWidth: 100,
        arcLength: 0.02 * Math.PI * 2,
        minArc: 0,
    });
    newViewPort: RadialViewPort | undefined = undefined;
    viewPort: RadialViewPort;
    keyHandler: KeyHandler;
    
    player: Player;
    solarSystem: SolarSystem;
    infoPane: InfoPane;
    entityViewer: EntityViewer;
    modalPane: ModalPane | undefined;
    showActions = false;
    actionsBar: ActionsBar;
    currentSectorIndex: number = 0;
    sectors: Sector[] = [];
    subSectors: SubSector[][] = [];
    currentSubSector: SubSector = new SubSector(0, 0);
    newSubSectors: SubSector[] = [];
    focussedSprite: Sprite | undefined;

    constructor(spriteSheet: HTMLImageElement) {
        this.spriteSheet = spriteSheet;
        
        this.solarSystem = new SolarSystem();
        this.viewPort = this.defaultViewPort;
        this.sprites = [];

        this.player = new Player(this.solarSystem);
        this.sprites.push(this.player);
        this.planetoids = [ ];
        let ceres = new Planetoid(this.solarSystem, "Ceres");
        this.sprites.push(ceres);
        this.planetoids.push(ceres);

        for (let i = 0; i < 10; i++) {
            let otherThing = new Planetoid(this.solarSystem, "Ceres");
            this.sprites.push(otherThing);
            this.planetoids.push(otherThing);
        }

        this.asteroids = [ ];
        // iterate through sections of the solar system and create asteroids in each section
        // let sectionWidth = 0.1 * Math.PI;
        let numSectors = Sector.sectorNum;
        for (let sectorNum = 0; sectorNum < numSectors; sectorNum++) {
            let sector = new Sector(sectorNum);
            this.sectors[sectorNum] = sector;
            let density = 100 * (sectorNum + 1);
            for (let i = 0; i < density; i++) {
                let asteroid = new Asteroid(this.solarSystem, sector);
                this.sectors[sectorNum].asteroids = this.sectors[sectorNum].asteroids || [];
                this.sectors[sectorNum].asteroids.push(asteroid);


            }
            this.asteroids = this.asteroids.concat(this.sectors[sectorNum].asteroids);
            //this.asteroids.push(new Asteroid(this.solarSystem, sectorNum));
        }
        this.actionsBar = new ActionsBar(this);
        this.infoPane = new InfoPane(this);
        this.entityViewer = new EntityViewer(this);
        let largeHolderWidth = document.getElementById("largescreen")?.clientWidth;
        let smallHolderWidth = document.getElementById("smallscreen")?.clientWidth;
        // console.log(smallHolderWidth)
        this.smallGameCanvas = new SmallGameCanvas(this, smallHolderWidth!);
        this.largeGameCanvas = new LargeGameCanvas(this, largeHolderWidth || 800, this.spriteSheet);
        this.resizeCanvasses();
        this.gameLoop = new GameLoop(this);
        window.addEventListener("resize", this.resizeCanvasses.bind(this));
        this.keyHandler = new KeyHandler(this);
    }

    resizeCanvasses() {
        let largeHolderEl = document.getElementById("largescreen")
        let largeHolderWidth = largeHolderEl!.clientWidth;
        let largeHolderHeight = largeHolderEl!.clientHeight;
        this.largeGameCanvas.setDimensions(largeHolderWidth || 800, largeHolderHeight || 800);
        let smallHolderEl = document.getElementById("smallscreen")
        let smallHolderWidth = smallHolderEl!.clientWidth;
        let smallHolderHeight = smallHolderEl!.clientHeight;
        console.log(smallHolderWidth, smallHolderHeight)
        this.smallGameCanvas.setDimensions(smallHolderWidth || 200, smallHolderHeight || 200);
    }

    showInventory() {
        this.modalPane = new InventoryModalPane(this);
        this.modalPane.show();
    }

    lockOn(asteroid: Asteroid) {
        this.actionsBar.show();    
        this.player.lockOn(asteroid);
        this.newViewPortForEntity(asteroid)
    }

    detachBody() {
        this.player.lockedAsteroid = null;
        this.actionsBar.hide();
        this.setDefaultViewPort();
    }

    init() {
        this.gameLoop.start();    
    }

    proximateAsteroids() {
        return this.asteroids.filter(asteroid => {
            return this.areAnglesClose(asteroid.angle, this.player.angle, 0.1 * Math.PI) 
        });
    }

    getSubSectors() {
        return [this.currentSubSector]
    }

    areAnglesClose(theta1: number, theta2: number, thresholdAngle: number) {
        // Calculate the absolute difference between the angles
        let angleDifference = Math.abs(theta1 - theta2);
    
        // Normalize the difference to be within [0, π]
        angleDifference = Math.min(angleDifference, 2 * Math.PI - angleDifference);
    
        // Compare the angular difference to the threshold angle
        return angleDifference <= thresholdAngle;
    }

    setDefaultViewPort() {
        this.newViewPort = this.defaultViewPort
    }

    newViewPortForEntity(entity: Asteroid | Planetoid ) {
        console.log("new view port for entity", entity);
        this.newViewPort = new RadialViewPort({
            minArc: entity.angle - (entity.radius * 2 * Math.PI),
            minRadius: entity.distanceFromCenter - (entity.radius * 2),
            arcLength: 0.05 * Math.PI * 2,
            radialWidth: entity.radius * 4
        });
    }

    updateGame(){
        this.calculateSector();
        this.calculateSubSectors();
        this.calculateViewPort();
    }

    calculateSubSectors() {
        let subSectors = SubSector.subSectorNum;
        let sectorSize = (2 * Math.PI) / (Sector.sectorNum * subSectors);
        let subSectorArcIndex = Math.floor(this.player.angle / sectorSize);
        let minRadius = this.solarSystem.minRadius;
        let maxRadius = this.solarSystem.maxRadius;
        let radialRange = maxRadius - minRadius;
        let radialSectorNum = SubSector.radialDivisions;
        let subSectorRadialIndex = Math.floor((this.player.distanceFromCenter - minRadius) / radialRange * radialSectorNum);
        if (subSectorArcIndex !== this.currentSubSector.arcIndex || subSectorRadialIndex !== this.currentSubSector.radialIndex) {
            this.currentSubSector = new SubSector(subSectorArcIndex, subSectorRadialIndex);
            this.subSectors[subSectorArcIndex] = this.subSectors[subSectorArcIndex] || [];
            this.subSectors[subSectorArcIndex][subSectorRadialIndex] = this.currentSubSector;
            // console.log(subSectorRadialIndex, subSectorArcIndex)
            this.newSubSectors.push(this.currentSubSector);
        }
        //console.log(this.subSectors.length)
    }

    calculateViewPort() {
        // console.log(this.player.velocity)
        if (this.player.velocity > 2) {
            // console.log(this.viewPort.arcLength, this.viewPort.radialWidth)
            // this.viewPort.radialWidth = Math.abs(this.player.velocity * 10) + 100;
            // let radialAddition = (this.defaultViewPort.radialWidth) * this.player.velocity;
            // console.log(this.player.velocity, radialAddition)
            // this.viewPort.radialWidth = this.defaultViewPort.radialWidth + radialAddition;
            // this.viewPort.arcLength = Math.abs(this.player.velocity * 10);
        } else {
            this.viewPort.radialWidth = this.defaultViewPort.radialWidth;
            this.viewPort.arcLength = this.defaultViewPort.arcLength;
        }
    }

    calculateSector() {
        let sectorSize = (2 * Math.PI) / Sector.sectorNum;
        let sector = Math.floor(this.player.angle / sectorSize);
        if (sector !== this.currentSectorIndex) {
            this.currentSectorIndex = sector;
            // console.log("sector", sector);
        }
    }

    getSector() {
        return this.sectors[this.currentSectorIndex];
    }

    toggleInventory() {
        if (this.modalPane) {
            this.modalPane = undefined;
        } else {
            this.showInventory();
        }
    }

    cycleProximateObjects() {
        let sector = this.getSector();
        let subSectorArcIndex = this.currentSubSector.arcIndex;
        let radialSectorIndex = this.currentSubSector.radialIndex;
        let proximateAsteroids = sector.subSectorsAsteroids[subSectorArcIndex][radialSectorIndex];
        // console.log(sector.subSectorsAsteroids[subSectorArcIndex]);
        // console.log(proximateAsteroids.length);
        if (!proximateAsteroids) {
            return;
        }
        let focussedIndex = proximateAsteroids.indexOf(this.focussedSprite as Asteroid);
        if (focussedIndex === -1) {
            this.focussedSprite = proximateAsteroids[0];
        } else {
            let nextIndex = focussedIndex + 1;
            if (nextIndex >= proximateAsteroids.length) {
                nextIndex = 0;
            }
            this.focussedSprite = proximateAsteroids[nextIndex];
            // console.log(this.focussedSprite, proximateAsteroids.length, nextIndex);
        }

        // this.newViewPortForEntity(this.focussedSprite as Asteroid);
    }
}




