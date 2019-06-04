const mongoose = require('mongoose');

const TasksDateSchema =  mongoose.Schema({

});

const TaskSchema = mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    require: true
  },
  name: {
    type: String,
    require: true
  },
  description: {
    type: String,
  },
  color: {
    type: String,
    require: true
  },
  popular: {
    type: Boolean,
    require: true
  },
  date: {
    type: TasksDateSchema,
    default: {}
  }
});

const userSchema = mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    require: true
  },
  email: {
    type: String,
    require: true
  },
  password: {
    type: String,
    require: true
  },
  tasks: {
    type: TaskSchema,
  }
});

