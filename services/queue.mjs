const queues = {};

export const createNewQueue = async (name) => {
    const id = `${name}-${Math.random()*100}`;
    const queue = {id: id, name: name, tasks: [], workers: [], waiting_jobs: 0, worker_pools: 0, pools_size: 0}
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

export const addWorkerPool = async (address, poolSize, queueId) => {
    // TODO
}

export const getWorkers = async (queueId) => {
    // TODO
}

export const removeWorker = async (queueId, workerId) => {
    // TODO
}