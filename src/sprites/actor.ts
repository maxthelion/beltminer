import App from "../app.js";
import { GameCanvas } from "../ui/gamecanvas.js";
import { Sprite } from "./sprites.js";
import { BehaviourTreeBuilder, BehaviourTreeNode, BehaviourTreeReturnValues, Stack } from "../max-behaviour-tree.js";

export class Actor extends Sprite {
    behaviourTree: BehaviourTreeNode;
    radius: number = 10;
    distanceFromCenter: number;
    angle: number;
    rotation: number = 0;
    tickInterval: number = 50;
    frame: number = 0;

    constructor(app: App) {
        super(app);
        this.x = 50;
        this.y = 50;
        this.dx = 0;
        this.dy = 0;
        this.angle = 0;
        this.distanceFromCenter = 0;
        this.behaviourTree = new BehaviourTreeBuilder().
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
                action("move towards player", (actor: Actor)=> {
                    actor.moveTowardsPlayer();
                    return BehaviourTreeReturnValues.SUCCESS;
                }).
            end().
            build();

        console.log(this.behaviourTree);
        // this.behaviourTree.children.forEach(child => {
        //     console.log(child);
        // })
    }

    update() {
        // console.log('update');
        this.frame++;
        if (this.frame % this.tickInterval == 0) {
            this.behaviourTree.tick(this);
            // console.log(this.frame);
        }
    }

    render(gamecanvas: GameCanvas) {
        // gamecanvas.ctx.beginPath();
        // gamecanvas.ctx.arc(this.x, this.y, 10, 0, Math.PI * 2);
        // gamecanvas.ctx.fill();
        // gamecanvas.ctx.stroke();
    }

    moveTowardsPlayer() {
        // this.x = this.app.player.x;
        // this.y = this.app.player.y;
        // point towards player
        let playerx = this.app.player.distanceFromCenter
        let playery = this.app.player.angle;
        let dx = playerx - this.distanceFromCenter;
        let dy = playery - this.angle;
        // console.log(this.app.player.angle)
        let distance = Math.sqrt(dx * dx + dy * dy);
        this.rotation = Math.atan2(dy, dx);
        // console.log(this.rotation, distance);
        this.angle += (this.app.player.angle - this.angle) * 0.1;
        this.distanceFromCenter += (this.app.player.distanceFromCenter - this.distanceFromCenter) * 0.1;
        // this.x += this.dx;
        // this.y += this.dy;
    }
}