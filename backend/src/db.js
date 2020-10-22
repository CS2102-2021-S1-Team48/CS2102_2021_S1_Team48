const { Pool } = require('pg');

const elephantUrl = 'postgres://haikibbc:qeAUubYqybNnfAIuVi5RlglDsMtAaB2d@john.db.elephantsql.com:5432/haikibbc';

const pool = new Pool({
    connectionString: elephantUrl
});

module.exports = pool;
