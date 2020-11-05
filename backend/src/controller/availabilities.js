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


// Buggy, to fix
// PATCH api at router
// PATCH /availabilities?startdate=20201025&enddate=20201025&pettype=dog&price=99999&usernamect=johndoe98&newstartdate=20201025&newenddate=20201026&newpettype=cat&newprice=13939495
async function editAvailability(ctx) {
    const { startdate, enddate, pettype, price, usernamect, newstartdate, newenddate, newpettype, newprice } = ctx.query;
    
    try {
        const whereClause = `WHERE startdate = '${startdate}' AND enddate = '${enddate}' AND pettype = '${pettype}' AND price = '${price}' AND username_caretaker = '${usernamect}'`;
        const sqlQuery = `UPDATE availabilities SET startdate = '${newstartdate}', enddate = '${newenddate}', pettype = '${newpettype}', price = '${newprice}' ` + whereClause;
        console.log(sqlQuery);
        await pool.query(sqlQuery);
        ctx.body = {
            'newstartdate': newstartdate,
            'newenddate': newenddate,
            'newpettype': newpettype,
            'newprice': newprice,
        };
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
            'success': 'True!',
            'usernamect': usernamect,
            'pettype': pettype,
            'startdate': startdate,
            'enddate': enddate
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
