import Task from '../models/task.mjs';
import worker from '../service/worker.mjs';

export const runTask = async (req, res) => {
    const { body } = req;
    let { task } = body;

    if (worker.busy) {
        return res.status(403).send({ msg: 'Busy worker' });
    }

    task = await Task.findById(task);
    await worker.runTask(task);

    res.send({ msg: 'ok' });
};
