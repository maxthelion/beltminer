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
var AsteroidStatPane = /** @class */ (function (_super) {
    __extends(AsteroidStatPane, _super);
    function AsteroidStatPane(app, asteroid) {
        var _this = _super.call(this, app) || this;
        _this.el = document.createElement('div');
        _this.el.id = 'asteroidstatpane';
        _this.asteroid = asteroid;
        var nameEl = document.createElement('h1');
        nameEl.textContent = 'Asteroid ' + asteroid.uuid;
        _this.el.appendChild(nameEl);
        return _this;
    }
    return AsteroidStatPane;
}(Renderable));
export default AsteroidStatPane;
