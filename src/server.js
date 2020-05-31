const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');

const app = express();

require('dotenv/config');

mongoose.connect(process.env.DB_CONNECTION,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    },
    () => console.log('Conectou meu consagrado')
)

app.use(express.json());
app.use(routes);

app.listen(3333, () => console.log('Server is running'));