/*
 *	Dependencies
 */
 
import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let educationSchema = new Schema({
	name: String,
	type: String,
	school: String,
	city: String,
	state: {type: String, maxLength:2},
	startDate: String,
	endDate: String,
	status: String,
	achievements: [String]
});


function sql(sequelize) {
	// TODO: Implement SQL version of model.

}

export { sql };
export default educationSchema;