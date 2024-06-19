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
import { BehaviourTreeBuilder, BehaviourTreeReturnValues } from "../max-behaviour-tree.js";
import { Actor } from "./actor.js";
var Mob = /** @class */ (function (_super) {
    __extends(Mob, _super);
    function Mob(app) {
        var _this = _super.call(this, app) || this;
        _this.distanceFromCenter = 100;
        _this.angle = 0;
        _this.acceleration = _this.acceleration * -1;
        _this.destination = app.player;
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
            action("choose new destination", function (actor) {
            // let deltas = this.getDelta(this, this.destination);
            // let dx = deltas[0];
            // let dy = deltas[1];
            // let distance = Math.sqrt(dx * dx + dy * dy);
            // if (distance < 10) {
            //     this.destination = this.app.sprites[Math.floor(Math.random() * this.app.sprites.length)] as Sprite;
            //     return BehaviourTreeReturnValues.SUCCESS;
            // }
        }).
            end().
            build();
        return _this;
        // console.log(this.behaviourTree);
        // this.behaviourTree.children.forEach(child => {
        //     console.log(child);
        // })
    }
    Mob.prototype.update = function () {
        // console.log('update');
        this.frame++;
        // if (this.frame % this.tickInterval == 0) {
        this.behaviourTree.tick(this);
        this.updateCoordinates();
        // console.log(this.frame);
        // this.angle = Math.atan2(this.y, this.x);
        // this.distanceFromCenter = Math.sqrt(this.x * this.x + this.y * this.y);
        // }
    };
    Mob.prototype.moveTowardsPlayer = function () {
        this.rotation = Math.atan2(this.destination.bandY() - this.y, this.destination.bandY() - this.x);
        this.accelerate();
        // console.log("mob move towards player", this.direction, this.destination);
    };
    return Mob;
}(Actor));
export { Mob };
