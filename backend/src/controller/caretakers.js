const pool = require('../db');

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
