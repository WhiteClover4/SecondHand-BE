const userTest = () => {
    const request = require('supertest')
    const app = require('../app')
    const testImage = `${__dirname}/profile-picture.png`;
    console.log(testImage);

    let token = "";
    beforeAll((done) => {
        request(app)
            .post("/api/login")
            .set('Content-Type', 'application/json')
            .send({
                email: 'nenda@gmail.com',
                password: '1',
            })
            .end((err, response) => {
                console.log(response.body); // "fewiu3438y..." (successfully got token) 
                token = response.body.token; // Tried to update token variable with jwt token
                done();
            });
    });

    describe('User API', () => {
        it('should update users', async () => {
            const res = await request(app)
                .put('/api/user/1')
                .set('Authorization', `Bearer ${token}`)
                .set('Content-Type', 'application/json')
                .field('name', 'test2')
                .field('city', 'Kota Testing')
                .field('address', 'Jalan Testing 10')
                .field('phone_number', '081234567890')
                .attach('profile_picture', testImage)
            expect(res.statusCode).toEqual(201);
            expect(res.body).toBeDefined();
            expect(res.body.message).toEqual("Data updated successfully");

        });

        it('throw update error, name is null', async () => {
            const res = await request(app)
                .put('/api/user/4000')
                .set('Authorization', `Bearer ${token}`)
                .set('Content-Type', 'application/json')
                .field('name', 'test2')
                .field('city', 'Kota Testing')
                .field('address', 'Jalan Testing 10')
                .field('phone_number', '081234567890')
                .attach('profile_picture', testImage)
            expect(res.statusCode).toEqual(404);
            expect(res.body).toBeDefined();
            expect(res.body.message).toEqual("User not found!");
        });
    });
};

module.exports = userTest;

