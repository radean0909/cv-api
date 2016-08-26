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
	app.post('/person', person.post)

}