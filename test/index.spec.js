import server from '../src/index';
import {User} from '../src/entity/User';


const request = require('supertest');
const chai = require('chai');
const expect = chai.expect;
let user;

beforeEach(() => {
    user = new User(
        1,
        'john',
        'Tony',
        'johntony@gmail.com',
        '1234'
    );
});

describe('/Post user', () => {
    it('should sign and authenticate user', (done) => {
        request(server)
            .post('/auth/signup')
            // .auth(user.getEmail(), user.getPassword())
            .send(user)
            .set('Accept', 'application/json')
            .expect('Content-Type', 'application/json')
            .end((error, res) => {
                if (error) return done(error);
                if (res.body) {
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('status');
                    expect(res.body).to.have.property('data');
                    expect(res.body.data).to.have.property('token');
                    expect(res.status).to.equal(201);
                }
            });

    });
});

describe('/Post user', () => {
    it('should log in and authenticate user', (done) => {
        request(server)
            .post('/auth/login')
            // .auth(user.getEmail(), user.getPassword())
            .send(user)
            .set('Accept', 'application/json')
            .expect('Content-Type', 'application/json')
            .end((error, res) => {
                if (error) return done(error);
                if (res) {
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('status');
                    expect(res.body).to.have.property('data');
                    expect(res.body.data).to.have.property('token');
                    expect(res.status).to.equal(200);
                }
                done();
            });
    });

});
