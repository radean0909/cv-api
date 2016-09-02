 /* 
 * Dependencies 
 */

 import merge from 'object-merge';

 const config = {
 	development: {
 		 mongo: {
 		 	uri:  process.env.MONGO_CONNECTION || 'mongodb://localhost/cv'
	 	}
 	},
 	test: {
	 	mongo: {
	 		uri: 'mongodb://localhost/cv_test'
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
	 		port: process.env.PORT || 8080,
	 		url: process.env.HEROKU_URI || 'http://localhost' 
	 	}
 	}

 };

 export default function() {
 	const env = process.env.NODE_ENV || 'defaults';	
 	return merge( config.defaults, config[env]); //overwrite the defaults with the environment settings
 }