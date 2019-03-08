import server from '../src/index';
import {User} from '../src/entity/User';
import {Messages} from '../src/entity/Messages'
import DataStore from '../src/storage/DataStore';


const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const expect = chai.expect;

let dataStore;
let user;
let messages;
chai.use(chaiHttp);

beforeEach((done) => {
    dataStore = new DataStore();
    user = new User(1, 'Barry@fx.com', 'Alan', 'Barry', '12346');
    messages = createMessages();
    done();
});

afterEach((done) => {
    server.close();
    done();
});

describe('Post/ auth/signup', () => {
    it('should create a user account', (done) => {
        expect(user).to.not.be.null;
        expect(user).to.not.be.undefined;
        expect(user.getId()).to.not.be.undefined;
        expect(user.getEmail()).to.not.be.undefined;
        expect(user.getFirstName()).to.not.be.undefined;
        expect(user.getLastName()).to.not.be.undefined;
        expect(user.getPassword()).to.not.be.undefined;
        chai.request(server)
            .post('/auth/signup')
            .send(user)
            .end((error, res) => {
                if (error) {
                    res.should.have.status(500);
                }
                res.should.not.be.null;
                res.body.data.should.not.be.empty;
                res.should.have.status(201);
                res.body.should.be.a('object');
                res.body.should.have.property('status');
                res.body.should.have.property('data');
                res.body.data.should.be.a('array');
                done();
            });
    });
});

describe('Post/ auth/login', () => {
    it('should login  a user ', (done) => {
        expect(user).to.not.be.null;
        expect(user).to.not.be.undefined;
        expect(user.getEmail()).to.not.be.undefined;
        expect(user.getPassword()).to.not.be.undefined;
        chai.request(server)
            .post('/auth/login')
            .send(user)
            .end((error, res) => {
                res.should.not.be.null;
                res.body.data.should.not.be.empty;
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('status');
                res.body.should.have.property('data');
                res.body.data.should.be.a('array');
                done();
            });
    });

});

describe('Post/messages', () => {

    it('Create or Send an email', (done) => {
        expect(messages.getId()).to.be.a('number');
        expect(messages.getCreatedOn()).to.not.be.undefined;
        expect(messages.getSubject()).to.be.a('string');
        expect(messages.getMessage()).to.be.a('string');
        expect(messages.getParentMessageId()).to.be.a('number');
        expect(messages.getStatus()).to.be.a('string');
        chai.request(server)
            .post('/messages')
            .send(messages)
            .end((error, res) => {
                res.should.not.be.null;
                res.should.not.be.undefined;
                res.body.should.be.not.be.empty;
                res.body.should.have.property('status');
                res.body.should.have.property('message');
                res.body.message.should.be.a('string');
                res.body.status.should.be.a('number');
                res.body.should.have.property('data');
                res.body.data.should.be.a('array');
                done();
            });
    });

});

describe('Get/ Messages', () => {

    it('should fetch all received emails', (done) => {
        chai.request(server)
            .get('/messages')
            .end((error, res) => {
                res.body.should.be.a('object');
                res.body.should.have.property('status').of('number');
                res.body.should.have.property('data');
                res.body.data.should.be.a('array');
                res.body.data.forEach((record) => {
                    expect(record).to.have.property('id').of('number');
                    expect(record).to.have.property('createdOn').of('object');
                    expect(record).to.have.property('subject').of('string');
                    expect(record).to.have.property('message').of('string');
                    expect(record).to.have.property('senderId').of('number');
                    expect(record).to.have.property('receiverId').of('number');
                    expect(record).to.have.property('parentMessageId').of('number');
                    expect(record).to.have.property('status').of('string');
                });
                done();
            });
    });

    describe('GET/ Messages ', () => {
        it('should fetch all unread received emails', (done) => {
            messages.setStatus('unread');
            dataStore.save(messages.getId(), messages);
            if (dataStore.exists(messages.getId(), messages)) {
                chai.request(server)
                    .get('/messages/' + messages.getId())
                    .send(messages)
                    .end((error, res) => {
                        res.body.data.forEach((record) => {
                            expect(record).to.have.property('status')
                                .eql(messages.getStatus());
                        });
                        done();
                    });
            }

        });
    });

    describe('/GET all sent messages', () => {
        it('should fetch all sent messages', (done) => {
            messages.setStatus('send');
            dataStore.save(messages.getId(), messages);
            if (dataStore.exists(messages.getId(), messages)) {
                chai.request(server)
                    .get('/messages/' + messages.getId())
                    .send(messages)
                    .end((error, res) => {
                        res.body.data.forEach((record) => {
                            expect(record).to.have.property('status')
                                .eql(messages.getStatus());
                        });
                        done();
                    });
            }
        });
    });

});

describe('GET/ messages/ message-id', () => {
    it('should get a specific email record', (done) => {
        dataStore.save(messages.getId(), messages);
        if (dataStore.exists(messages.getId(), messages)) {
            chai.request(server)
                .get('/messages/' + messages.getId())
                .send(messages)
                .end((error, res) => {
                    res.body.should.have.property('status').of('number');
                    res.body.should.have.property('data').of('object');
                    res.body.data.should.not.be.null;
                    res.body.data.should.have.property('id').of('number');
                    res.body.data.should.have.property('createdOn').of('object');
                    res.body.data.should.have.property('subject').of('string');
                    res.body.data.should.have.property('message').of('string');
                    res.body.data.should.have.property('senderId').of('number');
                    res.body.data.should.have.property('receiverId').of('number');
                    res.body.data.should.have.property('parentMessageId').of('number');
                    res.body.data.should.have.property('status').of('string');
                    done();
                });
        }
    })
});

describe('/Delete Message', () => {
    it('should delete a specific email record', (done) => {
        chai.request(server)
            .delete('/messages/' + messages.getId())
            .end((error, res) => {
                res.body.should.have.property('status').of('number');
                res.body.should.have.property('data');
                expect(res.body.data).to.contain({"message": string});
                done();
            });
    });
});


function createMessages() {
    let messages = new Messages();
    messages.setId(1);
    messages.setCreatedOn(new Date());
    messages.setSubject('The Subject');
    messages.setMessage('The Message');
    messages.setParentMessageId(0);
    messages.setStatus('');

    return messages;
}

