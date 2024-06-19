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
import { PlanetaryBody } from "./planetarybody.js";
var Station = /** @class */ (function (_super) {
    __extends(Station, _super);
    function Station(app, sector) {
        var _this = _super.call(this, app, sector) || this;
        _this.color = 'blue';
        return _this;
    }
    Station.prototype.render = function (gamecanvas) {
        var sprite = this;
        // this.ctx.beginPath();
        var ctx = gamecanvas.ctx;
        ctx.fillStyle = sprite.color;
        // console.log(sprite.radius);
        var width = Math.ceil(gamecanvas.scaleFactorX(sprite.radius)) * 2;
        var height = Math.ceil(gamecanvas.scaleFactorY(sprite.radius)) * 2;
        ctx.fillRect(gamecanvas.gtlx(sprite.x) - (width / 2), gamecanvas.gtly(sprite.y) - (height / 2), width, height);
        // ctx.arc(
        //     this.gtlx(asteroid.x),
        //     this.gtly(asteroid.y),
        //     Math.round(this.scaleFactorX(asteroid.radius)),
        //     0,
        //     Math.PI * 2
        // );
        ctx.fill();
        ctx.closePath();
    };
    return Station;
}(PlanetaryBody));
export { Station };
var AlienStation = /** @class */ (function (_super) {
    __extends(AlienStation, _super);
    function AlienStation(app, sector) {
        var _this = _super.call(this, app, sector) || this;
        _this.color = 'purple';
        return _this;
    }
    return AlienStation;
}(Station));
export { AlienStation };
