const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const dataRoutes = require('../routes/dataRoutes');
const pool = require('../models/data');

//Mock database setup
beforeAll(async () => {
    await pool.query(`
        CREATE TABLE IF NOT EXISTS user_emails (
            id SERIAL PRIMARY KEY,
            name VARCHAR(100),
            email VARCHAR(100)
        )
    `);
});

afterAll(async () => {
    await pool.query('DROP TABLE IF EXISTS user_emails');
    await pool.end();
});

//Setup Express application
const app = express();
app.use(bodyParser.json());
app.use('/api', dataRoutes);

describe('Data API', () => {
    let createdId;

    it('should create a new data entry', async () => {
        const response = await request(app)
            .post('/api/data')
            .send({ name: 'John Doe', email: 'john@example.com' });
        
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('id');
        expect(response.body.name).toBe('John Doe');
        expect(response.body.email).toBe('john@example.com');
        createdId = response.body.id;
    });

    it('should get all data entries', async () => {
        const response = await request(app).get('/api/data');
        
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBeGreaterThan(0);
    });

    it('should update a data entry', async () => {
        const response = await request(app)
            .put(`/api/data/${createdId}`)
            .send({ name: 'Jane Doe', email: 'jane@example.com' });
        
        expect(response.status).toBe(200);
        expect(response.body.name).toBe('Jane Doe');
        expect(response.body.email).toBe('jane@example.com');
    });

    it('should delete a data entry', async () => {
        const response = await request(app).delete(`/api/data/${createdId}`);
        
        expect(response.status).toBe(204);
    });
});
