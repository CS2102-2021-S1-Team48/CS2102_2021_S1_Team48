const Router = require('koa-router');
const { sayHello, sayHelloes} = require('./controller/hello');
const { createAdmin, changeAdminUsername, changeAdminPassword, adminLogin, getUniquePetsCared, getCareTakerTotalDaysWorked, getTotalSalaryToBePaid } = require('./controller/admins');
const { postAvailability, getAllAvailabilities, editAvailability, deleteAvailability, getAvailabilitiesByPetType, getAvailabilitiesByUsernameCT, getAvailabilitiesByUCTandPT } = require('./controller/availabilities');
const { addBaseDailyPrice, getBaseDailyPrices, editBaseDailyPrice, deleteBaseDailyPrice, getPetTypes } = require('./controller/basedailyprices');
const { addBid, getAcceptedBids, getUnacceptedBids, getBids, getReviewsOfCaretaker, getPetDaysForThePeriod, acceptBid, undoAcceptBid, submitReviewAndRating, deleteBid, getTotalOwedToCaretaker, getAmountOwedToCaretaker } = require('./controller/bids');
const { getAllCaretakers, getCaretakerByUsername } = require('./controller/caretakers');
const { switchCaretakerPtToFt, getCaretakerFtInfo, getSpecificCaretakerFtInfo, editStartDate1, editEndDate1, editStartDate2, editEndDate2 } = require('./controller/caretakersft');
const { addLeave, getLeaves, deleteLeaves } = require('./controller/leaveschedule');
const { addSchedule, getSchedule, updateSchedule, deleteSchedule } = require('./controller/parttimeschedule');
const { addPet, getPetsByUsername, getPetByPetname, editPetDetails, deletePetByPetname } = require('./controller/pets');
const { createUser, changeUsername, changePassword, login, addCreditCard, getCreditCard, changeCreditCard, removeCreditCard, getAddress, editAddress, addAddress, deleteAddress } = require('./controller/users');


const router = new Router();

// dummy routes for testing only
router.get('/hello', sayHello);
router.get('/helloes', sayHelloes);

/* 
    Routes categorised by controllers (tables)
    
    /:<param> will be used for up to 4 params only
    Above 4 params, the api will employ the use of the ? question mark, where each
    variable is separated by an & ampersand symbol.

    In the case of /:<param> , order of params do matter and they are of course compulsory to fill in.

    In the case of ? question mark, order of variables do not matter. They are still compulsory to
    fill in, though.
*/

// admins
router.post('/admins/register/:username/:password', createAdmin);
router.post('/admins/login/:username/:password', adminLogin);
router.get('/admins/getuniquepetscared/:startdate/:enddate', getUniquePetsCared);
router.get('/admins/getcaretakertotaldaysworked/:startdate/:enddate', getCareTakerTotalDaysWorked);
router.get('/admins/gettotalsalarytobepaid/:startdate/:enddate', getTotalSalaryToBePaid); 
router.patch('/admins/changeusername/:username/:newusername', changeAdminUsername);
router.patch('/admins/changepassword/:username/:password/:newpassword', changeAdminPassword);


// pets
router.post('/pets/:usernamepo', addPet); // POST /pets?petname=eva&pettype=cat&requirements=aircon
router.get('/pets/:usernamepo', getPetsByUsername);
router.get('/pets/:petname/:usernamepo', getPetByPetname);
router.patch('/pets/:petname/:usernamepo', editPetDetails); // PATCH /pets/:petname?petname=evaline&requirements=coldaircon
router.del('/pets/:petname/:usernamepo', deletePetByPetname);

// availabilities
router.post('/availabilities', postAvailability); // POST /availabilities?usernamect=johndoe98&startdate=01072020&enddate=19032020&pettype=dog&price=100
router.get('/availabilities', getAllAvailabilities);
router.get('/availabilities/pettype/:pettype', getAvailabilitiesByPetType);
router.get('/availabilities/usernamect/:usernamect', getAvailabilitiesByUsernameCT);
router.get('/availabilities/uctandpt/:usernamect/:pettype', getAvailabilitiesByUCTandPT);
router.patch('/availabilities', editAvailability); // PATCH /availabilities?startdate=20201025&enddate=20201025&pettype=dog&price=99999&usernamect=johndoe98&newstartdate=20201025&newenddate=20201026&newpettype=cat&newprice=13939495
router.del('/availabilities/:startdate/:enddate/:pettype/:usernamect', deleteAvailability); 

// basedailyprices
router.post('/basedailyprices/:adminusername', addBaseDailyPrice); // POST /basedailyprices/:adminusername?amount=123&pettype=dog&minrating=3
router.get('/basedailyprices', getBaseDailyPrices); // GET /basedailyprices?pettype=cat&minrating=5 // If there is nothing after the ? then it should get all base daily prices.  
router.patch('/basedailyprices/:pettype/:minrating/:adminusername', editBaseDailyPrice); // PATCH /basedailyprices/:pettype/:minrating?amount=3
router.del('/basedailyprices/:pettype/:minrating', deleteBaseDailyPrice);
router.get('/basedailyprices/pettypes', getPetTypes);

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

// parttimeschedule
router.post('/parttimeschedule/:usernamect/:availdate', addSchedule);
router.get('/partimeschedule/:usernamect', getSchedule);
router.patch('/partimeschedule/:usernamect/:availdate/:newdate', updateSchedule);
router.del('/partimeschedule/:usernamect/:availdate', deleteSchedule);

// pets
router.post('/pets', addPet); // POST /pets?petname=eva&pettype=cat&requirements=aircon&usernamepo=johndoe98
router.get('/pets/:usernamepo', getPetsByUsername);
router.get('/pets/:usernamepo/:petname', getPetByPetname);
router.patch('/pets', editPetDetails); // PATCH /pets?petname=eva&pettype=cat&usernamepo=johndoe98&newpetname=emma&newpettype=dog&newrequirements=aircon
router.del('/pets/:petname/:usernamepo', deletePetByPetname);

// users
router.post('/users/register/:username/:password', createUser);
router.post('/users/login/:username/:password', login);
router.patch('/users/changeusername/:username/:newusername', changeUsername);
router.patch('/users/changepassword/:username/:password/:newpassword', changePassword);
router.patch('/users/addcreditcard/:username',addCreditCard); // PATCH /users/addcreditcard/:username?cardnum=123 , addCreditCard
router.get('/users/getcreditcard/:username', getCreditCard); 
router.patch('/users/changecreditcard/:username', changeCreditCard); // PATCH /users/changecreditcard/:username?cardnum=456 , changeCreditCard
router.del('/users/removecreditcard/:username', removeCreditCard);
router.patch('/users/addaddress/:username/:address', addAddress); 
router.get('/users/getaddress/:username', getAddress);
router.patch('/users/editaddress/:username/:newaddress', editAddress);
router.del('/users/deleteaddress/:username', deleteAddress);

module.exports = router;
