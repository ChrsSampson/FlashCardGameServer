// server tests module

const mocha = require('mocha');
const chai = require('chai');
const expect = chai.expect;
const request = require('supertest');

// Load environment variables from .env.test.local
require ('dotenv').config({path: '.env.test.local'});

const app = require('../app');

// use descibe.only to run only one block of tests

describe('Server Health and function Test', () => {
    it('Should start', (done) => {
        request(app)
            .get('/api/test')
            .expect(200)
            .end((err, res) => {
                if(err) return done(err);
                expect(res.body.result.message).to.equal('Server is running');
                expect(res.body.result.data).to.equal(null);
                expect(res.body.result.error).to.equal(null);
                expect(res.body.result.status).to.equal(200);
                done();
            })
    });
    it('Should return 404 for non-existent route', (done) => {
        request(app)
            .get('/bannana/apples')
            .expect(404)
            .end((err, res) => {
                if(err) return done(err);
                done();
            })
    });
    it('Should return 400 for bad request', (done) => {
        request(app)
            .get('/api/users')
            .expect(400)
            .end((err, res) => {
                if(err) return done(err);
                expect(res.body.result.message).to.equal('Unsupported Method/Route');
                done();
            })
    });
})

describe('database operations', () => {

    afterEach( (done) => {
        request(app)
            .delete('/api/users/test')
            .expect(200)
            .end((err, res) => {
                if(err) return done(err);
                done();
            });
    });

    it('Should be able to create a user with incomplete data', (done) => {
        request(app)
            .post('/api/users')
            .send({
                username: 'test'
            })
            .expect(201)
            .end((err, res) => {
                if(err) return done(err);
                expect(res.body.result.message).to.equal('User created');
                expect(res.body.result.data.username).to.equal('test');
                expect(res.body.result.data.color).to.equal('#fff');
                done();
            });
    });

    it('Should be able to create a user with complete data', (done) => {
        request(app)
            .post('/api/users')
            .send({
                username: 'test',
                color: '#aaa'
            })
            .expect(201)
            .end((err, res) => {
                if(err) return done(err);
                expect(res.body.result.message).to.equal('User created');
                expect(res.body.result.data.username).to.equal('test');
                expect(res.body.result.data.color).to.equal('#aaa');
                done();
            });
    });
});