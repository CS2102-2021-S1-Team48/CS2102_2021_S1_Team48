const pool = require('../db');

// GET api at router
async function getEligibilityToBeFT(ctx) {
    const { usernamect } = ctx.params;

    try {
        const sqlQuery = `SELECT 
        CASE WHEN EXISTS ((SELECT 1 FROM (SELECT COUNT(*) cnt FROM (
                SELECT DISTINCT enddate-startdate+1 AS days 
                FROM availabilities 
                WHERE username_caretaker = '${usernamect}') blocklengths 
                WHERE days >= 150) c WHERE c.cnt = 2) UNION 
                (SELECT 1 
                FROM (SELECT count(*) 
                FROM (SELECT DISTINCT enddate-startdate+1 AS availdays 
                FROM availabilities WHERE username_caretaker = '${usernamect}') as c
                WHERE availdays >= 300) AS n 
                WHERE n.count = 1))
            THEN 'eligible'
            ELSE 'not eligible'
        END;`;

        const resultObject = await pool.query(sqlQuery);
        const rows = resultObject.rows;
        const onlyRow = rows[0];
        const eligibility = onlyRow.case;
        ctx.body = {
            'eligibility': eligibility
        };
    } catch (e) {
        console.log(e);
        ctx.body = 'error';
        ctx.status = 403;
    }
}

module.exports = {
    getEligibilityToBeFT
};
