export default class Worker {

    constructor(address) {
        this.busy = false;
        this.address = address;
        this.id = `${Math.random()*100}-${Math.random()*200}`;
    }
}