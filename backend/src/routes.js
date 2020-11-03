const Router = require('koa-router');
const { sayHello, sayHelloes} = require('./controller/hello');
const { createAdmin, changeAdminUsername, changeAdminPassword, adminLogin } = require('./controller/admins');
const { postAvailability, getAllAvailabilities, editAvailability, deleteAvailability } = require('./controller/availabilities');
const { addBaseDailyPrice, getBaseDailyPrices, editBaseDailyPrice, deleteBaseDailyPrice } = require('./controller/basedailyprices');
const { addBid, getAcceptedBids, getUnacceptedBids, getBids, getReviewsOfCaretaker, getPetDaysForThePeriod, acceptBid, undoAcceptBid, submitReviewAndRating, deleteBid, getTotalOwedToCaretaker, getAmountOwedToCaretaker } = require('./controller/bids');
const { getAllCaretakers, getCaretakerByUsername } = require('./controller/caretakers');
const { switchCaretakerPtToFt, getCaretakerFtInfo, getSpecificCaretakerFtInfo, editStartDate1, editEndDate1, editStartDate2, editEndDate2 } = require('./controller/caretakersft');
const { addLeave, getLeaves, deleteLeaves } = require('./controller/leaveschedules');
const { addPet, getPets, getPetByUsername, getPetByPetname, editPetDetails, deletePetByPetname } = require('./controller/pets');
const { createUser, changeUsername, changePassword, login, addCreditCard, getCreditCard, changeCreditCard, removeCreditCard } = require('./controller/users');



const router = new Router();

// dummy routes for testing only
router.get('/hello', sayHello);
router.get('/helloes', sayHelloes);

/* 
    Routes categorised by controllers (tables)
    
    /:<param> will be used when the api only require 4 or less params.
    If the apis take in more than 3 params, it will use ? question mark, where each
    variable is separated by an & ampersand symbol.

    In the case of /:<param> , order of params do matter and they are of course compulsory to fill in.

    In the case of ? question mark, order of variables do not matter. They are still compulsory to fill in, though.
*/

// admins
router.post('/admins/register/:username/:password', createAdmin);
router.patch('/admins/changeusername/:username/:newusername', changeAdminUsername);
router.patch('/admins/changepassword/:username/:password/:newpassword', changeAdminPassword);
router.post('/admins/login/:username/:password', adminLogin);

// pets
router.post('/pets/:usernamepo', addPet); // POST /pets?petname=eva&pettype=cat&requirements=aircon
router.get('/pets', getPets);
router.get('/pets/:usernamepo', getPetByUsername);
router.get('/pets/:petname/:usernamepo', getPetByPetname);
router.patch('/pets/:petname/:usernamepo', editPetDetails); // PATCH /pets/:petname?petname=evaline&requirements=coldaircon
router.del('/pets/:petname/:usernamepo', deletePetByPetname);

// availabilities
router.post('/availabilities', postAvailability); // POST /availabilities?usernamect=johndoe98&startdate=20200701&enddate=20200319&pettype=dog&price=100
router.get('/availabilities', getAllAvailabilities);
router.get('/availabilities/:pettype', get)
// router.get('/availabilities/specific', getSpecificAvailabilities); // GET /availabilities/specific?usernamect=john&pettype=cat , getSpecificAvailabilities
router.patch('/availabilities/:startdate/:enddate/:pettype/:usernamect', editAvailability); // PATCH /availabilities/:startdate/:enddate/:pettype/:usernamect?startdate=20201031&enddate=20201101&pettype=dog&price=100
router.del('/availabilities/:startdate/:enddate/:pettype/:usernamect', deleteAvailability); 

// basedailyprices
router.post('/basedailyprices/:adminusername', addBaseDailyPrice); // POST /basedailyprices/:adminusername?amount=123&pettype=dog&minrating=3
router.get('/basedailyprices', getBaseDailyPrices); // GET /basedailyprices?pettype=cat&minrating=5 // If there is nothing after the ? then it should get all base daily prices.  
router.patch('/basedailyprices/:pettype/:minrating/:adminusername', editBaseDailyPrice); // PATCH /basedailyprices/:pettype/:minrating?amount=3
router.del('/basedailyprices/:pettype/:minrating', deleteBaseDailyPrice);

