/*
 *	Dependencies
 */
 
import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let employerSchema = new Schema({
	name: String,
	title: String,
	dates: String,
	description: String,
	difficulties: String,
	achievements: String
});


function sql(sequelize) {
	// TODO: Implement SQL version of model.

}

export default employerSchema;
export { sql };