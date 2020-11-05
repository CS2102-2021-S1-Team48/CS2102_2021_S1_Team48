const Koa = require('koa');
const cors = require('@koa/cors');
const router = require('./routes');

const app = new Koa();
app.use(cors());

console.log('Koa server is up on localhost:3000\n');
console.log('Try hitting localhost:3000/hello on your browser');


/*
   Custom middleware for illustrative purposes - NO ACTUAL USE
   middleware is something that executes in between request and response
   that's why it's called 'middle' ware
   await next() passes control to other functions
*/
app.use(async (ctx, next) => {
    console.log('this will appear before every response!');
    await next();
});

// koa router defined middleware. don't touch.
app.use(router.routes());
app.use(router.allowedMethods());

app.listen(3000);
