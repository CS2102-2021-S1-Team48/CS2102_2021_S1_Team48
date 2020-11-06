const pool = require('../db');

// GET api at router
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
    getConversionEligibility
};
