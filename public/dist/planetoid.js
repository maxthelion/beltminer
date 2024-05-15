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
import { Asteroid } from './asteroid.js';
import { Sector } from './app.js';
var Planetoid = /** @class */ (function (_super) {
    __extends(Planetoid, _super);
    function Planetoid(system, name) {
        var _this = this;
        var sector = new Sector(0);
        _this = _super.call(this, system, sector) || this;
        _this.color = 'cyan';
        _this.mass = 1;
        _this.radius = 30;
        _this.mass = _this.radius * 0.0005;
        _this.name = name;
        return _this;
    }
    return Planetoid;
}(Asteroid));
export { Planetoid };
