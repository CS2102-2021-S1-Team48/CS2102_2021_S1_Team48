const pool = require('../db');

// POST api at router
async function createBidsTable(ctx) {
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
async function dropBidsTable(ctx) {
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

// POST /bids?transfermethod=deliver&paymentmethod=123&petname=emma&username_caretake=Duc&startdate=27102020&enddate=28102020&pettype=dog
// POST api at router
// Same issue, need petowner username. Temp solution is to use query param for petowner username
async function addBid(ctx) {
    const { transfermethod, paymentmethod, petname, username_caretaker, startdate, enddate, pettype } = ctx.query;

    const username_petowner = ctx.query.username_petowner;
    try {
        const sqlQuery = `INSERT INTO bids VALUES ('${transfermethod}', '${paymentmethod}', '${petname}', '${username_petowner}', '${username_caretaker}', '${startdate}', '${enddate}', '${pettype}')`;
        await pool.query(sqlQuery);
        ctx.body = 'success';
    } catch (e) {
        console.log(e);
        ctx.body = 'error';
        ctx.status = 403;
    }
}

// GET api at router
async function getAcceptedBids(ctx) {
    try {
        const sqlQuery = 'SELECT * FROM bids WHERE accepted = True';
        const resultobject = await pool.query(sqlQuery);
        console.table(resultobject.rows);
        ctx.body = 'success';
    } catch (e) {
        console.log(e);
        ctx.body = 'error';
        ctx.status = 403;
    }
}

// GET api at router
async function getUnacceptedBids(ctx) {
    try {
        const sqlQuery = 'SELECT * FROM bids WHERE accepted = False';
        const resultobeject = await pool.query(sqlQuery);
        console.table(resultobeject.rows);
        ctx.body = 'success';
    } catch (e) {
        console.log(e);
        ctx.body = 'error';
        ctx.status = 403;
    }
}

// GET /bids?petname=eva&usernamect=john&usernamepo=lim , getBids
// GET api at router
async function getBids(ctx) {
    const { petname, usernamect, usernamepo } = ctx.query;
    try {
        const sqlQuery = `SELECT * FROM bids WHERE petname = '${petname}' AND username_caretaker = '${usernamect}' AND username_petowner = '${usernamepo}'`;
        const resultobject = await pool.query(sqlQuery);
        console.table(resultobject.rows);
        ctx.body = 'success';
    } catch (e) {
        console.log(e);
        ctx.body = 'error';
        ctx.status = 403;
    }
}

// GET api at router
// GET /bids/review/:usernamect , getReviewsOfCaretaker
async function getReviewsOfCaretaker(ctx) {
    const usernamect = ctx.params.usernamect;
    try {
        const sqlQuery = `SELECT * FROM bids WHERE username_caretaker = '${usernamect}'`;
        const resultobject = await pool.query(sqlQuery);
        console.table(resultobject.rows);
        ctx.body = 'success';
    } catch (e) {
        console.log(e);
        ctx.body = 'error';
        ctx.status = 403;
    }
}

// PATCH api at router
// PATCH /bids/accept/:petname/:usernamepo/:usernamect/:startdate/:enddate , acceptBid
async function acceptBid(ctx) {
    const { petname, usernamepo, usernamect, startdate, enddate } = ctx.params;
    try {
        const sqlQuery = `UPDATE bids SET accepted = True WHERE petname = '${petname}' AND username_petowner = '${usernamepo}' AND username_caretaker = '${usernamect}' AND startdate = '${startdate}' AND enddate = '${enddate}'`;
        await pool.query(sqlQuery);
        ctx.body = 'success';
    } catch (e) {
        console.log(e);
        ctx.body = 'error';
        ctx.status = 403;
    }
}

// PATCH api at router
// PATCH /bids/undoaccept/:petname/:usernamepo/:usernamect/:startdate/:enddate , undoAcceptBid
async function undoAcceptBid(ctx) {
    const { petname, usernamepo, usernamect, startdate, enddate } = ctx.params;
    try {
        const sqlQuery = `UPDATE bids SET accepted = False WHERE petname = '${petname}' AND username_petowner = '${usernamepo}' AND username_caretaker = '${usernamect}' AND startdate = '${startdate}' AND enddate = '${enddate}'`;
        await pool.query(sqlQuery);
        ctx.body = 'success';
    } catch (e) {
        console.log(e);
        ctx.body = 'error';
        ctx.status = 403;
    }
}

// This is not in the api documentation but I added in recently
// PATCH api at router
// PATCH /bids/submitreviewandrating/:petname/:usernamepo/:usernamect/:startdate/:enddate?rating=4&review=good , submitReviewAndRating
async function submitReviewAndRating(ctx) {
    const { petname, usernamepo, usernamect, startdate, enddate } = ctx.params;
    const { rating, review } = ctx.query;
    try {
        const sqlQuery = `UPDATE bids SET rating = ${rating}, review = '${review}' WHERE petname = '${petname}' AND username_petowner = '${usernamepo}' AND username_caretaker = '${usernamect}' AND startdate = '${startdate}' AND enddate = '${enddate}'`;
        await pool.query(sqlQuery);
        ctx.body = 'success';
    } catch (e) {
        console.log(e);
        ctx.body = 'error';
        ctx.status = 403;
    }
}

// DEL api at router
// DEL /bids/:petname/:usernamepo/:usernamect/:startdate/:enddate , deleteBid
async function deleteBid(ctx) {
    const { petname, usernamepo, usernamect, startdate, enddate } = ctx.params;
    try {
        const sqlQuery = `DELETE FROM bids WHERE petname = '${petname}' AND username_petowner = '${usernamepo}' AND username_caretaker = '${usernamect}' AND startdate = '${startdate}' AND enddate = '${enddate}'`;
        await pool.query(sqlQuery);
        ctx.body = 'success';
    } catch (e) {
        console.log(e);
        ctx.body = 'error';
        ctx.status = 403;
    }
}

module.exports = {
    createBidsTable,
    dropBidsTable,
    addBid,
    getAcceptedBids,
    getUnacceptedBids,
    getBids,
    getReviewsOfCaretaker,
    acceptBid,
    undoAcceptBid,
    submitReviewAndRating,
    deleteBid
};