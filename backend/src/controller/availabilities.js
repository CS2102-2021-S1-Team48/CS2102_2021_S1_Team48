const pool = require('../db');

// POST api at router
async function createAvailabilitiesTable(ctx) {
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
async function dropAvailabilitiesTable(ctx) {
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
// POST /availabilities?startdate=01072020&enddate=19032020&pettype=dog&price=100 , postAvailability
// same issue, need caretaker username
async function postAvailability(ctx) {
    const { startdate, enddate, pettype, price } = ctx.query;

    const username = ctx.query.username;
    try {
        const sqlQuery = `INSERT INTO availabilities VALUES ('${startdate}', '${enddate}', '${pettype}', ${price}, '${username}')`;
        await pool.query(sqlQuery);
        ctx.body = 'success';
    } catch (e) {
        console.log(e);
        ctx.body = 'error';
        ctx.status = 403;
    }
}

// GET api at router
// GET /availabilities , getAllAvailabilities
async function getAllAvailabilities(ctx) {
    try {
        const sqlQuery = 'SELECT * FROM availabilities';
        const resultObject = await pool.query(sqlQuery);
        ctx.body = 'success';
        
        // There is a bug where the PGadmin database show the correct date but when returned below,
        // the date is different. The error seems to be due to the different handling of time-zone
        // during parsing from string and converting the Date-object back to string. 
        // See: https://github.com/brianc/node-postgres/issues/818
        // This bug holds true for any query that returns a date string (i.e. it is in bids as well)
        // The documented fix is in the link above but I'm not sure if I understand fully how to do it as it requires some imports
        console.table(resultObject.rows);
    } catch (e) {
        console.log(e);
        ctx.body = 'error';
        ctx.status = 403;
    }
}

// GET api at router
// GET /availabilities/specific?usernamect=john&pettype=cat , getSpecificAvailabilities
async function getSpecificAvailabilities(ctx) {
    const { usernamect, pettype } = ctx.query;
    try {
        if (pettype === undefined) {
            const sqlQuery = `SELECT * FROM availabilities WHERE username_caretaker = '${usernamect}'`;
            const resultObject = await pool.query(sqlQuery);
            ctx.body = 'success';
            console.table(resultObject.rows);

        } else if (usernamect === undefined) {
            const sqlQuery = `SELECT * FROM availabilities WHERE pettype = '${pettype}'`;
            const resultObject = await pool.query(sqlQuery);
            ctx.body = 'success';
            console.table(resultObject.rows);

        } else {
            const sqlQuery = `SELECT * FROM availabilities WHERE username_caretaker = '${usernamect}' AND pettype = '${pettype}'`;
            const resultObject = await pool.query(sqlQuery);
            ctx.body = 'success';
            console.table(resultObject.rows);

        }
    } catch (e) {
        console.log(e);
        ctx.body = 'error';
        ctx.status = 403;
    }
}

// PATCH api at router
// PATCH /availabilities/:startdate/:enddate/:pettype?startdate=01072020&enddate=19032020&pettype=dog&price=100 , editAvailability
// Same issue need caretaker usernme, temp solution use query param
async function editAvailability(ctx) {
    const currStartDate = ctx.params.startdate;
    const currEndDate = ctx.params.enddate;
    const currPetType = ctx.params.pettype;
    const { startdate, enddate, pettype, price } = ctx.query;

    const username = ctx.query.username;
    try {
        if (startdate === undefined && enddate === undefined && pettype === undefined) {
            const sqlQuery = `UPDATE availabilities SET price = ${price} WHERE username_caretaker = '${username}' AND startdate = '${currStartDate}' AND enddate = '${currEndDate}' AND pettype = '${currPetType}'`;
            console.log(sqlQuery);
            await pool.query(sqlQuery);
            ctx.body = 'success';

        } else if (startdate === undefined && enddate === undefined && price === undefined) {
            const sqlQuery = `UPDATE availabilities SET pettype = '${pettype}' WHERE username_caretaker = '${username}' AND startdate = '${currStartDate}' AND enddate = '${currEndDate}' AND pettype = '${currPetType}'`;
            await pool.query(sqlQuery);
            ctx.body = 'success';

        } else if (startdate === undefined && enddate === undefined) {
            const sqlQuery = `UPDATE availabilities SET price = ${price}, pettype = '${pettype}' WHERE username_caretaker = '${username}' AND startdate = '${currStartDate}' AND enddate = '${currEndDate}' AND pettype = '${currPetType}'`;
            await pool.query(sqlQuery);
            ctx.body = 'success';

        } else if (startdate === undefined) {
            const sqlQuery = `UPDATE availabilities SET price = ${price}, pettype = '${pettype}', enddate = '${enddate}' WHERE username_caretaker = '${username}' AND startdate = '${currStartDate}' AND enddate = '${currEndDate}' AND pettype = '${currPetType}'`;
            await pool.query(sqlQuery);
            ctx.body = 'success';

        } else if (enddate === undefined) {
            const sqlQuery = `UPDATE availabilities SET startdate = '${startdate}', price = ${price}, pettype = '${pettype}' WHERE username_caretaker = '${username}' AND startdate = '${currStartDate}' AND enddate = '${currEndDate}' AND pettype = '${currPetType}'`;
            await pool.query(sqlQuery);
            ctx.body = 'success';

        } else {
            const sqlQuery = `UPDATE availabilities SET startdate = '${startdate}', enddate = '${enddate}', price = ${price}, pettype = '${pettype}' WHERE username_caretaker = '${username}' AND startdate = '${currStartDate}' AND enddate = '${currEndDate}' AND pettype = '${currPetType}'`;
            await pool.query(sqlQuery);
            ctx.body = 'success';
        }
    } catch (e) {
        console.log(e);
        ctx.body = 'error';
        ctx.status = 403;
    }
}

// DEL api at router
// DEL /availabilities/:startdate/:enddate/:pettype , deleteAvailability
// Same issue need caretaker usernme, temp solution use query param
async function deleteAvailability(ctx) {
    const { startdate, enddate, pettype } = ctx.params;

    const username = ctx.query.username;
    try {
        const sqlQuery = `DELETE FROM availabilities WHERE username_caretaker = '${username}' AND startdate = '${startdate}' AND enddate = '${enddate}' AND pettype = '${pettype}'`;
        await pool.query(sqlQuery);
        ctx.body = 'success';
    } catch (e) {
        console.log(e);
        ctx.body = 'error';
        ctx.status = 403;
    }
}

module.exports = {
    createAvailabilitiesTable,
    dropAvailabilitiesTable,
    postAvailability,
    getAllAvailabilities,
    getSpecificAvailabilities,
    editAvailability,
    deleteAvailability
};