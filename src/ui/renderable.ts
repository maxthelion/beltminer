import App from "../app";

export default class Renderable {
    static renderables: Renderable[] = [];
    app: App;
    el!: HTMLElement;
    constructor(app: App) {
        this.app = app;
        Renderable.renderables.push(this);
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