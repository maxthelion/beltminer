var SolarSystem = /** @class */ (function () {
    function SolarSystem() {
        this.asteroidNum = 1000;
        this.centerX = 0;
        this.centerY = 0;
        this.minRadius = 1000;
        this.maxRadius = 2500;
        this.width = this.maxRadius * 2 + 100;
        this.height = this.maxRadius * 2 + 100;
    }
    SolarSystem.prototype.midRadius = function () {
        return (this.minRadius + this.maxRadius) / 2;
    };
    SolarSystem.prototype.radialRange = function () {
        return this.maxRadius - this.minRadius;
    };
    SolarSystem.prototype.circumference = function () {
        return 2 * Math.PI * this.midRadius();
    };
    SolarSystem.minRadius = 1000;
    SolarSystem.maxRadius = 2500;
    return SolarSystem;
}());
export default SolarSystem;
