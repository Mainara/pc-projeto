import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';
import workerRoute from './routes/workerRoute.mjs';

const app = express();
app.use(cors());
app.use(morgan('tiny'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
workerRoute(app);

const PORT = process.argv[2] || 8081;

app.listen(PORT, () => {
    console.log('CORS-enabled web server listening on port ' + PORT);
});
