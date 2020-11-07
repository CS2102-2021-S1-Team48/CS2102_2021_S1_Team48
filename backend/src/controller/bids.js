const pool = require('../db');
const moment = require('moment');

// POST api at router
// POST /bids/test?transfermethod=deliver&paymentmethod=cash&petname=eva&usernamepo=clara&usernamect=trump&startdate=20201123&enddate=20201125&pettype=dog&price=123
async function testAddBid(ctx) {
    const { transfermethod, paymentmethod, petname, usernamepo, usernamect, startdate, enddate, pettype, price } = ctx.query;

    try {
        const petLimitQuery = `SELECT petlimit from caretakers WHERE username = '${usernamect}'`;
        const petLimitResult = await pool.query(petLimitQuery);
        const petLimitResultRows = petLimitResult.rows;
        const petlimit = petLimitResultRows[0].petlimit;

        let canInsert = true;

        const sd = moment(startdate);
        const ed = moment(enddate);
        const edPlusOne = ed.add(1, 'days');

        for (let m = moment(sd); m.isBefore(edPlusOne); m.add(1,'days')) {
            const d = m.format('YYYY-MM-DD');
            const countQuery = `SELECT count(*) FROM bids WHERE '${d}' BETWEEN startdate AND enddate AND accepted = 'true' AND username_caretaker = '${usernamect}'`;
            const countResult = await pool.query(countQuery);
            const countResultRows = countResult.rows;
            const countStr = countResultRows[0].count;
            const count = parseInt(countStr);

            if (count + 1 > petlimit) {
                canInsert = false;
                break;
            }
        }

        if (canInsert) {
            const valuesClause = `VALUES ('${transfermethod}', '${paymentmethod}', '${petname}', '${usernamepo}', '${usernamect}', '${startdate}', '${enddate}', '${pettype}', ${price})`;
            const sqlQuery = 'INSERT INTO bids (transfermethod, paymentmethod, petname, username_petowner, username_caretaker, startdate, enddate, pettype, price) ' + valuesClause;
            await pool.query(sqlQuery);
            ctx.body = {
                'response': 'Bid has been sent!'
            };
        } else {
            ctx.body = {
                'response': 'caretaker already hit his/her petlimit!'
            };
            ctx.status = 403;
        }

    } catch (e) {
        console.log(e);
        ctx.status = 403;
    }
}

// POST /bids?transfermethod=deliver&paymentmethod=123&petname=emma&username_caretake=Duc&startdate=27102020&enddate=28102020&pettype=dog
// POST api at router
async function addBid(ctx) {
    const { transfermethod, paymentmethod, petname, usernamepo, usernamect, startdate, enddate, pettype } = ctx.query;

    try {
        const valuesClause = `VALUES ('${transfermethod}', '${paymentmethod}', '${petname}', '${usernamepo}', '${usernamect}', '${startdate}', '${enddate}', '${pettype}')`;
        const sqlQuery = 'INSERT INTO bids (transfermethod, paymentmethod, petname, username_petowner, username_caretaker, startdate, enddate, pettype) ' + valuesClause;
        await pool.query(sqlQuery);
        ctx.body = {
            'usernamepo': usernamepo,
            'transfermethod': transfermethod,
            'paymentmethod': paymentmethod,
            'petname': petname,
            'username_caretaker': usernamect,
            'startdate': startdate,
            'enddate': enddate,
            'pettype': pettype
        };
    } catch (e) {
        console.log(e);
        ctx.status = 403;
    }
}

// GET api at router
async function getAcceptedBids(ctx) {
    const usernamepo = ctx.params.usernamepo;

    try {
        const sqlQuery = `SELECT * FROM bids b INNER JOIN pets p ON b.petname = p.petname AND b.username_petowner = p.username_petowner WHERE b.accepted = True AND b.username_petowner = '${usernamepo}'`;
        const resultobject = await pool.query(sqlQuery);
        const rows = resultobject.rows;
        console.table(rows);
        ctx.body = {
            'acceptedbids': rows
        };
    } catch (e) {
        console.log(e);
        ctx.status = 403;
    }
}


// GET api at router
async function getAcceptedBidsForDateRange(ctx) {
    const { usernamect, startdate, enddate } = ctx.params;

    try {
        const sqlQuery = `SELECT * FROM bids b INNER JOIN pets p ON b.petname = p.petname AND b.username_petowner = p.username_petowner WHERE b.accepted = True AND b.username_caretaker = '${usernamect}' AND b.startdate >= '${startdate}' AND b.startdate <= '${enddate}'`;
        const resultobject = await pool.query(sqlQuery);
        const rows = resultobject.rows;
        console.table(rows);
        ctx.body = {
            'acceptedbids': rows
        };
    } catch (e) {
        console.log(e);
        ctx.status = 403;
    }
}

