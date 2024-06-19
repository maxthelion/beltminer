var Ship = /** @class */ (function () {
    function Ship() {
        this.maxCargo = 10;
        this.cargoSlots = new Array(this.maxCargo);
        for (var i = 0; i < this.maxCargo; i++) {
        }
    }
    return Ship;
}());
export { Ship };
var cargoTypes = [
    'ironore',
    'goldore',
    'water',
    'ice',
    'food',
];
