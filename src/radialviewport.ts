import Player from "./player.js";
import { Sprite } from "./sprites.js";

export class RadialViewPort {
    minRadius: number;
    radialWidth: number;
    minArc: number;
    arcLength: number;
    player: Player | undefined = undefined;
    
    constructor({minRadius, arcLength, radialWidth, minArc}: {minRadius: number, arcLength: number, radialWidth: number, minArc: number}) {
        this.minRadius = minRadius;
        this.radialWidth = radialWidth;
        this.arcLength = arcLength;
        this.minArc = minArc;
    }

    getMaxArc(){
        return this.minArc + this.arcLength;
    }

    getMaxRadius(){
        return this.minRadius + this.radialWidth;
    }

    getMinArc(){
        return this.minArc;
    }

    getMinRadius(){
        return this.minRadius;
    }

    relativeX(sprite: Sprite): number {
        return (sprite.distanceFromCenter - this.player!.distanceFromCenter) ;
    }

    relativeY(sprite: Sprite): number {
        return sprite.angle - this.player!.angle;
    }

    containsEntity(entity: Sprite): boolean {
        // TODO - not really working when player is at 0 angle
        let angleDelta = Math.abs(entity.angle - this.player!.angle);
        let angleDifference = Math.min(angleDelta, 2 * Math.PI - angleDelta);
        if (angleDifference > this.arcLength / 2) return false;
        if (entity.distanceFromCenter < this.getMinRadius()) return false;
        if (entity.distanceFromCenter > this.getMaxRadius()) return false;
        return true;
    }

    update(player: Player) {
        this.minArc = (player.angle - (this.arcLength / 2));
        this.minRadius = player.distanceFromCenter - this.radialWidth / 2;
        this.player = player;
    }
}