const Router = require('koa-router');
const sayHello = require('./controller/hello');
const { createUsersTable, dropUsersTable, createUser, changeUsername, changePassword } = require('./controller/users');
const { createPetownersTable, dropPetownersTable } = require('./controller/petowners');
const { createCaretakersTable, dropCaretakersTable, getAllCaretakers, getCaretakerByUsername } = require('./controller/caretakers');
const { createCaretakersPtTable, dropCaretakersPtTable } = require('./controller/caretakerspt');
const { createBidsTable, dropBidsTable, addBid, getAcceptedBids, getUnacceptedBids, getBids, getReviewsOfCaretaker } = require('./controller/bids');


const router = new Router();

router.get('/hello', sayHello);

// routes categorised by controllers

// users
router.post('/users/createtable', createUsersTable);
router.del('/users/droptable', dropUsersTable);
router.post('/users', createUser);  // POST /users?username=johndoe99&password=password1
router.patch('/users/changeusername/:newusername', changeUsername);
router.patch('/users/changepassword/:newpassword', changePassword);

// petowners
router.post('/petowners/createtable', createPetownersTable);
router.del('/petowners/droptable', dropPetownersTable);

// caretakers
router.post('/caretakers/createtable', createCaretakersTable);
router.del('/caretakers/droptable', dropCaretakersTable);
router.get('/caretakers', getAllCaretakers);
router.get('/caretakers/:usernamect', getCaretakerByUsername);

// caretakerspt
router.post('/caretakers/createtable', createCaretakersPtTable);
router.del('/caretakers/droptable', dropCaretakersPtTable);

// bids
router.post('/bids/createtable', createBidsTable);
router.del('/bids/droptable', dropBidsTable);
router.post('/bids', addBid); // POST /bids?transfermethod=deliver&paymentmethod=123&petname=emma&username_caretake=Duc&startdate=27102020&enddate=28102020
router.get('/bids/accepted', getAcceptedBids); 
router.get('/bids/unaccepted', getUnacceptedBids);
router.get('/bids', getBids); // GET /bids?petname=eva&usernamect=john&usernamepo=lim
router.get('bids/review/:usernamect', getReviewsOfCaretaker);

/* deprecated routes
router.post('/createPetTable', createPetTable);
router.post('/insertPetRow/:petname', insertPetRow);
router.get('/readAllPetRows', readAllPetRows);
router.del('/dropPetTable', dropPetTable);
*/

module.exports = router;
