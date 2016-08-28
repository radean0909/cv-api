/* 
 * Dependencies 
 */

import express from 'express';
import bodyParser from 'body-parser';
import router from './routes';

import morgan from 'morgan';
import winston from 'winston';

import Config from './app/boot/config';
import { mongo } from './db';

// create app
const app = express();
const config = new Config();

mongo(config);

// logging
const logger = morgan(config.logging);

app.use(bodyParser.json())
	.use(bodyParser.urlencoded({extended: true}))
	.use(logger);

router(app);

app.listen(config.server.port, () => {
	winston.info('App listening on port %d' , config.server.port);
});
