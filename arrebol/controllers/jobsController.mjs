import { submitNewJob, getJobStatus, getJobsFromQueue } from '../services/job.mjs';

export const newJob = async (req, res) => {
    const { body } = req;
    const id = await submitNewJob(req.params.queue_id, body);
    res.send({id: id});
}

export const getJob = async (req, res) => {
    const job = await getJobStatus(req.params.queue_id, req.params.job_id);
    res.send(job);
}

export const getAllJobs = async (req, res) => {
    const { query } = req;
    const jobs = await getJobsFromQueue(req.params.queue_id, query);
    res.send(jobs);
}