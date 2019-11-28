import Job from '../models/job.mjs';
import Task from '../models/task.mjs';
import Command from '../models/commands.mjs';
import { createNewQueue, getQueues } from '../services/queue.mjs';

export const createQueue = async (req, res) => {
    const id = await createNewQueue(req.name);
    res.send({id: id});
}

export const getQueue = async (req, res) => {
    const queues = await getQueues();
    res.send(JSON.stringify(queues));
}