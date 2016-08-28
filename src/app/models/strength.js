/*
 *	Dependencies
 */
 
import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let strengthSchema = new Schema({
	name: String,
	score: { type:Number, min: 1, max: 10 },
	skills: [String]
});



function sql(sequelize) {
	// TODO: Implement SQL version of model.

}

export {sql};
export default strengthSchema;
