import {User} from '../entity/User';
import {Messages} from '../entity/Messages';
import bcrypt from 'bcrypt';
import config from '../config/config';
import jwt from 'jsonwebtoken';
import {UserStore} from "../storage/UserStore";
import {MessageStore} from "../storage/MessageStore";



const userDataStore = UserStore.getInstance();
const messageStore = MessageStore.getInstance();


export function signup(req, res) {
    // validate request
    if (!req.body) {
        return res.status(505).send({
            message: 'Internal server error, could not create user'
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
            if ((userDataStore.exists(user.id, user))) {
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
}

export function login(req, res) {
    //validate request
    let status;
    if (!req.body) {
        status = 500;
        return res.status(status).send({status: status, data: [], message: 'Internal server error'});
    }
    let user = userDataStore.read(req.body.id, req.body);
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
}

export function sendMessage(req, res) {
    let status;
    //valid req body
    if (!req.body) {
        status = 500;
        return res.status(status).send({status: status, data: [], message: 'Internal server error'});
    }
    let message = createMessage(req, 'sent');
    if (messageStore.exists(message.getId(), message)) {
        sendResponse(res, 409, messageStore,
            `Message with ${message.getId()} already exists`);
    } else {
        messageStore.save(message.getId(), message);
        sendResponse(res, 201, messageStore.readAll(), 'Message delivered!');
    }

}

function createUser(req, hash) {
    return new User(
        req.body.id,
        req.body.email,
        req.body.firstName,
        req.body.lastName,
        hash
    );
}

function createMessage(req, msgStatus) {
    let message = new Messages();
    message.setId(req.body.id);
    message.setCreatedOn(new Date());
    message.setSubject(req.body.subject);
    message.setMessage(req.body.message);
    message.setParentMessageId(req.body.parentMessageId);
    message.setStatus(msgStatus);
    return message
}

function sendResponse(res, status, data, message) {
    return res.status(status)
        .send({
            'status': status,
            'message': message,
            'data': data
        });
}

function acquireToken(req) {
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
}



