 /* 
 * Dependencies 
 */

 import _ from 'lodash';

 const config = {
 	development: {
 		 mongo: {
 		 	uri: 'mongodb://localhost/cv'
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
 	 		uri: 'mongodb://localhost/cv'
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
	 		port: 8080
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