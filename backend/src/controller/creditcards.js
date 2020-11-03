const pool = require('../db');

// On thinking further, what is this table used for?

// POST api at router
async function createCreditCardsTable(ctx) {
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
async function dropCreditCardsTable(ctx) {
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

// PATCH api at router
// PATCH /users/addcreditcard/:username?cardnum=123 , addCreditCard
async function addCreditCard(ctx) {
    const cardnum = ctx.query.cardnum;
    const username = ctx.params.username;

    try {
        const sqlQuery = `UPDATE users SET cardnum = '${cardnum}' WHERE username = '${username}'`;
        await pool.query(sqlQuery);
        ctx.body = {
            'success': 'true!'
        };
    } catch (e) {
        console.log(e);
        ctx.status = 403;
    }
}

// GET api at router
// GET /users/getcreditcard/:username
async function getCreditCard(ctx) {
    const username = ctx.params.username;
    try {
        const sqlQuery = `SELECT * FROM users WHERE username = '${username}'`;
        const resultObject = await pool.query(sqlQuery);
        const rows = resultObject.rows;
        ctx.body = {
            'creditcards': rows
        };
        console.table(resultObject.rows);
    } catch (e) {
        console.log(e);
        ctx.status = 403;
    }
}

// PATCH api at router
// PATCH /users/changecreditcard/:username?cardnum=456 , changeCreditCard
async function changeCreditCard(ctx) {
    const { cardnum } = ctx.query;

    const username = ctx.params.username;

    // Assuming that at least 1 must be provided
    try {
        const sqlQuery = `UPDATE users SET cardnum = '${cardnum}' WHERE username = '${username}'`;
        await pool.query(sqlQuery);
        ctx.body = {
            'success': 'true!'
        };

    } catch (e) {
        console.log(e);
        ctx.status = 403;
    }
}

// DEL api at router
// DEL /users/removecreditcard/:username , changeCreditCard
async function removeCreditCard(ctx) {
    const username = ctx.params.username;
    try {
        const sqlQuery = `UPDATE users SET cardnum = NULL WHERE username = '${username}'`;
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
    createCreditCardsTable,
    dropCreditCardsTable,
    addCreditCard,
    getCreditCard,
    changeCreditCard,
    removeCreditCard
};
