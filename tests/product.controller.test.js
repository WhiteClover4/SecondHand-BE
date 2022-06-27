const productTest = () => {
    const request = require('supertest')
    const app = require('../app')

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

    describe('Product API', () => {
        it('should get all products', async () => {
            const res = await request(app)
                .get('/api/product')
                .set('Authorization', `Bearer ${token}`)
                .set('Content-Type', 'application/json')
            expect(res.statusCode).toEqual(200);
            expect(res.body.result).toBeDefined();
            expect(res.body.status).toEqual("success");
        });

        it('should get product by id', async () => {
            const res = await request(app)
                .get('/api/product/1')
                .set('Authorization', `Bearer ${token}`)
                .set('Content-Type', 'application/json')
                expect(res.statusCode).toEqual(200);
                expect(res.body.result).toBeDefined();
                expect(res.body.status).toEqual("success");
        });

        it('throw get product by id error, product not found', async () => {
            const res = await request(app)
                .get('/api/product/100')
                .set('Authorization', `Bearer ${token}`)
                .set('Content-Type', 'application/json')
                expect(res.statusCode).toEqual(404);
                expect(res.body).toBeDefined();
                expect(res.body.msg).toEqual("Product dengan id 100 tidak ditemukan");
        });

        it('should create product', async () => {
            const res = await request(app)
                .post('/api/product/')
                .set('Authorization', `Bearer ${token}`)
                .set('Content-Type', 'application/json')
                .send({
                    'name': 'Produk Test',
                    'description': 'Ini hanyalah produk test',
                    'price': 123200,
                    'status': "DRAFT",
                    'category_id': 2,
                    'isPublished': false
                })
            expect(res.statusCode).toEqual(201);
            expect(res.body).toBeDefined();
            expect(res.body.status).toEqual("success");
        });

        it('throw create product error, name cant be null', async () => {
            const res = await request(app)
                .post('/api/product/')
                .set('Authorization', `Bearer ${token}`)
                .set('Content-Type', 'application/json')
                .send({
                    'description': 'Ini hanyalah produk test',
                    'price': 123200,
                    'status': "DRAFT",
                    'category_id': 2,
                    'isPublished': false
                })
            expect(res.statusCode).toEqual(422);
            expect(res.body).toBeDefined();
            expect(res.body.errors[0].msg).toEqual("name cant be null");
        });

        it('throw create product error, description cant be null', async () => {
            const res = await request(app)
                .post('/api/product/')
                .set('Authorization', `Bearer ${token}`)
                .set('Content-Type', 'application/json')
                .send({
                    'name': 'Produk Test',
                    'price': 123200,
                    'status': "DRAFT",
                    'category_id': 2,
                    'isPublished': false
                })
            expect(res.statusCode).toEqual(422);
            expect(res.body).toBeDefined();
            expect(res.body.errors[0].msg).toEqual("description cant be null");
        });

        it('throw create product error, price cant be null', async () => {
            const res = await request(app)
                .post('/api/product/')
                .set('Authorization', `Bearer ${token}`)
                .set('Content-Type', 'application/json')
                .send({
                    'name': 'Produk Test',
                    'description': 'Ini hanyalah produk test',
                    'status': "DRAFT",
                    'category_id': 2,
                    'isPublished': false
                })
            expect(res.statusCode).toEqual(422);
            expect(res.body).toBeDefined();
            expect(res.body.errors[0].msg).toEqual("price cant be null");
        });

        it('throw create product error, status cant be null', async () => {
            const res = await request(app)
                .post('/api/product/')
                .set('Authorization', `Bearer ${token}`)
                .set('Content-Type', 'application/json')
                .send({
                    'name': 'Produk Test',
                    'description': 'Ini hanyalah produk test',
                    'price': 123200,
                    'category_id': 2,
                    'isPublished': false
                })
            expect(res.statusCode).toEqual(422);
            expect(res.body).toBeDefined();
            expect(res.body.errors[0].msg).toEqual("status cant be null");
        });

        it('throw create product error, category cant be null', async () => {
            const res = await request(app)
                .post('/api/product/')
                .set('Authorization', `Bearer ${token}`)
                .set('Content-Type', 'application/json')
                .send({
                    'name': 'Produk Test',
                    'description': 'Ini hanyalah produk test',
                    'price': 123200,
                    'status': "DRAFT",
                    'isPublished': false
                })
            expect(res.statusCode).toEqual(422);
            expect(res.body).toBeDefined();
            expect(res.body.errors[0].msg).toEqual("category cant be null");
        });

        it('throw create product error, is published cant be null', async () => {
            const res = await request(app)
                .post('/api/product/')
                .set('Authorization', `Bearer ${token}`)
                .set('Content-Type', 'application/json')
                .send({
                    'name': 'Produk Test',
                    'description': 'Ini hanyalah produk test',
                    'price': 123200,
                    'status': "DRAFT",
                    'category_id': 2,
                })
            expect(res.statusCode).toEqual(422);
            expect(res.body).toBeDefined();
            expect(res.body.errors[0].msg).toEqual("is published cant be null");
        });

        it('should update product', async () => {
            const res = await request(app)
                .put('/api/product/1')
                .set('Authorization', `Bearer ${token}`)
                .set('Content-Type', 'application/json')
                .send({
                    'name': 'Produk Test',
                    'description': 'Ini hanyalah produk test',
                    'price': 123200,
                    'status': "DRAFT",
                    'category_id': 2,
                    'isPublished': false
                })
            expect(res.statusCode).toEqual(200);
            expect(res.body).toBeDefined();
            expect(res.body.status).toEqual("success");
        });

        it('throw update product by id error, product not found', async () => {
            const res = await request(app)
                .put('/api/product/100')
                .set('Authorization', `Bearer ${token}`)
                .set('Content-Type', 'application/json')
                .send({
                    'name': 'Produk Test',
                    'description': 'Ini hanyalah produk test',
                    'price': 123200,
                    'status': "DRAFT",
                    'category_id': 2,
                    'isPublished': false
                })
                expect(res.statusCode).toEqual(404);
                expect(res.body).toBeDefined();
                expect(res.body.msg).toEqual("Product dengan id 100 tidak ditemukan");
        });

        it('throw update product error, name cant be null', async () => {
            const res = await request(app)
                .put('/api/product/1')
                .set('Authorization', `Bearer ${token}`)
                .set('Content-Type', 'application/json')
                .send({
                    'description': 'Ini hanyalah produk test',
                    'price': 123200,
                    'status': "DRAFT",
                    'category_id': 2,
                    'isPublished': false
                })
            expect(res.statusCode).toEqual(422);
            expect(res.body).toBeDefined();
            expect(res.body.errors[0].msg).toEqual("name cant be null");
        });

        it('throw update product error, description cant be null', async () => {
            const res = await request(app)
                .put('/api/product/1')
                .set('Authorization', `Bearer ${token}`)
                .set('Content-Type', 'application/json')
                .send({
                    'name': 'Produk Test',
                    'price': 123200,
                    'status': "DRAFT",
                    'category_id': 2,
                    'isPublished': false
                })
            expect(res.statusCode).toEqual(422);
            expect(res.body).toBeDefined();
            expect(res.body.errors[0].msg).toEqual("description cant be null");
        });

        it('throw update product error, price cant be null', async () => {
            const res = await request(app)
                .put('/api/product/1')
                .set('Authorization', `Bearer ${token}`)
                .set('Content-Type', 'application/json')
                .send({
                    'name': 'Produk Test',
                    'description': 'Ini hanyalah produk test',
                    'status': "DRAFT",
                    'category_id': 2,
                    'isPublished': false
                })
            expect(res.statusCode).toEqual(422);
            expect(res.body).toBeDefined();
            expect(res.body.errors[0].msg).toEqual("price cant be null");
        });

        it('throw update product error, status cant be null', async () => {
            const res = await request(app)
                .put('/api/product/1')
                .set('Authorization', `Bearer ${token}`)
                .set('Content-Type', 'application/json')
                .send({
                    'name': 'Produk Test',
                    'description': 'Ini hanyalah produk test',
                    'price': 123200,
                    'category_id': 2,
                    'isPublished': false
                })
            expect(res.statusCode).toEqual(422);
            expect(res.body).toBeDefined();
            expect(res.body.errors[0].msg).toEqual("status cant be null");
        });

        it('throw update product error, category cant be null', async () => {
            const res = await request(app)
                .put('/api/product/1')
                .set('Authorization', `Bearer ${token}`)
                .set('Content-Type', 'application/json')
                .send({
                    'name': 'Produk Test',
                    'description': 'Ini hanyalah produk test',
                    'price': 123200,
                    'status': "DRAFT",
                    'isPublished': false
                })
            expect(res.statusCode).toEqual(422);
            expect(res.body).toBeDefined();
            expect(res.body.errors[0].msg).toEqual("category cant be null");
        });

        it('throw update product error, is published cant be null', async () => {
            const res = await request(app)
                .put('/api/product/1')
                .set('Authorization', `Bearer ${token}`)
                .set('Content-Type', 'application/json')
                .send({
                    'name': 'Produk Test',
                    'description': 'Ini hanyalah produk test',
                    'price': 123200,
                    'status': "DRAFT",
                    'category_id': 2,
                })
            expect(res.statusCode).toEqual(422);
            expect(res.body).toBeDefined();
            expect(res.body.errors[0].msg).toEqual("is published cant be null");
        });

        it('should delete product by id', async () => {
            const res = await request(app)
                .delete('/api/product/1')
                .set('Authorization', `Bearer ${token}`)
                .set('Content-Type', 'application/json')
                expect(res.statusCode).toEqual(200);
                expect(res.body).toBeDefined();
                expect(res.body.status).toEqual("success");
        });

        it('throw delete product by id error, product not found', async () => {
            const res = await request(app)
                .delete('/api/product/100')
                .set('Authorization', `Bearer ${token}`)
                .set('Content-Type', 'application/json')
                expect(res.statusCode).toEqual(404);
                expect(res.body).toBeDefined();
                expect(res.body.msg).toEqual("Product dengan id 100 tidak ditemukan");
        });
    });
};

module.exports = productTest;

