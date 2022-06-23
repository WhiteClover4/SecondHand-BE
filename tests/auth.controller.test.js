const authTest = () => {
    const request = require('supertest')
    const app = require('../app')
    jest.setTimeout(30000);
    
    describe('Register API', () => {
        it('should register users', async () => {
            const res = await request(app)
                .post('/api/register')
                .set('Content-Type', 'application/json')
                .send({
                    name: 'test',
                    email: 'test@mail.com',
                    password: '12345678'
                })
            expect(res.statusCode).toEqual(201);
            expect(res.body).toHaveProperty('data');
        });

        it('throw register error name is null', async () => {
            const res = await request(app)
                .post('/api/register')
                .set('Content-Type', 'application/json')
                .send({
                    email: 'test@mail.com',
                    password: '12345678'
                })
            expect(res.statusCode).toEqual(422);
            expect(res.body).toBeDefined();
            expect(res.body.errors[0].msg).toEqual("name cant be null");
        });

        it('throw register error name cant less than 3 characters', async () => {
            const res = await request(app)
                .post('/api/register')
                .set('Content-Type', 'application/json')
                .send({
                    name: "te",
                    email: 'test@mail.com',
                    password: '12345678'
                })
            expect(res.statusCode).toEqual(422);
            expect(res.body).toBeDefined();
            expect(res.body.errors[0].msg).toEqual("name must be minimum 3 length");
        });

        it('throw register error email is null', async () => {
            const res = await request(app)
                .post('/api/register')
                .set('Content-Type', 'application/json')
                .send({
                    name: 'test',
                    password: '12345678'
                })
            expect(res.statusCode).toEqual(422);
            expect(res.body).toBeDefined();
            expect(res.body.errors[0].msg).toEqual("email cant be null");
        });

        it('throw register error email must be an email format', async () => {
            const res = await request(app)
                .post('/api/register')
                .set('Content-Type', 'application/json')
                .send({
                    name: 'test',
                    email: 'testmail.com',
                    password: '12345678'
                })
            expect(res.statusCode).toEqual(422);
            expect(res.body).toBeDefined();
            expect(res.body.errors[0].msg).toEqual("must be an email");
        });

        it('throw register error password is null', async () => {
            const res = await request(app)
                .post('/api/register')
                .set('Content-Type', 'application/json')
                .send({
                    name: 'test',
                    email: 'test@mail.com'
                })
            expect(res.statusCode).toEqual(422);
            expect(res.body).toBeDefined();
            expect(res.body.errors[0].msg).toEqual("password cant be null");
        });

        it('throw register error password cant less than 8 characters', async () => {
            const res = await request(app)
                .post('/api/register')
                .set('Content-Type', 'application/json')
                .send({
                    name: "test",
                    email: 'test@mail.com',
                    password: '1234'
                })
            expect(res.statusCode).toEqual(422);
            expect(res.body).toBeDefined();
            expect(res.body.errors[0].msg).toEqual("password must be minimum 8 length");
        });
    })

    describe('Login API', () => {
        it('should login users', async () => {
            const res = await request(app)
                .post('/api/login')
                .set('Content-Type', 'application/json')
                .send({
                    email: 'test@mail.com',
                    password: '12345678'
                })
            expect(res.statusCode).toEqual(200);
            expect(res.body).toHaveProperty('token');
        });
    
        it('throw login error email is null', async () => {
            const res = await request(app)
                .post('/api/login')
                .set('Content-Type', 'application/json')
                .send({
                    password: '12345678'
                })
            expect(res.statusCode).toEqual(422);
            expect(res.body).toBeDefined();
            expect(res.body.errors[0].msg).toEqual("email cant be null");
        });
    
        it('throw login error password is null', async () => {
            const res = await request(app)
                .post('/api/login')
                .set('Content-Type', 'application/json')
                .send({
                    email: 'test@mail.com'
                })
            expect(res.statusCode).toEqual(422);
            expect(res.body).toBeDefined();
            expect(res.body.errors[0].msg).toEqual("password cant be null");
        });
    });
    
    describe('Forget Password API', () => { 
        it('should send otp for forget password users', async () => {
            const res = await request(app)
                .post('/api/forget-password')
                .set('Content-Type', 'application/json')
                .send({
                    email: 'test@mail.com',
                })
            expect(res.statusCode).toEqual(200);
            expect(res.body).toHaveProperty('message');
        });
    
        it('throw forget password error, email is null', async () => {
            const res = await request(app)
                .post('/api/forget-password')
                .set('Content-Type', 'application/json')
            expect(res.statusCode).toEqual(422);
            expect(res.body).toBeDefined();
            expect(res.body.errors[0].msg).toEqual("email cant be null");
        });
     })

}



 module.exports = authTest;