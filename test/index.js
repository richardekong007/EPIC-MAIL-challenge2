
import {server} from './index';
import {User} from '../entity/User';


const request = require('supertest');
let user;

beforeEach(() =>{
    user = new User();
    user.setId(1);
    user.setFirstName('John');
    user.setLastName('Tony');
    user.setEmail('john-tony@gmail.com');
    user.setPassword('1234');
});

describe('/Post user', () =>{
    it('should sign and authenticate user', (done)=>{
        request(server)
            .post('/auth/signup')
            .auth(user.getEmail(), user.getPassword())
            .send(user)
            .set('Accept','application/json')
            .expect('Content-Type','/json/')
            .expect(200, done());
            
    });
});

describe('/Post user', ()=>{
    it('should log in and authenticate user', (done) =>{
        request(sever)
            .post('/auth/login')
            .auth(user.getEmail(), user.getPassword())
            .send(user)
            .set('Accept','application/json')
            .expect('Content-Type','/json/')
            .expect(200)
            .end((error,response)=> {
                if (error) return done(error);
                done();
            });
});

});
