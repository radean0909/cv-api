/*
 *	Dependencies
 */
import mongoose from 'mongoose';

function mongo() {

	const Schema = mongoose.Schema;

	let projectSchema = new Schema({
		name: String,
		type: String,
		url: String,
		repo: String,
		startDate: String,
		description: String
	});

	// this is a subdocument, so doesn't need to return a model
	return projectSchema;
	
}

function sql(sequelize) {
	// TODO: Implement SQL version of model.

}

export { mongo, sql };
export default mongo;