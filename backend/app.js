const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express(); // создаём сервер
app.use(cors);
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
