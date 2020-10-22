const Router = require('koa-router');
const sayHello = require('./hello');

const router = new Router();

router.get('/hello', sayHello);

module.exports = router
