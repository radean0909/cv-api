/*
 *	Dependencies
 */
 
import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let projectSchema = new Schema({
	name: String,
	type: String,
	url: String,
	repo: String,
	startDate: String,
	description: String
});


function sql(sequelize) {
	// TODO: Implement SQL version of model.

}

export { sql };
export default projectSchema;