import { config } from 'dotenv'
config()
import express from 'express'
const app = express();
import { attachFinishMethod, expressErrorHandler } from './app.util';
import { connect } from "mongoose";
import { management } from './modules/package/package.route';
import bodyParser from 'body-parser';
const { log } = console;
const { PORT, MONGODB_URL } = process.env;

app.listen(PORT, () => log("server on : ", PORT));

app.use(bodyParser.json())

connect(MONGODB_URL, { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: true })
    .then(() => console.log("connected"))
    .catch(err => console.log("Database Error", err));

/* 
    INFO : attachFinishMethod callback attaches finish method (req.finish) to every incoming request  
*/
app.use(attachFinishMethod);

app.use(management)

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
