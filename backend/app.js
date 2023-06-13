const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const corsOptions = {
  origin: ['http://127.0.0.1:3000', 'http://localhost:3000',
    'http://localhost:3001',
    'http://eilyina.nomoredomains.rocks',
    'https://eilyina.nomoredomains.rocks',
    'http://api.eilyina.nomoredomains.rocks',
    'https://api.eilyina.nomoredomains.rocks'],

  methods: 'GET,PUT,PATCH,POST,DELETE',
};
const app = express(); // создаём сервер

app.use(cors(corsOptions));
// app.use(cors());
// подключаемся к серверу mongo
app.use(express.json());
// подключаемся к серверу mongo

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  useNewUrlParser: true,
});

app.use(require('./routes/index'));
// app.use(require('./middlewares/errorHandler'));

app.listen(3000, () => {
  console.log('подключен');
});
