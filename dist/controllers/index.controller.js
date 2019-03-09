"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.signup = signup;
exports.login = login;
exports.createEmail = createEmail;
exports.getEmail = getEmail;

var _User = require("../entity/User");

var _Messages = require("../entity/Messages");

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _config = _interopRequireDefault(require("../config/config"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _UserStore = require("../storage/UserStore");

var _MessageStore = require("../storage/MessageStore");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var userDataStore = _UserStore.UserStore.getInstance();

var messageStore = _MessageStore.MessageStore.getInstance();

function signup(req, res) {
  // validate request
  if (!req.body) {
    return res.status(505).send({
      message: 'Internal server error, could not create user'
    });
  } //perform password encryption


  _bcrypt.default.hash(req.body.password, 10, function (error, hash) {
    if (error) {
      return res.status(505).send({
        message: 'Authentication failed!'
      });
    } else {
      //create a user from the request
      var user = createUser(req, hash);

      if (userDataStore.has(user.id, user)) {
        var status = 409;
        return res.status(status).send({
          'status': status,
          'message': "User with ".concat(user.id, " already exist"),
          'data': userDataStore
        });
      } else {
        var _status = 201; //save the user to memory

        userDataStore.save(user.id, user);
        return res.status(_status).send({
          'status': _status,
          'message': 'user created successfully',
          'data': userDataStore.readAll()
        });
      }
    }
  });
}

function login(req, res) {
  //validate request
  var status;

  if (!req.body) {
    status = 500;
    return res.status(status).send({
      status: status,
      data: [],
      message: 'Internal server error'
    });
  }

  var user = userDataStore.read(req.body.id, req.body);

  if (!user) {
    status = 404;
    return res.status(status).send({
      status: status,
      data: [],
      message: 'Resource not found'
    });
  }

  _bcrypt.default.compare(req.body.password, user.getPassword(), function (error, result) {
    if (error) {
      status = 401;
      return res.status(status).send({
        status: status,
        data: [],
        message: 'Authentication failed'
      });
    }

    if (result) {
      status = 200;
      var token = acquireToken(req);
      return res.status(status).send({
        status: status,
        data: [{
          token: token
        }],
        message: 'Authentication successful'
      });
    }
  });
}

function createEmail(req, res) {
  var status; //valid req body

  if (!req.body) {
    status = 500;
    return res.status(status).send({
      status: status,
      data: [],
      message: 'Internal server error'
    });
  }

  var message = createMessage(req, 'sent');

  if (messageStore.has(message.getId(), message)) {
    sendResponse(res, 409, messageStore.readAll(), "Message with ".concat(message.getId(), " already exists"));
  } else {
    messageStore.save(message.getId(), message);
    sendResponse(res, 201, messageStore.readAll(), 'Message delivered!');
  }
}

function getEmail(req, res) {
  var status = 500;
  var email = messageStore.read(res.params.id);

  if (!email) {
    status = 401;
    sendResponse(res, status, [], 'Email not found!');
  } else {
    status = 200;
    sendResponse(res, status, [email], null);
  }

  sendResponse(res, status, [], 'Internal server error');
}

function createUser(req, hash) {
  return new _User.User(req.body.id, req.body.email, req.body.firstName, req.body.lastName, hash);
}

function createMessage(req, msgStatus) {
  var message = new _Messages.Messages();
  message.setId(req.body.id);
  message.setCreatedOn(new Date());
  message.setSubject(req.body.subject);
  message.setMessage(req.body.message);
  message.setParentMessageId(req.body.parentMessageId);
  message.setStatus(msgStatus);
  return message;
}

function sendResponse(res, status, data, message) {
  return res.status(status).send({
    'status': status,
    'message': message,
    'data': data
  });
}

function acquireToken(req) {
  return _jsonwebtoken.default.sign({
    id: req.body.id,
    email: req.body.email
  }, _config.default.secret, {
    expiresIn: _config.default.expiresIn
  });
}