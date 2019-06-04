const app = require('./app');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/time_manager', { useNewUrlParser: true });


app.listen('4000', () => {
  console.log('server');
});