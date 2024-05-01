import { Sprite, Asteroid, Planetoid } from './sprites.js';
import Player from './player.js';
import { GameLoop } from './gameloop.js';
import InfoPane from './ui/infopane.js';
import { LargeGameCanvas } from './ui/largegamecanvas.js';
import { SmallGameCanvas } from './ui/smallgamecanvas.js';
import ActionsBar from './ui/actioinsbar.js';
import ModalPane, { InventoryModalPane } from './ui/modalpane.js';

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
    viewPort: ViewPort = new ViewPort({
        x: 0,
        y: 0,
        width: 100,
        height: 100
    });
    newViewPort: ViewPort | undefined = undefined;
    pressedKeys = {
        "ArrowLeft": false,
        "ArrowRight": false,
        "ArrowUp": false,
        "ArrowDown": false
    };
    player: Player;
    solarSystem: SolarSystem;
    infoPane: InfoPane;
    modalPane: ModalPane | undefined;
    showActions = false;
    actionsBar: ActionsBar
    constructor(spriteSheet: HTMLImageElement) {
        this.spriteSheet = spriteSheet;
        let largeHolderWidth = document.getElementById("largeholder")?.clientWidth;
        this.solarSystem = new SolarSystem();

        this.sprites = [];

        this.player = new Player();
        this.sprites.push(this.player);

        let ceres = new Planetoid(this.solarSystem, "Ceres");
        this.sprites.push(ceres);
        this.planetoids = [ ];
        this.planetoids.push(ceres);

        this.asteroids = [ ];
        
        for (let i = 0; i < this.solarSystem.asteroidNum; i++) {
            this.asteroids.push(new Asteroid(this.solarSystem));
        }
        this.actionsBar = new ActionsBar(this);
        this.infoPane = new InfoPane(this);
        this.smallGameCanvas = new SmallGameCanvas(this);
        this.largeGameCanvas = new LargeGameCanvas(this, largeHolderWidth || 800, this.spriteSheet);
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
            if (e.key === "e") {
                if (this.modalPane) {
                    this.modalPane = undefined;
                } else {
                    this.showInventory();
                }
            }
        });
    }

    showInventory() {
        console.log("show inventory");
        this.modalPane = new InventoryModalPane(this);
        this.modalPane.show();
    }

    lockOn(asteroid: Asteroid) {
        this.actionsBar.show();    
        this.player.lockOn(asteroid);
        this.newViewPortForEntity(asteroid)
    }

    init() {
        this.gameLoop.start();    
    }

    newViewPortForEntity(entity: Asteroid | Planetoid ) {
        this.newViewPort = new ViewPort({
            x: entity.x - (entity.radius * 2),
            y: entity.y - (entity.radius * 2),
            width: entity.radius * 4,
            height: entity.radius * 4
        });
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


