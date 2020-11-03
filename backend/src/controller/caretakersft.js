const pool = require('../db');

// POST api at router
// POST /caretakersft/duc99?startdate1=20200101&enddate1=20200531&startdate2=20200601&enddate2=20201231
async function switchCaretakerPtToFt(ctx) {
    const { startdate1, enddate1, startdate2, enddate2 } = ctx.query;

    const usernamect = ctx.params.usernamect;
    try {
        // Should we be using trigger to delete so that we can guarantee atomicity?
        const deleteFromCaretakersPt = `DELETE FROM caretakers_pt WHERE username = '${usernamect}'`;
        await pool.query(deleteFromCaretakersPt);
        const insertIntoCaretakersFt = `INSERT INTO caretakers_ft VALUES ('${usernamect}', '${startdate1}', '${enddate1}', '${startdate2}', '${enddate2}')`;
        await pool.query(insertIntoCaretakersFt);
        const updatePetLimit = `UPDATE caretakers SET petlimit = 5 WHERE username = '${usernamect}'`;
        await pool.query(updatePetLimit);
        ctx.body = {
            'success': 'True!',
            'usernamect': usernamect,
            'startdate1': startdate1,
            'enddate1': enddate1,
            'startdate2': startdate2,
            'enddate2': enddate2
        };
    } catch (e) {
        console.log(e);
        ctx.status = 403;
    }
}

// GET api at router
async function getCaretakerFtInfo(ctx) {
    try {
        const sqlQuery = 'SELECT * FROM caretakers_ft';
        const resultObject = await pool.query(sqlQuery);
        const rows = resultObject.rows;
        ctx.body = {
            'caretakerftinfo': rows
        };
        console.table(resultObject.rows);
    } catch (e) {
        console.log(e);
        ctx.status = 403;
    }
}

// GET api at router
async function getSpecificCaretakerFtInfo(ctx) {
    const usernamect = ctx.params.usernamect;
    try {
        const sqlQuery = `SELECT * FROM caretakers_ft WHERE username = '${usernamect}' `;
        const resultObject = await pool.query(sqlQuery);
        const rows = resultObject.rows;
        ctx.body = {
            'caretakerftinfo': rows
        };
        console.table(resultObject.rows);
    } catch (e) {
        console.log(e);
        ctx.status = 403;
    }
}

// PATCH api at router
// /caretakersft/startdate1/:startdate1/:usernamect
async function editStartDate1(ctx) {
    const startdate1 = ctx.params.startdate1;
    const usernamect = ctx.params.usernamect;
    try {
        const sqlQuery = `UPDATE caretakers_ft SET startdate1 = '${startdate1}' WHERE username = '${usernamect}'`;
        await pool.query(sqlQuery);
        ctx.body = {
            'success': 'True!',
            'startdate1': startdate1,
            'usernamect': usernamect
        };
    } catch (e) {
        console.log(e);
        ctx.status = 403;
    }
}

// PATCH api at router
// /caretakersft/enddate1/:enddate1/:usernamect
async function editEndDate1(ctx) {
    const enddate1 = ctx.params.enddate1;
    const usernamect = ctx.params.usernamect;
    try {
        const sqlQuery = `UPDATE caretakers_ft SET enddate1 = '${enddate1}' WHERE username = '${usernamect}'`;
        await pool.query(sqlQuery);
        ctx.body = {
            'success': 'True!',
            'enddate1': enddate1,
            'usernamect': usernamect
        };
    } catch (e) {
        console.log(e);
        ctx.status = 403;
    }
}

// PATCH api at router
// /caretakersft/startdate2/:startdate2/:usernamect
async function editStartDate2(ctx) {
    const startdate2 = ctx.params.startdate2;
    const usernamect = ctx.params.usernamect;
    try {
        const sqlQuery = `UPDATE caretakers_ft SET startdate2 = '${startdate2}' WHERE username = '${usernamect}'`;
        await pool.query(sqlQuery);
        ctx.body = {
            'success': 'True!',
            'startdate2': startdate2,
            'usernamect': usernamect     
        };
    } catch (e) {
        console.log(e);
        ctx.status = 403;
    }
}

// PATCH api at router
// /caretakersft/enddate2/:enddate2/:usernamect
async function editEndDate2(ctx) {
    const enddate2 = ctx.params.enddate2;
    const usernamect = ctx.params.usernamect;
    try {
        const sqlQuery = `UPDATE caretakers_ft SET enddate2 = '${enddate2}' WHERE username = '${usernamect}'`;
        await pool.query(sqlQuery);
        ctx.body = {
            'success': 'True!',
            'enddate2': enddate2,
            'usernamect': usernamect
        };
    } catch (e) {
        console.log(e);
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
