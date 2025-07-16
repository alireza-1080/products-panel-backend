import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import apiRouter from './routes/api.route';

const app = express();

app.use(cors());
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', async (req, res) => {
  res.send('Server is running 🏃🏻‍♂️‍➡️🏃🏻‍➡️🏃🏻‍♀️‍➡️');
});

app.use('/api', apiRouter);

export { app };
