import { getQueueById } from '../services/queue.mjs';
import Job from '../models/job.mjs';
import Task from '../models/task.mjs';
import Command from '../models/commands.mjs';
import Scheduler from './scheduler.mjs';
import db from '../db/index.mjs';

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
    queue.jobs_id.push(job._id.toString());
    Scheduler(queue);
    return job._id;
}
export const getJobStatus = async (queueId, jobId) => {
    const queue = await getQueueById(queueId);

    if (! queue.jobs_id.includes(jobId)) {
        return null;
    }

    const commandLookup = {
        $lookup: {
            from: 'commands',
            let: { taskId: '$_id' },
            pipeline: [
                {
                    $match: {
                        $expr: {
                            $eq: ["$taskId", "$$taskId"]
                        }
                    }
                },
                {
                    $project: {
                        taskId: 0,
                        __v: 0
                    }
                }
            ],
            as: "commands"
        }
    };

    const taskLookup = {
        $lookup: {
            from: 'tasks',
            let: { jobId: '$_id' },
            pipeline: [
                {
                    $match: {
                        $expr: {
                            $eq: ["$jobId", "$$jobId"]
                        }
                    }
                },
                {
                    $project: {
                        jobId: 0,
                        __v: 0
                    }
                },
                commandLookup
            ],
            as: "tasks"
        }
    };

    return await Job.aggregate([
        {
            $match: {
                _id: db.Types.ObjectId(jobId)
            }
        },
        taskLookup,
        {
            $project: {
                __v: 0
            }
        }
    ]);
}

export const getJobsFromQueue =  async (queueId, query) => {
    const queue = await getQueueById(queueId);

    return await Job.find({ _id: { $in: queue.jobs_id }, ...query });
}