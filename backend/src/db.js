const { Pool } = require('pg');

// const elephantUrl = 'postgres://haikibbc:qeAUubYqybNnfAIuVi5RlglDsMtAaB2d@john.db.elephantsql.com:5432/haikibbc';

// const pool = new Pool({
//     connectionString: elephantUrl
// });

const pool = new Pool({
    user: 'postgres',
    host: 'petdb.cluuodrt5y8f.ap-southeast-1.rds.amazonaws.com',
    database: 'postgres',
    password: 'petdbrds123',
    port: 5432,
});

module.exports = pool;
