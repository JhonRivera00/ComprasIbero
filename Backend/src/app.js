import express from 'express'
import cors from 'cors'   
import morgan from 'morgan';
import conectarDb from './database/db.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

conectarDb();

export default app;