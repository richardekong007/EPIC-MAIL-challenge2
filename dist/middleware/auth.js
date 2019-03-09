"use strict";

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var secret = '45erkjherht45495783';

module.exports = function (req, res, next) {
  try {
    var token = req.headers.authorization.split(" ")[1];
    req.decodedToken = _jsonwebtoken.default.verify(token, secret);
    next();
  } catch (error) {
    var status = 401;
    return res.status(status).send({
      status: status,
      data: [],
      message: 'Authentication failed'
    });
  }
};