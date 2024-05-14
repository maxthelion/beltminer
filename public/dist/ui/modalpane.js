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
var ModalPane = /** @class */ (function (_super) {
    __extends(ModalPane, _super);
    function ModalPane(app) {
        var _this = _super.call(this, app) || this;
        _this.el = document.getElementById('modal');
        _this.el.hidden = true;
        return _this;
    }
    return ModalPane;
}(Renderable));
export default ModalPane;
var InventoryModalPane = /** @class */ (function (_super) {
    __extends(InventoryModalPane, _super);
    function InventoryModalPane(app) {
        var _this = _super.call(this, app) || this;
        _this.el.innerHTML = "\n        <h1>Inventory</h1>\n        <p>Inventory is empty</p>";
        return _this;
    }
    return InventoryModalPane;
}(ModalPane));
export { InventoryModalPane };
