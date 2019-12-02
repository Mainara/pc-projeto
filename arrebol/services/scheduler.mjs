import Task from '../models/task.mjs';
import Job from '../models/job.mjs';
import request from 'request';

function execute(task, worker, queue) {
    worker.busy = true;
    // const job = await Job.findById(task.jobId);
    
    task.state = "RUNNING";
    task.save().then(() => {
        request.post({
            url: `${worker.address}/worker/run-task`,
            body: JSON.stringify({ task: task._id }),
            headers: {
                'Content-Type': 'application/json'   
            }
        }, async (error, response, body) => {
            if (error) {
                console.log(error);
            }
    
            task.state = "FINISHED";
            await task.save();
    
            worker.busy = false;
            schedule(queue);
        });
    });
}

function schedule(queue) {
    const tasks = queue.tasks;

    tasks.forEach(async taskId => {
        const task = await Task.findById(taskId);

        queue.workers.forEach(worker => {
            if (task.state == 'READY' && !worker.busy) {
                execute(task, worker, queue);
                return task;
            }
        });
    });
}

export default schedule;