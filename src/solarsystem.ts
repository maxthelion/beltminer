export default class SolarSystem {
    asteroidNum = 1000;
    centerX = 0;
    centerY = 0;
    minRadius = 1000;
    maxRadius = 2500;
    width: number;
    height: number;

    static minRadius = 1000;
    static maxRadius = 2500;

    midRadius() {
        return (this.minRadius + this.maxRadius) / 2;
    }

    radialRange() {
        return this.maxRadius - this.minRadius;
    }

    circumference() {
        return 2 * Math.PI * this.midRadius();
    }
    
    constructor(){
        this.width = this.maxRadius * 2 + 100;
        this.height = this.maxRadius * 2 + 100;
    }
}
