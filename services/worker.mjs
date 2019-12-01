import Command from '../models/commands.mjs';

export default class Worker {

    constructor(address) {
        this.busy = false;
        this.address = address;
        this.id = `${Math.random()*100}-${Math.random()*200}`;
    }

    runTask = async (task) => {

        console.log("Executanto task referente ao job "  + task.jobId + " no worker " + this.id + "...");
        const commands = await Command.find({taskId: task._id});
        const promises = commands.map(async (currentCommand) => { 
            currentCommand.state = 'RUNNING';
            await currentCommand.save();

            console.log("Executanto comando "  + currentCommand.command + " ...");
            await this.sleep(2000);

            currentCommand.state = 'FINISHED';
            currentCommand.exit_code = 0;
            return await currentCommand.save();
        });
        await Promise.all(promises);
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}