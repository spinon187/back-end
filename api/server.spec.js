const req = require('supertest');
const router = require('./server.js');
const db = require('../data/dbConfig.js');

describe('server.js', () => {
    describe('register plus login combo', () => {
        afterEach(async () => {
            await db('users').truncate();
        })
        describe('register endpoint', () => {
            it('should return 201 when it works', async () => {
                const res = await req(router).post('/api/register')
                    .send({username: "test", password: "test"});
                expect(res.status).toEqual(201);
            });
        })
        describe('login endpoint', () => {
            it('should return 200 when it works', async () => {
                const res = await req(router).post('/api/login')
                    .send({username: "test", password: "test"});
                expect(res.status).toEqual(200);
            });
        })
    })
})