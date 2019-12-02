import express from 'express';
import { runTask } from '../controllers/workerController.mjs';

const router = express.Router();

router.post('/runTask', runTask);

export default app => app.use('/worker', router);