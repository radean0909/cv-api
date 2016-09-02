/* 
 * Dependencies
 */
import request from 'supertest';
import app from '../server';
import { expect } from 'chai';
import Person from '../app/models/person';
import stub from './personStub';

console.log('--== STARTING TESTS ==--');
const req = request(app);

describe('API', () => {

	let personId = null;
	let personCount = 0;

	before(done => {
		// Create a new person to test
		Person.collection.drop();
		let testPerson = new Person(stub);
		testPerson.save().then((err) => {
			done();
		});
	});

	beforeEach(done => {
		Person.count({}).then((results) => {
			personCount = results;
			done();
		});
		
	});
	
	it('should boot', done=> {
		req.get('/person')
			.expect(200)
			.end((err, res) => {
				done();
			});
	});

	it('GET /person should output a properly JSON encoded resume', done => {
		req.get('/person')
			.expect(200)
			.end((err, res) => {
				// check object format	
				checkResumeObject(res);

				// set vars
				personId = res.body._id;

				// check count
				expect(personCount).to.be.equal(1);

				done();
			});
	});

	it('GET /person/:id should output a properly JSON encoded resume', done => {
		req.get('/person/' + personId)
			.expect(200)
			.end((err, res) => {
				// check object format	
				checkResumeObject(res);

				// set vars
				personId = res.body._id;

				// check count
				expect(personCount).to.be.equal(1);

				done();
			});
	});

	it('PUT /person should output a properly JSON encoded resume', done => {
		req.put('/person/' +personId)
			.send(stub)
			.expect(200)
			.end((err, res) => {
				// check object format	
				checkResumeObject(res);

				// set vars
				personId = res.body._id;

				// check count
				expect(personCount).to.be.equal(1);

				done();
			});
	});

	it('POST /person should add a new resume and return the entry', done => {
		req.post('/person')
			.send(stub)
			.expect(200)
			.end((err, res) => {
				// check object format	
				checkResumeCreationObject(res);

				// set vars
				personId = res.body.data._id;

				// check count
				Person.count({}).then( count => {
					personCount = count;
					expect(personCount).to.be.equal(2);

					done();
				})			
			});
	});

	it('DELETE /person/:id should soft-delete the entry', done => {
		req.delete('/person/' + personId)
			.expect(200)
			.end((err, res) => {

				// First look for ALL records, should not change
				Person.count({}).then( count => {
					personCount = count;
					expect(personCount).to.be.equal(2);
					// Now look for soft-deleted entries
					Person.count({deleted: true}).then( deleted => {
						expect(deleted).to.be.equal(1);
						done();
					});
				});
			});
	});

	it('DELETE /person/:id should hard-delete the entry', done => {
		req.delete('/person/' + personId + '/true')
			.expect(200)
			.end((err, res) => {

				// First look for ALL records, should not change
				Person.count({}).then( count => {
					personCount = count;
					expect(personCount).to.be.equal(1);
					// Now look for soft-deleted entries
					Person.count({deleted: true}).then( deleted => {
						expect(deleted).to.be.equal(0);
						done();
					});
				});
			});
	});

	after( done => {
		console.log('--== TESTS COMPLETE ==--');
		process.exit(0);
	});

});


/* 
 * 		Helper Functions
 */

function checkResumeObject(res) {
	// Basic Info
	expect(res.body).to.be.json;
	expect(res.body).to.be.a('object');

	// Property Existance
	expect(res.body).to.have.property('_id');
	expect(res.body).to.have.property('name');
	expect(res.body).to.have.property('email');
	expect(res.body).to.have.property('phone');
	expect(res.body).to.have.property('city');
	expect(res.body).to.have.property('state');
	expect(res.body).to.have.property('tagline');
	expect(res.body).to.have.property('image');
	expect(res.body).to.have.property('intro');
	expect(res.body).to.have.property('views');
	expect(res.body).to.have.property('website');
	expect(res.body).to.have.property('projects');
	expect(res.body).to.have.property('references');
	expect(res.body).to.have.property('education');
	expect(res.body).to.have.property('strengths');

	// Property Types
	expect(res.body.projects).to.be.a('array');
	expect(res.body.references).to.be.a('array');
	expect(res.body.strengths).to.be.a('array');
	expect(res.body.employers).to.be.a('array');
	expect(res.body.education).to.be.a('array');

	// Projects
	expect(res.body.projects).to.have.length.above(0);
	expect(res.body.projects[0]).to.be.a('object');
	expect(res.body.projects[0]).to.have.property('startDate');
	expect(res.body.projects[0]).to.have.property('repo');
	expect(res.body.projects[0]).to.have.property('description');
	expect(res.body.projects[0]).to.have.property('name');
	expect(res.body.projects[0]).to.have.property('_id');

	// References
	expect(res.body.references).to.have.length.above(0);
	expect(res.body.references[0]).to.be.a('object');
	expect(res.body.references[0]).to.have.property('name');
	expect(res.body.references[0]).to.have.property('email');
	expect(res.body.references[0]).to.have.property('quote');
	expect(res.body.references[0]).to.have.property('title');
	expect(res.body.references[0]).to.have.property('company');
	expect(res.body.references[0]).to.have.property('_id');

	// Strengths
	expect(res.body.strengths).to.have.length.above(0);
	expect(res.body.strengths[0]).to.be.a('object');
	expect(res.body.strengths[0]).to.have.property('_id');
	expect(res.body.strengths[0]).to.have.property('score');
	expect(res.body.strengths[0]).to.have.property('name');
	expect(res.body.strengths[0]).to.have.property('skills');
	expect(res.body.strengths[0].skills).to.be.a('array');
	expect(res.body.strengths[0].skills).to.have.length.above(0);

	// Employers
	expect(res.body.employers).to.have.length.above(0);
	expect(res.body.employers[0]).to.be.a('object');
	expect(res.body.employers[0]).to.have.property('name');
	expect(res.body.employers[0]).to.have.property('dates');
	expect(res.body.employers[0]).to.have.property('difficulties');
	expect(res.body.employers[0]).to.have.property('description');
	expect(res.body.employers[0]).to.have.property('achievements');
	expect(res.body.employers[0]).to.have.property('title');
	expect(res.body.employers[0]).to.have.property('_id');

	// Education
	expect(res.body.education).to.have.length.above(0);
	expect(res.body.education[0]).to.be.a('object');
	expect(res.body.education[0]).to.have.property('name');
	expect(res.body.education[0]).to.have.property('type');
	expect(res.body.education[0]).to.have.property('school');
	expect(res.body.education[0]).to.have.property('city');
	expect(res.body.education[0]).to.have.property('state');
	expect(res.body.education[0]).to.have.property('dates');
	expect(res.body.education[0]).to.have.property('status');
	expect(res.body.education[0]).to.have.property('achievements');
	expect(res.body.education[0]).to.have.property('_id');
}

