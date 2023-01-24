// server tests module

const mocha = require('mocha');
const chai = require('chai');
const expect = chai.expect;
const request = require('supertest');

// Load environment variables from .env.test.local
require ('dotenv').config({path: '.env.test.local'});

const app = require('../app');

describe('Server Health', () => {
    it('Should start', (done) => {
        request(app)
            .get('/test')
            .expect(200)
            .end((err, res) => {
                if(err) return done(err);
                done();
            })
    })
})

describe('database operations', () => {
    it('Should be able to create a user', (done) => {
        request(app)
            .post('/users')
            .send({userName: 'test'})
            .expect(201)
            .end((err, res) => {
                if(err) return done(err);
                done();
            })
    });
})