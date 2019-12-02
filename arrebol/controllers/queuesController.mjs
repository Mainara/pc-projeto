import { createNewQueue, getQueues, getQueueById, 
    addWorkerPool, getWorkers, removeWorker } from '../services/queue.mjs';

export const createQueue = async (req, res) => {
    const { body } = req;
    const { name } = body;
    const id = await createNewQueue(name);
    res.send({id: id});
}

export const getQueue = async (req, res) => {
    const queues = await getQueues();
    res.send(queues);
}

export const getQueueByID = async (req, res) => {
    
    try {
        const queue = await getQueueById(req.params.queue_id);

        if (!queue) {
            return res.status(404).send({ message: "Queue not found" });
        }

        res.send(queue);
    } catch(e) {
        res.status(400).send({ message: e.message });
    }
}

export const addNewWorker = async (req, res) => {
    try {
        const { body } = req;
        const id = await addWorkerPool(body, req.params.queue_id);
        res.send({id: id});
    } catch(e) {
        res.status(400).send({ message: e.message });
    }
}

export const getWorkersFromQueue = async (req, res) => {
    try {
        const workers = await getWorkers(req.params.queue_id);
        res.send(workers);
    } catch(e) {
        res.status(400).send({ message: e.message });
    }
}

export const deleteWorker = async (req, res) => {
    try {
        await removeWorker(req.params.queue_id, req.params.worker_id);
        res.send({msg: 'worker ' + req.params.worker_id + ' removed'});
    } catch(e) {
        res.status(400).send({ message: e.message });
    }
}