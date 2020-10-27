const Router = require('koa-router');
const sayHello = require('./controller/hello');
const { createUsersTable, dropUsersTable, createUser, changeUsername, changePassword } = require('./controller/users');
const { createPetownersTable, dropPetownersTable } = require('./controller/petowners');
const { createCaretakersTable, dropCaretakersTable, getAllCaretakers, getCaretakerByUsername } = require('./controller/caretakers');
const { createCaretakersPtTable, dropCaretakersPtTable } = require('./controller/caretakerspt');
const { createAvailabilitiesTable, dropAvailabilitiesTable, postAvailability, getAvailabilities, editAvailability, deleteAvailability } = require('./controller/availabilities');
const { createBaseDailyPricesTable, dropBaseDailyPricesTable, addBaseDailyPrice, getBaseDailyPrices, editBaseDailyPrice, deleteBaseDailyPrice } = require('./controller/basedailyprices');
const { createBidsTable, dropBidsTable, addBid, getAcceptedBids, getUnacceptedBids, getBids, getReviewsOfCaretaker, acceptBid, undoAcceptBid, deleteBid } = require('./controller/bids');
const { createCaretakersFtTable, dropCaretakersFtTable, editStartDate1, editEndDate1, editStartDate2, editEndDate2 } = require('./controller/caretakersft');






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

// caretakersft
router.post('/caretakers/createtable', createCaretakersFtTable);
router.del('/caretakers/droptable', dropCaretakersFtTable);
router.get('/caretakersft', getCaretakerFtInfo);
router.patch('/caretakersft/startdate1/:startdate1', editStartDate1);
router.patch('/caretakersft/enddate1/:enddate1', editEndDate1);
router.patch('/caretakersft/startdate2/:startdate2', editStartDate2);
router.patch('/caretakersft/enddate2/:enddate2', editEndDate2);

// availabilities
router.post('/availabilities/createtable', createAvailabilitiesTable);
router.del('/availabilities/droptable', dropAvailabilitiesTable);
router.post('/availabilities' , postAvailability); // POST /availabilities?startdate=01072020&enddate=19032020&pettype=dog&price=100
router.get('/availabilities', getAvailabilities); // GET /availabilities?usernamect=john&pettype=cat // If there is nothing after the ? then it should get all availabilities.
router.patch('/availabilities/:startdate/:enddate/:pettype', editAvailability); // PATCH /availabilities/:startdate/:enddate/:pettype?startdate=01072020&enddate=19032020&pettype=dog&price=100
router.del('/availabilities/:startdate/:enddate/:pettype', deleteAvailability); 

// basedailyprices
router.post('/basedailyprices/createtable', createBaseDailyPricesTable);
router.del('/basedailyprices/droptable', dropBaseDailyPricesTable);
router.post('/basedailyprices', addBaseDailyPrice); // POST /basedailyprices?amount=123&pettype=dog&minrating=3
router.get('basedailyprices', getBaseDailyPrices); // GET /basedailyprices?pettype=cat&minrating=5 // If there is nothing after the ? then it should get all base daily prices.  
router.patch('/basedailyprices/:pettype/:minrating', editBaseDailyPrice); // PATCH /basedailyprices/:pettype/:minrating?amount=3
router.del('/basedailyprices/:pettype/:minrating', deleteBaseDailyPrice);

// bids
router.post('/bids/createtable', createBidsTable);
router.del('/bids/droptable', dropBidsTable);
router.post('/bids', addBid); // POST /bids?transfermethod=deliver&paymentmethod=123&petname=emma&username_caretake=Duc&startdate=27102020&enddate=28102020
router.get('/bids/accepted', getAcceptedBids); 
router.get('/bids/unaccepted', getUnacceptedBids);
router.get('/bids', getBids); // GET /bids?petname=eva&usernamect=john&usernamepo=lim // If there is nothing after the ? then it should get all bids
router.get('bids/review/:usernamect', getReviewsOfCaretaker);
router.patch('/bids/accept/:petname/:usernamepo/:usernamect/:startdate/:enddate', acceptBid);
router.patch('/bids/undoaccept/:petname/:usernamepo/:usernamect/:startdate/:enddate', undoAcceptBid);
router.del('/bids/:petname/:usernamepo/:usernamect/:startdate/:enddate' , deleteBid);

/* deprecated routes
router.post('/createPetTable', createPetTable);
router.post('/insertPetRow/:petname', insertPetRow);
router.get('/readAllPetRows', readAllPetRows);
router.del('/dropPetTable', dropPetTable);
*/

module.exports = router;
