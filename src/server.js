const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const cors = require('cors');

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

app.use(cors(
    {origin: 'https://backend-amigo-chocolate.herokuapp.com'}
));
app.use(express.json());
app.use(routes);

app.listen(process.env.PORT || 3333, () => console.log('Server is running'));