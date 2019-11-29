const queues = []

export const createNewQueue = async (name) => {
    const id = 'some_id'
    const queue = {id: id, name: name, waiting_jobs: 0, worker_pools: 0, pools_size: 0}
    queues.push(queue);
    return id;
}

export const getQueues = async () => {
    return queues;
}

export const getQueueById = async (id) => {
    const queue = queues.filter(elem => {
        return elem.id === id;
    })
    return queue;
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