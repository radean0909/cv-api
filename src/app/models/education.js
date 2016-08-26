/*
 *	Dependencies
 */
import mongoose from 'mongoose';

function mongo() {

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

	// this is a subdocument, so doesn't need to return a model
	return educationSchema;
	
}

function sql(sequelize) {
	// TODO: Implement SQL version of model.

}

export { mongo, sql };
export default mongo;