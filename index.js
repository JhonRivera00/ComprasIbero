import express from 'express'
import "./src/database/db.js"
import { PORT } from './src/config.js';

const app = express();

app.listen(PORT,()=>{
    console.log("Conectado al servidor ", PORT)
})