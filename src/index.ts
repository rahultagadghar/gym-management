import { config } from 'dotenv'
config()
import express from 'express'
const app = express();
import 'reflect-metadata'
import { connect } from "mongoose";
import bodyParser from 'body-parser';
import { attachFinishMethod, expressErrorHandler } from './app.util';
import { management } from './modules/package/package.route';

import { dashBoard } from './modules/dashboard/dashboard.route';
const { log } = console;
const { PORT, MONGODB_URL } = process.env;

app.listen(PORT, () => log("server on : ", PORT));

app.use(bodyParser.json())

connect(MONGODB_URL, { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: true })
    .then(() => {
        console.log("connected");

        /* 
            INFO : attachFinishMethod callback attaches finish method (req.finish) to every incoming request  
        */
        app.use(attachFinishMethod);

        app.use(management)
        app.use(dashBoard)

        /* 
            INFO : 
                    * 200 is default success http statusCode for get method
                    * 201 is default success http statusCode for rest of the methods 
                    * 400 is default failure http statusCode for all methods
        */


        /* 
            INFO : Standard error handler,
                   When we execute next() from api it is passed to next middleware 
                   which is in our case expressErrorHandler and request is terminated !
        */
        app.use(expressErrorHandler);

    })
    .catch(err => console.log(err));