function checkResumeCreationObject(res) {
	// Basic Info
	expect(res.body).to.be.json;
	expect(res.body).to.be.a('object');

	// Status
	expect(res.body).to.have.property('status');
	expect(res.body).to.have.property('data');
	expect(res.body.status).to.be.equal('saved');

	// Property Existance
	expect(res.body.data).to.have.property('_id');
	expect(res.body.data).to.have.property('name');
	expect(res.body.data).to.have.property('email');
	expect(res.body.data).to.have.property('phone');
	expect(res.body.data).to.have.property('city');
	expect(res.body.data).to.have.property('state');
	expect(res.body.data).to.have.property('tagline');
	expect(res.body.data).to.have.property('image');
	expect(res.body.data).to.have.property('intro');
	expect(res.body.data).to.have.property('views');
	expect(res.body).to.have.property('website');
	expect(res.body.data).to.have.property('projects');
	expect(res.body.data).to.have.property('references');
	expect(res.body.data).to.have.property('education');
	expect(res.body.data).to.have.property('strengths');

	// Property Types
	expect(res.body.data.projects).to.be.a('array');
	expect(res.body.data.references).to.be.a('array');
	expect(res.body.data.strengths).to.be.a('array');
	expect(res.body.data.employers).to.be.a('array');
	expect(res.body.data.education).to.be.a('array');

	// Projects
	expect(res.body.data.projects).to.have.length.above(0);
	expect(res.body.data.projects[0]).to.be.a('object');
	expect(res.body.data.projects[0]).to.have.property('startDate');
	expect(res.body.data.projects[0]).to.have.property('repo');
	expect(res.body.data.projects[0]).to.have.property('description');
	expect(res.body.data.projects[0]).to.have.property('name');
	expect(res.body.data.projects[0]).to.have.property('_id');

	// References
	expect(res.body.data.references).to.have.length.above(0);
	expect(res.body.data.references[0]).to.be.a('object');
	expect(res.body.data.references[0]).to.have.property('name');
	expect(res.body.data.references[0]).to.have.property('email');
	expect(res.body.data.references[0]).to.have.property('quote');
	expect(res.body.data.references[0]).to.have.property('title');
	expect(res.body.data.references[0]).to.have.property('company');
	expect(res.body.data.references[0]).to.have.property('_id');

	// Strengths
	expect(res.body.data.strengths).to.have.length.above(0);
	expect(res.body.data.strengths[0]).to.be.a('object');
	expect(res.body.data.strengths[0]).to.have.property('_id');
	expect(res.body.data.strengths[0]).to.have.property('score');
	expect(res.body.data.strengths[0]).to.have.property('name');
	expect(res.body.data.strengths[0]).to.have.property('skills');
	expect(res.body.data.strengths[0].skills).to.be.a('array');
	expect(res.body.data.strengths[0].skills).to.have.length.above(0);

	// Employers
	expect(res.body.data.employers).to.have.length.above(0);
	expect(res.body.data.employers[0]).to.be.a('object');
	expect(res.body.data.employers[0]).to.have.property('name');
	expect(res.body.data.employers[0]).to.have.property('dates');
	expect(res.body.data.employers[0]).to.have.property('difficulties');
	expect(res.body.data.employers[0]).to.have.property('description');
	expect(res.body.data.employers[0]).to.have.property('achievements');
	expect(res.body.data.employers[0]).to.have.property('title');
	expect(res.body.data.employers[0]).to.have.property('_id');

	// Education
	expect(res.body.data.education).to.have.length.above(0);
	expect(res.body.data.education[0]).to.be.a('object');
	expect(res.body.data.education[0]).to.have.property('name');
	expect(res.body.data.education[0]).to.have.property('type');
	expect(res.body.data.education[0]).to.have.property('school');
	expect(res.body.data.education[0]).to.have.property('city');
	expect(res.body.data.education[0]).to.have.property('state');
	expect(res.body.data.education[0]).to.have.property('dates');
	expect(res.body.data.education[0]).to.have.property('status');
	expect(res.body.data.education[0]).to.have.property('achievements');
	expect(res.body.data.education[0]).to.have.property('_id');
}
