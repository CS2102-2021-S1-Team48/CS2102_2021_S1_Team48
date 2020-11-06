const pool = require('../db');

// GET api at router
async function getConversionEligibility(ctx) {
    const { usernamect } = ctx.params;

    try {
        // const sqlQuery = `SELECT DISTINCT enddate-startdate+1 AS days FROM availabilities WHERE username_caretaker = '${usernamect}' ORDER BY days DESC LIMIT 2`;

        const sqlQuery = `SELECT 
                            CASE WHEN EXISTS (SELECT 1 FROM (SELECT COUNT(*) cnt FROM (SELECT DISTINCT enddate-startdate+1 AS days FROM availabilities WHERE username_caretaker = '${usernamect}') blocklengths WHERE days >= 150) c WHERE c.cnt = 2)
                                THEN 'eligible'
                                ELSE 'not eligible'
                            END;`;

        const resultObject = await pool.query(sqlQuery);
        const rows = resultObject.rows;
        const onlyRow = rows[0];
        const conversionEligibility = onlyRow.case;
        ctx.body = {
            'conversionEligibility': conversionEligibility
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
