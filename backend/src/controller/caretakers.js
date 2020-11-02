const pool = require('../db');

// POST api at router
async function createCaretakersTable(ctx) {
    try {
        const sqlQuery = '';
        await pool.query(sqlQuery);
        ctx.body = {
            'success': 'True!'
        };
    } catch (e) {
        console.log(e);
        ctx.status = 403;
    }
}

// DEL api at router
async function dropCaretakersTable(ctx) {
    try {
        const sqlQuery = '';
        await pool.query(sqlQuery);
        ctx.body = {
            'success': 'True!'
        };
    } catch (e) {
        console.log(e);
        ctx.status = 403;
    }
}

// GET api at router
async function getAllCaretakers(ctx) {
    try {
        const sqlQuery = 'SELECT * FROM caretakers';
        const resultObject = await pool.query(sqlQuery);
        const rows = resultObject.rows;
        ctx.body = {
            'caretakers': rows
        };
    } catch (e) {
        console.log(e);
        ctx.status = 403;
    }
}

// GET api at router
async function getCaretakerByUsername(ctx) {
    const username = ctx.params.usernamect;
    try {
        const sqlQuery = `SELECT * FROM caretakers WHERE username = '${username}'`;
        const resultObject = await pool.query(sqlQuery);
        const rows = resultObject.rows;
        ctx.body = {
            'caretakers': rows
        };
    } catch (e) {
        console.log(e);
        ctx.status = 403;
    }
}

module.exports = {
    createCaretakersTable,
    dropCaretakersTable,
    getAllCaretakers,
    getCaretakerByUsername
};
