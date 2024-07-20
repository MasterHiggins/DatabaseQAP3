const pool = require('../models/data');

//This entire file mostly just uses SQL create statements to fulfill each request (Defined in const's)
const getAllData = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM user_emails');
        res.json(result.rows);
    } catch (err) {
        res.status(500).send(err);
    }
};

const createData = async (req, res) => {
    const { name, email } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO user_emails (name, email) VALUES ($1, $2) RETURNING *',
            [name, email]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).send(err);
    }
};

const updateData = async (req, res) => {
    const { id } = req.params;
    const { name, email } = req.body;
    try {
        const result = await pool.query(
            'UPDATE user_emails SET name = $1, email = $2 WHERE id = $3 RETURNING *',
            [name, email, id]
        );
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).send(err);
    }
};

const deleteData = async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM user_emails WHERE id = $1', [id]);
        res.status(204).send();
    } catch (err) {
        res.status(500).send(err);
    }
};

//Exports data
module.exports = {
    getAllData,
    createData,
    updateData,
    deleteData,
};
