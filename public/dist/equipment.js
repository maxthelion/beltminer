"use strict";
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
var Equipment = /** @class */ (function () {
    function Equipment(name, price) {
        this.name = name;
        this.price = price;
    }
    return Equipment;
}());
var Drill = /** @class */ (function (_super) {
    __extends(Drill, _super);
    function Drill() {
        return _super.call(this, 'Drill', 100) || this;
    }
    Drill.prototype.mine = function () {
        console.log('mining');
    };
    return Drill;
}(Equipment));
var Engine = /** @class */ (function (_super) {
    __extends(Engine, _super);
    function Engine() {
        return _super.call(this, 'Engine', 500) || this;
    }
    return Engine;
}(Equipment));
var StorageBox = /** @class */ (function (_super) {
    __extends(StorageBox, _super);
    function StorageBox() {
        return _super.call(this, 'Storage Box', 200) || this;
    }
    return StorageBox;
}(Equipment));
