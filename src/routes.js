/** 
 * 	Dependencies
 */
 
import person from './app/controllers/person';

export default (app) => {

	// Endpoints
	app.get('/', (req, res) => {
		res.json({status: 'success'});
	});

	app.get('/person', person.get);
	app.get('/person/:id', person.get);

	app.post('/person', person.create);

	app.put('/person/:id', person.update);
	app.put('/person/addView/:id', person.addView);
	app.delete('/person/:id', person.remove);
	app.delete('/person/:id/:force', person.remove);


}