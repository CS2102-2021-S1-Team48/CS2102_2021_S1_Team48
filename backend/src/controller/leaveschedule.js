const pool = require('../db');

// POST /leaves/:usernamect/:startdate/:enddate
// POST api at router
async function addLeave(ctx) {
    const { usernamect, startdate, enddate } = ctx.params;
    try {
        const sqlQuery = `INSERT INTO leaveschedule VALUES ('${usernamect}', '${startdate}', '${enddate}')`;
        await pool.query(sqlQuery);
        ctx.body = {
            'success': 'True!',
            'username_caretaker': usernamect,
            'startdate': startdate,
            'enddate': enddate,
        };
    } catch (e) {
        console.log(e);
        ctx.status = 403;
    }
}

// GET /leaves/:usernamect
// GET api at router
async function getLeaves(ctx) {
    const usernamect = ctx.params.usernamect;
    try {
        const sqlQuery = `SELECT * FROM leaveschedule WHERE username = '${usernamect}'`;
        const resultObject = await pool.query(sqlQuery);
        const rows = resultObject.rows;
        ctx.body = {
            'leaves': rows,
        };
    } catch (e) {
        console.log(e);
        ctx.status = 403;
    }
}

// DEL /leaves/:usernamect/:startdate
// DEL api at router
async function deleteLeaves(ctx) {
    const { usernamect, startdate } = ctx.params;
    try {
        const sqlQuery = `DELETE FROM leaveschedule WHERE username = '${usernamect}' AND startdate = '${startdate}'`;
        await pool.query(sqlQuery);
        ctx.body = {
            'success': 'True!',
        };
    } catch (e) {
        console.log(e);
        ctx.status = 403;
    }
}

module.exports = {
    addLeave,
    getLeaves,
    deleteLeaves
};