import express from 'express';
import { createQueue, getQueue } from '../controllers/queuesController.mjs';

const router = express.Router();

router.post('/', createQueue);

router.get('/', getQueue);


export default app => app.use('/api/queue', router);
