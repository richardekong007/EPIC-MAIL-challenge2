import {User} from '../entity/User';
import DataSore from "../storage/DataStore";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';



const dataStore = DataSore.getInstance();


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
            if ((dataStore.exists(user.id, user))) {
                let status = 409;
                return res.status(status)
                    .send({
                        'status': status,
                        'message': `User with ${user.id} already exist`,
                        'data': dataStore
                    });
            } else {
                let status = 201;
                //save the user to memory
                dataStore.save(user.id, user);
                return res.status(status).send(
                    {
                        'status': status,
                        'message': 'user created successfully',
                        'data': dataStore
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
        return res.status(status).send({status: status, data:[], message: 'Internal server error'});
    }
    let user = dataStore.read(req.body.id,req.body);
    if (!user){
        status = 404;
        return res.status(status).send({ status: status, data:[], message:'Resource not found'});
    }
    bcrypt.compare(req.body.password, user.getPassword(),(error, result) =>{
        if(error){
            status = 401;
            return res.status(status).send({status: status, data:[],message:'Authentication failed'});
        }
        if(result){
            status = 200;
            const token = jwt.sign(
                {
                    id:req.body.id,
                    email:req.body.email
                },
                '45erkjherht45495783',
                {
                    expiresIn:'1h'
                }
                );
            return res.status(status).send({status: status, data:[{token:token}],message:'Authentication successful'});
        }
    });
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



