const { Pool, types } = require('pg');
const Moment = require('moment');

// custom date parser
function parseDate(val) {
    return val === null ? null : Moment(val).format('YYYY-MM-DD');
}

// 1082 is the code number for DATE data type
// we are overriding the default parse for DATE data type
types.setTypeParser(1082, function(val) {
    return val === null ? null : parseDate(val);
});

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
