import express from 'express';
import { createQueue, getQueue, getQueueByID, 
    addNewWorker, getWorkersFromQueue, deleteWorker } from '../controllers/queuesController.mjs';
import { getWorkers } from '../services/queue.mjs';

const router = express.Router();

router.post('/', createQueue);

router.get('/', getQueue);

router.get('/:queue_id', getQueueByID);

router.post('/:queue_id/workers', addNewWorker);

router.get('/:queue_id/workers', getWorkersFromQueue);

router.delete('/:queue_id/workers/:worker_id', deleteWorker);

export default app => app.use('/api/queues', router);
