const jwt = require('jsonwebtoken');
const USER_JWT_KEY = 'userKeyToken';

const checkAuth = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, USER_JWT_KEY);
    req.userData = decoded;
    next()
  } catch(err) {
    res.status(401).json({message: 'Auth failed'});
  }
};

module.exports = {
  checkAuth: checkAuth,
  USER_JWT_KEY: USER_JWT_KEY
};