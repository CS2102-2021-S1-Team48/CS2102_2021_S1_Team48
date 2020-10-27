const Router = require('koa-router');
const sayHello = require('./controller/hello');
const { createUsersTable, dropUsersTable, createUser, changeUsername, changePassword } = require('./controller/users');

const router = new Router();

router.get('/hello', sayHello);

// users
router.post('/users/createtable', createUsersTable);
router.del('/users/droptable', dropUsersTable);
router.post('/users', createUser);
router.patch('/users/changeusername/:newusername', changeUsername);
router.patch('/users/changepassword/:newpassword', changePassword);


/* deprecated routes
router.post('/createPetTable', createPetTable);
router.post('/insertPetRow/:petname', insertPetRow);
router.get('/readAllPetRows', readAllPetRows);
router.del('/dropPetTable', dropPetTable);
*/

module.exports = router;
