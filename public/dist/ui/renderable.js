var Renderable = /** @class */ (function () {
    function Renderable(app) {
        this.app = app;
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
    return Renderable;
}());
export default Renderable;
