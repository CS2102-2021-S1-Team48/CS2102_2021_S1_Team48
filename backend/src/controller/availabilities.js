const pool = require('../db');

// POST api at router
async function createAvailabilitiesTable(ctx) {
    try {
        const sqlQuery = '';
        await pool.query(sqlQuery);
        ctx.body = {
            'success': 'True!'
        };
    } catch (e) {
        console.log(e);
        ctx.status = 403;
    }
}

// DEL api at router
async function dropAvailabilitiesTable(ctx) {
    try {
        const sqlQuery = '';
        await pool.query(sqlQuery);
        ctx.body = {
            'success': 'True!'
        };
    } catch (e) {
        console.log(e);
        ctx.status = 403;
    }
}

// POST api at router
// POST /availabilities/:usernamect?startdate=01072020&enddate=19032020&pettype=dog&price=100 , postAvailability
async function postAvailability(ctx) {
    const { startdate, enddate, pettype, price } = ctx.query;

    const usernamect = ctx.params.usernamect;
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
// GET /availabilities , getAllAvailabilities
async function getAllAvailabilities(ctx) {
    try {
        const sqlQuery = 'SELECT * FROM availabilities';
        const resultObject = await pool.query(sqlQuery);
        const rows = resultObject.rows;
        console.table(rows);
        console.log(rows);
        ctx.body = {
            'availabilities': rows
        };
    } catch (e) {
        console.log(e);
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
            const rows = resultObject.rows;
            console.table(rows);
            console.log(rows);
            ctx.body = {
                'availabilities': rows
            };

        } else if (usernamect === undefined) {
            const sqlQuery = `SELECT * FROM availabilities WHERE pettype = '${pettype}'`;
            const resultObject = await pool.query(sqlQuery);
            const rows = resultObject.rows;
            console.table(rows);
            console.log(rows);
            ctx.body = {
                'availabilities': rows
            };

        } else {
            const sqlQuery = `SELECT * FROM availabilities WHERE username_caretaker = '${usernamect}' AND pettype = '${pettype}'`;
            const resultObject = await pool.query(sqlQuery);
            const rows = resultObject.rows;
            console.table(rows);
            console.log(rows);
            ctx.body = {
                'availabilities': rows
            };

        }
    } catch (e) {
        console.log(e);
        ctx.status = 403;
    }
}

// PATCH api at router
// PATCH /availabilities/:startdate/:enddate/:pettype/:usernamect?startdate=01072020&enddate=19032020&pettype=dog&price=100 , editAvailability
// TODO expand the if statements
async function editAvailability(ctx) {
    const currStartDate = ctx.params.startdate;
    const currEndDate = ctx.params.enddate;
    const currPetType = ctx.params.pettype;
    const usernamect = ctx.params.usernamect;

    const { startdate, enddate, pettype, price } = ctx.query;
    try {
        if (startdate === undefined && enddate === undefined && pettype === undefined) {
            const sqlQuery = `UPDATE availabilities SET price = ${price} WHERE username_caretaker = '${usernamect}' AND startdate = '${currStartDate}' AND enddate = '${currEndDate}' AND pettype = '${currPetType}'`;
            console.log(sqlQuery);
            await pool.query(sqlQuery);
            ctx.body = {
                'price': price
            };

        } else if (startdate === undefined && enddate === undefined && price === undefined) {
            const sqlQuery = `UPDATE availabilities SET pettype = '${pettype}' WHERE username_caretaker = '${usernamect}' AND startdate = '${currStartDate}' AND enddate = '${currEndDate}' AND pettype = '${currPetType}'`;
            await pool.query(sqlQuery);
            ctx.body = {
                'pettype': pettype
            };

        } else if (startdate === undefined && enddate === undefined) {
            const sqlQuery = `UPDATE availabilities SET price = ${price}, pettype = '${pettype}' WHERE username_caretaker = '${usernamect}' AND startdate = '${currStartDate}' AND enddate = '${currEndDate}' AND pettype = '${currPetType}'`;
            await pool.query(sqlQuery);
            ctx.body = {
                'price': price,
                'pettype': pettype

            };

        } else if (startdate === undefined) {
            const sqlQuery = `UPDATE availabilities SET price = ${price}, pettype = '${pettype}', enddate = '${enddate}' WHERE username_caretaker = '${usernamect}' AND startdate = '${currStartDate}' AND enddate = '${currEndDate}' AND pettype = '${currPetType}'`;
            await pool.query(sqlQuery);
            ctx.body = {
                'price': price,
                'pettype': pettype,
                'enddate': enddate
            };

        } else if (enddate === undefined) {
            const sqlQuery = `UPDATE availabilities SET startdate = '${startdate}', price = ${price}, pettype = '${pettype}' WHERE username_caretaker = '${usernamect}' AND startdate = '${currStartDate}' AND enddate = '${currEndDate}' AND pettype = '${currPetType}'`;
            await pool.query(sqlQuery);
            ctx.body = {
                'price': price,
                'pettype': pettype,
                'startdate': startdate
            };

        } else {
            const sqlQuery = `UPDATE availabilities SET startdate = '${startdate}', enddate = '${enddate}', price = ${price}, pettype = '${pettype}' WHERE username_caretaker = '${usernamect}' AND startdate = '${currStartDate}' AND enddate = '${currEndDate}' AND pettype = '${currPetType}'`;
            await pool.query(sqlQuery);
            ctx.body = {
                'price': price,
                'pettype': pettype,
                'startdate': startdate,
                'enddate': enddate
            };
        }
    } catch (e) {
        console.log(e);
        ctx.status = 403;
    }
}

// DEL api at router
// DEL /availabilities/:startdate/:enddate/:pettype/:usernamect , deleteAvailability
// Same issue need caretaker usernme, temp solution use query param
async function deleteAvailability(ctx) {
    const { startdate, enddate, pettype, usernamect } = ctx.params;

    try {
        const sqlQuery = `DELETE FROM availabilities WHERE username_caretaker = '${usernamect}' AND startdate = '${startdate}' AND enddate = '${enddate}' AND pettype = '${pettype}'`;
        await pool.query(sqlQuery);
        ctx.body = {
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
    createAvailabilitiesTable,
    dropAvailabilitiesTable,
    postAvailability,
    getAllAvailabilities,
    getSpecificAvailabilities,
    editAvailability,
    deleteAvailability
};