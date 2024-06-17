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
import Renderable from "./renderable.js";
var EntityViewer = /** @class */ (function (_super) {
    __extends(EntityViewer, _super);
    function EntityViewer(app) {
        var _this = _super.call(this, app) || this;
        _this.cachedObject = undefined;
        _this.app = app;
        _this.el = document.getElementById('entityviewer');
        return _this;
    }
    EntityViewer.prototype.render = function () {
        if (this.cachedObject !== this.app.focussedSprite) {
            if (this.app.focussedSprite !== null) {
                this.cachedObject = this.app.focussedSprite;
                var sprite = this.app.focussedSprite;
                this.el.innerHTML = "\n                <div>\n                <p>Focussed object: ".concat(sprite.uuid, "</p>\n                <p>Position: ").concat(sprite.x, ", ").concat(sprite.y, "</p>\n                <p>Sector: ").concat(sprite.sector, "</p>\n                <p>Radius: ").concat(sprite.radius, "</p>\n                </div>\n                <div id=\"entitycanvasholder\">\n                <canvas id=\"entitycanvas\" width=\"100\" height=\"100\" style=\"background: black;\"></canvas>\n                </div>\n                ");
                var canvas = document.getElementById('entitycanvas');
                var elHolder = document.getElementById('entitycanvasholder');
                canvas.width = elHolder.clientWidth;
                canvas.height = elHolder.clientHeight;
                var ctx = canvas.getContext('2d');
                ctx.beginPath();
                var maxRadius = 100;
                var scaleFactor = sprite.radius;
                ctx.arc(canvas.width / 2, canvas.height / 2, (canvas.height / 2) * scaleFactor, 0, 2 * Math.PI);
                ctx.fillStyle = 'red';
                ctx.fill();
                ctx.stroke();
            }
            else {
                this.el.innerHTML = 'NO object focussed';
                this.cachedObject = undefined;
            }
        }
    };
    return EntityViewer;
}(Renderable));
export default EntityViewer;
