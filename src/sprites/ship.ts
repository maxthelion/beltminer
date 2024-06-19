export class Ship {
    maxCargo: number = 10;
    cargoSlots: (CargoSlot | null)[];

    constructor() {
        this.cargoSlots = new Array(this.maxCargo);
        for (let i = 0; i < this.maxCargo; i++) {
            
        }
    }

}

type CargoSlot = {
    cargoType: string;
    cargoAmount: number; 
}

let cargoTypes = [
    'ironore',
    'goldore',
    'water',
    'ice',
    'food',
]