// GET api at router
async function getUnacceptedBids(ctx) {
    const usernamect = ctx.params.usernamect;

    try {
        const sqlQuery = `SELECT * FROM bids b INNER JOIN pets p ON b.petname = p.petname AND b.username_petowner = p.username_petowner WHERE b.accepted = False AND b.username_caretaker = '${usernamect}'`;
        const resultobject = await pool.query(sqlQuery);
        const rows = resultobject.rows;
        console.table(rows);
        ctx.body = {
            'unacceptedbids': rows
        };
    } catch (e) {
        console.log(e);
        ctx.status = 403;
    }
}

// GET api at router
async function getUnacceptedBidsForDateRange(ctx) {
    const { usernamect, startdate, enddate } = ctx.params;

    try {
        const sqlQuery = `SELECT * FROM bids b INNER JOIN pets p ON b.petname = p.petname AND b.username_petowner = p.username_petowner WHERE b.accepted = False AND b.username_caretaker = '${usernamect}' AND b.startdate >= '${startdate}' AND b.enddate <= '${enddate}'`;
        const resultobject = await pool.query(sqlQuery);
        const rows = resultobject.rows;
        console.table(rows);
        ctx.body = {
            'unacceptedbids': rows
        };
    } catch (e) {
        console.log(e);
        ctx.status = 403;
    }
}

// GET api at router
// GET /bids?petname=eva&usernamect=john&usernamepo=lim , getBids
async function getBids(ctx) {
    const { petname, usernamect, usernamepo } = ctx.query;

    try {
        const sqlQuery = `SELECT * FROM bids b INNER JOIN pets p ON b.petname = p.petname AND b.username_petowner = p.username_petowner WHERE b.petname = '${petname}' AND b.username_caretaker = '${usernamect}' AND b.username_petowner = '${usernamepo}'`;
        const resultobject = await pool.query(sqlQuery);
        const rows = resultobject.rows;
        console.table(rows);
        ctx.body = {
            'bids': rows
        };
    } catch (e) {
        console.log(e);
        ctx.status = 403;
    }
}

// GET api at router
async function getReviewsOfCaretaker(ctx) {
    const { usernamect } = ctx.params;

    try {
        const sqlQuery = `SELECT * FROM bids WHERE username_caretaker = '${usernamect}' AND review IS NOT NULL `;
        const resultobject = await pool.query(sqlQuery);
        const rows = resultobject.rows;
        console.table(rows);
        ctx.body = {
            'reviews': rows
        };
    } catch (e) {
        console.log(e);
        ctx.status = 403;
    }
}

// GET api at router
// GET bids/getpetdays/:usernamect?startdate=20200101&enddate=20200201
async function getPetDaysForThePeriod(ctx) {
    const { usernamect } = ctx.params;
    const { startdate, enddate } = ctx.query;

    try {
        if (startdate === undefined && enddate === undefined) {
            const sqlQuery = `SELECT sum(enddate-startdate + 1) FROM bids WHERE username_caretaker = '${usernamect}' AND accepted = 'True' GROUP BY username_caretaker`;
            const resultObject = await pool.query(sqlQuery);
            const rows = resultObject.rows;
            ctx.body = {
                'caretakers': rows
            };

        } else {
            const sqlQuery = `SELECT sum(enddate-startdate + 1) FROM bids WHERE username_caretaker = '${usernamect}' AND accepted = 'True' AND startdate >= '${startdate}' AND enddate <= '${enddate}' GROUP BY username_caretaker`;
            const resultObject = await pool.query(sqlQuery);
            const rows = resultObject.rows;
            ctx.body = {
                'caretakers': rows
            };
        }
    } catch (e) {
        console.log(e);
        ctx.status = 403;
    }
}

// GET api at router
async function getAmountOwedToCaretaker(ctx) {
    const { usernamepo, usernamect, pettype, startdate, enddate } = ctx.params;

    try {
        const sqlQuery = `SELECT sum((b.enddate - b.startdate + 1) * price) FROM bids b WHERE b.username_caretaker = '${usernamect}' AND b.startdate >= '${startdate}' AND b.enddate <= '${enddate}' AND b.pettype = '${pettype}' AND accepted = 'True' AND b.username_petowner = '${usernamepo}'`;
        const resultobject = await pool.query(sqlQuery);
        const rows = resultobject.rows;
        console.table(rows);
        ctx.body = {
            'totalowned': rows
        };
    } catch (e) {
        console.log(e);
        ctx.status = 403;
    }
}

