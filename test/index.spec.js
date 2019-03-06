
import {server} from '../index';
import {User} from '../entity/User';


const request = require('supertest');
const expect = require('chai').expect;
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
            .end((error, res) => {
                if(error) return done(error);
                if(res){
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('status');
                    expect(res.body).to.have.property('data');
                    expect(res.body.data).to.have.property('token');
                    expect(res.status).to.equal(201);
                }
            });
            
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
            .end((error,res)=> {
                if (error) return done(error);
                if (res){
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
