/*
 * 	Dependencies
 */

import mongoose from 'mongoose';


function mongo(config) {
	if (!mongoose.connection.readyState)
		mongoose.connect(config.mongo.uri);
	return mongoose;
}

export {mongo};
export default mongo;