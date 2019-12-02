import db from '../db/index.mjs';

const jobSchema = db.Schema({
    label: {
        type: String,
        required: true
    },
    state: {
        type: String,
        enum: [ 'QUEUED', 'RUNNING', 'FINISHED' ],
        required: true,
        default: 'QUEUED'
    }
});

const Job = db.model('Job', jobSchema);
export default Job;
