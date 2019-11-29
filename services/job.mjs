import { getQueueById } from '../services/queue.mjs'

export const submitNewJob = async (queueId, label, tasks) => {
    const queue = await getQueueById(queueId);
    queue.waiting_jobs += 1;
    // TODO
}

export const getJobStatus = async (queueId, jobId) => {
    
}