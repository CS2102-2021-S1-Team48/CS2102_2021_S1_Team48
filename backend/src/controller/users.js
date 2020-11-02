const pool = require('../db');

// POST api at router
async function createUsersTable(ctx) {
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
async function dropUsersTable(ctx) {
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
        ctx.body = 'error';
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

module.exports = {
    createUsersTable,
    dropUsersTable,
    createUser,
    changeUsername,
    changePassword,
    login,
};
