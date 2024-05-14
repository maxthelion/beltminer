var RadialViewPort = /** @class */ (function () {
    function RadialViewPort(_a) {
        var minRadius = _a.minRadius, arcLength = _a.arcLength, radialWidth = _a.radialWidth, minArc = _a.minArc;
        this.player = undefined;
        this.minRadius = minRadius;
        this.radialWidth = radialWidth;
        this.arcLength = arcLength;
        this.minArc = minArc;
    }
    RadialViewPort.prototype.getMaxArc = function () {
        return this.minArc + this.arcLength;
    };
    RadialViewPort.prototype.getMaxRadius = function () {
        return this.minRadius + this.radialWidth;
    };
    RadialViewPort.prototype.getMinArc = function () {
        return this.minArc;
    };
    RadialViewPort.prototype.getMinRadius = function () {
        return this.minRadius;
    };
    RadialViewPort.prototype.relativeX = function (sprite) {
        return (sprite.distanceFromCenter - this.player.distanceFromCenter);
    };
    RadialViewPort.prototype.relativeY = function (sprite) {
        return sprite.angle - this.player.angle;
    };
    RadialViewPort.prototype.containsEntity = function (entity) {
        // TODO - not really working when player is at 0 angle
        var angleDelta = Math.abs(entity.angle - this.player.angle);
        var angleDifference = Math.min(angleDelta, 2 * Math.PI - angleDelta);
        if (angleDifference > this.arcLength / 2)
            return false;
        if (entity.distanceFromCenter < this.getMinRadius())
            return false;
        if (entity.distanceFromCenter > this.getMaxRadius())
            return false;
        return true;
    };
    RadialViewPort.prototype.update = function (player) {
        this.minArc = (player.angle - (this.arcLength / 2));
        this.minRadius = player.distanceFromCenter - this.radialWidth / 2;
        this.player = player;
    };
    return RadialViewPort;
}());
export { RadialViewPort };
