const Router = require('koa-router');
const { sayHello, sayHelloes} = require('./controller/hello');
const { createUsersTable, dropUsersTable, createUser, changeUsername, changePassword } = require('./controller/users');
const { createPetownersTable, dropPetownersTable } = require('./controller/petowners');
const { createCaretakersTable, dropCaretakersTable, getAllCaretakers, getCaretakerByUsername } = require('./controller/caretakers');
const { createCaretakersPtTable, dropCaretakersPtTable } = require('./controller/caretakerspt');
const { createCaretakersFtTable, dropCaretakersFtTable, switchCaretakerPtToFt, getCaretakerFtInfo, getSpecificCaretakerFtInfo, editStartDate1, editEndDate1, editStartDate2, editEndDate2 } = require('./controller/caretakersft');
const { createAdminsTable, dropAdminsTable, createAdmin, changeAdminUsername, changeAdminPassword } = require('./controller/admins');
const { createCreditCardsTable, dropCreditCardsTable, addCreditCard, getCreditCard, changeCreditCard, removeCreditCard } = require('./controller/creditcards');
const { createOwnsTable, dropOwnsTable } = require('./controller/owns');
const { createPetsTable, dropPetsTable, addPet, getPet, getPetByPetname, editPetDetails, deletePetByPetname } = require('./controller/pets');
const { createAvailabilitiesTable, dropAvailabilitiesTable, postAvailability, getAllAvailabilities, getSpecificAvailabilities, editAvailability, deleteAvailability } = require('./controller/availabilities');
const { createBaseDailyPricesTable, dropBaseDailyPricesTable, addBaseDailyPrice, getBaseDailyPrices, editBaseDailyPrice, deleteBaseDailyPrice } = require('./controller/basedailyprices');
const { createBidsTable, dropBidsTable, addBid, getAcceptedBids, getUnacceptedBids, getBids, getReviewsOfCaretaker, acceptBid, undoAcceptBid, submitReviewAndRating, deleteBid } = require('./controller/bids');


const router = new Router();

router.get('/hello', sayHello);
router.get('/helloes', sayHelloes);

// routes categorised by controllers

// users
router.post('/users/createtable', createUsersTable);
router.del('/users/droptable', dropUsersTable);
router.post('/users', createUser);  // POST /users?username=johndoe99&password=password1
router.patch('/users/changeusername/:username/:newusername', changeUsername);
router.patch('/users/changepassword/:username/:password/:newpassword', changePassword);

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
router.post('/caretakersft', switchCaretakerPtToFt);
router.get('/caretakersft', getCaretakerFtInfo);
router.get('/caretakersft/:usernamect', getSpecificCaretakerFtInfo);
router.patch('/caretakersft/startdate1/:startdate1', editStartDate1);
router.patch('/caretakersft/enddate1/:enddate1', editEndDate1);
router.patch('/caretakersft/startdate2/:startdate2', editStartDate2);
router.patch('/caretakersft/enddate2/:enddate2', editEndDate2);

// admins
router.post('/admins', createAdmin);  // POST /admins?username=johndoe99&password=password1
router.patch('/admins/changeusername/:newusername', changeAdminUsername);
router.patch('/admins/changepassword/:newpassword', changeAdminPassword);

// creditcards
router.post('/creditcards', addCreditCard); // POST /creditcards?cardnum=123&expiry=20281022
router.get('/creditcards', getCreditCard);
router.patch('/creditcards', changeCreditCard); // PATCH /creditcards?cardnum=456expiry=21072021
router.del('/creditcards', removeCreditCard); // DEL /creditcards?cardnum=123

// pets
router.post('/pets', addPet); // POST /pets?petname=eva&pettype=cat&requirements=aircon
router.get('/pets', getPet);
router.get('/pets/:petname', getPetByPetname);
router.patch('/pets/:petname', editPetDetails); // PATCH /pets/:petname?petname=evaline&requirements=coldaircon
router.del('/pets/:petname', deletePetByPetname);

// availabilities
router.post('/availabilities' , postAvailability); // POST /availabilities?startdate=01072020&enddate=19032020&pettype=dog&price=100
router.get('/availabilities', getAllAvailabilities); 
router.get('/availabilities/specific', getSpecificAvailabilities); // GET /availabilities/specific?usernamect=john&pettype=cat , getSpecificAvailabilities
router.patch('/availabilities/:startdate/:enddate/:pettype', editAvailability); // PATCH /availabilities/:startdate/:enddate/:pettype?startdate=01072020&enddate=19032020&pettype=dog&price=100
router.del('/availabilities/:startdate/:enddate/:pettype', deleteAvailability); 

// basedailyprices
router.post('/basedailyprices', addBaseDailyPrice); // POST /basedailyprices?amount=123&pettype=dog&minrating=3
router.get('/basedailyprices', getBaseDailyPrices); // GET /basedailyprices?pettype=cat&minrating=5 // If there is nothing after the ? then it should get all base daily prices.  
router.patch('/basedailyprices/:pettype/:minrating', editBaseDailyPrice); // PATCH /basedailyprices/:pettype/:minrating?amount=3
router.del('/basedailyprices/:pettype/:minrating', deleteBaseDailyPrice);

// bids
router.post('/bids', addBid); // POST /bids?transfermethod=deliver&paymentmethod=123&petname=emma&username_caretake=Duc&startdate=27102020&enddate=28102020
router.get('/bids/accepted', getAcceptedBids); 
router.get('/bids/unaccepted', getUnacceptedBids);
router.get('/bids', getBids); // GET /bids?petname=eva&usernamect=john&usernamepo=lim // If there is nothing after the ? then it should get all bids
router.get('/bids/review/:usernamect', getReviewsOfCaretaker);
router.patch('/bids/accept/:petname/:usernamepo/:usernamect/:startdate/:enddate', acceptBid);
router.patch('/bids/undoaccept/:petname/:usernamepo/:usernamect/:startdate/:enddate', undoAcceptBid);
router.patch('/bids/submitreviewandrating/:petname/:usernamepo/:usernamect/:startdate/:enddate', submitReviewAndRating); // PATCH /bids/submitreviewandrating?rating=5&review=good , submitReviewAndRating
router.del('/bids/:petname/:usernamepo/:usernamect/:startdate/:enddate' , deleteBid);

module.exports = router;
