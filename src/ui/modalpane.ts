import App from "../app.js";
import Renderable from "./renderable.js";

export default class ModalPane extends Renderable {
    constructor(app: App) {
        super(app);
        this.el = document.getElementById('modal')!;
        this.el.hidden = true;
    }
}

export class InventoryModalPane extends ModalPane {
    constructor(app: App) {
        super(app);
        this.el.innerHTML = `
        <h1>Inventory</h1>
        <p>Inventory is empty</p>`;
    }
}
