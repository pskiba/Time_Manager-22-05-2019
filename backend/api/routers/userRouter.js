const express = require('express');
const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {checkAuth, USER_JWT_KEY} = require('../middlewares/checkAuth');
const userModel = require('../../mongoDB/userModel');
const userRouter = express.Router();

userRouter.patch('/update_global_interval/:id', checkAuth, (req, res, next) => {
	userModel.findOneAndUpdate({'_id': req.params.id}, {'$set': {'globalIntervalReminders': req.body}})
		.then((resolve) => {
			if(resolve) {
				res.status(201).json({
					message: 'Global interval reminders was updated'
				});
			}
		});
});

userRouter.patch('/update_task/:id', checkAuth, (req, res, next) => {
  const task = req.body;
  
  userModel.findOneAndUpdate({'_id' : req.params.id, 'tasks._id': task._id}, {'$set': {'tasks.$': task}})
    .then((resolve) => {
      if(resolve) {
        res.status(201).json({
          message: 'task was updated'
        })
      }
    });
});

userRouter.patch('/update_date/:id', checkAuth, (req, res, next) => {

  const { dateItem } = req.body;
  if(req.body.isNew) {
    userModel.findByIdAndUpdate(req.params.id, { '$push': { 'dates': dateItem }})
      .then((resolve) => {
        if(resolve) {
          res.status(201).json({
            message: 'dates was updated'
          })
        }
      })
  } else {
    userModel.update({'_id': req.params.id, 'dates.date': dateItem.date}, {'$set': {
        'dates.$.done' : dateItem.done,
        'dates.$.toDo' : dateItem.toDo,
        'dates.$.note' : dateItem.note,
        'dates.$.intervalReminders' : dateItem.intervalReminders,
        'dates.$.reminders' : dateItem.reminders
      }})
      .then((resolve) => {
        if(resolve) {
          res.status(201).json({
            message: 'dates was updated'
          });
        }
      });
  }
});

userRouter.patch('/addNote/:id', checkAuth, (req, res, next) => {

});

userRouter.get('/:id', checkAuth, (req, res, next) => {
  userModel.findById(req.params.id)
    .then((record) => {
      if(!record) {
        res.status(404).json({
          message: 'user not exist'
        });
      } else {
        res.status(201).json({
          user: {
            _id: record._id,
            email: record.email,
            tasks: record.tasks,
            dates: record.dates,
						globalIntervalReminders: record.globalIntervalReminders
          }
        })
      }
    })
});

userRouter.post('/register', (req, res, next) => {
  userModel.findOne({email: req.body.email})
    .then((record) => {
      if(record) {
        res.status(401).json({
          message: 'this email exist'
        });
      } else {
        bcryptjs.hash(req.body.password, 10, (err, hash) => {
          if(err) {
            res.status(500).json({
              error: err
            });
          } else {
            const user = new userModel({
              _id: new mongoose.Types.ObjectId(),
              email: req.body.email,
              password: hash,
              tasks: [],
              dates: []
            });
            user.save()
              .then((record) => {
                res.status(201).json({message: 'user was register'});
              })
          }
        });
      }
    })
});

userRouter.post('/login', (req, res, next) => {
  userModel.findOne({email: req.body.email})
    .then((record) => {
      if(!record) {
        res.status(404).json({
          message: 'bed login or password'
        });
      } else {

        bcryptjs.compare(req.body.password, record.password, (err, isEqual) => {
          if(err) {
            res.status(500).json({
              error: err
            });
          } else if (!isEqual) {
            res.status(404).json({
              message: 'bed login or password'
            });
          } else {
            const token = jwt.sign(
              {
                email: record.email,
                userId: record._id
              },
              USER_JWT_KEY,
            );
            res.status(201).json({
              user: {
                _id: record._id,
                email: record.email,
                tasks: record.tasks,
                dates: record.dates,
                token: token
              }
            })
          }
        })
      }
    })
});

userRouter.post('/create_task/:id',checkAuth, (req, res, next) => {
  const task = {...req.body, _id: new mongoose.Types.ObjectId()};
  userModel.findById(req.params.id)
    .then((resolve) => {
      if(resolve && resolve.tasks) {
        const taskExist = resolve.tasks.find((item) => item.name === task.name);
        if(taskExist) {
          res.status(409).json({
            message: 'task with this name exists'
          })
        } else {
          userModel.findByIdAndUpdate(req.params.id, { "$push": { "tasks": task } })
            .then((resolve) => {
              if(resolve && resolve._id) {
                res.status(201).json({
                  task: task
                })
              }
            })
        }
      }
    })

});

module.exports = userRouter;

