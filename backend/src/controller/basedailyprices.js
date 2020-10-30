const pool = require('../db');

// POST api at router
async function createBaseDailyPricesTable(ctx) {
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
async function dropBaseDailyPricesTable(ctx) {
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

// POST /basedailyprices?amount=123&pettype=dog&minrating=3
// POST api at router
// NOTE: to test need to have adminusername. I added a query parameter for it i.e. ?adminusername=123. Remove when using cookies
async function addBaseDailyPrice(ctx) {
    const { amount, pettype, minrating } = ctx.query;

    const adminUsername = ctx.query.adminusername;
    try {
        const sqlQuery = `INSERT INTO basedailyprices VALUES (${amount}, '${pettype}', ${minrating}, '${adminUsername}')`;
        await pool.query(sqlQuery);
        ctx.body = 'success';
    } catch (e) {
        console.log(e);
        ctx.body = 'error';
        ctx.status = 403;
    }
}

// If there is nothing after the ? then it should get all base daily prices.
// GET /basedailyprices?pettype=cat&minrating=5 
// GET api at router
async function getBaseDailyPrices(ctx) {
    const { pettype, minrating } = ctx.query;
    if (pettype === undefined && minrating === undefined) {
        try {
            const sqlQuery = 'SELECT * FROM basedailyprices';
            const resultObject = await pool.query(sqlQuery);
            ctx.body = 'success';
            console.table(resultObject.rows);
        } catch (e) {
            console.log(e);
            ctx.body = 'error';
            ctx.status = 403;
        }
    } else if (pettype === undefined) {
        try {
            const sqlQuery = `SELECT * FROM basedailyprices WHERE minrating = '${minrating}'`;
            const resultObject = await pool.query(sqlQuery);
            ctx.body = 'success';
            console.table(resultObject.rows);
        } catch (e) {
            console.log(e);
            ctx.body = 'error';
            ctx.status = 403;
        }
    } else if (minrating === undefined) {
        try {
            const sqlQuery = `SELECT * FROM basedailyprices WHERE pettype = '${pettype}'`;
            const resultObject = await pool.query(sqlQuery);
            ctx.body = 'success';
            console.table(resultObject.rows);
        } catch (e) {
            console.log(e);
            ctx.body = 'error';
            ctx.status = 403;
        }
    } else {
        try {
            const sqlQuery = `SELECT * FROM basedailyprices WHERE pettype = '${pettype}' AND minrating = '${minrating}'`;
            const resultObject = await pool.query(sqlQuery);
            ctx.body = 'success';
            console.table(resultObject.rows);
        } catch (e) {
            console.log(e);
            ctx.body = 'error';
            ctx.status = 403;
        }
    }
}

// PATCH /basedailyprices/:pettype/:minrating?amount=3
// PATCH api at router
// See note at function addBaseDailyPrice
async function editBaseDailyPrice(ctx) {
    const { pettype, minrating } = ctx.params;
    const amount = ctx.query.amount;
    
    const adminUsername = ctx.query.adminusername;
    try {
        const sqlQuery = `UPDATE basedailyprices SET amount = ${amount}, username_admin = '${adminUsername}' WHERE pettype = '${pettype}' AND minrating = ${minrating}`;
        await pool.query(sqlQuery);
        ctx.body = 'success';
    } catch (e) {
        console.log(e);
        ctx.body = 'error';
        ctx.status = 403;
    }
}

// DEL /basedailyprices/:pettype/:minrating , deleteBaseDailyPrice
// DEL api at router
async function deleteBaseDailyPrice(ctx) {
    const { pettype, minrating } = ctx.params;
    try {
        const sqlQuery = `DELETE FROM basedailyprices WHERE pettype = '${pettype}' AND minrating = ${minrating}`;
        await pool.query(sqlQuery);
        ctx.body = 'success';
    } catch (e) {
        console.log(e);
        ctx.body = 'error';
        ctx.status = 403;
    }
}


module.exports = {
    createBaseDailyPricesTable,
    dropBaseDailyPricesTable,
    addBaseDailyPrice,
    getBaseDailyPrices,
    editBaseDailyPrice,
    deleteBaseDailyPrice
};
