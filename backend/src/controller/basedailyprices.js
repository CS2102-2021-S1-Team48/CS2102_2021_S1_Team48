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
async function addBaseDailyPrice(ctx) {
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

// If there is nothing after the ? then it should get all base daily prices.
// GET /basedailyprices?pettype=cat&minrating=5 
// GET api at router
async function getBaseDailyPrices(ctx) {
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

// PATCH /basedailyprices/:pettype/:minrating?amount=3
// PATCH api at router
async function editBaseDailyPrice(ctx) {
    
    // traditional way
    const pettype = ctx.params.pettype;
    const minrating = ctx.params.minrating;
    const amount = ctx.query.amount;

    // js way. destructuring an object
    const { pettype, minrating } = ctx.params;
    const { amount } = ctx.query;

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
async function deleteBaseDailyPrice(ctx) {
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


module.exports = {
    createBaseDailyPricesTable,
    dropBaseDailyPricesTable,
    addBaseDailyPrice,
    getBaseDailyPrices,
    editBaseDailyPrice,
    deleteBaseDailyPrice
};
