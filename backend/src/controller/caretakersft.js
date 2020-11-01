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
        const updatePetLimit = `UPDATE caretakers SET petlimit = 5 WHERE username = '${username}'`;
        await pool.query(updatePetLimit);
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
// /caretakersft/startdate1/:startdate1
// Same issue need the username, temporary solution will be to use query param
async function editStartDate1(ctx) {
    const startdate1 = ctx.params.startdate1;

    const username = ctx.query.username;
    try {
        const sqlQuery = `UPDATE caretakers_ft SET startdate1 = '${startdate1}' WHERE username = '${username}'`;
        await pool.query(sqlQuery);
        ctx.body = 'success';
    } catch (e) {
        console.log(e);
        ctx.body = 'error';
        ctx.status = 403;
    }
}

// PATCH api at router
// /caretakersft/enddate1/:enddate1
// Same issue need the username, temporary solution will be to use query param
async function editEndDate1(ctx) {
    const enddate1 = ctx.params.enddate1;

    const username = ctx.query.username;
    try {
        const sqlQuery = `UPDATE caretakers_ft SET enddate1 = '${enddate1}' WHERE username = '${username}'`;
        await pool.query(sqlQuery);
        ctx.body = 'success';
    } catch (e) {
        console.log(e);
        ctx.body = 'error';
        ctx.status = 403;
    }
}

// PATCH api at router
// /caretakersft/startdate2/:startdate2
// Same issue need the username, temporary solution will be to use query param
async function editStartDate2(ctx) {
    const startdate2 = ctx.params.startdate2;

    const username = ctx.query.username;
    try {
        const sqlQuery = `UPDATE caretakers_ft SET startdate2 = '${startdate2}' WHERE username = '${username}'`;
        await pool.query(sqlQuery);
        ctx.body = 'success';
    } catch (e) {
        console.log(e);
        ctx.body = 'error';
        ctx.status = 403;
    }
}

// PATCH api at router
// /caretakersft/enddate2/:enddate2
// Same issue need the username, temporary solution will be to use query param
async function editEndDate2(ctx) {
    const enddate2 = ctx.params.enddate2;

    const username = ctx.query.username;
    try {
        const sqlQuery = `UPDATE caretakers_ft SET enddate2 = '${enddate2}' WHERE username = '${username}'`;
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
