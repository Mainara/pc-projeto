import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';
import routes from './routes/index.mjs';

const app = express();
app.use(cors());
app.use(morgan('tiny'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
routes(app);

const PORT = 8080;

app.listen(PORT, () => {
    console.log('CORS-enabled web server listening on port ' + PORT);
});
