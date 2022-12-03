import express from "express";
import db from "./db/connection.js";
import router from "./routes/index.js";

const app = express();

db.authenticate()
    .then(() => console.log('Database connected'))
    .catch(e => console.log(e));

const PORT = 3000;
app.set('view engine', 'pug');

app.use(express.static('public'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', router);

app.listen(PORT, () => {
    console.log('Server on port 3000');
});