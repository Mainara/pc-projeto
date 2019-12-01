import Task from '../models/task.mjs';

function schedule(queue) {
    const tasks = queue.tasks;

    tasks.forEach(async taskId => {
        task = await Task.findById(taskId);

        queue.workers.some(worker => {

        });
    });
}

export default schedule;