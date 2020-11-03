const pool = require('../db');

// POST /users?username=johndoe99&password=password1
// POST api at router
async function createUser(ctx) {
    const { username, password } = ctx.query;
    try {
        const sqlQuery = `INSERT INTO users VALUES ('${username}', '${password}')`;
        await pool.query(sqlQuery);

        const insertIntoPetowners = `INSERT INTO petowners VALUES ('${username}')`;
        await pool.query(insertIntoPetowners);

        const insertIntoCaretakers = `INSERT INTO caretakers VALUES ('${username}')`;
        await pool.query(insertIntoCaretakers);

        const insertIntoCaretakersPt = `INSERT INTO caretakers_pt VALUES ('${username}')`;
        await pool.query(insertIntoCaretakersPt);

        ctx.body = {
            'success': 'true!'
        };
    } catch (e) {
        console.log(e);
        ctx.status = 403;
    }
}

// PATCH api at router
async function changeUsername(ctx) {
    const { username, newusername } = ctx.params;

    try {
        const sqlQuery = `UPDATE users SET username = '${newusername}' WHERE username = '${username}'`;
        await pool.query(sqlQuery);
        ctx.body = {
            'newusername': newusername
        };
    } catch (e) {
        console.log(e);
        ctx.status = 403;
    }
}

// PATCH api at router
// TODO: Set trigger such that if WHERE clause password supplied is not the same as the old password, then fail
async function changePassword(ctx) {
    const { username, password, newpassword } = ctx.params;

    try {
        const sqlQuery = `UPDATE users SET pw = '${newpassword}' WHERE username = '${username}' AND pw = '${password}'`;
        await pool.query(sqlQuery);
        ctx.body = {
            'newpassword': newpassword
        };
    } catch (e) {
        console.log(e);
        ctx.status = 403;
    }
}

// POST api at router
async function login(ctx) {
    const { username, password } = ctx.params;

    try {
        const sqlQuery = `SELECT COUNT(username) FROM users WHERE username = '${username}' AND pw = '${password}'`;
        const resultObject = await pool.query(sqlQuery);
        const rows = resultObject.rows;
        const onlyRow = rows[0];

        const count = onlyRow.count;

        if (count == 1) {
            ctx.body = {
                'username': username
            };
        } else {
            ctx.status = 403;
        }

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
    createUsersTable,
    dropUsersTable,
    createUser,
    changeUsername,
    changePassword,
    login,
    addCreditCard,
    getCreditCard,
    changeCreditCard,
    removeCreditCard
};
