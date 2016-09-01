 /* 
 * Dependencies 
 */

 import _ from 'lodash';

 const config = {
 	development: {
 		 mongo: {
 		 	uri:  process.env.MONGO_CONNECTION || 'mongodb://localhost/cv'
	 	}
 	},
 	test: {
	 	mongo: {
	 		uri: 'mongodb://localhost/cv'
	 	}
 	},
 	production: {
 	 	mongo: {
 	 		uri: process.env.MONGO_CONNECTION || 'mongodb://localhost/cv'
	 	},	 	
	 	logging: 'tiny'
 	},
 	defaults: {
 	 	mongo: {
 	 		uri:  process.env.MONGO_CONNECTION || 'mongodb://localhost/cv'
	 	},
	 	sqlLite: {

	 	},
	 	logging: 'dev',
	 	server: {
	 		port: process.env.PORT || 8080.
	 		url: process.env.HEROKU_URI || 'http://localhost' 
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