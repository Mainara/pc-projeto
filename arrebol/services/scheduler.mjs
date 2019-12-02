import Task from '../models/task.mjs';
import Job from '../models/job.mjs';
import request from 'request';

function execute(task, worker, queue) {
    worker.busy = true;
    
    Task.updateOne({
        _id: task._id,
        state: {
            $eq: 'READY'
        }
    }, {state: 'RUNNING'}, { runValidators: true }).then(async response => {
        if (response.nModified == 0) {
            worker.busy = false;
            schedule(queue);
            return;
        }

        await Job.updateOne({ _id: task.jobId, state: { $eq: 'READY' }}, { state: 'RUNNING' }, { runValidators: true });

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
    
            await Task.updateOne({
                _id: task._id
            }, {state: 'FINISHED'}, { runValidators: true });

            const unFinishedTasks = await Task.find({ jobId: task.jobId, state: { $ne: 'FINISHED' } }).countDocuments();

            if (unFinishedTasks === 0) {
                await Job.updateOne({ _id: task.jobId }, { state: 'FINISHED' }, { runValidators: true });
            }

            worker.busy = false;
            schedule(queue);
        });
    });
}

function schedule(queue) {
    const tasks = queue.tasks;

    tasks.forEach(async taskId => {
        const task = await Task.findById(taskId);

        queue.workers.some(worker => {
            if (task.state == 'READY' && !worker.busy) {
                execute(task, worker, queue);
                return task;
            }
        });
    });
}

export default schedule;