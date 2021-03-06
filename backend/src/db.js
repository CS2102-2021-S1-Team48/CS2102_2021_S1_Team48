const { Pool, types } = require('pg');
const moment = require('moment');

// custom date parser
function parseDate(val) {
    return val === null ? null : moment(val).format('YYYY-MM-DD');
}

// 1082 is the code number for DATE data type
// we are overriding the default parse for DATE data type
types.setTypeParser(1082, function(val) {
    return val === null ? null : parseDate(val);
});

const pool = new Pool({
    user: 'postgres',
    host: 'petdb.cluuodrt5y8f.ap-southeast-1.rds.amazonaws.com',
    database: 'postgres',
    password: 'petdbrds123',
    port: 4215,
});

module.exports = pool;
