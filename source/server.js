/**
 * This is the entrance fo the server.
 */

'use strict';

(async () => {
    const Koa = require('koa');
    const KoaBodyParser = require('koa-bodyparser');
    const KoaCors = require('@koa/cors');
    const KoaRouter = require('koa-router');
    const sequelize = require('./library/sequelize');

    await sequelize.sync();

    const PORT = 3000;

    const app = new Koa();
    app.use(KoaBodyParser());
    app.use(KoaCors());
    const router = new KoaRouter();

    /*
     @uri
     API for checking whether server is running.
     @get /
     @response
          @body
              "Welcome to Freshness Server."
     */
    router.get('/', (ctx) => {
        ctx.body = "Welcome to Freshness Server.";
    });

    const TimerModel = require('./model/Timer');

    {
        const timerRouter = new KoaRouter();

        /*
         @uri
         Create new timer.
         @post /timer
         @request
              @body
                  {
                      "name": String,
                      "expirationDate": String,
                  }
         @response
              @body
                  {
                      "name": String,
                      "expirationDate": String,
                  }
         */
        timerRouter.post('/', async (ctx) => {
            const timer = TimerModel.build({
                "name": ctx.request.body.name,
                "expirationDate": (() => {
                    const expirationDate = new Date(ctx.request.body.expirationDate);
                    ctx.assert(!isNaN(expirationDate.getTime()));
                    return expirationDate;
                })(),
            });
            ctx.body = await timer.save();
        });

        /*
         @uri
         Update timer.
         @put /timer/:timerId
         @request
              @path
                  {String} timerId - The ID of timer
              @body
                  {
                      "name": String,
                      "expirationDate": String,
                  }
         @response
              @body
                  {
                      "name": String,
                      "expirationDate": String,
                  }
         */
        timerRouter.put('/:timerId', async (ctx) => {
            const timerId = ctx.params.timerId;
            const { name, expirationDate } = ctx.request.body;
            ctx.assert(name || expirationDate, 400, 'name and expirationDate are required.');

            const timer = await TimerModel.findOne(
                {
                    "where": {
                        "id": timerId,
                    },
                },
            );
            if (timer) {
                Object.assign(timer, { name, expirationDate });
                ctx.body = await timer.save();
            } else {
                ctx.status = 404;
            }
        });

        /*
         @uri
         Delete timer.
         @delete /timer/:timerId
         @request
              @path
                  {String} timerId - The ID of timer
         @response
              @body
                  {
                      "name": String,
                      "expirationDate": String,
                  }
         */
        timerRouter.delete('/:timerId', async (ctx) => {
            const timerId = ctx.params.timerId;
            const timer = await TimerModel.findOne(
                {
                    "where": {
                        "id": timerId,
                    },
                },
            );
            if (timer) {
                timer.isDeleted = true;
                ctx.body = await timer.save();
            } else {
                ctx.status = 404;
            }
        });

        router.use('/timer', timerRouter.routes());
    }

    {
        const timerListRouter = new KoaRouter();

        /*
         @uri
         Get timer list.
         @get /timerList
         @response
              @body
                  [
                      {
                          "id": String,
                          "name": String,
                          "expirationDate": String,
                      },
                  ]
         */
        timerListRouter.get('/', async (ctx) => {
            ctx.body = await TimerModel.findAll({
                "where": {
                    "isDeleted": false,
                },
                "order": [
                    ["expirationDate", "ASC"],
                ],
            });
        });

        router.use('/timerList', timerListRouter.routes());
    }

    app
        .use(router.routes())
        .use(router.allowedMethods());

    app.listen(PORT, () => {
        console.log(`Freshness Server is running on ${PORT}.`);
    });
})()
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
