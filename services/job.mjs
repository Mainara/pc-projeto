import { getQueueById } from '../services/queue.mjs';
import Job from '../models/job.mjs';
import Task from '../models/task.mjs';
import Command from '../models/commands.mjs';
import Scheduler from './scheduler.mjs';

export const submitNewJob = async (queueId, jobJSON) => {
    const queue = await getQueueById(queueId);
    const job = await Job.create({ label: jobJSON.label });

    let tasks = jobJSON.tasks.map(async taskJSON => {
        const task = await Task.create({ jobId: job._id });

        const commands = taskJSON.commands.map(async commandJSON => {
            const command = await Command.create({
                taskId: task._id,
                command: commandJSON
            });

            return command;
        });

        await Promise.all(commands);
        return task;
    });

    tasks = await Promise.all(tasks);
    queue.waiting_jobs += tasks.length;
    tasks.forEach(task => {
        queue.tasks.push(task._id);
    });

    Scheduler(queue);
    return job._id;
}

export const getJobStatus = async (queueId, jobId) => {
    
}