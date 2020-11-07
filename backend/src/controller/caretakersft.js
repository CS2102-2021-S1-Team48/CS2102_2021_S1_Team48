const pool = require('../db');

// POST api at router
async function switchCaretakerPtToFt(ctx) {
    const { usernamect } = ctx.params;

    try {
        const sqlQuery = `SELECT 
                            CASE WHEN EXISTS (SELECT 1 FROM (SELECT COUNT(*) cnt FROM (SELECT DISTINCT enddate-startdate+1 AS days FROM availabilities WHERE username_caretaker = '${usernamect}') blocklengths WHERE days >= 150) c WHERE c.cnt = 2)
                                THEN 'eligible'
                                ELSE 'not eligible'
                            END;`;

        const resultObject = await pool.query(sqlQuery);
        const rows = resultObject.rows;
        const onlyRow = rows[0];
        const eligibility = onlyRow.case;
        
        if (eligibility == 'eligible') {
            const deleteFromCaretakersPt = `DELETE FROM caretakers_pt WHERE username = '${usernamect}'`;
            await pool.query(deleteFromCaretakersPt);
            const insertIntoCaretakersFt = `INSERT INTO caretakers_ft (username) VALUES ('${usernamect}')`;
            await pool.query(insertIntoCaretakersFt);
            const updatePetLimit = `UPDATE caretakers SET petlimit = 5 WHERE username = '${usernamect}'`;
            await pool.query(updatePetLimit);
            ctx.body = {
                'success': 'true!',
            };
        } else {
            ctx.body = {
                'errormessage': 'To be fulltimer, you need to be available for a minimum of 2 x 150 consecutive days, in a year.'
            };
            ctx.status = 403;
        }
        
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
            'enddate2': enddate2,
            'usernamect': usernamect
        };
    } catch (e) {
        console.log(e);
        ctx.status = 403;
    }
}

module.exports = {
    switchCaretakerPtToFt,
    getCaretakerFtInfo,
    getSpecificCaretakerFtInfo,
    editStartDate1,
    editEndDate1,
    editStartDate2,
    editEndDate2
};
