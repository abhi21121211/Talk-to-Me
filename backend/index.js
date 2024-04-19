const express = require('express');
const dotenv = require('dotenv');
const data = require('data/data.js');

const app = express();
dotenv.config();


app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.egt('/chats', (req, res) => {
    res.send(data);
})


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
