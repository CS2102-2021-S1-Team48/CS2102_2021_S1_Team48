const pool = require('../db');

// POST api at router
async function createAdmin(ctx) {
    const { username, password } = ctx.params;

    try {
        const insertIntoAccounts = `INSERT INTO accounts (username, pw) VALUES ('${username}', '${password}')`;
        await pool.query(insertIntoAccounts);

        const insertIntoAdmins = `INSERT INTO admins (username) VALUES ('${username}'}');`;
        await pool.query(insertIntoAdmins);
        ctx.body = {
            'username' : username,
        };
    } catch (e) {
        console.log(e);
        ctx.status = 403;
    }
}

// PATCH api at router
async function changeAdminPassword(ctx) {
    const { username, password, newpassword } = ctx.params;

    try {
        const sqlQuery = `UPDATE admins SET pw = '${newpassword}' WHERE username = '${username}' AND pw = '${password}'`;
        await pool.query(sqlQuery);
        ctx.body = {
            'newpassword' : newpassword
        };
    } catch (e) {
        console.log(e);
        ctx.status = 403;
    }
}

// POST api at router
async function adminLogin(ctx) {
    const { username, password } = ctx.params;

    try {
        const sqlQuery = `SELECT COUNT(*) FROM admins NATURAL JOIN accounts WHERE username = '${username}' AND pw = '${password}'`;        const resultObject = await pool.query(sqlQuery);
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

// GET api at router
// GET /admins/getuniquepetscared/:startdate/:enddate , getUniquePetsCared
async function getUniquePetsCared(ctx) {
    const { startdate, enddate } = ctx.params;

    try {
        const sqlQuery = `SELECT COUNT(*) FROM (SELECT DISTINCT username_petowner, petname FROM bids WHERE accepted = 'True' AND startdate >= '${startdate}' AND enddate <= '${enddate}') AS S`;
        const resultObject = await pool.query(sqlQuery);
        const rows = resultObject.rows;
        ctx.body = {
            'uniquepets': rows
        };
    } catch (e) {
        console.log(e);
        ctx.status = 403;
    }
}

// GET API at router
// GET /admins/getcaretakertotaldaysworked/:startdate/:enddate
async function getCareTakerTotalDaysWorked(ctx) {
    const { startdate, enddate } = ctx.params;

    try {
        const sqlQuery = `SELECT S.username_caretaker, SUM(S.numdaysworked) AS dayswork
        FROM (SELECT username_caretaker, enddate-startdate+1 AS numdaysworked FROM bids WHERE accepted = 'True' AND startdate >= '${startdate}' AND enddate <= '${enddate}') 
        AS S GROUP BY S.username_caretaker
        UNION 
        SELECT username, 0 AS dayswork
        FROM (SELECT username FROM caretakers EXCEPT SELECT S.username_caretaker 
        FROM (SELECT username_caretaker, enddate-startdate+1 AS numdaysworked FROM bids WHERE accepted = 'True' AND startdate >= '${startdate}' AND enddate <= '${enddate}') 
        AS S GROUP BY S.username_caretaker) AS B
        ORDER BY dayswork DESC`;
        const resultObject = await pool.query(sqlQuery);
        const rows = resultObject.rows;
        ctx.body = {
            'daysworked': rows
        };
    } catch (e) {
        console.log(e);
        ctx.status = 403;
    }
}

// GET API at router
// GET /admins/gettotalsalarytobepaid/:startdate/:enddate
// Had to do a stored procedure here, for some reason they dont let me send a CTE over.
async function getTotalSalaryToBePaid(ctx) {
    const { startdate, enddate } = ctx.params;

    try {
        const sqlQuery = `SELECT * FROM getTotalSalaryToBePaid('${startdate}', '${enddate}')`;
        const resultObject = await pool.query(sqlQuery);
        const rows = resultObject.rows;
        ctx.body = {
            'totalsalary': rows
        };
    } catch (e) {
        console.log(e);
        ctx.status = 403;
    }
}

module.exports = {
    createAdmin,
    changeAdminPassword,
    adminLogin,
    getUniquePetsCared,
    getCareTakerTotalDaysWorked,
    getTotalSalaryToBePaid
};
