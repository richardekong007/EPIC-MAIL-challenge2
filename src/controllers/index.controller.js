import {User} from '../entity/User';
import {Messages} from '../entity/Messages';
import bcrypt from 'bcrypt';
import config from '../config/config';
import jwt from 'jsonwebtoken';
import {UserStore} from "../storage/UserStore";
import {MessageStore} from "../storage/MessageStore";


const userDataStore = UserStore.getInstance();
const messageStore = MessageStore.getInstance();

const signup = (req, res) => {
    // validate request
    if (!req.body) {
        return res.status(505).send({
            message: 'Internal server error, could not create user'
        });
    }

    if (!(req.body.id)
        || !(req.body.email)
        || !(req.body.firstName)
        || !(req.body.lastName)) {
        return res.status(400).send({
            message: 'Invalid Request'
        });
    }

    //perform password encryption
    bcrypt.hash(req.body.password, 10, (error, hash) => {
        if (error) {
            return res.status(505).send({
                message: 'Authentication failed!'
            });
        } else {
            //create a user from the request
            const user = createUser(req, hash);
            if ((userDataStore.has(user.id, user))) {
                let status = 409;
                return res.status(status)
                    .send({
                        'status': status,
                        'message': `User with ${user.id} already exist`,
                        'data': userDataStore
                    });
            } else {
                let status = 201;
                //save the user to memory
                userDataStore.save(user.id, user);
                return res.status(status).send(
                    {
                        'status': status,
                        'message': 'user created successfully',
                        'data': userDataStore.readAll()
                    });
            }
        }
    });
};

const login = (req, res) => {
    //validate request
    let status;
    if (!req.body) {
        status = 500;
        return res.status(status).send({status: status, data: [], message: 'Internal server error'});
    }

    if (!(req.body.id)
        || !(req.body.email)
        || !(req.body.firstName)
        || !(req.body.lastName)) {
        return res.status(400).send({
            message: 'Invalid Request'
        });
    }
    let user = userDataStore.read(req.body.id);
    if (!user) {
        status = 404;
        return res.status(status).send({status: status, data: [], message: 'Resource not found'});
    }
    bcrypt.compare(req.body.password, user.getPassword(), (error, result) => {
        if (error) {
            status = 401;
            return res.status(status).send({status: status, data: [], message: 'Authentication failed'});
        }
        if (result) {
            status = 200;
            const token = acquireToken(req);
            return res.status(status).send({
                status: status,
                data: [{token: token}],
                message: 'Authentication successful'
            });
        }
    });
};

const createEmail = (req, res) => {
    let status;
    //valid req body
    if (!req.body) {
        status = 500;
        return res.status(status).send({status: status, data: [], message: 'Internal server error'});
    }

    let message = createMessage(req, 'sent');
    if (messageStore.has(message.getId(), message)) {
        sendResponse(res, 409, messageStore.readAll(),
            `Message with ${message.getId()} already exists`);
    } else {
        messageStore.save(message.getId(), message);
        sendResponse(res, 201, messageStore.readAll(), 'Message delivered!');
    }

};


const getEmail = (req, res) => {

    let status = 500;
    let email = messageStore.read(parseInt(req.params.id));
    if (!email) {
        status = 404;
        return sendResponse(res, status, [], 'Email not found!');
    }
    if (email) {
        status = 200;
        return sendResponse(res, status, [email], '');
    }

    return sendResponse(res, status, [], 'Internal server error');

};

const getEmails = (req, res) => {

    let messages = messageStore.readAll();
    if (messages.length > 0) {
        return sendResponse(res, 200, messages, '');
    }
    if (messages.length < 1) {
        return sendResponse(res, 204, [], 'No content');
    }
    return sendResponse(res, 500, [], 'Internal server error');
};

const getSentEmails = (req, res) => {

    let messages = messageStore.readAll();
    const sentMessages = messages.data.filter(message =>
        message.status === 'sent');
    if (!sentMessages) {
        return sendResponse(res, 404, [], 'Messages not found');
    } else if (sentMessages.length < 1) {
        return sendResponse(res, 204, [], 'No content');
    } else if (sentMessages.length > 0) {
        return sendResponse(res, 200, sentMessages, '');
    } else {
        return sendResponse(res, 505, [], 'Internal server error');
    }

};

const getUnreadEmails = (req, res) => {
    let messages = messageStore.readAll();

    let unreadMessages = messages
        .data.filter(messages => messages.status === 'unread');
    if (!unreadMessages) {
        return sendResponse(res, 404, [], 'messages not found');
    } else if (unreadMessages.length < 1) {
        return sendResponse(res, 204, [], 'No messages')
    } else if (unreadMessages.length > 0) {
        return sendResponse(res, 200, unreadMessages, '')
    } else {
        return sendResponse(res, 505, [], 'Internal server error');
    }
};

const deleteEmail = (req, res) => {
    let status = 500;
    let deletedEmail;
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

};


const createUser = (req, hash) => {
    return new User(
        req.body.id,
        req.body.email,
        req.body.firstName,
        req.body.lastName,
        hash
    );
};

const createMessage = (req, msgStatus) => {

    req.body.createdOn = new Date();
    req.body.status = msgStatus;
    let message = new Messages();
    message.setId(req.body.id);
    message.setCreatedOn(req.body.createdOn);
    message.setSubject(req.body.subject);
    message.setMessage(req.body.message);
    message.setParentMessageId(req.body.parentMessageId);
    message.setStatus(req.body.status);
    return message
};

const sendResponse = (res, status, data, message) => {
    return res.status(status)
        .send({
            'status': status,
            'message': message,
            'data': data
        });
};

const acquireToken = (req) => {
    return jwt.sign(
        {
            id: req.body.id,
            email: req.body.email
        },
        config.secret,
        {
            expiresIn: config.expiresIn
        }
    );


};

export {
    signup,
    login,
    createEmail,
    getEmail,
    getEmails,
    getSentEmails,
    getUnreadEmails,
    deleteEmail
};

