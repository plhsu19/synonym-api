import express from 'express';
import synonymRouter from './routes/synonym.js';
import { routeNotFound } from './controllers/errorControllers.js';

const app = express();
app.use(express.json());

app.use('/synonyms', synonymRouter);
app.use(routeNotFound);

export default app;
