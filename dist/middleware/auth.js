"use strict";

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var secret = '45erkjherht45495783';

function authorize(req, res, next) {
  try {
    var token = req.header.authorization.split(" ")[1];
    req.decodedToken = _jsonwebtoken.default.verify(token, secret);
    next();
  } catch (error) {
    return res.status(401).send({
      message: 'Authentication failed'
    });
  }
}