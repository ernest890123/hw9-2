import express from 'express'; 
import cors from 'cors';
import db from './db';
import dotenv from "dotenv-defaults";
import mongoose from 'mongoose';
import routes from './routes';
const app = express();

app.use(cors());
app.use(express.json());
db.connect();
const port = process.env.PORT || 4000;
app.use('/', routes);
app.listen(port, () =>
 console.log(`Example app listening on port ${port}!`),
);