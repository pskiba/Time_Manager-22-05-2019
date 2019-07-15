const mongoose = require('mongoose');

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
  status: {
    type: String
  },
  color: {
    type: String,
    require: true
  },
  popular: {
    type: Boolean,
    require: true
  }
});

const userSchema = mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    require: true
  },
  email: {
    type: String,
    match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
    require: true
  },
  password: {
    type: String,
    require: true
  },
  tasks: {
    type: [TaskSchema],
  },
  dates: {
    type: [{ date: String, toDo: Object, done: Object, note: String, intervalReminders: Array, reminders: Array }]
  },
	globalIntervalReminders: {
  	type: Array,
		default: []
	}
 
});

const userModel = mongoose.model('user', userSchema);

module.exports = userModel;
