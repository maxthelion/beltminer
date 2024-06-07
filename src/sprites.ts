import { GameCanvas } from "./ui/gamecanvas";


export class Sprite {
    x: number;
    y: number;
    dx: number;
    dy: number;
    uuid: string;
    angle: number;
    distanceFromCenter: number;

    constructor() {
        this.uuid = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        this.x = 50;
        this.y = 50;
        this.dx = 0;
        this.dy = 0;
        this.angle = 0;
        this.distanceFromCenter = 0;
    }

    update() {
        this.x += this.dx;
        this.y += this.dy;
    }

    render(gamecanvas:GameCanvas) {
        gamecanvas.ctx.beginPath();
        gamecanvas.ctx.arc(this.x, this.y, 10, 0, Math.PI * 2);
        gamecanvas.ctx.fill();
        gamecanvas.ctx.stroke();
    }
}

