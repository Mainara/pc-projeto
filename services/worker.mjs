import { runInThisContext } from "vm";

export default class Worker {

    constructor(address) {
        this.busy = false;
        this.address = address;
        this.id = `${Math.random()*100}-${Math.random()*200}`;
    }

    runTask = async (task) => {
        this.busy = true;

        console.log("Executanto task referente ao job "  + task.jobId + " ...");
        const promises = task.commands.map(async (currentCommand) => { 
            console.log("Executanto comando "  + currentCommand.command + " ...");
            return sleep(2000);
        });
        await Promise.all(promises);

        this.busy = false;
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}