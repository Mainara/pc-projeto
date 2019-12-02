import db from '../db/index.mjs';

const commandSchema = db.Schema({
    command: {
        type: String,
        required: true
    },
    taskId: {
        type: db.Schema.ObjectId,
        ref: 'Task',
        required: true
    },
    state: {
        type: String,
        enum: [ 'READY', 'RUNNING', 'FINISHED' ],
        required: true,
        default: 'READY'
    },
    exit_code: {
        type: Number,
        required: true,
        default: -1
    }
});

const Command = db.model('Command', commandSchema);
export default Command;