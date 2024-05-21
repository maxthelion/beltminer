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

    maskCanvas: HTMLCanvasElement;
    ctx2: CanvasRenderingContext2D;

    outputCanvas: HTMLCanvasElement;
    zoom = 0.2;

    constructor(app: App) {
        super(app);
        this.canvas = document.getElementById('canvas') as HTMLCanvasElement;
        this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;
        this.maskCanvas = document.createElement('canvas');
        this.maskCanvas.width = this.width;
        this.maskCanvas.height = this.height;
        this.ctx2 = this.maskCanvas.getContext('2d') as CanvasRenderingContext2D;
        this.outputCanvas = document.getElementById('outputCanvas') as HTMLCanvasElement;
        this.canvas.addEventListener('wheel', (e) => {
            if (e.deltaY < 0) {
                this.zoom += 0.1;
            } else {
                this.zoom -= 0.1;
            }
            if (this.zoom < 0) {
                this.zoom = 0;
            }
            if (this.zoom > 1) {
                this.zoom = 1;
            }
            this.draw(app);
        });
    }

    draw(app: App) {
        this.ctx.clearRect(0, 0, this.width, this.height);
        // this.ctx.fillStyle = "rgba(0, 0, 0, 0.01)"
        // this.ctx.fillRect(0, 0, this.width, this.height);
        
        app.asteroids.forEach(asteroid => {
            this.drawSprite(asteroid);
        });
        app.planetoids.forEach(planetoid => {
            this.drawSprite(planetoid);
        });
        this.drawPlayer(app.sprites[0] as Player);
        // fill as light blue
        // this.ctx.fillStyle = 'rgb(0, 0, 180)';
        // this.ctx.fillRect(0,0, this.width, this.height);
        
        this.ctx.resetTransform();
        this.drawSubSectors();
        this.ctx.resetTransform();

        this.drawViewPort();
        this.ctx.resetTransform();
        
        this.ctx.globalCompositeOperation = 'source-over';
        // draw center of the system at the offset
        this.ctx.resetTransform();
        this.drawSector();
        this.drawBeltLimits();
        this.drawSystemCenter();
    }

    drawSystemCenter() {
        this.ctx.resetTransform();
        this.ctx.beginPath();
        this.ctx.arc(this.xOffset(), this.yOffset(), 10, 0, Math.PI * 2);
        this.ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
        this.ctx.fill();
    }
    drawBeltLimits() {
        this.ctx.beginPath();
        this.ctx.fillStyle = 'rgb(0, 0, 50)';
        this.ctx.arc(this.xOffset(), this.yOffset(), this.scaleFactorX(this.app.solarSystem.minRadius), 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.closePath();
    }

    drawSubSectors() {
        if (this.app.newSubSectors.length > 0) {
            // this.ctx2.clearRect(0, 0, this.width, this.height);
            this.app.newSubSectors.forEach(subSector => {
                let firstAngle = subSector.minAngle;
                let lastAngle = subSector.maxAngle;
                let outerRadius = this.scaleFactorXWithoutZoom( subSector.minRadius ) ;
                let innerRadius = this.scaleFactorXWithoutZoom( subSector.maxRadius ) ;
                this.drawSubSectorBlock(firstAngle, lastAngle, innerRadius, outerRadius, 'rgb(255, 255, 255)');
            })
            this.app.newSubSectors = [];
            // for debugging
            //this.drawMaskToOutputCanvas();
        }
        let imageData = this.maskCanvas
        this.ctx.resetTransform();
        //console.log(this.xOffset(), this.yOffset());
        this.ctx.translate(this.xOffset(), this.yOffset());
        this.ctx.rotate(-this.app.player.angle + Math.PI);
        let x = -this.xOffset();
        //let y =  -this.yOffset() - ((this.height / 2) * this.zoom);
        let y = -this.yOffset() - (((this.height / 2) ) * this.zoom ) ; 
        // y = -this.yOffset();
        let width = this.width + this.width * this.zoom;
        let height = this.height + this.height * this.zoom;
        // console.log(x, y, width, height);
        this.ctx.globalCompositeOperation = 'destination-in';
        this.ctx.drawImage(imageData,
            x,
            y,
            width,
            height
        );
        
        this.ctx.globalCompositeOperation = 'source-over';
        this.ctx.globalAlpha = 0.2;
        this.ctx.drawImage(imageData, 
            x, 
            y, 
            width, 
            height    
        ); 
        this.ctx.globalAlpha = 1;

        this.ctx2.fillStyle = 'rgba(0, 0, 0, 0.8)';
        let imageData2 = this.ctx.getImageData(0, 0, this.width, this.height);
        this.ctx.restore();
        this.ctx.putImageData(imageData2, 0, 0);
        // this.ctx.globalCompositeOperation = 'lighten';
        // reduce the alpha of the image
        //this.ctx2.globalAlpha = 0.5;

        // this.ctx2.globalCompositeOperation = 'source-in';
        // this.ctx2.fillRect(0, 0, this.width, this.height);
        // let imageData2 = this.canvas2;
        // this.ctx.drawImage(imageData2, 0, 0);
        this.ctx.globalCompositeOperation = 'source-over';
    }

    // mostly for debugging
    drawMaskToOutputCanvas() {
        
        let outctx = this.outputCanvas.getContext('2d') as CanvasRenderingContext2D;
            
        let outWidth = this.outputCanvas.width;
        let outHeight = this.outputCanvas.height;
        outctx.clearRect(0, 0, outWidth, outHeight);
        outctx.translate(outWidth / 2, outHeight / 2);
        // outctx.rotate(-this.app.player.angle + Math.PI);
        outctx.drawImage(this.maskCanvas, -outWidth/ 2, -outHeight/2, outWidth, outHeight);
        outctx.resetTransform();
    } 

    drawSector() {
        let sector = this.app.getSector();

        let firstAngle = sector.minAngle;
        let lastAngle = sector.maxAngle;
        let outerRadius = this.scaleFactorX( this.app.solarSystem.minRadius ) ;
        let innerRadius = this.scaleFactorX( this.app.solarSystem.maxRadius ) ;
        this.drawPie(firstAngle, lastAngle, innerRadius, outerRadius);
    }

    drawPie(firstAngle: number, lastAngle: number, innerRadius: number, outerRadius: number, fillColor: string | undefined = undefined ){
        // draw the viewport
        this.ctx.translate(this.xOffset(), this.yOffset());

        this.ctx.rotate(-this.app.player.angle + Math.PI);
        this.ctx.strokeStyle = 'white';
        this.ctx.lineWidth = 1;
        this.ctx.beginPath();

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
        if (fillColor !== undefined) {
            this.ctx.fillStyle = 'rgba(255, 255, 255, 1)';
            // this.ctx.fill();
        } else {
            this.ctx.fillStyle = "rgba(0, 0, 200, 0)";
        }
        this.ctx.stroke();
        this.ctx.closePath();
        this.ctx.resetTransform()
    }

    drawSubSectorBlock(firstAngle: number, lastAngle: number, innerRadius: number, outerRadius: number, fillColor: string | undefined = undefined ){
        let xOffset = this.maskCanvas.width / 2;
        let yOffset = this.maskCanvas.height / 2;
        // draw the viewport
        this.ctx2.translate(xOffset, yOffset);

        // this.ctx2.rotate(-this.app.player.angle + Math.PI);
        this.ctx2.strokeStyle = 'white';
        this.ctx2.lineWidth = 1;
        this.ctx2.beginPath();

        // draw a slice of the circle starting converting x to radius and y to angle
        this.ctx2.arc(
            0, 
            0, 
            innerRadius, 
            firstAngle,
            lastAngle
        );
        // move to start of outer arc
        
        this.ctx2.lineTo(
            0 + outerRadius * Math.cos(lastAngle),
            0 + outerRadius * Math.sin(lastAngle)
        );
        // draw outer arc
        this.ctx2.arc(
            0, 
            0, 
            outerRadius, 
            lastAngle,
            firstAngle,
            true
        );
        this.ctx2.lineTo(
            0 + innerRadius * Math.cos(firstAngle),
            0 + innerRadius * Math.sin(firstAngle)
        );
        if (fillColor !== undefined) {
            this.ctx2.fillStyle = 'rgba(255, 255, 255, 1)';
            this.ctx2.fill();
        }
        this.ctx2.stroke();    
        this.ctx2.resetTransform()
    }

    drawViewPort() {
        let firstAngle = this.app.viewPort.getMinArc();
        let lastAngle = this.app.viewPort.getMaxArc();
        let outerRadius = this.scaleFactorX( this.app.viewPort.getMaxRadius()) ;
        let innerRadius = this.scaleFactorX( this.app.viewPort.getMinRadius()) ;
        this.drawPie(firstAngle, lastAngle, innerRadius, outerRadius);
    }

    // drawPlanetoid(planetoid: Planetoid) {
    //     this.ctx.beginPath();
    //     this.ctx.arc(
    //         this.gtlx(planetoid.x),
    //         this.gtly(planetoid.y),
    //         this.scaleFactorX(planetoid.radius),
    //         0,
    //         Math.PI * 2
    //     );
    //     this.ctx.fillStyle = planetoid.color;
    //     this.ctx.fill();
    //     this.ctx.closePath();
    // }

    drawSprite(sprite: Asteroid) {
        this.ctx.translate(this.xOffset(), this.yOffset());
        this.ctx.rotate(-this.app.player.angle + Math.PI);
        // this.ctx.beginPath();
        this.ctx.fillStyle = sprite.color;

        this.ctx.fillRect(
            this.gtlx(sprite.x),
            this.gtly(sprite.y),
            Math.ceil(this.scaleFactorX(sprite.radius)) * 2,
            Math.ceil(this.scaleFactorY(sprite.radius)) * 2
        );
        
        // this.ctx.arc(
        //     this.gtlx(asteroid.x),
        //     this.gtly(asteroid.y),
        //     Math.round(this.scaleFactorX(asteroid.radius)),
        //     0,
        //     Math.PI * 2
        // );
        this.ctx.fill();
        this.ctx.closePath();
        this.ctx.resetTransform();
    }

    maxZoomMultiplier = 1.5;
    xOffset() {
        let x = this.width / 2;
        return x + ((x) * this.zoom);
    }

    yOffset() {
        let y = this.height / 2;
        // don't apply zoom to y
        return y;
    }

    scaleFactorXWithoutZoom(x: number) {
        return x * (this.width / this.app.solarSystem.width);
    }

    scaleFactorX(x: number) {
        return x * (this.width / this.app.solarSystem.width) * (1 + this.zoom);
    }

    scaleFactorY(y: number) {
        return y * (this.height / this.app.solarSystem.height) * (1 + this.zoom);
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
        this.ctx.translate(this.xOffset(), this.yOffset());
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
