var ActionNode = /** @class */ (function () {
    function ActionNode(name, fn) {
        this.name = name;
        this.fn = fn;
    }
    ActionNode.prototype.Tick = function (time) {
        return this.fn(time);
    };
    return ActionNode;
}());
export { ActionNode };
