const pool = require('../db');

// POST api at router
// POST /availabilities?usernamect=johndoe98&startdate=01072020&enddate=19032020&pettype=dog&price=100
async function postAvailability(ctx) {
    const { startdate, enddate, pettype, price, usernamect } = ctx.query;

    try {
        const sqlQuery = `INSERT INTO availabilities (startdate, enddate, pettype, price, username_caretaker) VALUES ('${startdate}', '${enddate}', '${pettype}', ${price}, '${usernamect}')`;
        await pool.query(sqlQuery);
        ctx.body = {
            'usernamect': usernamect,
            'startdate': startdate,
            'enddate': enddate,
            'pettype': pettype,
            'price': price
        };
    } catch (e) {
        console.log(e);
        ctx.status = 403;
    }
}

// GET api at router
async function getAllAvailabilities(ctx) {
    try {
        const sqlQuery = 'SELECT * FROM availabilities';
        const resultObject = await pool.query(sqlQuery);
        const rows = resultObject.rows;
        ctx.body = {
            'availabilities': rows
        };
    } catch (e) {
        console.log(e);
        ctx.status = 403;
    }
}

// GET api at router
async function getAvailabilitiesByPetType(ctx) {
    const { pettype } = ctx.params;

    try {
        const sqlQuery = `SELECT * FROM availabilities WHERE pettype = '${pettype}'`;
        const resultObject = await pool.query(sqlQuery);
        const rows = resultObject.rows;
        ctx.body = {
            'availabilities': rows
        };
    } catch (e) {
        console.log(e);
        ctx.status = 403;
    }
}

// GET api at router
async function getAvailabilitiesByUsernameCT(ctx) {
    const { usernamect } = ctx.params;

    try {
        const sqlQuery = `SELECT * FROM availabilities WHERE username_caretaker = '${usernamect}'`;
        const resultObject = await pool.query(sqlQuery);
        const rows = resultObject.rows;
        ctx.body = {
            'availabilities': rows
        };
    } catch (e) {
        console.log(e);
        ctx.status = 403;
    }
}

// GET api at router
async function getAvailabilitiesByUCTandPT(ctx) {
    const { usernamect, pettype } = ctx.params;

    try {
        const sqlQuery = `SELECT * FROM availabilities WHERE username_caretaker = '${usernamect}' AND pettype = '${pettype}'`;
        const resultObject = await pool.query(sqlQuery);
        const rows = resultObject.rows;
        ctx.body = {
            'availabilities': rows
        };
    } catch (e) {
        console.log(e);
        ctx.status = 403;
    }
}

// GET api at router
async function getAvailabilitiesByMinDateRangeAndPT(ctx) {
    const { startdate, enddate, pettype } = ctx.params;

    try {
        const sqlQuery = `SELECT * FROM availabilities WHERE pettype = '${pettype}' AND startdate <= '${startdate}' AND enddate >= '${enddate}'`;
        const resultObject = await pool.query(sqlQuery);
        const rows = resultObject.rows;
        ctx.body = {
            'availabilities': rows
        };
    } catch (e) {
        console.log(e);
        ctx.status = 403;
    }
}

// PATCH api at router
// PATCH /availabilities?startdate=20201025&enddate=20201025&pettype=dog&price=99999&usernamect=johndoe98&newstartdate=20201025&newenddate=20201026&newpettype=cat&newprice=13939495
async function editAvailability(ctx) {
    const { startdate, enddate, pettype, price, usernamect, newstartdate, newenddate, newpettype, newprice } = ctx.query;
    
    try {
        const ftCountQuery = `SELECT count(*) FROM caretakers_ft WHERE username = '${usernamect}'`;
        const ftCountResult =  await pool.query(ftCountQuery);
        const ftCountRows = ftCountResult.rows;
        const ftCountOnlyRow = ftCountRows[0];
        const ftCount = ftCountOnlyRow.count;

        const ptCountQuery = `SELECT count(*) FROM caretakers_pt WHERE username = '${usernamect}'`;
        const ptCountResult = await pool.query(ptCountQuery);
        const ptCountRows = ptCountResult.rows;
        const ptCountOnlyRow = ptCountRows[0];
        const ptCount = ptCountOnlyRow.count;
        
        if (ftCount == 1 && ptCount == 0) {
            const whereClause = `WHERE startdate = '${startdate}' AND enddate = '${enddate}' AND pettype = '${pettype}' AND price = '${price}' AND username_caretaker = '${usernamect}'`;
            const updateQuery = `UPDATE availabilities SET startdate = '${newstartdate}', enddate = '${newenddate}', pettype = '${newpettype}', price = '${newprice}' ` + whereClause;
            await pool.query(updateQuery);

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
                            END`;

            const resultObject = await pool.query(sqlQuery);
            const rows = resultObject.rows;
            const onlyRow = rows[0];
            const eligibility = onlyRow.case;

            if (eligibility == 'not eligible') {
                const whereClause = `WHERE startdate = '${newstartdate}' AND enddate = '${newenddate}' AND pettype = '${newpettype}' AND price = '${newprice}' AND username_caretaker = '${usernamect}'`;
                const rollback = `UPDATE availabilities SET startdate = '${startdate}', enddate = '${enddate}', pettype = '${pettype}', price = '${price}' ` + whereClause;
                await pool.query(rollback);
                ctx.body = {
                    'errormessage': 'To stay as a fulltimer, you need to be available for a minimum of 2 x 150 consecutive days, in a year.'
                };
                ctx.status = 403;
            } else {
                ctx.body = {
                    'newstartdate': newstartdate,
                    'newenddate': newenddate,
                    'newpettype': newpettype,
                    'newprice': newprice,
                };
            }

        } else if (ftCount == 0 && ptCount == 1) {
            const whereClause = `WHERE startdate = '${startdate}' AND enddate = '${enddate}' AND pettype = '${pettype}' AND price = '${price}' AND username_caretaker = '${usernamect}'`;
            const updateQuery = `UPDATE availabilities SET startdate = '${newstartdate}', enddate = '${newenddate}', pettype = '${newpettype}', price = '${newprice}' ` + whereClause;
            await pool.query(updateQuery);
            ctx.body = {
                'newstartdate': newstartdate,
                'newenddate': newenddate,
                'newpettype': newpettype,
                'newprice': newprice,
            };
        } else {
            ctx.status = 403;
        }
       
    } catch (e) {
        console.log(e);
        ctx.status = 403;
    }
}

// DEL api at router
async function deleteAvailability(ctx) {
    const { startdate, enddate, pettype, usernamect } = ctx.params;

    try {
        const sqlQuery = `DELETE FROM availabilities WHERE username_caretaker = '${usernamect}' AND startdate = '${startdate}' AND enddate = '${enddate}' AND pettype = '${pettype}'`;
        await pool.query(sqlQuery);
        ctx.body = {
            'success': 'true!'
        };
    } catch (e) {
        console.log(e);
        ctx.status = 403;
    }
}

module.exports = {
    postAvailability,
    getAllAvailabilities,
    getAvailabilitiesByMinDateRangeAndPT,
    getAvailabilitiesByPetType,
    getAvailabilitiesByUsernameCT,
    getAvailabilitiesByUCTandPT,
    editAvailability,
    deleteAvailability
};
