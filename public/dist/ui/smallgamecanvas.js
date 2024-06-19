var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import Player from '../player.js';
import { GameCanvas } from './gamecanvas.js';
var SmallGameCanvas = /** @class */ (function (_super) {
    __extends(SmallGameCanvas, _super);
    function SmallGameCanvas(app, width) {
        var _this = _super.call(this, app, width) || this;
        _this.viewPort = {
            x: 0,
            y: 0,
            width: 10,
            height: 10
        };
        _this.zoom = 1;
        _this.maxZoomMultiplier = 1.5;
        _this.canvas = document.getElementById('canvas');
        _this.ctx = _this.canvas.getContext('2d');
        _this.maskCanvas = document.createElement('canvas');
        _this.maskCanvas.width = _this.width;
        _this.maskCanvas.height = _this.height;
        _this.ctx2 = _this.maskCanvas.getContext('2d');
        _this.outputCanvas = document.getElementById('outputCanvas');
        _this.canvas.addEventListener('wheel', function (e) {
            if (e.deltaY < 0) {
                _this.zoom += 0.1;
            }
            else {
                _this.zoom -= 0.1;
            }
            if (_this.zoom < 0) {
                _this.zoom = 0;
            }
            if (_this.zoom > 1) {
                _this.zoom = 1;
            }
            _this.draw(app);
            e.preventDefault();
            e.stopPropagation();
            return false;
        });
        return _this;
    }
    SmallGameCanvas.prototype.setDimensions = function (width, height) {
        console.log('setting dimensions SmallGameCanvas', width, height);
        _super.prototype.setDimensions.call(this, width, height);
        this.maskCanvas.height = height;
        this.maskCanvas.width = width;
    };
    SmallGameCanvas.prototype.draw = function (app) {
        var _this = this;
        this.ctx.clearRect(0, 0, this.width, this.height);
        // this.ctx.fillStyle = "rgba(0, 0, 0, 0.01)"
        // this.ctx.fillRect(0, 0, this.width, this.height);
        // this.ctx.fillStyle = 'rgb(0, 0, 180)';
        // this.ctx.fillRect(0,0, this.width, this.height);
        this.ctx.resetTransform();
        app.sprites.forEach(function (sprite) {
            // if the sprite is not of class Player don't render it now
            if (sprite instanceof Player === true) {
                return;
            }
            _this.drawSprite(sprite);
        });
        this.drawPlayer(app.sprites[0]);
        // fill as light blue
        // commment out for fog of war
        // this.ctx.resetTransform();
        // this.applySubSectorMask();
        this.ctx.resetTransform();
        this.drawCurrentSectors();
        this.ctx.resetTransform();
        this.drawViewPort();
        this.ctx.resetTransform();
        this.ctx.globalCompositeOperation = 'source-over';
        // draw center of the system at the offset
        this.ctx.resetTransform();
        this.drawSector();
        this.drawBeltLimits();
        this.drawSystemCenter();
        this.ctx.resetTransform();
        this.drawFocussedSprite();
    };
    SmallGameCanvas.prototype.drawFocussedSprite = function () {
        var sprite = this.app.focussedSprite;
        if (sprite === undefined) {
            return;
        }
        this.ctx.beginPath();
        this.resetCanvasOnPlayer();
        // this.ctx.beginPath();
        this.ctx.fillStyle = "transparent";
        this.ctx.strokeStyle = 'yellow';
        // this.ctx.fillRect(
        //     this.gtlx(sprite.x),
        //     this.gtly(sprite.y),
        //     Math.ceil(this.scaleFactorX(sprite.radius)) * 2,
        //     Math.ceil(this.scaleFactorY(sprite.radius)) * 2
        // );
        this.ctx.arc(this.gtlx(sprite.x), this.gtly(sprite.y), Math.round(this.scaleFactorX(sprite.radius)) + 3, 0, Math.PI * 2);
        this.ctx.stroke();
        this.ctx.fill();
        this.ctx.closePath();
        this.ctx.resetTransform();
        var subSector = sprite.subSector;
        this.ctx.fillStyle = "transparent";
        this.drawPie(subSector.minAngle, subSector.maxAngle, this.scaleFactorX(subSector.minRadius), this.scaleFactorX(subSector.maxRadius), 'rgba(255, 255, 255, 0.5)');
    };
    SmallGameCanvas.prototype.drawCurrentSectors = function () {
        var _this = this;
        var subsectors = this.app.getSubSectors();
        subsectors = this.app.currentSubSectors;
        subsectors.forEach(function (subSector) {
            var firstAngle = subSector.minAngle;
            var lastAngle = subSector.maxAngle;
            var outerRadius = _this.scaleFactorX(subSector.minRadius);
            var innerRadius = _this.scaleFactorX(subSector.maxRadius);
            _this.drawPie(firstAngle, lastAngle, innerRadius, outerRadius, 'rgb(255, 255, 255)');
        });
    };
    SmallGameCanvas.prototype.drawSystemCenter = function () {
        this.ctx.resetTransform();
        this.ctx.beginPath();
        this.ctx.arc(this.xOffset(), this.yOffset(), 10, 0, Math.PI * 2);
        this.ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
        this.ctx.fill();
    };
    SmallGameCanvas.prototype.drawBeltLimits = function () {
        this.ctx.beginPath();
        this.ctx.fillStyle = 'rgb(0, 0, 50)';
        this.ctx.arc(this.xOffset(), this.yOffset(), this.scaleFactorX(this.app.solarSystem.minRadius), 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.closePath();
    };
    SmallGameCanvas.prototype.applySubSectorMask = function () {
        var _this = this;
        if (this.app.newlyDiscoveredSubSectors.length > 0) {
            // this.ctx2.clearRect(0, 0, this.width, this.height);
            this.app.newlyDiscoveredSubSectors.forEach(function (subSector) {
                var firstAngle = subSector.minAngle;
                var lastAngle = subSector.maxAngle;
                var outerRadius = _this.scaleFactorXWithoutZoom(subSector.minRadius);
                var innerRadius = _this.scaleFactorXWithoutZoom(subSector.maxRadius);
                _this.drawSubSectorBlock(firstAngle, lastAngle, innerRadius, outerRadius, 'rgb(255, 255, 255)');
            });
            this.app.newlyDiscoveredSubSectors = [];
            // for debugging
            //this.drawMaskToOutputCanvas();
        }
        var imageData = this.maskCanvas;
        this.ctx.resetTransform();
        //console.log(this.xOffset(), this.yOffset());
        this.ctx.translate(this.xOffset(), this.yOffset());
        this.ctx.rotate(-this.app.player.angle + Math.PI);
        var x = -this.xOffset();
        //let y =  -this.yOffset() - ((this.height / 2) * this.zoom);
        var y = -this.yOffset() - (((this.height / 2)) * this.zoom);
        // y = -this.yOffset();
        var width = this.width + this.width * this.zoom;
        var height = this.height + this.height * this.zoom;
        // console.log(x, y, width, height);
        this.ctx.globalCompositeOperation = 'destination-in';
        this.ctx.drawImage(imageData, x, y, width, height);
        this.ctx.globalCompositeOperation = 'source-over';
        this.ctx.globalAlpha = 0.2;
        this.ctx.drawImage(imageData, x, y, width, height);
        this.ctx.globalAlpha = 1;
        this.ctx2.fillStyle = 'rgba(0, 0, 0, 0.8)';
        var imageData2 = this.ctx.getImageData(0, 0, this.width, this.height);
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
    };
    // mostly for debugging
    SmallGameCanvas.prototype.drawMaskToOutputCanvas = function () {
        var outctx = this.outputCanvas.getContext('2d');
        var outWidth = this.outputCanvas.width;
        var outHeight = this.outputCanvas.height;
        outctx.clearRect(0, 0, outWidth, outHeight);
        outctx.translate(outWidth / 2, outHeight / 2);
        // outctx.rotate(-this.app.player.angle + Math.PI);
        outctx.drawImage(this.maskCanvas, -outWidth / 2, -outHeight / 2, outWidth, outHeight);
        outctx.resetTransform();
    };
    SmallGameCanvas.prototype.drawSector = function () {
        var sector = this.app.getSector();
        var firstAngle = sector.minAngle;
        var lastAngle = sector.maxAngle;
        var outerRadius = this.scaleFactorX(this.app.solarSystem.minRadius);
        var innerRadius = this.scaleFactorX(this.app.solarSystem.maxRadius);
        this.drawPie(firstAngle, lastAngle, innerRadius, outerRadius);
    };
    SmallGameCanvas.prototype.drawPie = function (firstAngle, lastAngle, innerRadius, outerRadius, fillColor) {
        if (fillColor === void 0) { fillColor = undefined; }
        // draw the viewport
        this.ctx.translate(this.xOffset(), this.yOffset());
        this.ctx.rotate(-this.app.player.angle + Math.PI);
        this.ctx.strokeStyle = 'white';
        this.ctx.lineWidth = 1;
        this.ctx.beginPath();
        // draw a slice of the circle starting converting x to radius and y to angle
        this.ctx.arc(0, 0, innerRadius, firstAngle, lastAngle);
        // move to start of outer arc
        this.ctx.lineTo(0 + outerRadius * Math.cos(lastAngle), 0 + outerRadius * Math.sin(lastAngle));
        // draw outer arc
        this.ctx.arc(0, 0, outerRadius, lastAngle, firstAngle, true);
        this.ctx.lineTo(0 + innerRadius * Math.cos(firstAngle), 0 + innerRadius * Math.sin(firstAngle));
        if (fillColor !== undefined) {
            this.ctx.fillStyle = 'rgba(255, 255, 255, 1)';
            // this.ctx.fill();
        }
        else {
            this.ctx.fillStyle = "rgba(0, 0, 200, 0)";
        }
        this.ctx.stroke();
        this.ctx.closePath();
        this.ctx.resetTransform();
    };
    SmallGameCanvas.prototype.drawSubSectorBlock = function (firstAngle, lastAngle, innerRadius, outerRadius, fillColor) {
        if (fillColor === void 0) { fillColor = undefined; }
        var xOffset = this.maskCanvas.width / 2;
        var yOffset = this.maskCanvas.height / 2;
        // draw the viewport
        this.ctx2.translate(xOffset, yOffset);
        // this.ctx2.rotate(-this.app.player.angle + Math.PI);
        this.ctx2.strokeStyle = 'white';
        this.ctx2.lineWidth = 1;
        this.ctx2.beginPath();
        // draw a slice of the circle starting converting x to radius and y to angle
        this.ctx2.arc(0, 0, innerRadius, firstAngle, lastAngle);
        // move to start of outer arc
        this.ctx2.lineTo(0 + outerRadius * Math.cos(lastAngle), 0 + outerRadius * Math.sin(lastAngle));
        // draw outer arc
        this.ctx2.arc(0, 0, outerRadius, lastAngle, firstAngle, true);
        this.ctx2.lineTo(0 + innerRadius * Math.cos(firstAngle), 0 + innerRadius * Math.sin(firstAngle));
        if (fillColor !== undefined) {
            this.ctx2.fillStyle = 'rgba(255, 255, 255, 1)';
            this.ctx2.fill();
        }
        this.ctx2.stroke();
        this.ctx2.resetTransform();
    };
    SmallGameCanvas.prototype.drawViewPort = function () {
        var firstAngle = this.app.viewPort.getMinArc();
        var lastAngle = this.app.viewPort.getMaxArc();
        var outerRadius = this.scaleFactorX(this.app.viewPort.getMaxRadius());
        var innerRadius = this.scaleFactorX(this.app.viewPort.getMinRadius());
        this.drawPie(firstAngle, lastAngle, innerRadius, outerRadius);
    };
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
    SmallGameCanvas.prototype.resetCanvasOnPlayer = function () {
        this.ctx.translate(this.xOffset(), this.yOffset());
        this.ctx.rotate(-this.app.player.angle + Math.PI);
    };
    SmallGameCanvas.prototype.drawSprite = function (sprite) {
        this.resetCanvasOnPlayer();
        sprite.render(this);
        this.ctx.resetTransform();
    };
    SmallGameCanvas.prototype.xOffset = function () {
        var x = this.width / 2;
        return x + ((x) * this.zoom);
    };
    SmallGameCanvas.prototype.yOffset = function () {
        var y = this.height / 2;
        // don't apply zoom to y
        return y;
    };
    SmallGameCanvas.prototype.scaleFactorXWithoutZoom = function (x) {
        return x * (this.width / this.app.solarSystem.width);
    };
    SmallGameCanvas.prototype.scaleFactorX = function (x) {
        return x * (this.width / this.app.solarSystem.width) * (1 + this.zoom);
    };
    SmallGameCanvas.prototype.scaleFactorY = function (y) {
        return y * (this.height / this.app.solarSystem.height) * (1 + this.zoom);
    };
    SmallGameCanvas.prototype.gtlx = function (x) {
        return this.scaleFactorX(x);
    };
    SmallGameCanvas.prototype.gtly = function (y) {
        return this.scaleFactorY(y);
    };
    SmallGameCanvas.prototype.drawPlayer = function (player) {
        var nine = 90 * (Math.PI / 180);
        // nine %= Math.PI / 2;
        this.ctx.translate(this.xOffset(), this.yOffset());
        this.ctx.rotate(nine);
        this.ctx.beginPath();
        this.ctx.fillStyle = 'red';
        var angle = player.rotation;
        var radius = player.distanceFromCenter;
        var x = radius * Math.cos(nine);
        var y = radius * Math.sin(nine);
        this.ctx.translate(this.gtlx(x), this.gtly(y));
        // this.ctx.rotate(nine);
        var length = player.shipLength();
        this.ctx.fillRect(0, -2, length / 2, 4);
        this.ctx.fillRect(length / 2 * -1, -3, length / 2, 6);
        this.ctx.resetTransform();
        this.ctx.closePath();
    };
    return SmallGameCanvas;
}(GameCanvas));
export { SmallGameCanvas };
