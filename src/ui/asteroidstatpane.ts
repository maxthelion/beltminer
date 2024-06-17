import Renderable from "./renderable.js";
import { Asteroid } from '../sprites/asteroid.js';
import App from "../app.js";

export default class AsteroidStatPane extends Renderable {
    asteroid: Asteroid;
    constructor(app: App, asteroid: Asteroid) {
        super(app);
        this.el = document.createElement('div');
        this.el.id = 'asteroidstatpane';
        this.asteroid = asteroid;
        let nameEl = document.createElement('h1');
        nameEl.textContent = 'Asteroid ' + asteroid.uuid;
        this.el.appendChild(nameEl);
    }
}