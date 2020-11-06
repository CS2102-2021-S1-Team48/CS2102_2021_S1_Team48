const pool = require('../db');

// POST api at router
async function createUser(ctx) {
    const { username, password } = ctx.params;

    try {
        const insertIntoAccounts = `INSERT INTO accounts (username, pw) VALUES ('${username}', '${password}')`;
        await pool.query(insertIntoAccounts);

        const insertIntoUsers = `INSERT INTO users (username) VALUES ('${username}')`;
        await pool.query(insertIntoUsers);

        const insertIntoPetowners = `INSERT INTO petowners (username) VALUES ('${username}')`;
        await pool.query(insertIntoPetowners);

        const insertIntoCaretakers = `INSERT INTO caretakers (username) VALUES ('${username}')`;
        await pool.query(insertIntoCaretakers);

        const insertIntoCaretakersPt = `INSERT INTO caretakers_pt (username) VALUES ('${username}')`;
        await pool.query(insertIntoCaretakersPt);

        ctx.body = {
            'username': username
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
        const sqlQuery = `SELECT COUNT(*) FROM users NATURAL JOIN accounts WHERE username = '${username}' AND pw = '${password}'`;
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
async function changePassword(ctx) {
    const { username, password, newpassword } = ctx.params;

    try {
        const sqlQuery = `UPDATE accounts SET pw = '${newpassword}' WHERE username = '${username}' AND pw = '${password}'`;
        await pool.query(sqlQuery);
        ctx.body = {
            'newpassword': newpassword
        };
    } catch (e) {
        console.log(e);
        ctx.status = 403;
    }
}

// PATCH api at router
async function addCreditCard(ctx) {
    const { username, cardnum } = ctx.params;

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
async function getCreditCard(ctx) {
    const { username } = ctx.params;

    try {
        const sqlQuery = `SELECT cardnum FROM users WHERE username = '${username}'`;
        const resultObject = await pool.query(sqlQuery);
        const rows = resultObject.rows;
        const onlyRow = rows[0];
        const cardnum = onlyRow.cardnum;
        ctx.body = {
            'cardnum': cardnum
        };
    } catch (e) {
        console.log(e);
        ctx.status = 403;
    }
}

// PATCH api at router
async function changeCreditCard(ctx) {
    const { username, newcardnum } = ctx.params;

    try {
        const sqlQuery = `UPDATE users SET cardnum = '${newcardnum}' WHERE username = '${username}'`;
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
async function removeCreditCard(ctx) {
    const { username } = ctx.params;

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


// PATCH api at router
async function addAddress(ctx) {
    const { username, address } = ctx.params;

    try {
        const sqlQuery = `UPDATE users SET address = '${address}' WHERE username = '${username}'`;
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
async function getAddress(ctx) {
    const { username } = ctx.params;

    try {
        const sqlQuery = `SELECT address FROM users WHERE username = '${username}'`;
        const resultObject = await pool.query(sqlQuery);
        const rows = resultObject.rows;
        const onlyRow = rows[0];
        const address = onlyRow.address;
        ctx.body = {
            'address': address
        };
    } catch (e) {
        console.log(e);
        ctx.status = 403;
    }
}

// PATCH api at router
async function updateAddress(ctx) {
    const { username, newaddress } = ctx.params;

    try {
        const sqlQuery = `UPDATE users SET address = '${newaddress}' WHERE username = '${username}'`;
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
async function deleteAddress(ctx) {
    const { username } = ctx.params;

    try {
        const sqlQuery = `UPDATE users SET address = NULL WHERE username = '${username}'`;
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
    createUser,
    login,
    changePassword,
    addCreditCard,
    getCreditCard,
    changeCreditCard,
    removeCreditCard,
    addAddress,
    getAddress,
    updateAddress,
    deleteAddress
};
