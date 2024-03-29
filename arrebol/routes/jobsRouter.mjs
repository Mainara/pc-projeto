import express from 'express';
import { newJob, getJob, getAllJobs } from '../controllers/jobsController.mjs'

const router = express.Router();

router.post('/:queue_id/jobs', newJob);

router.get('/:queue_id/jobs', getAllJobs);

router.get('/:queue_id/jobs/:job_id', getJob);

export default app => app.use('/api/queues', router);
