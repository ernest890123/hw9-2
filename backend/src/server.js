import express from 'express'; 
import cors from 'cors';
import db from './db';
import dotenv from "dotenv-defaults";
import mongoose from 'mongoose';
import routes from './routes';
import path from "path";
const app = express();

if (process.env.NODE_ENV === "development") {
    app.use(cors());
}
app.get("/api", (req, res) => {
    // send the request back to the client
    console.log("GET /api");
    res.send({ message: "Hello from the server!" }).status(200);
});

if (process.env.NODE_ENV === "production") {
    const __dirname = path.resolve();
    app.use(express.static(path.join(__dirname, "../frontend", "build")));
    app.get("/*", function (req, res) {
      res.sendFile(path.join(__dirname, "../frontend", "build", "index.html"));
    });
}
db.connect();
const port = process.env.PORT || 4000;
app.use('/', routes);
app.listen(port, () =>
 console.log(`Example app listening on port ${port}!`),
);