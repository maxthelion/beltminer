import { AlienStation, Station } from "../station.js";
var BodyBuilder = /** @class */ (function () {
    function BodyBuilder() {
    }
    BodyBuilder.createBody = function (sector) {
        return new BodyBuilder();
    };
    return BodyBuilder;
}());
export { BodyBuilder };
var StationBuilder = /** @class */ (function () {
    function StationBuilder() {
    }
    StationBuilder.buildStation = function (app, sector) {
        return new Station(app, sector);
    };
    StationBuilder.buildAlienStation = function (app, sector) {
        return new AlienStation(app, sector);
    };
    return StationBuilder;
}());
export { StationBuilder };
