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
// PATCH /pets/:petname/:usernamepo?petname=evaline&requirements=coldaircon , editPetDetails

// UPDATE pets SET petname = 'evaline' WHERE petname = 'emma' AND username_petowner = 'johndoe99';
// UPDATE pets SET requirements = 'hugs daily' WHERE petname = 'emma2' AND username_petowner = 'johndoe99';
// UPDATE pets SET petname = 'evaline', requirements = 'carnivore' WHERE petname = 'emma' AND username_petowner = 'johndoe999';
async function editPetDetails(ctx) {
    const currentpetname = ctx.params.petname;
    const usernamepo = ctx.params.usernamepo;

    const { petname, requirements } = ctx.query;
    try {
        if (requirements === undefined) {
            const sqlQuery = `UPDATE pets SET petname = '${petname}' WHERE petname = '${currentpetname}' AND username_petowner = '${usernamepo}'`;
            await pool.query(sqlQuery);
            ctx.body = {
                'success': 'True!',
                'petname': petname
            };
            
        } else if (petname === undefined) {
            const sqlQuery = `UPDATE pets SET requirements = '${requirements}' WHERE petname = '${currentpetname}' AND username_petowner = '${usernamepo}'`;
            await pool.query(sqlQuery);
            ctx.body = {
                'success': 'True!',
                'requirements': requirements
            };

        } else {
            const sqlQuery = `UPDATE pets SET petname = '${petname}', requirements = '${requirements}' WHERE petname = '${currentpetname}' AND username_petowner = '${usernamepo}'`;
            await pool.query(sqlQuery);
            ctx.body = {
                'success': 'True!',
                'requirements': requirements,
                'petname': petname
            };

        }
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