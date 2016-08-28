/*
 *	Dependencies
 */

import mongoose from 'mongoose';
import Education from './education';
import Employer from './employer';
import Project from './project';
import Strength from './strength';

const Schema = mongoose.Schema;

const personSchema = new Schema({
	name: String,
	title: String,
	email: String,
	phone: String,
	city: String,
	state: {type: String, maxLength: 2},
	image: String,
	employers: [Employer],
	strengths: [Strength],
	education: [Education],
	projects: [Project],
	views: {type: Number, default: 0},
	deleted: Boolean
});

export default mongoose.model('Person', personSchema);
	