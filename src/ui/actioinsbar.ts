import App from "../app.js";
import Renderable from "./renderable.js";

export default class ActionsBar extends Renderable{
    constructor(app: App) {
        super(app);
        this.el = document.getElementById('actions')!;
        this.el.hidden = true;
    }

    show() {
        this.el.hidden = false;
        [
            "drill sample", 
            "install equipment",
            "detonate"
        ].forEach(action => {
            this.el.appendChild(new Button(this.app, action, () => {
                console.log("clicked", action);
            }).el);
        });
    }
}

class Button extends Renderable {
    constructor(app: App, text: string, callback: () => void) {
        super(app);
        this.el = document.createElement('button');
        this.el.textContent = text;
        this.el.onclick = callback;
    }
}