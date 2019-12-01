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
    const queue = await getQueueById(req.params.queue_id);

    res.send(queue);
}

export const addNewWorker = async (req, res) => {
    const id = await addWorkerPool(req.address, req.pool_size, req.params.queue_id);
    res.send({id: id})
}

export const getWorkersFromQueue = async (req, res) => {
    const id = await getWorkers(req.params.queue_id);
    res.send({id: id});
}

export const deleteWorker = async (req, res) => {
    await removeWorker(req.params.queue_id, req.params.worker_id);
}