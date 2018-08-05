/**
 * This is the entrance fo the server.
 */

'use strict';

(async () => {
    const mongoose = require('mongoose');

    await mongoose.connect('mongodb://127.0.0.1:27017/freshness', {
        "useNewUrlParser": true,
    });

    const Koa = require('koa');
    const KoaBodyParser = require('koa-bodyparser');
    const KoaRouter = require('koa-router');

    const PORT = 3000;

    const app = new Koa();
    app.use(KoaBodyParser());
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

    const TimerModel = require('./model/Timer');

    {
        const timerRouter = new KoaRouter();

        /**
         * @uri
         * Create new timer.
         * @post /timer
         * @request
         *      @body
         *          {
         *              "name": String,
         *              "expirationDate": String,
         *          }
         * @response
         *      @body
         *          {
         *              "name": String,
         *              "expirationDate": String,
         *          }
         */
        timerRouter.post('/', async (ctx) => {
            const timer = new TimerModel(ctx.request.body);
            ctx.body = await timer.save();
        });

        router.use('/timer', timerRouter.routes());
    }

    {
        const timerListRouter = new KoaRouter();

        /**
         * @uri
         * Get timer list.
         * @get /timerList
         * @response
         *      @body
         *          [
         *              {
         *                  "name": String,
         *                  "expirationDate": String,
         *              },
         *          ]
         */
        timerListRouter.get('/', async (ctx) => {
            ctx.body = await TimerModel.find({
                "expirationDate": false,
            }).sort({
                "expirationDate": 1,
            });
        });

        router.use('/timerList', timerListRouter.routes());
    }

    app
        .use(router.routes())
        .use(router.allowedMethods());

    app.listen(PORT);
    console.log(`Freshness Server is running on ${PORT}.`);
})()
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
