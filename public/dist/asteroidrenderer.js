var AsteroidRenderer = /** @class */ (function () {
    function AsteroidRenderer() {
    }
    AsteroidRenderer.generateAsteroidShape = function (numPoints, radius) {
        var points = [];
        var angleStep = (Math.PI * 2) / numPoints;
        var angle = 0;
        // Generate random points within a circle
        for (var i = 0; i < numPoints; i++) {
            var angle_1 = i * angleStep;
            var distance = radius + (Math.random() * radius / 4);
            var x = Math.cos(angle_1) * distance;
            var y = Math.sin(angle_1) * distance;
            points.push({ x: x, y: y });
        }
        // Perturb the position of each point
        points.forEach(function (point) {
            var noiseX = (Math.random() - 0.5) * radius * 0.5;
            var noiseY = (Math.random() - 0.5) * radius * 0.5;
            point.x += noiseX;
            point.y += noiseY;
        });
        // Smooth the shape (optional)
        return points;
    };
    return AsteroidRenderer;
}());
export default AsteroidRenderer;
