var KeyHandler = /** @class */ (function () {
    function KeyHandler(app) {
        var _this = this;
        this.pressedKeys = {
            "ArrowLeft": false,
            "ArrowRight": false,
            "ArrowUp": false,
            "ArrowDown": false,
            "e": false,
            "Tab": false,
        };
        this.app = app;
        document.addEventListener('keydown', function (e) {
            // console.log(e.key);
            if (_this.pressedKeys[e.key] !== undefined) {
                _this.pressedKeys[e.key] = true;
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
        document.addEventListener('keyup', function (e) {
            if (_this.pressedKeys[e.key] !== undefined) {
                _this.pressedKeys[e.key] = false;
                e.preventDefault();
                e.stopPropagation();
                return false;
            }
            if (e.key === "e") {
                _this.app.toggleInventory();
            }
        });
    }
    return KeyHandler;
}());
export default KeyHandler;
