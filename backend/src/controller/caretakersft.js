const pool = require('../db');

// POST api at router
async function createCaretakersFtTable(ctx) {
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
async function dropCaretakersFtTable(ctx) {
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

// POST api at router
// Same issue need the username, temporary solution will be to use query param
// Additionally api document missing startdate and enddate (I have added in already). Will use query param as well.
async function switchCaretakerPtToFt(ctx) {
    const { startdate1, enddate1, startdate2, enddate2 } = ctx.query;

    const username = ctx.query.username;
    try {
        // Should we be using trigger to delete so that we can guarantee atomicity?
        const deleteFromCaretakersPt = `DELETE FROM caretakers_pt WHERE username = '${username}'`;
        await pool.query(deleteFromCaretakersPt);
        const insertIntoCaretakersFt = `INSERT INTO caretakers_ft VALUES ('${username}', '${startdate1}', '${enddate1}', '${startdate2}', '${enddate2}')`;
        await pool.query(insertIntoCaretakersFt);
        ctx.body = 'success';
    } catch (e) {
        console.log(e);
        ctx.body = 'error';
        ctx.status = 403;
    }
}

// GET api at router
async function getCaretakerFtInfo(ctx) {
    try {
        const sqlQuery = 'SELECT * FROM caretakers_ft';
        const resultObeject = await pool.query(sqlQuery);
        ctx.body = 'success';
        console.table(resultObeject.rows);
    } catch (e) {
        console.log(e);
        ctx.body = 'error';
        ctx.status = 403;
    }
}

// GET api at router
async function getSpecificCaretakerFtInfo(ctx) {
    const usernamect = ctx.params.usernamect;
    try {
        const sqlQuery = `SELECT * FROM caretakers_ft WHERE username = '${usernamect}' `;
        const resultObeject = await pool.query(sqlQuery);
        ctx.body = 'success';
        console.table(resultObeject.rows);
    } catch (e) {
        console.log(e);
        ctx.body = 'error';
        ctx.status = 403;
    }
}

// PATCH api at router
async function editStartDate1(ctx) {
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

// PATCH api at router
async function editEndDate1(ctx) {
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

// PATCH api at router
async function editStartDate2(ctx) {
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

// PATCH api at router
async function editEndDate2(ctx) {
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

module.exports = {
    createCaretakersFtTable,
    dropCaretakersFtTable,
    switchCaretakerPtToFt,
    getCaretakerFtInfo,
    getSpecificCaretakerFtInfo,
    editStartDate1,
    editEndDate1,
    editStartDate2,
    editEndDate2
};
