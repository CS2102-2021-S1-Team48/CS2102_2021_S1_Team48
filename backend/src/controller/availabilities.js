const pool = require('../db');

// POST api at router
// POST /availabilities/?usernamect=johndoe98&startdate=01072020&enddate=19032020&pettype=dog&price=100
async function postAvailability(ctx) {
    const { usernamect, startdate, enddate, pettype, price } = ctx.query;

    try {
        const sqlQuery = `INSERT INTO availabilities VALUES ('${startdate}', '${enddate}', '${pettype}', ${price}, '${usernamect}')`;
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

// PATCH api at router
// PATCH /availabilities/:startdate/:enddate/:pettype/:usernamect?startdate=01072020&enddate=19032020&pettype=dog&price=100 , editAvailability
async function editAvailability(ctx) {
    var currStartDate = ctx.params.startdate;
    var currEndDate = ctx.params.enddate;
    var currPetType = ctx.params.pettype;
    var usernamect = ctx.params.usernamect;

    const { startdate, enddate, pettype, price } = ctx.query;
    try {
        if (startdate !== undefined) {
            const sqlQuery = `UPDATE availabilities SET startdate = '${startdate}' WHERE username_caretaker = '${usernamect}' AND startdate = '${currStartDate}' AND enddate = '${currEndDate}' AND pettype = '${currPetType}'`;
            console.log(sqlQuery);
            await pool.query(sqlQuery);
            currStartDate = startdate;

        } if (enddate !== undefined) {
            const sqlQuery = `UPDATE availabilities SET enddate = '${enddate}' WHERE username_caretaker = '${usernamect}' AND startdate = '${currStartDate}' AND enddate = '${currEndDate}' AND pettype = '${currPetType}'`;
            console.log(sqlQuery);
            await pool.query(sqlQuery);
            currEndDate = enddate;

        } if (pettype !== undefined) {
            const sqlQuery = `UPDATE availabilities SET pettype = '${pettype}' WHERE username_caretaker = '${usernamect}' AND startdate = '${currStartDate}' AND enddate = '${currEndDate}' AND pettype = '${currPetType}'`;
            console.log(sqlQuery);
            await pool.query(sqlQuery);
            currPetType = pettype;

        } if (price !== undefined) {
            const sqlQuery = `UPDATE availabilities SET price = ${price} WHERE username_caretaker = '${usernamect}' AND startdate = '${currStartDate}' AND enddate = '${currEndDate}' AND pettype = '${currPetType}'`;
            console.log(sqlQuery);
            await pool.query(sqlQuery);
        }
        ctx.body = {
            'success': 'True!',
            'startdate': startdate,
            'enddate': enddate,
            'pettype': pettype,
            'price': price,
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
    getAvailabilitiesByPetType,
    getAvailabilitiesByUsernameCT,
    getAvailabilitiesByUCTandPT,
    editAvailability,
    deleteAvailability
};
