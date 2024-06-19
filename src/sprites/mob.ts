import App from "../app.js";
import { BehaviourTreeBuilder, BehaviourTreeNode, BehaviourTreeReturnValues } from "../max-behaviour-tree.js";
import { Actor } from "./actor.js";
import { Sprite } from "./sprites.js";

export class Mob extends Actor {
    behaviourTree: BehaviourTreeNode;
    destination: Sprite;

    constructor(app: App){
        super(app);
        this.distanceFromCenter = 100;
        this.angle = 0;
        this.acceleration = this.acceleration * -1;
        this.destination = app.player;
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
                action("move towards player", (actor: Mob)=> {
                    actor.moveTowardsPlayer();
                    return BehaviourTreeReturnValues.SUCCESS;
                }).
                action("choose new destination", (actor: Mob) => {
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

        // console.log(this.behaviourTree);
        // this.behaviourTree.children.forEach(child => {
        //     console.log(child);
        // })
    }

    update() {
        // console.log('update');
        this.frame++;
        // if (this.frame % this.tickInterval == 0) {
            this.behaviourTree.tick(this);
            this.updateCoordinates();
            // console.log(this.frame);
            // this.angle = Math.atan2(this.y, this.x);
            // this.distanceFromCenter = Math.sqrt(this.x * this.x + this.y * this.y);
        // }
    }

    moveTowardsPlayer() {
        this.rotation = Math.atan2(this.destination.bandY() - this.y, this.destination.bandY() - this.x);

        this.accelerate();
        // console.log("mob move towards player", this.direction, this.destination);

    }

}