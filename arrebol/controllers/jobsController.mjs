import { submitNewJob, getJobStatus, getJobsFromQueue } from '../services/job.mjs';

export const newJob = async (req, res) => {
    const { body } = req;

    try {
        const id = await submitNewJob(req.params.queue_id, body);
        res.send({id: id});
    } catch(e) {
        res.status(400).send({ message: e.message });
    }
}

export const getJob = async (req, res) => {
    try {
        const job = await getJobStatus(req.params.queue_id, req.params.job_id);

        if(!job) {
            return res.status(404).send({ message: "Job not found." });
        }

        res.send(job);
    } catch(e) {
        res.status(400).send({ message: e.message });
    }
}

export const getAllJobs = async (req, res) => {
    try {
        const { query } = req;
        const jobs = await getJobsFromQueue(req.params.queue_id, query);
        res.send(jobs);
    } catch(e) {
        res.status(400).send({ message: e.message });
    }
}