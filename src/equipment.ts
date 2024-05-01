class Equipment {
    constructor(public name: string, public price: number) {

    }
}

class Drill extends Equipment {
    constructor() {
        super('Drill', 100);
    }

    mine() {
        console.log('mining');
    }
}

class Engine extends Equipment {
    constructor() {
        super('Engine', 500);
    }
}



class StorageBox extends Equipment {
    constructor() {
        super('Storage Box', 200);
    }
}