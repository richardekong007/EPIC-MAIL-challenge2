"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.signup = signup;
exports.login = login;
exports.createEmail = createEmail;
exports.getEmail = getEmail;
exports.getEmails = getEmails;
exports.getSentEmails = getSentEmails;
exports.getUnreadEmails = getUnreadEmails;
exports.deleteEmail = deleteEmail;

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

  var user = userDataStore.read(req.body.id);

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
  var email = messageStore.read(parseInt(req.params.id));

  if (!email) {
    status = 404;
    return sendResponse(res, status, [], 'Email not found!');
  }

  if (email) {
    status = 200;
    return sendResponse(res, status, [email], '');
  }

  return sendResponse(res, status, [], 'Internal server error');
}

function getEmails(req, res) {
  var messages = messageStore.readAll();

  if (messages.length > 0) {
    return sendResponse(res, 200, messages, '');
  }

  if (messages.length < 1) {
    return sendResponse(res, 204, [], 'No content');
  }

  return sendResponse(res, 500, [], 'Internal server error');
}

function getSentEmails(req, res) {
  var messages = messageStore.readAll();
  var sentMessages = messages.filter(function (message) {
    return message.data.status === 'sent';
  });

  if (!sentMessages) {
    return sendResponse(res, 404, [], 'Messages not found');
  } else if (sentMessages.length < 1) {
    return sendResponse(res, 204, [], 'No content');
  } else if (sentMessages.length > 0) {
    return sendResponse(res, 200, sentMessages, '');
  } else {
    return sendResponse(res, 505, [], 'Internal server error');
  }
}

function getUnreadEmails(req, res) {
  var unreadMessages = messageStore.filter(function (messages) {
    return messages.data.status === 'unread';
  });

  if (!unreadMessages) {
    return sendResponse(res, 404, [], 'messages not found');
  } else if (unreadMessages.length < 1) {
    return sendResponse(res, 204, [], 'No messages');
  } else if (unreadMessages.length > 0) {
    return sendResponse(res, 200, unreadMessages, '');
  } else {
    return sendResponse(res, 505, [], 'Internal server error');
  }
}

function deleteEmail(req, res) {
  var status = 500;
  var deletedEmail;
  deletedEmail = messageStore.deleteItem(parseInt(req.params.id));

  if (deletedEmail) {
    status = 200;
    return res.status(status).send({
      'status': status,
      "data": [{
        'message': 'Email deleted'
      }]
    });
  } else if (!deletedEmail) {
    status = 404;
    return sendResponse(res, status, [], 'Not found');
  } else {
    return sendResponse(res, status, [], 'Internal Server Error');
  }
}

function createUser(req, hash) {
  return new _User.User(req.body.id, req.body.email, req.body.firstName, req.body.lastName, hash);
}

function createMessage(req, msgStatus) {
  req.body.createdOn = new Date();
  req.body.status = msgStatus;
  var message = new _Messages.Messages();
  message.setId(req.body.id);
  message.setCreatedOn(req.body.createdOn);
  message.setSubject(req.body.subject);
  message.setMessage(req.body.message);
  message.setParentMessageId(req.body.parentMessageId);
  message.setStatus(req.body.status);
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