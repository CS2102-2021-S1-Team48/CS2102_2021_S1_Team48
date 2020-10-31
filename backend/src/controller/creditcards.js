const pool = require('../db');

// On thinking further, what is this table used for?

// POST api at router
async function createCreditCardsTable(ctx) {
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
async function dropCreditCardsTable(ctx) {
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
// POST /creditcards?cardnum=123&expiry=21082020 , addCreditCard
// NOTE might have to add a trigger for cc table to automatically add into owns
async function addCreditCard(ctx) {
    const { cardnum, expiry } = ctx.query;
    try {
        const sqlQuery = `INSERT INTO creditcards VALUES ('${cardnum}', '${expiry}')`;
        await pool.query(sqlQuery);
        ctx.body = 'success';
    } catch (e) {
        console.log(e);
        ctx.body = 'error';
        ctx.status = 403;
    }
}

// GET api at router
async function getCreditCard(ctx) {
    try {
        const sqlQuery = 'SELECT * FROM creditcards';
        const resultObject = await pool.query(sqlQuery);
        ctx.body = 'success';
        console.table(resultObject.rows);
    } catch (e) {
        console.log(e);
        ctx.body = 'error';
        ctx.status = 403;
    }
}

// PATCH api at router
// PATCH /creditcards?cardnum=456expiry=21072021 , changeCreditCard
// Same issue, need the old credit card number to test. Will add a temprary query param ?currentcreditcardnum
async function changeCreditCard(ctx) {
    const { cardnum, expiry } = ctx.query;

    const currentCreditCardNum = ctx.query.currentcreditcardnum;

    // Assuming that at least 1 must be provided
    try {
        if (expiry === undefined) {
            const sqlQuery = `UPDATE creditcards SET cardnum = '${cardnum}' WHERE cardnum = '${currentCreditCardNum}'`;
            await pool.query(sqlQuery);
            ctx.body = 'success';
        } else if (cardnum === undefined) {
            const sqlQuery = `UPDATE creditcards SET expiry = '${expiry}' WHERE cardnum = '${currentCreditCardNum}'`;
            await pool.query(sqlQuery);
            ctx.body = 'success';
        } else {
            const sqlQuery = `UPDATE creditcards SET cardnum = '${cardnum}', expiry = '${expiry}' WHERE cardnum = '${currentCreditCardNum}'`;
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
// Same issue, need the old credit card number to test. Will add a temprary query param ?currentcreditcardnum
async function removeCreditCard(ctx) {
    const currentCreditCardNum = ctx.query.currentcreditcardnum;
    try {
        const sqlQuery = `DELETE FROM creditcards WHERE cardnum = '${currentCreditCardNum}'`;
        await pool.query(sqlQuery);
        ctx.body = 'success';
    } catch (e) {
        console.log(e);
        ctx.body = 'error';
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
