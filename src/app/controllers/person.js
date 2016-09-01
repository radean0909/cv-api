/** 
 * 	Dependencies
 */

import Person from '../models/person';
import db from '../../db';

/*
 * 	Basic CRUD functionality with minimal search and soft/hard remove logic
 */

function get(req, res, next) {
	const query = (req.query.s) ? new RegExp(req.query.s, "i") : null; 

	const params = (query) ? {name: query, $or: [ {deleted:false}, {deleted: {$exists: false} } ] }  : {$or: [ {deleted:false}, {deleted: {$exists: false} } ] }; 

	Person.findOne(params, null, { lean: true }, (err, results) => {
		if (err) return res.json(err);
		if (results) return res.json(results);
		else return res.json({error: Person.modelName + ' not found.'});
	});
}

function create(req,res,next) {
	const person = new Person(req.body);

	person.save((err) => {
		if (err) return res.json({status:'error', error: err});
		return res.json({status: 'saved', data: person});
	});
}

function update(req, res, next) {
	const id = req.params.id;
	const data = req.body;
	const params ={_id: id, $or: [ {deleted:false}, {deleted: {$exists: false} } ] };
	
	if (!id) return res.json({error: 'Invalid params, id required'});

	Person.findOneAndUpdate(params, {$set: data}, {lean: true, new:true}, (err, results) => {
		if (err) return res.json(err);
		if (results) return res.json(results);
		else return res.json({error: Person.modelName + ' not found.'});
	});
}

function remove(req, res, next) {
	const id = req.params.id;
	const force = req.params.force || false; 
	
	if (!id) return res.json({error: 'Invalid params, id required'});

	if (force) {
		// hard remove
		Person.findOneAndRemove({_id: id}, (err, results) => {
			if (err) return res.json(err);
			if (results) return res.json(results);
			else return res.json({error: Person.modelName + ' not found.'});
		});
	} else {
		// soft remove
		Person.findOneAndUpdate({_id: id}, {$set: {deleted: true} }, {lean: true, new:true}, (err, results) => {
			if (err) return res.json(err);
			if (results) return res.json(results);
			else return res.json({error: Person.modelName + ' not found.'});
		});
	}
}

/*
 *	Additional business logic
 */

function addView(req, res, next) {
	const id = req.params.id;
	Person.findOneAndUpdate({_id: id}, {$inc: { views: 1}}, { new:true, lean: true}, (err, results) => {
		if (err) return res.json(err);
		if (results) return res.json({views: results.views});
		else return res.json({error: Person.modelName + ' not found.'});
	});
}

export {get, create, update, remove, addView}

export default {
	get: get, 
	create: create,
	update:update,
	remove: remove,
	addView: addView
}
