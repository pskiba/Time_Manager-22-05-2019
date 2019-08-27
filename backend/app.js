const express = require('express');
const bodyParser = require('body-parser');
const expressHttpProxy = require('express-http-proxy');
const userRouter = require('./api/routers/userRouter');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/api/user/', userRouter);

//app.use('/', expressHttpProxy('http://localhost:3000'));

app.use('/', express.static('./build'));

console.log(__dirname);
app.get('*', (req, res, next) => {
	res.sendFile(path.join(__dirname, 'build', 'index.html'), (err) => {
		if(err) {
			res.status(500).json({error: err});
		}
	})
});

app.use((req, res, next) => {
  const err = new Error('no found');
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({error: err});
});

module.exports = app;