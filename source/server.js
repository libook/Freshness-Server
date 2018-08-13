/**
 * This is the entrance fo the server.
 */

'use strict';

(async () => {
    const mongoose = require('mongoose');

    await mongoose.connect('mongodb://192.168.50.89:27017/freshness', {
        "useNewUrlParser": true,
    });

    const Koa = require('koa');
    const KoaBodyParser = require('koa-bodyparser');
    const KoaCors = require('@koa/cors');
    const KoaRouter = require('koa-router');

    const PORT = 3000;

    const app = new Koa();
    app.use(KoaBodyParser());
    app.use(KoaCors());
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

        /**
         * @uri
         * Update timer.
         * @put /timer/:timerId
         * @request
         *      @params
         *          {String} timerId - The ID of timer
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
        timerRouter.put('/:timerId', async (ctx) => {
            const updatedTimer = await TimerModel.findOneAndUpdate(
                {
                    "_id": ctx.params.timerId,
                },
                {
                    "$set": ctx.request.body,
                },
                {
                    "new": true,
                },
            );
            if (updatedTimer) {
                ctx.body = updatedTimer;
            } else {
                ctx.status = 404;
            }
        });

        /**
         * @uri
         * Delete timer.
         * @delete /timer/:timerId
         * @request
         *      @params
         *          {String} timerId - The ID of timer
         * @response
         *      @body
         *          {
         *              "name": String,
         *              "expirationDate": String,
         *          }
         */
        timerRouter.delete('/:timerId', async (ctx) => {
            const deletedTimer = await TimerModel.findOneAndUpdate(
                {
                    "_id": ctx.params.timerId,
                },
                {
                    "$set": {
                        "isDeleted": true,
                    },
                },
                {
                    "new": true,
                },
            );
            if (deletedTimer) {
                ctx.body = deletedTimer;
            } else {
                ctx.status = 404;
            }
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
                "isDeleted": false,
            }, {
                "isDeleted": false,
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
