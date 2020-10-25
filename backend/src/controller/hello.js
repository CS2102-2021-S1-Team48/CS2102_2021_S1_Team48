async function sayHello(ctx) {
    try {
        // response body is a json
        ctx.body = {
            hello: 'world'
        };
    } catch (e) {
        console.log('going to send response now');
        ctx.status = 403;
    }
}

module.exports = sayHello;
