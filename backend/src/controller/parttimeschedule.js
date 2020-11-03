const pool = require('../db');

// POST /parttimeschedule/:usernamect/:availdate
// POST api at router
async function addSchedule(ctx) {
    const { usernamect, availdate} = ctx.params;
    try {
        const sqlQuery = `INSERT INTO parttime_schedules VALUES ('${usernamect}', '${availdate}')`;
        await pool.query(sqlQuery);
        ctx.body = {
            'success': 'True!',
            'username_caretaker': usernamect,
            'availdate': availdate
        };
    } catch (e) {
        console.log(e);
        ctx.status = 403;
    }
}

// GET /partimeschedule/:usernamect
// GET api at router
async function getSchedule(ctx) {
    const usernamect = ctx.params.usernamect;
    try {
        const sqlQuery = `SELECT * FROM parttime_schedules WHERE username = '${usernamect}'`;
        const resultObject = await pool.query(sqlQuery);
        const rows = resultObject.rows;
        ctx.body = {
            'schedule': rows,
        };
    } catch (e) {
        console.log(e);
        ctx.status = 403;
    }
}

// PATCH /partimeschedule/:usernamect/:availdate/:newdate
// PATCH api at router
async function updateSchedule(ctx) {
    const { usernamect, availdate, newdate } = ctx.params;
    try {
        const sqlQuery = `UPDATE parttime_schedules set availdate = '${newdate}' WHERE username = '${usernamect}' AND availdate = '${availdate}'`;
        await pool.query(sqlQuery);
        ctx.body = {
            'success': 'True!',
        };
    } catch (e) {
        console.log(e);
        ctx.status = 403;
    }
}

// DEL /partimeschedule/:usernamect/:availdate
// DEL api at router
async function deleteSchedule(ctx) {
    const { usernamect, availdate } = ctx.params;
    try {
        const sqlQuery = `DELETE FROM parttime_schedules WHERE username = '${usernamect}' AND availdate = '${availdate}'`;
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
    addSchedule,
    getSchedule,
    updateSchedule,
    deleteSchedule
};