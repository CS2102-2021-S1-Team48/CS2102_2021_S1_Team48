const pool = require('../db');

async function createPetTable(ctx) {
    try {
        await pool.query('CREATE TABLE pet ( petid SERIAL PRIMARY KEY, name VARCHAR(20) )');
        ctx.body = 'pet table created';
    } catch (e) {
        ctx.body = 'error';
        ctx.status = 403;
    }
}

async function insertPetRow(ctx) {
    try {
        const petname = 'hebe';
        await pool.query(`INSERT INTO pet (name) VALUES ('${petname}')`); // notice eva must be wrapped in single quotes
        ctx.body = 'pet row inserted';
    } catch (e) {
        ctx.body ='error';
        ctx.status = 403;
    }
}

async function readAllPetRows(ctx) {
    try {
        const resultObject = await pool.query('SELECT * FROM pet');
        ctx.body = 'selected all pet rows';
        console.table(resultObject);
        console.table(resultObject.rows);
    } catch (e) {
        ctx.body = 'error';
        ctx.status = 403;
    }
}

async function dropPetTable(ctx) {
    try {
        await pool.query('DROP TABLE pet');
        ctx.status = 200;
    } catch (e) {
        ctx.body = 'error';
        ctx.status = 403;
    }
}

module.exports = {
    createPetTable,
    insertPetRow,
    readAllPetRows,
    dropPetTable
};
