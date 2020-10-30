const pool = require('../db');

// POST api at router
async function createAdminsTable(ctx) {
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
async function dropAdminsTable(ctx) {
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
// POST /admins?username=johndoe99&password=password1 , createAdmin
async function createAdmin(ctx) {
    const { username, password } = ctx.query;
    try {
        const sqlQuery = `INSERT INTO admins VALUES ('${username}', '${password}');`;
        await pool.query(sqlQuery);
        ctx.body = 'success';
    } catch (e) {
        console.log(e);
        ctx.body = 'error';
        ctx.status = 403;
    }
}

// PATCH api at router
// PATCH /admins/changeusername/:newusername , changeAdminUsername
// NOTE: to test have to oldusername. I added a query parameter for old username i.e. :newusername?oldusername=1234. Remove when using cookies
async function changeAdminUsername(ctx) {
    const newUsername = ctx.params.newusername;
    const oldUsername = ctx.query.oldusername;
    try {
        const sqlQuery = `UPDATE admins SET username = '${newUsername}' WHERE username = '${oldUsername}'`;
        await pool.query(sqlQuery);
        ctx.body = 'success';
    } catch (e) {
        console.log(e);
        ctx.body = 'error';
        ctx.status = 403;
    }
}

// PATCH api at router
// PATCH /admins/changepassword/:newpassword , changeAdminPassword
// Same issue with username, see comment above
async function changeAdminPassword(ctx) {
    const newPassword = ctx.params.newpassword;
    const username = ctx.query.username;
    try {
        const sqlQuery = `UPDATE admins SET pw = '${newPassword}' WHERE username = '${username}'`;
        await pool.query(sqlQuery);
        ctx.body = 'success';
    } catch (e) {
        console.log(e);
        ctx.body = 'error';
        ctx.status = 403;
    }
}

module.exports = {
    createAdminsTable,
    dropAdminsTable,
    createAdmin,
    changeAdminUsername,
    changeAdminPassword
};
