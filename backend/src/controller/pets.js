const pool = require('../db');

// POST api at router
async function createPetsTable(ctx) {
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
async function dropPetsTable(ctx) {
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

// POST /pets?petname=eva&pettype=cat&requirements=aircon
// POST api at router
// Same issue, need username of the person who is going to add the pet. Temporary solution use query param ?username=123
async function addPet(ctx) {
    const { petname, pettype } = ctx.query;
    var requirements = ctx.query.requirements;

    const username = ctx.query.username;

    requirements = (requirements === undefined) ? 'NIL' : requirements;
    try {
        const sqlQuery = `INSERT INTO pets VALUES ('${petname}', '${pettype}', '${requirements}', '${username}')`;
        await pool.query(sqlQuery);
        ctx.body = 'success';
    } catch (e) {
        console.log(e);
        ctx.body = 'error';
        ctx.status = 403;
    }
}

// GET api at router
async function getPet(ctx) {
    try {
        const sqlQuery = 'SELECT * FROM pets';
        const resultObject = await pool.query(sqlQuery);
        ctx.body = 'success';
        console.table(resultObject.rows);
    } catch (e) {
        console.log(e);
        ctx.body = 'error';
        ctx.status = 403;
    }
}

// GET api at router
// GET /pets/:petname , getPetByPetname
// Same issue, need username of the person going to find his own pet. Temporary solution use query param ?username=123
async function getPetByPetname(ctx) {
    const petname = ctx.params.petname;

    const username = ctx.query.username;
    try {
        const sqlQuery = `SELECT * FROM PETS WHERE petname = '${petname}' AND username_petowner = '${username}'`;
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
// PATCH /pets/:petname?petname=evaline&requirements=coldaircon , editPetDetails
// Same issue, need username of the person going to edit own pet.

// UPDATE pets SET petname = 'evaline' WHERE petname = 'emma' AND username_petowner = 'johndoe99';
// UPDATE pets SET requirements = 'hugs daily' WHERE petname = 'emma2' AND username_petowner = 'johndoe99';
// UPDATE pets SET petname = 'evaline', requirements = 'carnivore' WHERE petname = 'emma' AND username_petowner = 'johndoe999';
async function editPetDetails(ctx) {
    const currentPetName = ctx.params.petname;
    const { petname, requirements } = ctx.query;

    const username = ctx.query.username;
    try {
        if (requirements === undefined) {
            const sqlQuery = `UPDATE pets SET petname = '${petname}' WHERE petname = '${currentPetName}' AND username_petowner = '${username}'`;
            await pool.query(sqlQuery);
            ctx.body = 'success';
            
        } else if (petname === undefined) {
            const sqlQuery = `UPDATE pets SET requirements = '${requirements}' WHERE petname = '${currentPetName}' AND username_petowner = '${username}'`;
            await pool.query(sqlQuery);
            ctx.body = 'success';

        } else {
            const sqlQuery = `UPDATE pets SET petname = '${petname}', requirements = '${requirements}' WHERE petname = '${currentPetName}' AND username_petowner = '${username}'`;
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
// DEL /pet/:petname , deletePetByPetname
// Same issue, need username of the person going to delete own pet. Temp solution use query param
async function deletePetByPetname(ctx) {
    const petname = ctx.params.petname;

    const username = ctx.query.username;
    try {
        const sqlQuery = `DELETE FROM pets WHERE username_petowner = '${username}' AND petname = '${petname}'`;
        await pool.query(sqlQuery);
        ctx.body = 'success';
    } catch (e) {
        console.log(e);
        ctx.body = 'error';
        ctx.status = 403;
    }
}

module.exports = {
    createPetsTable,
    dropPetsTable,
    addPet,
    getPet,
    getPetByPetname,
    editPetDetails,
    deletePetByPetname
};