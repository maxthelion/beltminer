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
import { Sprite } from "./sprites.js";
var Actor = /** @class */ (function (_super) {
    __extends(Actor, _super);
    function Actor() {
        var _this = _super.call(this) || this;
        _this.behaviourTree = {
            type: "sequence",
            children: [
                {
                    type: "selector",
                    children: [
                        {
                            type: "condition",
                            func: "isCloseToAsteroid",
                            params: {
                                distance: 100
                            }
                        },
                        {
                            type: "condition",
                            func: "isCloseToPlanetoid",
                            params: {
                                distance: 100
                            }
                        }
                    ]
                },
                {
                    type: "action",
                    func: "moveRandom"
                }
            ]
        };
        _this.x = 50;
        _this.y = 50;
        _this.dx = 0;
        _this.dy = 0;
        _this.angle = 0;
        _this.distanceFromCenter = 0;
        return _this;
    }
    Actor.prototype.update = function () {
        this.x += this.dx;
        this.y += this.dy;
    };
    Actor.prototype.render = function (gamecanvas) {
        gamecanvas.ctx.beginPath();
        gamecanvas.ctx.arc(this.x, this.y, 10, 0, Math.PI * 2);
        gamecanvas.ctx.fill();
        gamecanvas.ctx.stroke();
    };
    return Actor;
}(Sprite));
export { Actor };
