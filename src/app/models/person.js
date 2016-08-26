/*
 *	Dependencies
 */

import mongoose from 'mongoose';



const Schema = mongoose.Schema;

const educationSchema = new Schema({
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

const employerSchema = new Schema({
	name: String,
	title: String,
	startDate: String,
	endDate: String,
	description: String,
	challenges: [String],
	achievements: [String]
});

const projectSchema = new Schema({
	name: String,
	type: String,
	url: String,
	repo: String,
	startDate: String,
	description: String
});

const strengthSchema = new Schema({
	name: String,
	score: { type:Number, min: 1, max: 10 },
	skills: [String]
});

const applicantSchema = new Schema({
	name: String,
	title: String,
	email: String,
	phone: String,
	city: String,
	state: {type: String, maxLength: 2},
	image: String,
	employers: [employerSchema],
	strengths: [strengthSchema],
	education: [educationSchema],
	projects: [projectSchema]
});

export default mongoose.model('Applicant', applicantSchema);
	