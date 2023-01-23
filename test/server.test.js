// server tests module

const mocha = require('mocha');
const chai = require('chai');
const expect = chai.expect;
const dotenv = require('dotenv');
const request = require('supertest');

const app = require('../app');

describe('Server Up', () => {
    before(() => {
        process.env.NODE_ENV = 'test';
    })


    it('Should be running', (done) => {
        request(app)
            .get('/test')
            .expect(200)
            .end((err, res) => {
                if(err) return done(err);
                expect(res.text).to.equal('up');
                done();
            })
    })
})
