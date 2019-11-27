import db from '../db/index.mjs';

const taskSchema = db.Schema({
    jobId: {
        type: db.Schema.ObjectId,
        ref: 'Job',
        required: true
    },
    state: {
        type: String,
        enum: [ 'READY', 'RUNNING', 'FINISHED' ],
        required: true,
        default: 'READY'
    }
});

const Task = db.model('Task', taskSchema);
export default Task;