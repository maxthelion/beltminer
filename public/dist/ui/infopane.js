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
import AsteroidStatPane from "./asteroidstatpane.js";
import Renderable from "./renderable.js";
var InfoPane = /** @class */ (function (_super) {
    __extends(InfoPane, _super);
    function InfoPane(app) {
        var _this = _super.call(this, app) || this;
        _this.cachedObjectID = null;
        _this.asteroidPane = null;
        _this.el = document.getElementById('infopane');
        return _this;
    }
    InfoPane.prototype.render = function () {
        var _a;
        if (this.cachedObjectID !== ((_a = this.app.player.lockedAsteroid) === null || _a === void 0 ? void 0 : _a.uuid)) {
            if (this.app.player.isLocked()) {
                this.el.innerHTML = "<h1>Locked object </h1>";
                this.asteroidPane = new AsteroidStatPane(this.app, this.app.player.lockedAsteroid);
                this.el.appendChild(this.asteroidPane.el);
                this.cachedObjectID = this.app.player.lockedAsteroid.uuid;
            }
            else {
                this.el.innerHTML = "\n                <h1>Info</h1>\n                <p>Use the arrow keys to move the ship.</p>\n                <p>Press space to lock onto an asteroid.</p>\n                <p>Press space again to unlock.</p>";
            }
        }
    };
    return InfoPane;
}(Renderable));
export default InfoPane;
