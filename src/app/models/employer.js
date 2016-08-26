/*
 *	Dependencies
 */
import mongoose from 'mongoose';

function mongo() {

	const Schema = mongoose.Schema;

	let employerSchema = new Schema({
		name: String,
		title: String,
		startDate: String,
		endDate: String,
		description: String,
		challenges: [String],
		achievements: [String]
	});

	// this is a subdocument, so doesn't need to return a model
	return employerSchema;
	
}

function sql(sequelize) {
	// TODO: Implement SQL version of model.

}

export default mongo;
export { mongo, sql };