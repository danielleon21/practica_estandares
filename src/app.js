import express from "express";
import db from "../db/connection.js";
import { fileURLToPath } from "url";
import path from 'path';
import router from "../routes/index.js";

const app = express();

db.authenticate()
    .then(() => console.log('Database connected Successfully '))
    .catch(e => console.log(e));

const PORT = 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


app.set('view engine', 'pug');

app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "../public")));


app.use('/', router);

app.get('/', (req, res) => {
    res.send('Hello World');
});


app.listen(PORT, () => {
    console.log('Server on port 3000');
});