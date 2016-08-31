 /* 
 * Dependencies 
 */

 import _ from 'lodash';

 const config = {
 	development: {
 		 mongo: {
 		 	uri: 'mongodb://<dbuser>:<dbpassword>@ds147965.mlab.com:47965/cv'
	 	},
	 	sqlLite: {

	 	}
 	},
 	test: {
	 	mongo: {
	 		uri: 'mongodb://localhost/cv'
	 	},
	 	sqlLite: {

	 	}
 	},
 	production: {
 	 	mongo: {
 	 		uri: process.env.MOGNO_CONNECTION
	 	},
	 	sqlLite: {

	 	},
	 	logging: 'tiny'
 	},
 	defaults: {
 	 	mongo: {
 	 		uri: 'mongodb://localhost/cv'
	 	},
	 	sqlLite: {

	 	},
	 	logging: 'dev',
	 	server: {
	 		port: process.env.PORT
	 	}
 	}

 };

 export default function() {
 	const env = process.env.NODE_ENV | 'defaults';

 	if (env !== 'defaults')
 		return _.defaultsDeep(config[env], config.defaults); //overwrite teh defaults with the environment settings
 	else
 		return config.defaults;
 }