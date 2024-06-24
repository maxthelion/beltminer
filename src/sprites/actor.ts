import App from "../app.js";
import { GameCanvas } from "../ui/gamecanvas.js";
import { Sprite } from "./sprites.js";
import { BehaviourTreeBuilder, BehaviourTreeNode, BehaviourTreeReturnValues, Stack } from "../max-behaviour-tree.js";
import { Vector } from "./vector.js";
import { SmallGameCanvas } from "../ui/smallgamecanvas.js";
import SolarSystem from "../solarsystem.js";

export class Actor extends Sprite {
    
    radius: number = 10;
    distanceFromCenter: number;
    angle: number;
    tickInterval: number = 50;
    frame: number = 0;
    length: number = 0;

    rotation: number = 0;
    slowAcceleration: number = 0.0001;
    fastAcceleration: number = 0.01;
    acceleration = this.fastAcceleration;
    rotationalAcceleration = 0.05;
    accelerating: boolean = false;
    velocity: number = 0;
    vector: Vector;
    thrustVector: Vector = new Vector(0, 0);

    constructor(app: App) {
        super(app);
        this.vector = new Vector(0, 0);
        this.x = 50;
        this.y = 50;
        this.dx = 0;
        this.dy = 0;
        this.angle = 0;
        this.distanceFromCenter = 0;
    }

    render(gamecanvas: SmallGameCanvas) {
        let sprite = this;
        // this.ctx.beginPath();
        let ctx = gamecanvas.ctx;
        ctx.fillStyle = sprite.color;
        // console.log(sprite.radius);
        let width = Math.ceil(gamecanvas.scaleFactorX(sprite.radius)) * 2;
        let height = Math.ceil(gamecanvas.scaleFactorY(sprite.radius)) * 2;
        ctx.fillRect(
            gamecanvas.gtlx(sprite.systemX()) - (width / 2),
            gamecanvas.gtly(sprite.systemY()) - (height / 2),
            width,
            height
        );
        
        // ctx.arc(
        //     this.gtlx(asteroid.x),
        //     this.gtly(asteroid.y),
        //     Math.round(this.scaleFactorX(asteroid.radius)),
        //     0,
        //     Math.PI * 2
        // );
        ctx.fill();
        ctx.closePath();
    }

    accelerate() {
        this.accelerating = true;
        let thrustVector = new Vector(-this.acceleration, 0);
        thrustVector.rotate(this.rotation);
        this.thrustVector = thrustVector;
        this.vector.add(thrustVector);
    }

    updateCoordinates() {
        this.x += this.vector.x;
        this.y += this.vector.y;
        let systemCircumference = 
            Math.PI * 2 * this.system.midRadius();
        

        // keep the y value within the system circumference
        // console.log(this.y);
        this.y = this.y % systemCircumference;


        // console.log(this.y / systemCircumference);
        this.angle = (this.y / systemCircumference) * Math.PI * 2;
        // if the angle is less that 0, add 2pi to it
        // if (this.angle < 0) {
        //     this.angle += Math.PI * 2;
        // } else if (this.angle > Math.PI * 2) {
        //     this.angle -= Math.PI * 2;
        // }
        this.distanceFromCenter = this.system.midRadius() + this.x;
        //let radius = 200;
        let oldX = this.x;
        let oldY = this.y;
        // this.x = this.distanceFromCenter * Math.cos(this.angle);
        // this.y = this.distanceFromCenter * Math.sin(this.angle);
        this.velocity = Math.sqrt(Math.pow(this.x - oldX, 2) + Math.pow(this.y - oldY, 2));
    }

    stop(){
        this.vector = new Vector(0, 0);
        this.thrustVector = new Vector(0, 0);
    }

    systemX() {
        return this.distanceFromCenter * Math.cos(this.angle);
    }

    systemY() {
        return this.distanceFromCenter * Math.sin(this.angle);
    }

    bandX(): number {
        return this.x;
    }

    bandY(): number {
        return this.y;
    }
}