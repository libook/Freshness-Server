/**
 * This is the entrance fo the server.
 */

const Koa = require('koa');
const KoaRouter = require('koa-router');

const PORT = 3000;

const app = new Koa();
const router = new KoaRouter();

/**
 * @uri
 * API for checking whether server is running.
 * @get /
 * @response
 *      @body
 *          "Welcome to Freshness Server."
 */
router.get('/', (ctx) => {
    ctx.body = "Welcome to Freshness Server.";
});

app
    .use(router.routes())
    .use(router.allowedMethods());

app.listen(PORT);
console.log(PORT);
