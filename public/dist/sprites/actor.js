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
import { BehaviourTreeBuilder, BehaviourTreeReturnValues } from "../max-behaviour-tree.js";
var Actor = /** @class */ (function (_super) {
    __extends(Actor, _super);
    function Actor(app) {
        var _this = _super.call(this, app) || this;
        _this.radius = 10;
        _this.rotation = 0;
        _this.tickInterval = 50;
        _this.frame = 0;
        _this.x = 50;
        _this.y = 50;
        _this.dx = 0;
        _this.dy = 0;
        _this.angle = 0;
        _this.distanceFromCenter = 0;
        _this.behaviourTree = new BehaviourTreeBuilder().
            selector("root").
            // action("wait to do something", (actor: Actor) => {
            //     if (actor.frame / 50 < 5) {
            //         // console.log('waiting to do something');
            //         return BehaviourTreeReturnValues.SUCCESS;
            //     } else {
            //         // console.log('done waiting to do something');
            //         return BehaviourTreeReturnValues.FAILURE;
            //     }
            // }).
            // sequence("wait to attack").
            //     action("move randomly", (actor: Actor) => {
            //         return BehaviourTreeReturnValues.SUCCESS;
            //     }).
            //     // condition("is player close", (actor: Actor) => {
            //     //     return BehaviourTreeReturnValues.SUCCESS;
            //     // }).
            action("move towards player", function (actor) {
            actor.moveTowardsPlayer();
            return BehaviourTreeReturnValues.SUCCESS;
        }).
            end().
            build();
        console.log(_this.behaviourTree);
        return _this;
        // this.behaviourTree.children.forEach(child => {
        //     console.log(child);
        // })
    }
    Actor.prototype.update = function () {
        // console.log('update');
        this.frame++;
        if (this.frame % this.tickInterval == 0) {
            this.behaviourTree.tick(this);
            // console.log(this.frame);
        }
    };
    Actor.prototype.render = function (gamecanvas) {
        // gamecanvas.ctx.beginPath();
        // gamecanvas.ctx.arc(this.x, this.y, 10, 0, Math.PI * 2);
        // gamecanvas.ctx.fill();
        // gamecanvas.ctx.stroke();
    };
    Actor.prototype.moveTowardsPlayer = function () {
        // this.x = this.app.player.x;
        // this.y = this.app.player.y;
        // point towards player
        var playerx = this.app.player.distanceFromCenter;
        var playery = this.app.player.angle;
        var dx = playerx - this.distanceFromCenter;
        var dy = playery - this.angle;
        // console.log(this.app.player.angle)
        var distance = Math.sqrt(dx * dx + dy * dy);
        this.rotation = Math.atan2(dy, dx);
        // console.log(this.rotation, distance);
        this.angle += (this.app.player.angle - this.angle) * 0.1;
        this.distanceFromCenter += (this.app.player.distanceFromCenter - this.distanceFromCenter) * 0.1;
        // this.x += this.dx;
        // this.y += this.dy;
    };
    return Actor;
}(Sprite));
export { Actor };
