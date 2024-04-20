const express = require('express');
const dotenv = require('dotenv');
const connectDB = require("./config/db");
const colors = require('colors');
// const data = require('/data/data.js');


dotenv.config();
connectDB();
const app = express();

app.use(express.json());
// console.log(data)
app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use('/api/user', require('./routes/userRoutes'));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`.yellow.bold));
