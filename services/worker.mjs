export default class Worker {

   runTask = async (task) => {
        console.log("Executanto task referente ao job "  + task.jobId + " ...")
        const promises = task.commands.map(async (currentCommand) => { 
            console.log("Executanto comando "  + currentCommand.command + " ...")
            return sleep(2000)
        });
        await Promise.all(promises);
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}