import App from "../../app.js";
import { Sector } from "../../sectors.js";
import { AlienStation, Station } from "../station.js";

export class BodyBuilder {
    static createBody(sector: Sector) {

        return new BodyBuilder();
    }
}

export class StationBuilder {
    static buildStation(app: App, sector: Sector) {
        return new Station(app, sector);
    }

    static buildAlienStation(app: App, sector: Sector) {
        return new AlienStation(app, sector);
    }
}