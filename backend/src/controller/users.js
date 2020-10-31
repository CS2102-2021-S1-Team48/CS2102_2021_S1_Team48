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

        ctx.body = 'success';
    } catch (e) {
        console.log(e);
        ctx.body = 'error';
        ctx.status = 403;
    }
}

// PATCH api at router
// Same issue, need the current username to test, so I will use query param to simulate the current user
// I.e. changeusername/newusername?oldusername=123
async function changeUsername(ctx) {
    const newUsername = ctx.params.newusername;

    const oldUsername = ctx.query.oldusername;
    try {
        const sqlQuery = `UPDATE users SET username = '${newUsername}' WHERE username = '${oldUsername}'`;
        await pool.query(sqlQuery);
        ctx.body = 'success';
    } catch (e) {
        console.log(e);
        ctx.body = 'error';
        ctx.status = 403;
    }
}

// PATCH api at router
// Same issue, need the current username to test, so I will use query param to simulate the current user
// I.e. changepassword/newpassword?username=123
async function changePassword(ctx) {
    const newPassword = ctx.params.newpassword;

    const username = ctx.query.username;
    try {
        const sqlQuery = `UPDATE users SET pw = '${newPassword}' WHERE username = '${username}'`;
        await pool.query(sqlQuery);
        ctx.body = 'success';
    } catch (e) {
        console.log(e);
        ctx.body = 'error';
        ctx.status = 403;
    }
}

module.exports = {
    createUsersTable,
    dropUsersTable,
    createUser,
    changeUsername,
    changePassword
};
