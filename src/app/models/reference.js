/*
 *	Dependencies
 */
 
import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let referenceSchema = new Schema({
	name: String,
	email: String, 
	company: String,
	title: String,
	quote: String
});


function sql(sequelize) {
	// TODO: Implement SQL version of model.

}

export { sql };
export default referenceSchema;