export class Vector {
    x: number;
    y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    rotate(angle: number) {
        let x = this.x;
        let y = this.y;
        this.x = x * Math.cos(angle) - y * Math.sin(angle);
        this.y = x * Math.sin(angle) + y * Math.cos(angle);
    }

    add(vector: Vector) {
        this.x += vector.x;
        this.y += vector.y;
    }

    magnitude() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }
}