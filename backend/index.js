const app = require('./app');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

//mongoose.connect('mongodb://localhost/time_manager', { useNewUrlParser: true });
mongoose.connect('mongodb://127.0.0.1:27017/time_manager', { useNewUrlParser: true });


app.listen('2222', () => {
  console.log('server 2');
});