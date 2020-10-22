const { Pool } = require('pg');

const elephant = 'postgres://haikibbc:qeAUubYqybNnfAIuVi5RlglDsMtAaB2d@john.db.elephantsql.com:5432/haikibbc';

const pool = new Pool({
    connectionString: elephant
});

module.exports = pool;
