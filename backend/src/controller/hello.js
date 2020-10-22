async function sayHello(ctx) {
    console.log('going to send response now')
    
    // response body is a json
    ctx.body = {
        hello: 'world'
    };
}

module.exports = sayHello
