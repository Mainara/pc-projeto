import Job from '../models/job.mjs';
import Task from '../models/task.mjs';
import Command from '../models/commands.mjs';


export const createQueue = async (req, res) => {
    res.send({msg: 'ok'});
}

export const getQueue = async (req, res) => {
    const job = await Job.create({
        label: "teste"
    });

    const task = await Task.create({
        jobId: job._id
    });

    const command = await Command.create({
        command: "ls -la",
        taskId: task._id
    });

    const taskJson = task.toJSON();
    taskJson.commands = [command];
    const jobJson = job.toJSON();
    jobJson.tasks = [taskJson];

    res.send(jobJson);
}