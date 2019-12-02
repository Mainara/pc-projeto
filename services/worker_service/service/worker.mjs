import Command from '../models/commands.mjs';

class Worker {

    constructor() {
        this.busy = false;
        this.id = `${Math.random()*100}-${Math.random()*200}`;
    }

    runTask = async (task) => {
        this.busy = true;

        console.log("Executanto task referente ao job "  + task.jobId + " no worker " + this.id + "...");
        const commands = await Command.find({taskId: task._id});
        
        for (let currentCommand of commands) { 
            currentCommand.state = 'RUNNING';
            await currentCommand.save();

            console.log("Executanto comando "  + currentCommand.command + " ...");
            await this.sleep(2000);

            currentCommand.state = 'FINISHED';
            currentCommand.exit_code = 0;
            return await currentCommand.save();
        }

        this.busy = false;
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

const worker = new Worker();
export default worker;