var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import Renderable from "./renderable.js";
var ActionsBar = /** @class */ (function (_super) {
    __extends(ActionsBar, _super);
    function ActionsBar(app) {
        var _this = _super.call(this, app) || this;
        _this.el = document.getElementById('actions');
        _this.el.hidden = true;
        return _this;
    }
    ActionsBar.prototype.show = function () {
        var _this = this;
        this.el.hidden = false;
        [
            "drill sample",
            "install equipment",
            "detonate"
        ].forEach(function (action) {
            _this.el.appendChild(new Button(_this.app, action, function () {
                console.log("clicked", action);
            }).el);
        });
    };
    return ActionsBar;
}(Renderable));
export default ActionsBar;
var Button = /** @class */ (function (_super) {
    __extends(Button, _super);
    function Button(app, text, callback) {
        var _this = _super.call(this, app) || this;
        _this.el = document.createElement('button');
        _this.el.textContent = text;
        _this.el.onclick = callback;
        return _this;
    }
    return Button;
}(Renderable));
