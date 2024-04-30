export default class AsteroidRenderer {
    canvas!: HTMLCanvasElement;
    ctx!: CanvasRenderingContext2D;
 

    constructor() {
        
    }

    static generateAsteroidShape(numPoints: number, radius: number) {
        const points = [];
        const angleStep = (Math.PI * 2) / numPoints;
        let angle = 0;
        // Generate random points within a circle
        for (let i = 0; i < numPoints; i++) {
            const angle = i * angleStep;
            const distance = radius + (Math.random() * radius/4);
            const x = Math.cos(angle) * distance;
            const y = Math.sin(angle) * distance;
            points.push({ x, y });
        }
    
        // Perturb the position of each point
        points.forEach(point => {
            const noiseX = (Math.random() - 0.5) * radius * 0.5;
            const noiseY = (Math.random() - 0.5) * radius * 0.5;
            point.x += noiseX;
            point.y += noiseY;
        });
    
        // Smooth the shape (optional)
    
        return points;
    }
}