// GET api at router
async function getTotalOwedToCaretaker(ctx) {
    const { usernamect, pettype, startdate, enddate } = ctx.params;

    try {
        const sqlQuery = `SELECT sum((b.enddate - b.startdate + 1) * price) FROM bids b WHERE b.username_caretaker = '${usernamect}' AND b.startdate >= '${startdate}' AND b.enddate <= '${enddate}' AND b.pettype = '${pettype}' AND accepted = 'True'`;
        const resultobject = await pool.query(sqlQuery);
        const rows = resultobject.rows;
        console.table(rows);
        ctx.body = {
            'totalowned': rows
        };
    } catch (e) {
        console.log(e);
        ctx.status = 403;
    }
}

// PATCH api at router
async function acceptBid(ctx) {
    const { petname, usernamepo, usernamect, startdate, enddate } = ctx.params;

    try {
        const sqlQuery = `UPDATE bids SET accepted = true WHERE petname = '${petname}' AND username_petowner = '${usernamepo}' AND username_caretaker = '${usernamect}' AND startdate = '${startdate}' AND enddate = '${enddate}'`;
        await pool.query(sqlQuery);
        ctx.body = {
            'success': 'true!'
        };
    } catch (e) {
        console.log(e);
        ctx.status = 403;
    }
}

// PATCH api at router
async function undoAcceptBid(ctx) {
    const { petname, usernamepo, usernamect, startdate, enddate } = ctx.params;

    try {
        const sqlQuery = `UPDATE bids SET accepted = false WHERE petname = '${petname}' AND username_petowner = '${usernamepo}' AND username_caretaker = '${usernamect}' AND startdate = '${startdate}' AND enddate = '${enddate}'`;
        await pool.query(sqlQuery);
        ctx.body = {
            'success': 'true!'
        };
    } catch (e) {
        console.log(e);
        ctx.status = 403;
    }
}

// PATCH api at router
// PATCH /bids/submitreviewandrating/:petname/:usernamepo/:usernamect/:startdate/:enddate?rating=4&review=good , submitReviewAndRating
async function submitReviewAndRating(ctx) {
    const { petname, usernamepo, usernamect, startdate, enddate } = ctx.params;
    const { rating, review } = ctx.query;

    try {
        const sqlQuery = `UPDATE bids SET rating = ${rating}, review = '${review}' WHERE petname = '${petname}' AND username_petowner = '${usernamepo}' AND username_caretaker = '${usernamect}' AND startdate = '${startdate}' AND enddate = '${enddate}'`;
        await pool.query(sqlQuery);
        ctx.body = {
            'rating': rating,
            'review': review
        };
    } catch (e) {
        console.log(e);
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
        ctx.body = {
            'success': 'true!'
        };
    } catch (e) {
        console.log(e);
        ctx.status = 403;
    }
}

// GET api at router
async function getRatingByUsernameCT(ctx) {
    const { usernamect } = ctx.params;

    try {
        const sqlQuery = `SELECT AVG(rating) FROM bids WHERE username_caretaker = '${usernamect}'`;
        const resultObject = await pool.query(sqlQuery);
        const rows = resultObject.rows;
        const rating = rows[0];
        ctx.body = {
            'rating': rating
        };
    } catch (e) {
        console.log(e);
        ctx.status = 403;
    }
}

// GET api at router
async function getBidsByUsernamePO(ctx) {
    const { usernamepo } = ctx.params;

    try {
        const sqlQuery = `SELECT * FROM bids WHERE username_petowner = '${usernamepo}'`;
        const resultObject = await pool.query(sqlQuery);
        const bids = resultObject.rows;
        ctx.body = {
            'bids': bids
        };
    } catch (e) {
        console.log(e);
        ctx.status = 403;
    }
}

module.exports = {
    addBid,
    getAcceptedBids,
    getAcceptedBidsForDateRange,
    getUnacceptedBids,
    getUnacceptedBidsForDateRange,
    getBids,
    getReviewsOfCaretaker,
    getPetDaysForThePeriod,
    getAmountOwedToCaretaker,
    getTotalOwedToCaretaker,
    acceptBid,
    undoAcceptBid,
    submitReviewAndRating,
    deleteBid,
    getRatingByUsernameCT,
    getBidsByUsernamePO,
    testAddBid
};
