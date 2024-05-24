var Renderable = /** @class */ (function () {
    function Renderable(app) {
        this.app = app;
        Renderable.renderables.push(this);
    }
    Renderable.prototype.render = function () {
        throw new Error('Method not implemented.');
    };
    Renderable.prototype.show = function () {
        this.el.hidden = false;
    };
    Renderable.prototype.hide = function () {
        this.el.hidden = false;
    };
    Renderable.renderables = [];
    return Renderable;
}());
export default Renderable;
