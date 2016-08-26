/*
 *	Dependencies
 */
import mongoose from 'mongoose';

function mongo() {

	const Schema = mongoose.Schema;

	let strengthSchema = new Schema({
		name: String,
		score: { type:Number, min: 1, max: 10 },
		skills: [String]
	});

	// this is a subdocument, so doesn't need to return a model
	return strengthSchema;
	
}

function sql(sequelize) {
	// TODO: Implement SQL version of model.

}

export {mongo, sql};
export default mongo;
