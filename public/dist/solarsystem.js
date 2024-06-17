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
    SolarSystem.minRadius = 1000;
    SolarSystem.maxRadius = 2500;
    return SolarSystem;
}());
export default SolarSystem;
