import App from "../app.js";
import AsteroidStatPane from "./asteroidstatpane.js";
import Renderable from "./renderable.js";

export default class InfoPane extends Renderable {
    cachedObjectID: string | null = null;
    asteroidPane: AsteroidStatPane | null = null;

    constructor(app: App) {
        super(app);
        this.el = document.getElementById('infopane')!;
    }

    render() {
        if (this.cachedObjectID !== this.app.player.lockedAsteroid?.uuid){
            if (this.app.player.isLocked()) {
                this.el.innerHTML = `<h1>Locked object </h1>`;
                this.asteroidPane = new AsteroidStatPane(this.app, this.app.player.lockedAsteroid!);
                this.el.appendChild(this.asteroidPane.el);
                this.cachedObjectID = this.app.player.lockedAsteroid!.uuid;
            } else {
                this.el.innerHTML = `
                <h1>Info</h1>
                <p>Use the arrow keys to move the ship.</p>
                <p>Press space to lock onto an asteroid.</p>
                <p>Press space again to unlock.</p>`;
            }
        }
    }
}
