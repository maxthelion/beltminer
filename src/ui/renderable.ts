import App from "../app";

export default class Renderable {
    app: App;
    el: HTMLElement;
    constructor(app: App) {
        this.app = app;
    }
    render() {
        throw new Error('Method not implemented.');
    }

    show() {
        this.el!.hidden = false;
    }

    hide() {
        this.el!.hidden = false;
    }
    

}