const express = require('express');
const bodyParser = require('body-parser');
const expressHttpProxy = require('express-http-proxy');
const userRouter = require('./api/routers/userRouter');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/api/user/', userRouter);

app.use('/', expressHttpProxy('http://localhost:3000'));

app.use((req, res, next) => {
  const err = new Error('no found');
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({error: err});
});

module.exports = app;