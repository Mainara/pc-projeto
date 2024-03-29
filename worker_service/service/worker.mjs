import Command from '../models/commands.mjs';

class Worker {

    constructor() {
        this.busy = false;
    }

    runTask = async (task) => {
        this.busy = true;

        console.log("Executanto task referente ao job "  + task.jobId + "...");
        const commands = await Command.find({taskId: task._id});
        
        for (let currentCommand of commands) { 
            currentCommand.state = 'RUNNING';
            await currentCommand.save();

            console.log("Executanto comando "  + currentCommand.command + " ...");
            await this.sleep(2000);

            currentCommand.state = 'FINISHED';
            currentCommand.exit_code = 0;
            await currentCommand.save();
        }

        this.busy = false;
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

const worker = new Worker();
export default worker;