import express from 'express';
import { runTask } from '../controllers/workerController.mjs';

const router = express.Router();

router.post('/run-task', runTask);

export default app => app.use('/worker', router);