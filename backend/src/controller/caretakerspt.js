const pool = require('../db');

// POST api at router
async function createCaretakersPtTable(ctx) {
    try {
        const sqlQuery = '';
        await pool.query(sqlQuery);
        ctx.body = 'success';
    } catch (e) {
        console.log(e);
        ctx.body = 'error';
        ctx.status = 403;
    }
}

// DEL api at router
async function dropCaretakersPtTable(ctx) {
    try {
        const sqlQuery = '';
        await pool.query(sqlQuery);
        ctx.body = 'success';
    } catch (e) {
        console.log(e);
        ctx.body = 'error';
        ctx.status = 403;
    }
}

// GET api at router
// /caretakerpt/getconversioneligibility/:usernamect
async function getConversionEligibility(ctx) {
    const usernamect = ctx.params.usernamect;

    try {
        const sqlQuery = `SELECT DISTINCT enddate-startdate+1 AS days FROM availabilities WHERE username_caretaker = '${usernamect}' ORDER BY days DESC LIMIT 2`;
        const resultObject = await pool.query(sqlQuery);
        const rows = resultObject.rows;
        ctx.body = {
            'availabilities': rows
        };
    } catch (e) {
        console.log(e);
        ctx.body = 'error';
        ctx.status = 403;
    }
}

module.exports = {
    createCaretakersPtTable,
    dropCaretakersPtTable,
    getConversionEligibility
};