// bids
router.post('/bids/:usernamepo', addBid); // POST /bids/:usernamepo?transfermethod=deliver&paymentmethod=123&petname=emma&username_caretake=Duc&startdate=20201231&enddate=20210101
router.get('/bids/accepted/:usernamect', getAcceptedBids); 
router.get('/bids/unaccepted/:usernamect', getUnacceptedBids);
router.get('/bids', getBids); // GET /bids?petname=eva&usernamect=john&usernamepo=lim // If there is nothing after the ? then it should get all bids
router.get('/bids/reviews/:usernamect', getReviewsOfCaretaker);
router.get('/bids/getpetdays/:usernamect', getPetDaysForThePeriod); // GET bids/getpetdays/:usernamect?startdate=20200101&enddate=20200201
router.get('/bids/amountowedtocaretaker/:usernamepo/:usernamect/:pettype/:startdate/:enddate', getAmountOwedToCaretaker); // GET /bids/amountowedtocaretaker/:usernamepo/:usernamect/:pettype/:startdate/:enddate , getAmountOwedToCaretaker
router.get('/bids/totalowedtocaretaker/:usernamect/:pettype/:startdate/:enddate',getTotalOwedToCaretaker); // GET /bids/totalowedtocaretaker/:usernamect/:pettype/:startdate/:enddate , getTotalOwedToCaretaker
router.patch('/bids/accept/:petname/:usernamepo/:usernamect/:startdate/:enddate', acceptBid);
router.patch('/bids/undoaccept/:petname/:usernamepo/:usernamect/:startdate/:enddate', undoAcceptBid);
router.patch('/bids/submitreviewandrating/:petname/:usernamepo/:usernamect/:startdate/:enddate', submitReviewAndRating); // PATCH /bids/submitreviewandrating?rating=5&review=good , submitReviewAndRating
router.del('/bids/:petname/:usernamepo/:usernamect/:startdate/:enddate', deleteBid);

// caretakers
router.get('/caretakers', getAllCaretakers);
router.get('/caretakers/:usernamect', getCaretakerByUsername);

// caretakersft
router.post('/caretakersft/:usernamect', switchCaretakerPtToFt); // POST /caretakersft/duc99?startdate1=20200101&enddate1=20200531&startdate2=20200601&enddate2=20201231
router.get('/caretakersft', getCaretakerFtInfo);
router.get('/caretakersft/:usernamect', getSpecificCaretakerFtInfo);
router.patch('/caretakersft/startdate1/:startdate1/:usernamect', editStartDate1);
router.patch('/caretakersft/enddate1/:enddate1/:usernamect', editEndDate1);
router.patch('/caretakersft/startdate2/:startdate2/:usernamect', editStartDate2);
router.patch('/caretakersft/enddate2/:enddate2/:usernamect', editEndDate2);

// leaves
router.post('/leaves/:usernamect/:startdate/:enddate', addLeave);
router.get('/leaves/:usernamect', getLeaves);
router.del('/leaves/:usernamect/:startdate', deleteLeaves);

// pets
router.post('/pets/:usernamepo', addPet); // POST /pets?petname=eva&pettype=cat&requirements=aircon
router.get('/pets', getPets);
router.get('/pets/:usernamepo', getPetByUsername);
router.get('/pets/:petname/:usernamepo', getPetByPetname);
router.patch('/pets/:petname/:usernamepo', editPetDetails); // PATCH /pets/:petname?petname=evaline&requirements=coldaircon
router.del('/pets/:petname/:usernamepo', deletePetByPetname);

// users
router.post('/users', createUser);  // POST /users?username=johndoe99&password=password1
router.patch('/users/changeusername/:username/:newusername', changeUsername);
router.patch('/users/changepassword/:username/:password/:newpassword', changePassword);
router.post('/users/login/:username/:password', login);
router.patch('/users/addcreditcard/:username',addCreditCard); // PATCH /users/addcreditcard/:username?cardnum=123 , addCreditCard
router.get('/users/getcreditcard/:username', getCreditCard); // GET /users/getcreditcard/:username
router.patch('/users/changecreditcard/:username', changeCreditCard); // PATCH /users/changecreditcard/:username?cardnum=456 , changeCreditCard
router.del('/users/removecreditcard/:username', removeCreditCard); // DEL /users/removecreditcard/:username , changeCreditCard

module.exports = router;
