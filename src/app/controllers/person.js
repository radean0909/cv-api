/** 
 * 	Dependencies
 */

import Person from '../models/person';
import db from '../../db';


function get(req, res, next) {
	const params = req.params || {};
	const person = new Person();
	person.findOne(params, null, { lean: true }, (err, results) => {
		
		if (err) return res.json(err);

		if (results)
			return res.json(results);
		else
			return res.json({error: 'No data found!'});
	});
}

function post(req,res,next) {
	const person = new Person(req.body);
	person.save((err) => {
		if (err) return res.json({status:'error', error: err});
		return res.json({status: 'saved', data: person});
	});
}


export {get, post}

export default {get: get, post: post}
