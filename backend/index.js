const express = require('express');
const dotenv = require('dotenv');
const connectDB = require("./config/db");
const userRoutes = require('./routes/userRoutes');
const chatRoutes = require('./routes/chatRoutes');
const { notFound , errorHandler} = require('./middleware/errorMiddleware');

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

app.use('/api/user', userRoutes);
app.use('/api/chat', chatRoutes);
app.use(notFound)
app.use(errorHandler);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`.yellow.bold));
