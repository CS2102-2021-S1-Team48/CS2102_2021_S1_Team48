const pool = require('../db');

// POST api at router
// POST /pets?petname=eva&pettype=cat&requirements=aircon&usernamepo=johndoe98
async function addPet(ctx) {
    const { petname, pettype, requirements, usernamepo } = ctx.query;

    let sqlQuery = '';

    if (requirements) {
        sqlQuery = `INSERT INTO pets (petname, pettype, requirements, username_petowner) VALUES ('${petname}', '${pettype}', '${requirements}', '${usernamepo}')`;
    } else {
        sqlQuery = `INSERT INTO pets (petname, pettype, username_petowner) VALUES ('${petname}', '${pettype}', '${usernamepo}')`;
    }

    try {
        await pool.query(sqlQuery);
        ctx.body = {
            'requirements': requirements,
            'petname': petname,
            'pettype': pettype
        };
    } catch (e) {
        console.log(e);
        ctx.status = 403;
    }
}

// GET api at router
async function getPetsByUsername(ctx) {
    const { usernamepo } = ctx.params;

    try {
        const sqlQuery = `SELECT * FROM pets WHERE username_petowner = '${usernamepo}'`;
        const resultObject = await pool.query(sqlQuery);
        const row = resultObject.rows;
        ctx.body = {
            'pets': row
        };
    } catch (e) {
        console.log(e);
        ctx.status = 403;
    }
}

// GET api at router
async function getPetByPetname(ctx) {
    const { usernamepo, petname } = ctx.params;
    try {
        const sqlQuery = `SELECT * FROM pets WHERE petname = '${petname}' AND username_petowner = '${usernamepo}'`;
        const resultObject = await pool.query(sqlQuery);
        const row = resultObject.rows;
        ctx.body = {
            'pets': row
        };
    } catch (e) {
        console.log(e);
        ctx.status = 403;
    }
}

// PATCH api at router
// PATCH /pets?petname=eva&pettype=cat&usernamepo=johndoe98&newpetname=emma&newpettype=dog&newrequirements=aircon
async function editPetDetails(ctx) {
    const { petname, pettype, usernamepo, newpetname, newpettype, newrequirements } = ctx.query;
    
    try {
        const whereClause = `WHERE petname = '${petname}' AND pettype = '${pettype}' AND username_petowner = '${usernamepo}'`;
        const sqlQuery = `UPDATE pets SET petname = '${newpetname}', pettype = '${newpettype}', requirements = '${newrequirements}' ` + whereClause;
        await pool.query(sqlQuery);
        ctx.body = {
            'newpetname': petname,
            'newpettype': pettype,
            'newrequirements': newrequirements
        };
    } catch (e) {
        console.log(e);
        ctx.status = 403;
    }
}

// DEL api at router
// DEL /pet/:petname/:usernamepo , deletePetByPetname
async function deletePetByPetname(ctx) {
    const { petname, usernamepo } = ctx.params;
    try {
        const sqlQuery = `DELETE FROM pets WHERE username_petowner = '${usernamepo}' AND petname = '${petname}'`;
        await pool.query(sqlQuery);
        ctx.body = {
            'success': 'True!',
            'petname': petname,
            'usernamepo': usernamepo
        };
    } catch (e) {
        console.log(e);
        ctx.status = 403;
    }
}

module.exports = {
    addPet,
    getPetsByUsername,
    getPetByPetname,
    editPetDetails,
    deletePetByPetname
};