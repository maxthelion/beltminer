import App from "./app.js";

export default class KeyHandler {

    pressedKeys = {
        "ArrowLeft": false,
        "ArrowRight": false,
        "ArrowUp": false,
        "ArrowDown": false,
        "e": false,
        "Tab": false,
    };
    app: App;
    constructor(app: App) {
        this.app = app;
        document.addEventListener('keydown', (e) => {
            // console.log(e.key);
            if (this.pressedKeys[e.key as keyof typeof this.pressedKeys] !== undefined) {
                this.pressedKeys[e.key as keyof typeof this.pressedKeys] = true;
                e.preventDefault();
                e.stopPropagation();
                return false;
            }
            if (e.key === "Tab") {
                e.preventDefault();
                e.stopPropagation();
                return false;
            }
        });
        document.addEventListener('keyup', (e) => {
            if (this.pressedKeys[e.key as keyof typeof this.pressedKeys] !== undefined) {
                this.pressedKeys[e.key as keyof typeof this.pressedKeys] = false;
                e.preventDefault();
                e.stopPropagation();
                return false;
            }
            if (e.key === "e") {
                this.app.toggleInventory();
            }
        });

    }
}