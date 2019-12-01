import Task from '../models/task.mjs';
import Job from '../models/job.mjs';

async function execute(task, worker) {
    const job = await Job.findById(task.jobId);
}

function schedule(queue) {
    const tasks = queue.tasks;

    tasks.forEach(async taskId => {
        const task = await Task.findById(taskId);

        queue.workers.some(worker => {
            if (!worker.busy) {
                worker.runTask(task);
            }
        });
    });
}

export default schedule;