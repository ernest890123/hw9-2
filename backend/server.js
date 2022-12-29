import express from 'express'; 
import cors from 'cors';
import db from './src/db';
import dotenv from "dotenv-defaults";
import mongoose from 'mongoose';
import routes from './src/routes';
import path from "path";
const app = express();

if (process.env.NODE_ENV === "production") {
    const __dirname = path.resolve();
    app.use(express.static(path.join(__dirname, "../frontend", "build")));
    app.get("/*", function (req, res) {
      res.sendFile(path.join(__dirname, "../frontend", "build", "index.html"));
    });
    db.connect();
    app.use('/', routes);
  }

app.listen(port, () =>
 console.log(`Example app listening on port ${port}!`),
);