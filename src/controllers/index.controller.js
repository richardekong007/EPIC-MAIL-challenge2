import {User} from '../entity/User';
import DataSore from "../storage/DataStore";


export function signup(req, res) {
    // validate request
    if (!req.body) {
        return res.status(505).send({
            message: 'Internal server error, could not create user'
        });
    }
    // create a user from the request
    const user = new User(
        req.body.id,
        req.body.firstName,
        req.body.lastName,
        req.body.password
    );

    //save the user to memory
    let dataStore = new DataSore();
    dataStore.save(user.id, user);
    if (!(dataStore.read(user.id))) {
        let status = 500;
        res.status(status)
            .send({
                'status': status,
                'error': 'Failed to create User'
            });
    } else {
        let status = 201;
        res.status(status).send(
            {
                'status': status,
                'message':'user created successfully',
                'data': user,
            });
    }
}

