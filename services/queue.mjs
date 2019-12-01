import Worker from './worker.mjs';

const queues = {};

export const createNewQueue = async (name) => {
    const id = `${name}-${Math.random()*100}`;
    const queue = {id: id, name: name, tasks: [], workers: [], jobs_id: [], waiting_jobs: 0, worker_pools: 0, pools_size: 0}
    queues[id] = queue;
    return id;
}

export const getQueues = async () => {
    return Object.values(queues);
}

export const getQueueById = async (id) => {
    if (id in queues) {
        return queues[id];
    }
}

export const addWorkerPool = async (workerJson, queueId) => {
    const queue = queues[queueId];
    const { address } = workerJson
    const worker = new Worker(address);

    queue.workers.push(worker);
    return worker.id;
}

export const getWorkers = async (queueId) => {
    const queue = await getQueueById(queueId);
    return queue.workers;
}

export const removeWorker = async (queueId, workerId) => {
    const queue = await getQueueById(queueId);
    var worker = queue.workers.filter(worker => {
        return worker.id === workerId
      })
    var index = queue.workers.indexOf(worker);
    if (index > -1) {
        queue.workers.splice(index, 1);
    }
    return true;
}