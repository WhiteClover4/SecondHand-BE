const request = require('supertest')
const app = require('../app')

describe('User API', () => {
    it('should register users', async () => {
        const res = await request(app)
            .post('/api/user/register')
            .set('name', "test")
            .set('email', "test@mail.com")
            .set('password', 12345678)
            .set('city', 1)
            .set('address', "alamat kalimantan")
            .set('phone_number', "081234567890")
            .set('role_id', 1)
        expect(res.statusCode).toEqual(404);
        // expect(res.status).toHaveProperty('User created successfully');
        console.log(res);
    });

    // it('should show user with limitation using pagination', async () => {
    //     const res = await request(app)
    //         .get('/api/users')
    //         .set('email', "admin@gmail.com")
    //         .set('password', 12345678)
    //         .query({
    //             page: 2,
    //             row: 2
    //         })
    //     expect(res.statusCode).toEqual(200);
    //     expect(res.body).toHaveProperty('data');
    // });

    // it('should throw authentication failed', async () => {
    //     const res = await request(app)
    //         .get('/api/users')
    //     expect(res.statusCode).toEqual(403);
    //     expect(res.body).toHaveProperty('message');
    //     expect(res.body.status).toEqual('Unauthenticated');
    // });

    // it('should show a user', async () => {
    //     const res = await request(app)
    //         .get('/api/users/2')
    //         .set('email', "admin@gmail.com")
    //         .set('password', 12345678)
    //     expect(res.statusCode).toEqual(200);
    //     expect(res.body).toHaveProperty('data');
    // });

    // it('should throw error user not found', async () => {
    //     const res = await request(app)
    //         .get('/api/users/200')
    //         .set('email', "admin@gmail.com")
    //         .set('password', 12345678)
    //     expect(res.statusCode).toEqual(404);
    //     expect(res.body).toHaveProperty('message');
    // });

    // it('should create a new user', async () => {
    //     const res = await request(app)
    //         .post('/api/users')
    //         .set('email', "admin@gmail.com")
    //         .set('password', 12345678)
    //         .set('Content-Type', 'application/json')
    //         .send({
    //             email: 'test@mail.com',
    //             password: 'test'
    //         })
    //     expect(res.statusCode).toEqual(201);
    //     expect(res.body).toHaveProperty('data');
    // })

    // it('should update a user', async () => {
    //     const res = await request(app)
    //         .post('/api/users/5')
    //         .set('email', "admin@gmail.com")
    //         .set('password', 12345678)
    //         .set('Content-Type', 'application/json')
    //         .send({
    //             email: 'alia1battle21@gmail.com',
    //             password: '1234'
    //         })
    //     expect(res.statusCode).toEqual(201);
    //     expect(res.body).toHaveProperty('data');
    // })

    // it('should throw update error user not found', async () => {
    //     const res = await request(app)
    //         .post('/api/users/500')
    //         .set('email', "admin@gmail.com")
    //         .set('password', 12345678)
    //         .set('Content-Type', 'application/json')
    //         .send({
    //             email: 'alia1battle21@gmail.com',
    //             password: '1234'
    //         })
    //     expect(res.statusCode).toEqual(404);
    //     expect(res.body).toHaveProperty('message');
    // });

    // it('should delete a user', async () => {
    //     const res = await request(app)
    //         .del('/api/users/5')
    //         .set('email', "admin@gmail.com")
    //         .set('password', 12345678)
    //     expect(res.statusCode).toEqual(200)
    //     expect(res.body).toHaveProperty('data')
    // })

    // it('should throw delete error user not found', async () => {
    //     const res = await request(app)
    //         .del('/api/users/300')
    //         .set('email', "admin@gmail.com")
    //         .set('password', 12345678)
    //     expect(res.statusCode).toEqual(404)
    //     expect(res.body).toHaveProperty('message')
    // });
});