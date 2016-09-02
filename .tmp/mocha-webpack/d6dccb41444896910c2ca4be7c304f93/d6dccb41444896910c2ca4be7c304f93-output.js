/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	
	    var testsContext = __webpack_require__(1);

	    var runnable = testsContext.keys();

	    runnable.forEach(testsContext);
	    

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var map = {
		"./1.api.test.js": 2
	};
	function webpackContext(req) {
		return __webpack_require__(webpackContextResolve(req));
	};
	function webpackContextResolve(req) {
		return map[req] || (function() { throw new Error("Cannot find module '" + req + "'.") }());
	};
	webpackContext.keys = function webpackContextKeys() {
		return Object.keys(map);
	};
	webpackContext.resolve = webpackContextResolve;
	module.exports = webpackContext;
	webpackContext.id = 1;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _supertest = __webpack_require__(3);

	var _supertest2 = _interopRequireDefault(_supertest);

	var _server = __webpack_require__(4);

	var _server2 = _interopRequireDefault(_server);

	var _chai = __webpack_require__(22);

	var _person = __webpack_require__(9);

	var _person2 = _interopRequireDefault(_person);

	var _personStub = __webpack_require__(23);

	var _personStub2 = _interopRequireDefault(_personStub);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	console.log('--== STARTING SERVER==--'); /* 
	                                          * Dependencies
	                                          */

	var req = (0, _supertest2.default)(_server2.default);
	console.log('--==  BEGINNING TESTS==--');
	describe('API', function () {

		var personId = null;
		var personCount = 0;

		before(function (done) {
			// Create a new person to test
			_person2.default.collection.drop();
			var testPerson = new _person2.default(_personStub2.default);
			testPerson.save().then(function (err) {
				done();
			});
		});

		beforeEach(function (done) {
			_person2.default.count({}).then(function (results) {
				personCount = results;
				done();
			});
		});

		it('should boot', function (done) {
			req.get('/person').expect(200).end(function (err, res) {
				done();
			});
		});

		it('GET /person should output a properly JSON encoded resume', function (done) {
			req.get('/person').expect(200).end(function (err, res) {
				// check object format	
				checkResumeObject(res);

				// set vars
				personId = res.body._id;

				// check count
				(0, _chai.expect)(personCount).to.be.equal(1);

				done();
			});
		});

		it('GET /person/:id should output a properly JSON encoded resume', function (done) {
			req.get('/person/' + personId).expect(200).end(function (err, res) {
				// check object format	
				checkResumeObject(res);

				// set vars
				personId = res.body._id;

				// check count
				(0, _chai.expect)(personCount).to.be.equal(1);

				done();
			});
		});

		it('PUT /person should output a properly JSON encoded resume', function (done) {
			req.put('/person/' + personId).send(_personStub2.default).expect(200).end(function (err, res) {
				// check object format	
				checkResumeObject(res);

				// set vars
				personId = res.body._id;

				// check count
				(0, _chai.expect)(personCount).to.be.equal(1);

				done();
			});
		});

		it('POST /person should add a new resume and return the entry', function (done) {
			req.post('/person').send(_personStub2.default).expect(200).end(function (err, res) {
				// check object format	
				checkResumeCreationObject(res);

				// set vars
				personId = res.body.data._id;

				// check count
				_person2.default.count({}).then(function (count) {
					personCount = count;
					(0, _chai.expect)(personCount).to.be.equal(2);

					done();
				});
			});
		});

		it('DELETE /person/:id should soft-delete the entry', function (done) {
			req.delete('/person/' + personId).expect(200).end(function (err, res) {

				// First look for ALL records, should not change
				_person2.default.count({}).then(function (count) {
					personCount = count;
					(0, _chai.expect)(personCount).to.be.equal(2);
					// Now look for soft-deleted entries
					_person2.default.count({ deleted: true }).then(function (deleted) {
						(0, _chai.expect)(deleted).to.be.equal(1);
						done();
					});
				});
			});
		});

		it('DELETE /person/:id should hard-delete the entry', function (done) {
			req.delete('/person/' + personId + '/true').expect(200).end(function (err, res) {

				// First look for ALL records, should not change
				_person2.default.count({}).then(function (count) {
					personCount = count;
					(0, _chai.expect)(personCount).to.be.equal(1);
					// Now look for soft-deleted entries
					_person2.default.count({ deleted: true }).then(function (deleted) {
						(0, _chai.expect)(deleted).to.be.equal(0);
						done();
					});
				});
			});
		});

		after(function (done) {
			console.log('--== TESTS COMPLETE ==--');
			process.exit(0);
		});
	});

	/* 
	 * 		Helper Functions
	 */

	function checkResumeObject(res) {
		// Basic Info
		(0, _chai.expect)(res.body).to.be.json;
		(0, _chai.expect)(res.body).to.be.a('object');

		// Property Existance
		(0, _chai.expect)(res.body).to.have.property('_id');
		(0, _chai.expect)(res.body).to.have.property('name');
		(0, _chai.expect)(res.body).to.have.property('email');
		(0, _chai.expect)(res.body).to.have.property('phone');
		(0, _chai.expect)(res.body).to.have.property('city');
		(0, _chai.expect)(res.body).to.have.property('state');
		(0, _chai.expect)(res.body).to.have.property('tagline');
		(0, _chai.expect)(res.body).to.have.property('image');
		(0, _chai.expect)(res.body).to.have.property('intro');
		(0, _chai.expect)(res.body).to.have.property('views');
		(0, _chai.expect)(res.body).to.have.property('projects');
		(0, _chai.expect)(res.body).to.have.property('references');
		(0, _chai.expect)(res.body).to.have.property('education');
		(0, _chai.expect)(res.body).to.have.property('strengths');

		// Property Types
		(0, _chai.expect)(res.body.projects).to.be.a('array');
		(0, _chai.expect)(res.body.references).to.be.a('array');
		(0, _chai.expect)(res.body.strengths).to.be.a('array');
		(0, _chai.expect)(res.body.employers).to.be.a('array');
		(0, _chai.expect)(res.body.education).to.be.a('array');

		// Projects
		(0, _chai.expect)(res.body.projects).to.have.length.above(0);
		(0, _chai.expect)(res.body.projects[0]).to.be.a('object');
		(0, _chai.expect)(res.body.projects[0]).to.have.property('startDate');
		(0, _chai.expect)(res.body.projects[0]).to.have.property('repo');
		(0, _chai.expect)(res.body.projects[0]).to.have.property('description');
		(0, _chai.expect)(res.body.projects[0]).to.have.property('name');
		(0, _chai.expect)(res.body.projects[0]).to.have.property('_id');

		// References
		(0, _chai.expect)(res.body.references).to.have.length.above(0);
		(0, _chai.expect)(res.body.references[0]).to.be.a('object');
		(0, _chai.expect)(res.body.references[0]).to.have.property('name');
		(0, _chai.expect)(res.body.references[0]).to.have.property('email');
		(0, _chai.expect)(res.body.references[0]).to.have.property('quote');
		(0, _chai.expect)(res.body.references[0]).to.have.property('title');
		(0, _chai.expect)(res.body.references[0]).to.have.property('company');
		(0, _chai.expect)(res.body.references[0]).to.have.property('_id');

		// Strengths
		(0, _chai.expect)(res.body.strengths).to.have.length.above(0);
		(0, _chai.expect)(res.body.strengths[0]).to.be.a('object');
		(0, _chai.expect)(res.body.strengths[0]).to.have.property('_id');
		(0, _chai.expect)(res.body.strengths[0]).to.have.property('score');
		(0, _chai.expect)(res.body.strengths[0]).to.have.property('name');
		(0, _chai.expect)(res.body.strengths[0]).to.have.property('skills');
		(0, _chai.expect)(res.body.strengths[0].skills).to.be.a('array');
		(0, _chai.expect)(res.body.strengths[0].skills).to.have.length.above(0);

		// Employers
		(0, _chai.expect)(res.body.employers).to.have.length.above(0);
		(0, _chai.expect)(res.body.employers[0]).to.be.a('object');
		(0, _chai.expect)(res.body.employers[0]).to.have.property('name');
		(0, _chai.expect)(res.body.employers[0]).to.have.property('dates');
		(0, _chai.expect)(res.body.employers[0]).to.have.property('difficulties');
		(0, _chai.expect)(res.body.employers[0]).to.have.property('description');
		(0, _chai.expect)(res.body.employers[0]).to.have.property('achievements');
		(0, _chai.expect)(res.body.employers[0]).to.have.property('title');
		(0, _chai.expect)(res.body.employers[0]).to.have.property('_id');

		// Education
		(0, _chai.expect)(res.body.education).to.have.length.above(0);
		(0, _chai.expect)(res.body.education[0]).to.be.a('object');
		(0, _chai.expect)(res.body.education[0]).to.have.property('name');
		(0, _chai.expect)(res.body.education[0]).to.have.property('type');
		(0, _chai.expect)(res.body.education[0]).to.have.property('school');
		(0, _chai.expect)(res.body.education[0]).to.have.property('city');
		(0, _chai.expect)(res.body.education[0]).to.have.property('state');
		(0, _chai.expect)(res.body.education[0]).to.have.property('dates');
		(0, _chai.expect)(res.body.education[0]).to.have.property('status');
		(0, _chai.expect)(res.body.education[0]).to.have.property('achievements');
		(0, _chai.expect)(res.body.education[0]).to.have.property('_id');
	}

	function checkResumeCreationObject(res) {
		// Basic Info
		(0, _chai.expect)(res.body).to.be.json;
		(0, _chai.expect)(res.body).to.be.a('object');

		// Status
		(0, _chai.expect)(res.body).to.have.property('status');
		(0, _chai.expect)(res.body).to.have.property('data');
		(0, _chai.expect)(res.body.status).to.be.equal('saved');

		// Property Existance
		(0, _chai.expect)(res.body.data).to.have.property('_id');
		(0, _chai.expect)(res.body.data).to.have.property('name');
		(0, _chai.expect)(res.body.data).to.have.property('email');
		(0, _chai.expect)(res.body.data).to.have.property('phone');
		(0, _chai.expect)(res.body.data).to.have.property('city');
		(0, _chai.expect)(res.body.data).to.have.property('state');
		(0, _chai.expect)(res.body.data).to.have.property('tagline');
		(0, _chai.expect)(res.body.data).to.have.property('image');
		(0, _chai.expect)(res.body.data).to.have.property('intro');
		(0, _chai.expect)(res.body.data).to.have.property('views');
		(0, _chai.expect)(res.body.data).to.have.property('projects');
		(0, _chai.expect)(res.body.data).to.have.property('references');
		(0, _chai.expect)(res.body.data).to.have.property('education');
		(0, _chai.expect)(res.body.data).to.have.property('strengths');

		// Property Types
		(0, _chai.expect)(res.body.data.projects).to.be.a('array');
		(0, _chai.expect)(res.body.data.references).to.be.a('array');
		(0, _chai.expect)(res.body.data.strengths).to.be.a('array');
		(0, _chai.expect)(res.body.data.employers).to.be.a('array');
		(0, _chai.expect)(res.body.data.education).to.be.a('array');

		// Projects
		(0, _chai.expect)(res.body.data.projects).to.have.length.above(0);
		(0, _chai.expect)(res.body.data.projects[0]).to.be.a('object');
		(0, _chai.expect)(res.body.data.projects[0]).to.have.property('startDate');
		(0, _chai.expect)(res.body.data.projects[0]).to.have.property('repo');
		(0, _chai.expect)(res.body.data.projects[0]).to.have.property('description');
		(0, _chai.expect)(res.body.data.projects[0]).to.have.property('name');
		(0, _chai.expect)(res.body.data.projects[0]).to.have.property('_id');

		// References
		(0, _chai.expect)(res.body.data.references).to.have.length.above(0);
		(0, _chai.expect)(res.body.data.references[0]).to.be.a('object');
		(0, _chai.expect)(res.body.data.references[0]).to.have.property('name');
		(0, _chai.expect)(res.body.data.references[0]).to.have.property('email');
		(0, _chai.expect)(res.body.data.references[0]).to.have.property('quote');
		(0, _chai.expect)(res.body.data.references[0]).to.have.property('title');
		(0, _chai.expect)(res.body.data.references[0]).to.have.property('company');
		(0, _chai.expect)(res.body.data.references[0]).to.have.property('_id');

		// Strengths
		(0, _chai.expect)(res.body.data.strengths).to.have.length.above(0);
		(0, _chai.expect)(res.body.data.strengths[0]).to.be.a('object');
		(0, _chai.expect)(res.body.data.strengths[0]).to.have.property('_id');
		(0, _chai.expect)(res.body.data.strengths[0]).to.have.property('score');
		(0, _chai.expect)(res.body.data.strengths[0]).to.have.property('name');
		(0, _chai.expect)(res.body.data.strengths[0]).to.have.property('skills');
		(0, _chai.expect)(res.body.data.strengths[0].skills).to.be.a('array');
		(0, _chai.expect)(res.body.data.strengths[0].skills).to.have.length.above(0);

		// Employers
		(0, _chai.expect)(res.body.data.employers).to.have.length.above(0);
		(0, _chai.expect)(res.body.data.employers[0]).to.be.a('object');
		(0, _chai.expect)(res.body.data.employers[0]).to.have.property('name');
		(0, _chai.expect)(res.body.data.employers[0]).to.have.property('dates');
		(0, _chai.expect)(res.body.data.employers[0]).to.have.property('difficulties');
		(0, _chai.expect)(res.body.data.employers[0]).to.have.property('description');
		(0, _chai.expect)(res.body.data.employers[0]).to.have.property('achievements');
		(0, _chai.expect)(res.body.data.employers[0]).to.have.property('title');
		(0, _chai.expect)(res.body.data.employers[0]).to.have.property('_id');

		// Education
		(0, _chai.expect)(res.body.data.education).to.have.length.above(0);
		(0, _chai.expect)(res.body.data.education[0]).to.be.a('object');
		(0, _chai.expect)(res.body.data.education[0]).to.have.property('name');
		(0, _chai.expect)(res.body.data.education[0]).to.have.property('type');
		(0, _chai.expect)(res.body.data.education[0]).to.have.property('school');
		(0, _chai.expect)(res.body.data.education[0]).to.have.property('city');
		(0, _chai.expect)(res.body.data.education[0]).to.have.property('state');
		(0, _chai.expect)(res.body.data.education[0]).to.have.property('dates');
		(0, _chai.expect)(res.body.data.education[0]).to.have.property('status');
		(0, _chai.expect)(res.body.data.education[0]).to.have.property('achievements');
		(0, _chai.expect)(res.body.data.education[0]).to.have.property('_id');
	}

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = require("supertest");

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _express = __webpack_require__(5);

	var _express2 = _interopRequireDefault(_express);

	var _bodyParser = __webpack_require__(6);

	var _bodyParser2 = _interopRequireDefault(_bodyParser);

	var _routes = __webpack_require__(7);

	var _routes2 = _interopRequireDefault(_routes);

	var _cors = __webpack_require__(17);

	var _cors2 = _interopRequireDefault(_cors);

	var _morgan = __webpack_require__(18);

	var _morgan2 = _interopRequireDefault(_morgan);

	var _winston = __webpack_require__(19);

	var _winston2 = _interopRequireDefault(_winston);

	var _config = __webpack_require__(20);

	var _config2 = _interopRequireDefault(_config);

	var _db = __webpack_require__(16);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var __cov_t7MrVegG7SEkOHXX4$QbrZN601I = function () {
		var path = 'D:\\radea\\Documents\\GitHub\\cv-api\\src\\server.js',
		    hash = 'fc6fde57ddaf2cc83b0361d391c6d5be82195238',
		    global = new Function('return this')(),
		    gcv = '__coverage__',
		    coverageData = {
			path: 'D:\\radea\\Documents\\GitHub\\cv-api\\src\\server.js',
			statementMap: {
				'1': {
					start: {
						line: 17,
						column: 12
					},
					end: {
						line: 17,
						column: 21
					}
				},
				'2': {
					start: {
						line: 18,
						column: 15
					},
					end: {
						line: 18,
						column: 27
					}
				},
				'3': {
					start: {
						line: 20,
						column: 0
					},
					end: {
						line: 20,
						column: 14
					}
				},
				'4': {
					start: {
						line: 23,
						column: 15
					},
					end: {
						line: 23,
						column: 37
					}
				},
				'5': {
					start: {
						line: 25,
						column: 0
					},
					end: {
						line: 29,
						column: 38
					}
				},
				'6': {
					start: {
						line: 31,
						column: 0
					},
					end: {
						line: 31,
						column: 12
					}
				},
				'7': {
					start: {
						line: 33,
						column: 0
					},
					end: {
						line: 35,
						column: 3
					}
				},
				'8': {
					start: {
						line: 34,
						column: 1
					},
					end: {
						line: 34,
						column: 63
					}
				}
			},
			fnMap: {
				'1': {
					name: '(anonymous_1)',
					decl: {
						start: {
							line: 33,
							column: 31
						},
						end: {
							line: 33,
							column: 32
						}
					},
					loc: {
						start: {
							line: 33,
							column: 37
						},
						end: {
							line: 35,
							column: 1
						}
					}
				}
			},
			branchMap: {},
			s: {
				'1': 0,
				'2': 0,
				'3': 0,
				'4': 0,
				'5': 0,
				'6': 0,
				'7': 0,
				'8': 0
			},
			f: {
				'1': 0
			},
			b: {}
		},
		    coverage = global[gcv] || (global[gcv] = {});

		if (coverage[path] && coverage[path].hash === hash) {
			return coverage[path];
		}

		coverageData.hash = hash;
		return coverage[path] = coverageData;
	}(); /* 
	      * Dependencies 
	      */

	// create app
	var app = (++__cov_t7MrVegG7SEkOHXX4$QbrZN601I.s['1'], (0, _express2.default)());
	var config = (++__cov_t7MrVegG7SEkOHXX4$QbrZN601I.s['2'], new _config2.default());

	++__cov_t7MrVegG7SEkOHXX4$QbrZN601I.s['3'];
	(0, _db.mongo)(config);

	// logging
	var logger = (++__cov_t7MrVegG7SEkOHXX4$QbrZN601I.s['4'], (0, _morgan2.default)(config.logging));

	++__cov_t7MrVegG7SEkOHXX4$QbrZN601I.s['5'];
	app.use(_bodyParser2.default.json()).use(_bodyParser2.default.urlencoded({ extended: true })).use(logger).use((0, _cors2.default)()).use(_express2.default.static('client/build'));

	++__cov_t7MrVegG7SEkOHXX4$QbrZN601I.s['6'];
	(0, _routes2.default)(app);

	++__cov_t7MrVegG7SEkOHXX4$QbrZN601I.s['7'];
	app.listen(config.server.port, function () {
		++__cov_t7MrVegG7SEkOHXX4$QbrZN601I.f['1'];
		++__cov_t7MrVegG7SEkOHXX4$QbrZN601I.s['8'];

		_winston2.default.info('App listening on port %d', config.server.port);
	});

	exports.default = app;

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = require("express");

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = require("body-parser");

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _person = __webpack_require__(8);

	var _person2 = _interopRequireDefault(_person);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var __cov_ZG73$izLyRkABaA9jRC$a2l18H0 = function () {
		var path = 'D:\\radea\\Documents\\GitHub\\cv-api\\src\\routes.js',
		    hash = '069fab64271f7c9cf657a45b50d25ab99bf4a874',
		    global = new Function('return this')(),
		    gcv = '__coverage__',
		    coverageData = {
			path: 'D:\\radea\\Documents\\GitHub\\cv-api\\src\\routes.js',
			statementMap: {
				'1': {
					start: {
						line: 12,
						column: 1
					},
					end: {
						line: 12,
						column: 32
					}
				},
				'2': {
					start: {
						line: 13,
						column: 1
					},
					end: {
						line: 13,
						column: 36
					}
				},
				'3': {
					start: {
						line: 15,
						column: 1
					},
					end: {
						line: 15,
						column: 36
					}
				},
				'4': {
					start: {
						line: 17,
						column: 1
					},
					end: {
						line: 17,
						column: 39
					}
				},
				'5': {
					start: {
						line: 18,
						column: 1
					},
					end: {
						line: 18,
						column: 48
					}
				},
				'6': {
					start: {
						line: 19,
						column: 1
					},
					end: {
						line: 19,
						column: 42
					}
				},
				'7': {
					start: {
						line: 20,
						column: 1
					},
					end: {
						line: 20,
						column: 49
					}
				}
			},
			fnMap: {
				'1': {
					name: '(anonymous_1)',
					decl: {
						start: {
							line: 8,
							column: 15
						},
						end: {
							line: 8,
							column: 16
						}
					},
					loc: {
						start: {
							line: 8,
							column: 24
						},
						end: {
							line: 23,
							column: 1
						}
					}
				}
			},
			branchMap: {},
			s: {
				'1': 0,
				'2': 0,
				'3': 0,
				'4': 0,
				'5': 0,
				'6': 0,
				'7': 0
			},
			f: {
				'1': 0
			},
			b: {}
		},
		    coverage = global[gcv] || (global[gcv] = {});

		if (coverage[path] && coverage[path].hash === hash) {
			return coverage[path];
		}

		coverageData.hash = hash;
		return coverage[path] = coverageData;
	}(); /** 
	      * 	Dependencies
	      */

	exports.default = function (app) {
		++__cov_ZG73$izLyRkABaA9jRC$a2l18H0.f['1'];
		++__cov_ZG73$izLyRkABaA9jRC$a2l18H0.s['1'];


		// Endpoints

		app.get('/person', _person2.default.get);
		++__cov_ZG73$izLyRkABaA9jRC$a2l18H0.s['2'];
		app.get('/person/:id', _person2.default.get);

		++__cov_ZG73$izLyRkABaA9jRC$a2l18H0.s['3'];
		app.post('/person', _person2.default.create);

		++__cov_ZG73$izLyRkABaA9jRC$a2l18H0.s['4'];
		app.put('/person/:id', _person2.default.update);
		++__cov_ZG73$izLyRkABaA9jRC$a2l18H0.s['5'];
		app.put('/person/addView/:id', _person2.default.addView);
		++__cov_ZG73$izLyRkABaA9jRC$a2l18H0.s['6'];
		app.delete('/person/:id', _person2.default.remove);
		++__cov_ZG73$izLyRkABaA9jRC$a2l18H0.s['7'];
		app.delete('/person/:id/:force', _person2.default.remove);
	};

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.addView = exports.remove = exports.update = exports.create = exports.get = undefined;

	var _person = __webpack_require__(9);

	var _person2 = _interopRequireDefault(_person);

	var _db = __webpack_require__(16);

	var _db2 = _interopRequireDefault(_db);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var __cov_OZscbCw0V62d34rXkFdNrjxU9SY = function () {
		var path = 'D:\\radea\\Documents\\GitHub\\cv-api\\src\\app\\controllers\\person.js',
		    hash = '306afff75ae80d7b56d575cdcba5e342c1d6e58e',
		    global = new Function('return this')(),
		    gcv = '__coverage__',
		    coverageData = {
			path: 'D:\\radea\\Documents\\GitHub\\cv-api\\src\\app\\controllers\\person.js',
			statementMap: {
				'1': {
					start: {
						line: 13,
						column: 15
					},
					end: {
						line: 13,
						column: 66
					}
				},
				'2': {
					start: {
						line: 15,
						column: 16
					},
					end: {
						line: 15,
						column: 157
					}
				},
				'3': {
					start: {
						line: 17,
						column: 1
					},
					end: {
						line: 21,
						column: 4
					}
				},
				'4': {
					start: {
						line: 18,
						column: 2
					},
					end: {
						line: 18,
						column: 32
					}
				},
				'5': {
					start: {
						line: 18,
						column: 11
					},
					end: {
						line: 18,
						column: 32
					}
				},
				'6': {
					start: {
						line: 19,
						column: 2
					},
					end: {
						line: 20,
						column: 66
					}
				},
				'7': {
					start: {
						line: 19,
						column: 15
					},
					end: {
						line: 19,
						column: 40
					}
				},
				'8': {
					start: {
						line: 20,
						column: 7
					},
					end: {
						line: 20,
						column: 66
					}
				},
				'9': {
					start: {
						line: 25,
						column: 16
					},
					end: {
						line: 25,
						column: 36
					}
				},
				'10': {
					start: {
						line: 27,
						column: 1
					},
					end: {
						line: 30,
						column: 4
					}
				},
				'11': {
					start: {
						line: 28,
						column: 2
					},
					end: {
						line: 28,
						column: 57
					}
				},
				'12': {
					start: {
						line: 28,
						column: 11
					},
					end: {
						line: 28,
						column: 57
					}
				},
				'13': {
					start: {
						line: 29,
						column: 2
					},
					end: {
						line: 29,
						column: 51
					}
				},
				'14': {
					start: {
						line: 34,
						column: 12
					},
					end: {
						line: 34,
						column: 25
					}
				},
				'15': {
					start: {
						line: 35,
						column: 14
					},
					end: {
						line: 35,
						column: 22
					}
				},
				'16': {
					start: {
						line: 36,
						column: 15
					},
					end: {
						line: 36,
						column: 81
					}
				},
				'17': {
					start: {
						line: 38,
						column: 1
					},
					end: {
						line: 38,
						column: 66
					}
				},
				'18': {
					start: {
						line: 38,
						column: 10
					},
					end: {
						line: 38,
						column: 66
					}
				},
				'19': {
					start: {
						line: 40,
						column: 1
					},
					end: {
						line: 44,
						column: 4
					}
				},
				'20': {
					start: {
						line: 41,
						column: 2
					},
					end: {
						line: 41,
						column: 32
					}
				},
				'21': {
					start: {
						line: 41,
						column: 11
					},
					end: {
						line: 41,
						column: 32
					}
				},
				'22': {
					start: {
						line: 42,
						column: 2
					},
					end: {
						line: 43,
						column: 66
					}
				},
				'23': {
					start: {
						line: 42,
						column: 15
					},
					end: {
						line: 42,
						column: 40
					}
				},
				'24': {
					start: {
						line: 43,
						column: 7
					},
					end: {
						line: 43,
						column: 66
					}
				},
				'25': {
					start: {
						line: 48,
						column: 12
					},
					end: {
						line: 48,
						column: 25
					}
				},
				'26': {
					start: {
						line: 49,
						column: 15
					},
					end: {
						line: 49,
						column: 40
					}
				},
				'27': {
					start: {
						line: 51,
						column: 1
					},
					end: {
						line: 51,
						column: 66
					}
				},
				'28': {
					start: {
						line: 51,
						column: 10
					},
					end: {
						line: 51,
						column: 66
					}
				},
				'29': {
					start: {
						line: 53,
						column: 1
					},
					end: {
						line: 67,
						column: 2
					}
				},
				'30': {
					start: {
						line: 55,
						column: 2
					},
					end: {
						line: 59,
						column: 5
					}
				},
				'31': {
					start: {
						line: 56,
						column: 3
					},
					end: {
						line: 56,
						column: 33
					}
				},
				'32': {
					start: {
						line: 56,
						column: 12
					},
					end: {
						line: 56,
						column: 33
					}
				},
				'33': {
					start: {
						line: 57,
						column: 3
					},
					end: {
						line: 58,
						column: 67
					}
				},
				'34': {
					start: {
						line: 57,
						column: 16
					},
					end: {
						line: 57,
						column: 41
					}
				},
				'35': {
					start: {
						line: 58,
						column: 8
					},
					end: {
						line: 58,
						column: 67
					}
				},
				'36': {
					start: {
						line: 62,
						column: 2
					},
					end: {
						line: 66,
						column: 5
					}
				},
				'37': {
					start: {
						line: 63,
						column: 3
					},
					end: {
						line: 63,
						column: 33
					}
				},
				'38': {
					start: {
						line: 63,
						column: 12
					},
					end: {
						line: 63,
						column: 33
					}
				},
				'39': {
					start: {
						line: 64,
						column: 3
					},
					end: {
						line: 65,
						column: 67
					}
				},
				'40': {
					start: {
						line: 64,
						column: 16
					},
					end: {
						line: 64,
						column: 41
					}
				},
				'41': {
					start: {
						line: 65,
						column: 8
					},
					end: {
						line: 65,
						column: 67
					}
				},
				'42': {
					start: {
						line: 75,
						column: 12
					},
					end: {
						line: 75,
						column: 25
					}
				},
				'43': {
					start: {
						line: 76,
						column: 1
					},
					end: {
						line: 80,
						column: 4
					}
				},
				'44': {
					start: {
						line: 77,
						column: 2
					},
					end: {
						line: 77,
						column: 32
					}
				},
				'45': {
					start: {
						line: 77,
						column: 11
					},
					end: {
						line: 77,
						column: 32
					}
				},
				'46': {
					start: {
						line: 78,
						column: 2
					},
					end: {
						line: 79,
						column: 66
					}
				},
				'47': {
					start: {
						line: 78,
						column: 15
					},
					end: {
						line: 78,
						column: 55
					}
				},
				'48': {
					start: {
						line: 79,
						column: 7
					},
					end: {
						line: 79,
						column: 66
					}
				}
			},
			fnMap: {
				'1': {
					name: 'get',
					decl: {
						start: {
							line: 12,
							column: 9
						},
						end: {
							line: 12,
							column: 12
						}
					},
					loc: {
						start: {
							line: 12,
							column: 29
						},
						end: {
							line: 22,
							column: 1
						}
					}
				},
				'2': {
					name: '(anonymous_2)',
					decl: {
						start: {
							line: 17,
							column: 46
						},
						end: {
							line: 17,
							column: 47
						}
					},
					loc: {
						start: {
							line: 17,
							column: 64
						},
						end: {
							line: 21,
							column: 2
						}
					}
				},
				'3': {
					name: 'create',
					decl: {
						start: {
							line: 24,
							column: 9
						},
						end: {
							line: 24,
							column: 15
						}
					},
					loc: {
						start: {
							line: 24,
							column: 30
						},
						end: {
							line: 31,
							column: 1
						}
					}
				},
				'4': {
					name: '(anonymous_4)',
					decl: {
						start: {
							line: 27,
							column: 13
						},
						end: {
							line: 27,
							column: 14
						}
					},
					loc: {
						start: {
							line: 27,
							column: 22
						},
						end: {
							line: 30,
							column: 2
						}
					}
				},
				'5': {
					name: 'update',
					decl: {
						start: {
							line: 33,
							column: 9
						},
						end: {
							line: 33,
							column: 15
						}
					},
					loc: {
						start: {
							line: 33,
							column: 32
						},
						end: {
							line: 45,
							column: 1
						}
					}
				},
				'6': {
					name: '(anonymous_6)',
					decl: {
						start: {
							line: 40,
							column: 71
						},
						end: {
							line: 40,
							column: 72
						}
					},
					loc: {
						start: {
							line: 40,
							column: 89
						},
						end: {
							line: 44,
							column: 2
						}
					}
				},
				'7': {
					name: 'remove',
					decl: {
						start: {
							line: 47,
							column: 9
						},
						end: {
							line: 47,
							column: 15
						}
					},
					loc: {
						start: {
							line: 47,
							column: 32
						},
						end: {
							line: 68,
							column: 1
						}
					}
				},
				'8': {
					name: '(anonymous_8)',
					decl: {
						start: {
							line: 55,
							column: 37
						},
						end: {
							line: 55,
							column: 38
						}
					},
					loc: {
						start: {
							line: 55,
							column: 55
						},
						end: {
							line: 59,
							column: 3
						}
					}
				},
				'9': {
					name: '(anonymous_9)',
					decl: {
						start: {
							line: 62,
							column: 87
						},
						end: {
							line: 62,
							column: 88
						}
					},
					loc: {
						start: {
							line: 62,
							column: 105
						},
						end: {
							line: 66,
							column: 3
						}
					}
				},
				'10': {
					name: 'addView',
					decl: {
						start: {
							line: 74,
							column: 9
						},
						end: {
							line: 74,
							column: 16
						}
					},
					loc: {
						start: {
							line: 74,
							column: 33
						},
						end: {
							line: 81,
							column: 1
						}
					}
				},
				'11': {
					name: '(anonymous_11)',
					decl: {
						start: {
							line: 76,
							column: 82
						},
						end: {
							line: 76,
							column: 83
						}
					},
					loc: {
						start: {
							line: 76,
							column: 100
						},
						end: {
							line: 80,
							column: 2
						}
					}
				}
			},
			branchMap: {
				'1': {
					loc: {
						start: {
							line: 13,
							column: 15
						},
						end: {
							line: 13,
							column: 66
						}
					},
					type: 'cond-expr',
					locations: [{
						start: {
							line: 13,
							column: 31
						},
						end: {
							line: 13,
							column: 59
						}
					}, {
						start: {
							line: 13,
							column: 62
						},
						end: {
							line: 13,
							column: 66
						}
					}]
				},
				'2': {
					loc: {
						start: {
							line: 15,
							column: 16
						},
						end: {
							line: 15,
							column: 157
						}
					},
					type: 'cond-expr',
					locations: [{
						start: {
							line: 15,
							column: 26
						},
						end: {
							line: 15,
							column: 96
						}
					}, {
						start: {
							line: 15,
							column: 100
						},
						end: {
							line: 15,
							column: 157
						}
					}]
				},
				'3': {
					loc: {
						start: {
							line: 18,
							column: 2
						},
						end: {
							line: 18,
							column: 32
						}
					},
					type: 'if',
					locations: [{
						start: {
							line: 18,
							column: 2
						},
						end: {
							line: 18,
							column: 32
						}
					}, {
						start: {
							line: 18,
							column: 2
						},
						end: {
							line: 18,
							column: 32
						}
					}]
				},
				'4': {
					loc: {
						start: {
							line: 19,
							column: 2
						},
						end: {
							line: 20,
							column: 66
						}
					},
					type: 'if',
					locations: [{
						start: {
							line: 19,
							column: 2
						},
						end: {
							line: 20,
							column: 66
						}
					}, {
						start: {
							line: 19,
							column: 2
						},
						end: {
							line: 20,
							column: 66
						}
					}]
				},
				'5': {
					loc: {
						start: {
							line: 28,
							column: 2
						},
						end: {
							line: 28,
							column: 57
						}
					},
					type: 'if',
					locations: [{
						start: {
							line: 28,
							column: 2
						},
						end: {
							line: 28,
							column: 57
						}
					}, {
						start: {
							line: 28,
							column: 2
						},
						end: {
							line: 28,
							column: 57
						}
					}]
				},
				'6': {
					loc: {
						start: {
							line: 38,
							column: 1
						},
						end: {
							line: 38,
							column: 66
						}
					},
					type: 'if',
					locations: [{
						start: {
							line: 38,
							column: 1
						},
						end: {
							line: 38,
							column: 66
						}
					}, {
						start: {
							line: 38,
							column: 1
						},
						end: {
							line: 38,
							column: 66
						}
					}]
				},
				'7': {
					loc: {
						start: {
							line: 41,
							column: 2
						},
						end: {
							line: 41,
							column: 32
						}
					},
					type: 'if',
					locations: [{
						start: {
							line: 41,
							column: 2
						},
						end: {
							line: 41,
							column: 32
						}
					}, {
						start: {
							line: 41,
							column: 2
						},
						end: {
							line: 41,
							column: 32
						}
					}]
				},
				'8': {
					loc: {
						start: {
							line: 42,
							column: 2
						},
						end: {
							line: 43,
							column: 66
						}
					},
					type: 'if',
					locations: [{
						start: {
							line: 42,
							column: 2
						},
						end: {
							line: 43,
							column: 66
						}
					}, {
						start: {
							line: 42,
							column: 2
						},
						end: {
							line: 43,
							column: 66
						}
					}]
				},
				'9': {
					loc: {
						start: {
							line: 49,
							column: 15
						},
						end: {
							line: 49,
							column: 40
						}
					},
					type: 'binary-expr',
					locations: [{
						start: {
							line: 49,
							column: 15
						},
						end: {
							line: 49,
							column: 31
						}
					}, {
						start: {
							line: 49,
							column: 35
						},
						end: {
							line: 49,
							column: 40
						}
					}]
				},
				'10': {
					loc: {
						start: {
							line: 51,
							column: 1
						},
						end: {
							line: 51,
							column: 66
						}
					},
					type: 'if',
					locations: [{
						start: {
							line: 51,
							column: 1
						},
						end: {
							line: 51,
							column: 66
						}
					}, {
						start: {
							line: 51,
							column: 1
						},
						end: {
							line: 51,
							column: 66
						}
					}]
				},
				'11': {
					loc: {
						start: {
							line: 53,
							column: 1
						},
						end: {
							line: 67,
							column: 2
						}
					},
					type: 'if',
					locations: [{
						start: {
							line: 53,
							column: 1
						},
						end: {
							line: 67,
							column: 2
						}
					}, {
						start: {
							line: 53,
							column: 1
						},
						end: {
							line: 67,
							column: 2
						}
					}]
				},
				'12': {
					loc: {
						start: {
							line: 56,
							column: 3
						},
						end: {
							line: 56,
							column: 33
						}
					},
					type: 'if',
					locations: [{
						start: {
							line: 56,
							column: 3
						},
						end: {
							line: 56,
							column: 33
						}
					}, {
						start: {
							line: 56,
							column: 3
						},
						end: {
							line: 56,
							column: 33
						}
					}]
				},
				'13': {
					loc: {
						start: {
							line: 57,
							column: 3
						},
						end: {
							line: 58,
							column: 67
						}
					},
					type: 'if',
					locations: [{
						start: {
							line: 57,
							column: 3
						},
						end: {
							line: 58,
							column: 67
						}
					}, {
						start: {
							line: 57,
							column: 3
						},
						end: {
							line: 58,
							column: 67
						}
					}]
				},
				'14': {
					loc: {
						start: {
							line: 63,
							column: 3
						},
						end: {
							line: 63,
							column: 33
						}
					},
					type: 'if',
					locations: [{
						start: {
							line: 63,
							column: 3
						},
						end: {
							line: 63,
							column: 33
						}
					}, {
						start: {
							line: 63,
							column: 3
						},
						end: {
							line: 63,
							column: 33
						}
					}]
				},
				'15': {
					loc: {
						start: {
							line: 64,
							column: 3
						},
						end: {
							line: 65,
							column: 67
						}
					},
					type: 'if',
					locations: [{
						start: {
							line: 64,
							column: 3
						},
						end: {
							line: 65,
							column: 67
						}
					}, {
						start: {
							line: 64,
							column: 3
						},
						end: {
							line: 65,
							column: 67
						}
					}]
				},
				'16': {
					loc: {
						start: {
							line: 77,
							column: 2
						},
						end: {
							line: 77,
							column: 32
						}
					},
					type: 'if',
					locations: [{
						start: {
							line: 77,
							column: 2
						},
						end: {
							line: 77,
							column: 32
						}
					}, {
						start: {
							line: 77,
							column: 2
						},
						end: {
							line: 77,
							column: 32
						}
					}]
				},
				'17': {
					loc: {
						start: {
							line: 78,
							column: 2
						},
						end: {
							line: 79,
							column: 66
						}
					},
					type: 'if',
					locations: [{
						start: {
							line: 78,
							column: 2
						},
						end: {
							line: 79,
							column: 66
						}
					}, {
						start: {
							line: 78,
							column: 2
						},
						end: {
							line: 79,
							column: 66
						}
					}]
				}
			},
			s: {
				'1': 0,
				'2': 0,
				'3': 0,
				'4': 0,
				'5': 0,
				'6': 0,
				'7': 0,
				'8': 0,
				'9': 0,
				'10': 0,
				'11': 0,
				'12': 0,
				'13': 0,
				'14': 0,
				'15': 0,
				'16': 0,
				'17': 0,
				'18': 0,
				'19': 0,
				'20': 0,
				'21': 0,
				'22': 0,
				'23': 0,
				'24': 0,
				'25': 0,
				'26': 0,
				'27': 0,
				'28': 0,
				'29': 0,
				'30': 0,
				'31': 0,
				'32': 0,
				'33': 0,
				'34': 0,
				'35': 0,
				'36': 0,
				'37': 0,
				'38': 0,
				'39': 0,
				'40': 0,
				'41': 0,
				'42': 0,
				'43': 0,
				'44': 0,
				'45': 0,
				'46': 0,
				'47': 0,
				'48': 0
			},
			f: {
				'1': 0,
				'2': 0,
				'3': 0,
				'4': 0,
				'5': 0,
				'6': 0,
				'7': 0,
				'8': 0,
				'9': 0,
				'10': 0,
				'11': 0
			},
			b: {
				'1': [0, 0],
				'2': [0, 0],
				'3': [0, 0],
				'4': [0, 0],
				'5': [0, 0],
				'6': [0, 0],
				'7': [0, 0],
				'8': [0, 0],
				'9': [0, 0],
				'10': [0, 0],
				'11': [0, 0],
				'12': [0, 0],
				'13': [0, 0],
				'14': [0, 0],
				'15': [0, 0],
				'16': [0, 0],
				'17': [0, 0]
			}
		},
		    coverage = global[gcv] || (global[gcv] = {});

		if (coverage[path] && coverage[path].hash === hash) {
			return coverage[path];
		}

		coverageData.hash = hash;
		return coverage[path] = coverageData;
	}(); /** 
	      * 	Dependencies
	      */

	/*
	 * 	Basic CRUD functionality with minimal search and soft/hard remove logic
	 */

	function get(req, res, next) {
		++__cov_OZscbCw0V62d34rXkFdNrjxU9SY.f['1'];

		var query = (++__cov_OZscbCw0V62d34rXkFdNrjxU9SY.s['1'], req.query.s ? (++__cov_OZscbCw0V62d34rXkFdNrjxU9SY.b['1'][0], new RegExp(req.query.s, "i")) : (++__cov_OZscbCw0V62d34rXkFdNrjxU9SY.b['1'][1], null));

		var params = (++__cov_OZscbCw0V62d34rXkFdNrjxU9SY.s['2'], query ? (++__cov_OZscbCw0V62d34rXkFdNrjxU9SY.b['2'][0], { name: query, $or: [{ deleted: false }, { deleted: { $exists: false } }] }) : (++__cov_OZscbCw0V62d34rXkFdNrjxU9SY.b['2'][1], { $or: [{ deleted: false }, { deleted: { $exists: false } }] }));

		++__cov_OZscbCw0V62d34rXkFdNrjxU9SY.s['3'];
		_person2.default.findOne(params, null, { lean: true }, function (err, results) {
			++__cov_OZscbCw0V62d34rXkFdNrjxU9SY.f['2'];
			++__cov_OZscbCw0V62d34rXkFdNrjxU9SY.s['4'];

			if (err) {
					++__cov_OZscbCw0V62d34rXkFdNrjxU9SY.b['3'][0];
					++__cov_OZscbCw0V62d34rXkFdNrjxU9SY.s['5'];
					return res.json(err);
				} else {
				++__cov_OZscbCw0V62d34rXkFdNrjxU9SY.b['3'][1];
			}++__cov_OZscbCw0V62d34rXkFdNrjxU9SY.s['6'];
			if (results) {
					++__cov_OZscbCw0V62d34rXkFdNrjxU9SY.b['4'][0];
					++__cov_OZscbCw0V62d34rXkFdNrjxU9SY.s['7'];
					return res.json(results);
				} else {
					++__cov_OZscbCw0V62d34rXkFdNrjxU9SY.b['4'][1];
					++__cov_OZscbCw0V62d34rXkFdNrjxU9SY.s['8'];
					return res.json({ error: _person2.default.modelName + ' not found.' });
				}
		});
	}

	function create(req, res, next) {
		++__cov_OZscbCw0V62d34rXkFdNrjxU9SY.f['3'];

		var person = (++__cov_OZscbCw0V62d34rXkFdNrjxU9SY.s['9'], new _person2.default(req.body));

		++__cov_OZscbCw0V62d34rXkFdNrjxU9SY.s['10'];
		person.save(function (err) {
			++__cov_OZscbCw0V62d34rXkFdNrjxU9SY.f['4'];
			++__cov_OZscbCw0V62d34rXkFdNrjxU9SY.s['11'];

			if (err) {
					++__cov_OZscbCw0V62d34rXkFdNrjxU9SY.b['5'][0];
					++__cov_OZscbCw0V62d34rXkFdNrjxU9SY.s['12'];
					return res.json({ status: 'error', error: err });
				} else {
				++__cov_OZscbCw0V62d34rXkFdNrjxU9SY.b['5'][1];
			}++__cov_OZscbCw0V62d34rXkFdNrjxU9SY.s['13'];
			return res.json({ status: 'saved', data: person });
		});
	}

	function update(req, res, next) {
		++__cov_OZscbCw0V62d34rXkFdNrjxU9SY.f['5'];

		var id = (++__cov_OZscbCw0V62d34rXkFdNrjxU9SY.s['14'], req.params.id);
		var data = (++__cov_OZscbCw0V62d34rXkFdNrjxU9SY.s['15'], req.body);
		var params = (++__cov_OZscbCw0V62d34rXkFdNrjxU9SY.s['16'], { _id: id, $or: [{ deleted: false }, { deleted: { $exists: false } }] });

		++__cov_OZscbCw0V62d34rXkFdNrjxU9SY.s['17'];
		if (!id) {
				++__cov_OZscbCw0V62d34rXkFdNrjxU9SY.b['6'][0];
				++__cov_OZscbCw0V62d34rXkFdNrjxU9SY.s['18'];
				return res.json({ error: 'Invalid params, id required' });
			} else {
			++__cov_OZscbCw0V62d34rXkFdNrjxU9SY.b['6'][1];
		}++__cov_OZscbCw0V62d34rXkFdNrjxU9SY.s['19'];
		_person2.default.findOneAndUpdate(params, { $set: data }, { lean: true, new: true }, function (err, results) {
			++__cov_OZscbCw0V62d34rXkFdNrjxU9SY.f['6'];
			++__cov_OZscbCw0V62d34rXkFdNrjxU9SY.s['20'];

			if (err) {
					++__cov_OZscbCw0V62d34rXkFdNrjxU9SY.b['7'][0];
					++__cov_OZscbCw0V62d34rXkFdNrjxU9SY.s['21'];
					return res.json(err);
				} else {
				++__cov_OZscbCw0V62d34rXkFdNrjxU9SY.b['7'][1];
			}++__cov_OZscbCw0V62d34rXkFdNrjxU9SY.s['22'];
			if (results) {
					++__cov_OZscbCw0V62d34rXkFdNrjxU9SY.b['8'][0];
					++__cov_OZscbCw0V62d34rXkFdNrjxU9SY.s['23'];
					return res.json(results);
				} else {
					++__cov_OZscbCw0V62d34rXkFdNrjxU9SY.b['8'][1];
					++__cov_OZscbCw0V62d34rXkFdNrjxU9SY.s['24'];
					return res.json({ error: _person2.default.modelName + ' not found.' });
				}
		});
	}

	function remove(req, res, next) {
		++__cov_OZscbCw0V62d34rXkFdNrjxU9SY.f['7'];

		var id = (++__cov_OZscbCw0V62d34rXkFdNrjxU9SY.s['25'], req.params.id);
		var force = (++__cov_OZscbCw0V62d34rXkFdNrjxU9SY.s['26'], (++__cov_OZscbCw0V62d34rXkFdNrjxU9SY.b['9'][0], req.params.force) || (++__cov_OZscbCw0V62d34rXkFdNrjxU9SY.b['9'][1], false));

		++__cov_OZscbCw0V62d34rXkFdNrjxU9SY.s['27'];
		if (!id) {
				++__cov_OZscbCw0V62d34rXkFdNrjxU9SY.b['10'][0];
				++__cov_OZscbCw0V62d34rXkFdNrjxU9SY.s['28'];
				return res.json({ error: 'Invalid params, id required' });
			} else {
			++__cov_OZscbCw0V62d34rXkFdNrjxU9SY.b['10'][1];
		}++__cov_OZscbCw0V62d34rXkFdNrjxU9SY.s['29'];
		if (force) {
			++__cov_OZscbCw0V62d34rXkFdNrjxU9SY.b['11'][0];
			++__cov_OZscbCw0V62d34rXkFdNrjxU9SY.s['30'];

			// hard remove
			_person2.default.findOneAndRemove({ _id: id }, function (err, results) {
				++__cov_OZscbCw0V62d34rXkFdNrjxU9SY.f['8'];
				++__cov_OZscbCw0V62d34rXkFdNrjxU9SY.s['31'];

				if (err) {
						++__cov_OZscbCw0V62d34rXkFdNrjxU9SY.b['12'][0];
						++__cov_OZscbCw0V62d34rXkFdNrjxU9SY.s['32'];
						return res.json(err);
					} else {
					++__cov_OZscbCw0V62d34rXkFdNrjxU9SY.b['12'][1];
				}++__cov_OZscbCw0V62d34rXkFdNrjxU9SY.s['33'];
				if (results) {
						++__cov_OZscbCw0V62d34rXkFdNrjxU9SY.b['13'][0];
						++__cov_OZscbCw0V62d34rXkFdNrjxU9SY.s['34'];
						return res.json(results);
					} else {
						++__cov_OZscbCw0V62d34rXkFdNrjxU9SY.b['13'][1];
						++__cov_OZscbCw0V62d34rXkFdNrjxU9SY.s['35'];
						return res.json({ error: _person2.default.modelName + ' not found.' });
					}
			});
		} else {
			++__cov_OZscbCw0V62d34rXkFdNrjxU9SY.b['11'][1];
			++__cov_OZscbCw0V62d34rXkFdNrjxU9SY.s['36'];

			// soft remove
			_person2.default.findOneAndUpdate({ _id: id }, { $set: { deleted: true } }, { lean: true, new: true }, function (err, results) {
				++__cov_OZscbCw0V62d34rXkFdNrjxU9SY.f['9'];
				++__cov_OZscbCw0V62d34rXkFdNrjxU9SY.s['37'];

				if (err) {
						++__cov_OZscbCw0V62d34rXkFdNrjxU9SY.b['14'][0];
						++__cov_OZscbCw0V62d34rXkFdNrjxU9SY.s['38'];
						return res.json(err);
					} else {
					++__cov_OZscbCw0V62d34rXkFdNrjxU9SY.b['14'][1];
				}++__cov_OZscbCw0V62d34rXkFdNrjxU9SY.s['39'];
				if (results) {
						++__cov_OZscbCw0V62d34rXkFdNrjxU9SY.b['15'][0];
						++__cov_OZscbCw0V62d34rXkFdNrjxU9SY.s['40'];
						return res.json(results);
					} else {
						++__cov_OZscbCw0V62d34rXkFdNrjxU9SY.b['15'][1];
						++__cov_OZscbCw0V62d34rXkFdNrjxU9SY.s['41'];
						return res.json({ error: _person2.default.modelName + ' not found.' });
					}
			});
		}
	}

	/*
	 *	Additional business logic
	 */

	function addView(req, res, next) {
		++__cov_OZscbCw0V62d34rXkFdNrjxU9SY.f['10'];

		var id = (++__cov_OZscbCw0V62d34rXkFdNrjxU9SY.s['42'], req.params.id);
		++__cov_OZscbCw0V62d34rXkFdNrjxU9SY.s['43'];
		_person2.default.findOneAndUpdate({ _id: id }, { $inc: { views: 1 } }, { new: true, lean: true }, function (err, results) {
			++__cov_OZscbCw0V62d34rXkFdNrjxU9SY.f['11'];
			++__cov_OZscbCw0V62d34rXkFdNrjxU9SY.s['44'];

			if (err) {
					++__cov_OZscbCw0V62d34rXkFdNrjxU9SY.b['16'][0];
					++__cov_OZscbCw0V62d34rXkFdNrjxU9SY.s['45'];
					return res.json(err);
				} else {
				++__cov_OZscbCw0V62d34rXkFdNrjxU9SY.b['16'][1];
			}++__cov_OZscbCw0V62d34rXkFdNrjxU9SY.s['46'];
			if (results) {
					++__cov_OZscbCw0V62d34rXkFdNrjxU9SY.b['17'][0];
					++__cov_OZscbCw0V62d34rXkFdNrjxU9SY.s['47'];
					return res.json({ views: results.views });
				} else {
					++__cov_OZscbCw0V62d34rXkFdNrjxU9SY.b['17'][1];
					++__cov_OZscbCw0V62d34rXkFdNrjxU9SY.s['48'];
					return res.json({ error: _person2.default.modelName + ' not found.' });
				}
		});
	}

	exports.get = get;
	exports.create = create;
	exports.update = update;
	exports.remove = remove;
	exports.addView = addView;
	exports.default = {
		get: get,
		create: create,
		update: update,
		remove: remove,
		addView: addView
	};

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _mongoose = __webpack_require__(10);

	var _mongoose2 = _interopRequireDefault(_mongoose);

	var _education = __webpack_require__(11);

	var _education2 = _interopRequireDefault(_education);

	var _employer = __webpack_require__(12);

	var _employer2 = _interopRequireDefault(_employer);

	var _project = __webpack_require__(13);

	var _project2 = _interopRequireDefault(_project);

	var _strength = __webpack_require__(14);

	var _strength2 = _interopRequireDefault(_strength);

	var _reference = __webpack_require__(15);

	var _reference2 = _interopRequireDefault(_reference);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var __cov_EKs1Vy9IvGMxgeX3_K6Ob$NfigM = function () {
		var path = 'D:\\radea\\Documents\\GitHub\\cv-api\\src\\app\\models\\person.js',
		    hash = 'c28ebc76e13210b35c19de2311309852bdb87614',
		    global = new Function('return this')(),
		    gcv = '__coverage__',
		    coverageData = {
			path: 'D:\\radea\\Documents\\GitHub\\cv-api\\src\\app\\models\\person.js',
			statementMap: {
				'1': {
					start: {
						line: 12,
						column: 15
					},
					end: {
						line: 12,
						column: 30
					}
				},
				'2': {
					start: {
						line: 14,
						column: 21
					},
					end: {
						line: 30,
						column: 2
					}
				}
			},
			fnMap: {},
			branchMap: {},
			s: {
				'1': 0,
				'2': 0
			},
			f: {},
			b: {}
		},
		    coverage = global[gcv] || (global[gcv] = {});

		if (coverage[path] && coverage[path].hash === hash) {
			return coverage[path];
		}

		coverageData.hash = hash;
		return coverage[path] = coverageData;
	}(); /*
	      *	Dependencies
	      */

	var Schema = (++__cov_EKs1Vy9IvGMxgeX3_K6Ob$NfigM.s['1'], _mongoose2.default.Schema);

	var personSchema = (++__cov_EKs1Vy9IvGMxgeX3_K6Ob$NfigM.s['2'], new Schema({
		name: String,
		tagline: String,
		email: String,
		phone: String,
		city: String,
		state: { type: String, maxLength: 2 },
		image: String,
		intro: String,
		employers: [_employer2.default],
		strengths: [_strength2.default],
		education: [_education2.default],
		references: [_reference2.default],
		projects: [_project2.default],
		views: { type: Number, default: 0 },
		deleted: Boolean
	}));

	exports.default = _mongoose2.default.model('Person', personSchema);

/***/ },
/* 10 */
/***/ function(module, exports) {

	module.exports = require("mongoose");

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.sql = undefined;

	var _mongoose = __webpack_require__(10);

	var _mongoose2 = _interopRequireDefault(_mongoose);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var __cov_FnoFdHJPNVmcspyMpn$$s3a4iNk = function () {
		var path = 'D:\\radea\\Documents\\GitHub\\cv-api\\src\\app\\models\\education.js',
		    hash = '1921306fd60c245e767c6ff27544f5abd15ad925',
		    global = new Function('return this')(),
		    gcv = '__coverage__',
		    coverageData = {
			path: 'D:\\radea\\Documents\\GitHub\\cv-api\\src\\app\\models\\education.js',
			statementMap: {
				'1': {
					start: {
						line: 7,
						column: 15
					},
					end: {
						line: 7,
						column: 30
					}
				},
				'2': {
					start: {
						line: 9,
						column: 22
					},
					end: {
						line: 18,
						column: 2
					}
				}
			},
			fnMap: {
				'1': {
					name: 'sql',
					decl: {
						start: {
							line: 21,
							column: 9
						},
						end: {
							line: 21,
							column: 12
						}
					},
					loc: {
						start: {
							line: 21,
							column: 24
						},
						end: {
							line: 24,
							column: 1
						}
					}
				}
			},
			branchMap: {},
			s: {
				'1': 0,
				'2': 0
			},
			f: {
				'1': 0
			},
			b: {}
		},
		    coverage = global[gcv] || (global[gcv] = {});

		if (coverage[path] && coverage[path].hash === hash) {
			return coverage[path];
		}

		coverageData.hash = hash;
		return coverage[path] = coverageData;
	}(); /*
	      *	Dependencies
	      */

	var Schema = (++__cov_FnoFdHJPNVmcspyMpn$$s3a4iNk.s['1'], _mongoose2.default.Schema);

	var educationSchema = (++__cov_FnoFdHJPNVmcspyMpn$$s3a4iNk.s['2'], new Schema({
		name: String,
		type: String,
		school: String,
		city: String,
		state: { type: String, maxLength: 2 },
		dates: String,
		status: String,
		achievements: String
	}));

	function sql(sequelize) {
		// TODO: Implement SQL version of model.

		++__cov_FnoFdHJPNVmcspyMpn$$s3a4iNk.f['1'];
	}

	exports.sql = sql;
	exports.default = educationSchema;

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.sql = undefined;

	var _mongoose = __webpack_require__(10);

	var _mongoose2 = _interopRequireDefault(_mongoose);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var __cov_dc1n8P9JOenncWOfgfyV$cQs5QU = function () {
		var path = 'D:\\radea\\Documents\\GitHub\\cv-api\\src\\app\\models\\employer.js',
		    hash = '2aa3b5a7b47251a0a0536baba2e169b85bb19914',
		    global = new Function('return this')(),
		    gcv = '__coverage__',
		    coverageData = {
			path: 'D:\\radea\\Documents\\GitHub\\cv-api\\src\\app\\models\\employer.js',
			statementMap: {
				'1': {
					start: {
						line: 7,
						column: 15
					},
					end: {
						line: 7,
						column: 30
					}
				},
				'2': {
					start: {
						line: 9,
						column: 21
					},
					end: {
						line: 16,
						column: 2
					}
				}
			},
			fnMap: {
				'1': {
					name: 'sql',
					decl: {
						start: {
							line: 19,
							column: 9
						},
						end: {
							line: 19,
							column: 12
						}
					},
					loc: {
						start: {
							line: 19,
							column: 24
						},
						end: {
							line: 22,
							column: 1
						}
					}
				}
			},
			branchMap: {},
			s: {
				'1': 0,
				'2': 0
			},
			f: {
				'1': 0
			},
			b: {}
		},
		    coverage = global[gcv] || (global[gcv] = {});

		if (coverage[path] && coverage[path].hash === hash) {
			return coverage[path];
		}

		coverageData.hash = hash;
		return coverage[path] = coverageData;
	}(); /*
	      *	Dependencies
	      */

	var Schema = (++__cov_dc1n8P9JOenncWOfgfyV$cQs5QU.s['1'], _mongoose2.default.Schema);

	var employerSchema = (++__cov_dc1n8P9JOenncWOfgfyV$cQs5QU.s['2'], new Schema({
		name: String,
		title: String,
		dates: String,
		description: String,
		difficulties: String,
		achievements: String
	}));

	function sql(sequelize) {
		// TODO: Implement SQL version of model.

		++__cov_dc1n8P9JOenncWOfgfyV$cQs5QU.f['1'];
	}

	exports.default = employerSchema;
	exports.sql = sql;

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.sql = undefined;

	var _mongoose = __webpack_require__(10);

	var _mongoose2 = _interopRequireDefault(_mongoose);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var __cov_d5ly3iXmjq5ng7rH_xTSfou9T3U = function () {
		var path = 'D:\\radea\\Documents\\GitHub\\cv-api\\src\\app\\models\\project.js',
		    hash = '1fe975ed5051dc4721dd55a4493b24576cb63491',
		    global = new Function('return this')(),
		    gcv = '__coverage__',
		    coverageData = {
			path: 'D:\\radea\\Documents\\GitHub\\cv-api\\src\\app\\models\\project.js',
			statementMap: {
				'1': {
					start: {
						line: 7,
						column: 15
					},
					end: {
						line: 7,
						column: 30
					}
				},
				'2': {
					start: {
						line: 9,
						column: 20
					},
					end: {
						line: 16,
						column: 2
					}
				}
			},
			fnMap: {
				'1': {
					name: 'sql',
					decl: {
						start: {
							line: 19,
							column: 9
						},
						end: {
							line: 19,
							column: 12
						}
					},
					loc: {
						start: {
							line: 19,
							column: 24
						},
						end: {
							line: 22,
							column: 1
						}
					}
				}
			},
			branchMap: {},
			s: {
				'1': 0,
				'2': 0
			},
			f: {
				'1': 0
			},
			b: {}
		},
		    coverage = global[gcv] || (global[gcv] = {});

		if (coverage[path] && coverage[path].hash === hash) {
			return coverage[path];
		}

		coverageData.hash = hash;
		return coverage[path] = coverageData;
	}(); /*
	      *	Dependencies
	      */

	var Schema = (++__cov_d5ly3iXmjq5ng7rH_xTSfou9T3U.s['1'], _mongoose2.default.Schema);

	var projectSchema = (++__cov_d5ly3iXmjq5ng7rH_xTSfou9T3U.s['2'], new Schema({
		name: String,
		type: String,
		url: String,
		repo: String,
		startDate: String,
		description: String
	}));

	function sql(sequelize) {
		// TODO: Implement SQL version of model.

		++__cov_d5ly3iXmjq5ng7rH_xTSfou9T3U.f['1'];
	}

	exports.sql = sql;
	exports.default = projectSchema;

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.sql = undefined;

	var _mongoose = __webpack_require__(10);

	var _mongoose2 = _interopRequireDefault(_mongoose);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var __cov_441OcM7u_tj79lv4teeoUHQXvJ8 = function () {
		var path = 'D:\\radea\\Documents\\GitHub\\cv-api\\src\\app\\models\\strength.js',
		    hash = '0e277517246155b059f4ad1d9341011ea0a714c7',
		    global = new Function('return this')(),
		    gcv = '__coverage__',
		    coverageData = {
			path: 'D:\\radea\\Documents\\GitHub\\cv-api\\src\\app\\models\\strength.js',
			statementMap: {
				'1': {
					start: {
						line: 7,
						column: 15
					},
					end: {
						line: 7,
						column: 30
					}
				},
				'2': {
					start: {
						line: 9,
						column: 21
					},
					end: {
						line: 13,
						column: 2
					}
				}
			},
			fnMap: {
				'1': {
					name: 'sql',
					decl: {
						start: {
							line: 17,
							column: 9
						},
						end: {
							line: 17,
							column: 12
						}
					},
					loc: {
						start: {
							line: 17,
							column: 24
						},
						end: {
							line: 20,
							column: 1
						}
					}
				}
			},
			branchMap: {},
			s: {
				'1': 0,
				'2': 0
			},
			f: {
				'1': 0
			},
			b: {}
		},
		    coverage = global[gcv] || (global[gcv] = {});

		if (coverage[path] && coverage[path].hash === hash) {
			return coverage[path];
		}

		coverageData.hash = hash;
		return coverage[path] = coverageData;
	}(); /*
	      *	Dependencies
	      */

	var Schema = (++__cov_441OcM7u_tj79lv4teeoUHQXvJ8.s['1'], _mongoose2.default.Schema);

	var strengthSchema = (++__cov_441OcM7u_tj79lv4teeoUHQXvJ8.s['2'], new Schema({
		name: String,
		score: { type: Number, min: 1, max: 10 },
		skills: [String]
	}));

	function sql(sequelize) {
		// TODO: Implement SQL version of model.

		++__cov_441OcM7u_tj79lv4teeoUHQXvJ8.f['1'];
	}

	exports.sql = sql;
	exports.default = strengthSchema;

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.sql = undefined;

	var _mongoose = __webpack_require__(10);

	var _mongoose2 = _interopRequireDefault(_mongoose);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var __cov_r9LUofNPtZCrmHIG8cmHOsqnVFw = function () {
		var path = 'D:\\radea\\Documents\\GitHub\\cv-api\\src\\app\\models\\reference.js',
		    hash = '90161bf57822420565d2b91194af23a40fc09bb8',
		    global = new Function('return this')(),
		    gcv = '__coverage__',
		    coverageData = {
			path: 'D:\\radea\\Documents\\GitHub\\cv-api\\src\\app\\models\\reference.js',
			statementMap: {
				'1': {
					start: {
						line: 7,
						column: 15
					},
					end: {
						line: 7,
						column: 30
					}
				},
				'2': {
					start: {
						line: 9,
						column: 22
					},
					end: {
						line: 15,
						column: 2
					}
				}
			},
			fnMap: {
				'1': {
					name: 'sql',
					decl: {
						start: {
							line: 18,
							column: 9
						},
						end: {
							line: 18,
							column: 12
						}
					},
					loc: {
						start: {
							line: 18,
							column: 24
						},
						end: {
							line: 21,
							column: 1
						}
					}
				}
			},
			branchMap: {},
			s: {
				'1': 0,
				'2': 0
			},
			f: {
				'1': 0
			},
			b: {}
		},
		    coverage = global[gcv] || (global[gcv] = {});

		if (coverage[path] && coverage[path].hash === hash) {
			return coverage[path];
		}

		coverageData.hash = hash;
		return coverage[path] = coverageData;
	}(); /*
	      *	Dependencies
	      */

	var Schema = (++__cov_r9LUofNPtZCrmHIG8cmHOsqnVFw.s['1'], _mongoose2.default.Schema);

	var referenceSchema = (++__cov_r9LUofNPtZCrmHIG8cmHOsqnVFw.s['2'], new Schema({
		name: String,
		email: String,
		company: String,
		title: String,
		quote: String
	}));

	function sql(sequelize) {
		// TODO: Implement SQL version of model.

		++__cov_r9LUofNPtZCrmHIG8cmHOsqnVFw.f['1'];
	}

	exports.sql = sql;
	exports.default = referenceSchema;

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.mongo = undefined;

	var _mongoose = __webpack_require__(10);

	var _mongoose2 = _interopRequireDefault(_mongoose);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var __cov_LIB2QB2Hm4g7vq0I0NFsi6w5QZQ = function () {
		var path = 'D:\\radea\\Documents\\GitHub\\cv-api\\src\\db.js',
		    hash = 'fdd30f967d85485f1c13e7a6d76bf1f1121f57d1',
		    global = new Function('return this')(),
		    gcv = '__coverage__',
		    coverageData = {
			path: 'D:\\radea\\Documents\\GitHub\\cv-api\\src\\db.js',
			statementMap: {
				'1': {
					start: {
						line: 9,
						column: 1
					},
					end: {
						line: 10,
						column: 37
					}
				},
				'2': {
					start: {
						line: 10,
						column: 2
					},
					end: {
						line: 10,
						column: 37
					}
				},
				'3': {
					start: {
						line: 11,
						column: 1
					},
					end: {
						line: 11,
						column: 17
					}
				}
			},
			fnMap: {
				'1': {
					name: 'mongo',
					decl: {
						start: {
							line: 8,
							column: 9
						},
						end: {
							line: 8,
							column: 14
						}
					},
					loc: {
						start: {
							line: 8,
							column: 23
						},
						end: {
							line: 12,
							column: 1
						}
					}
				}
			},
			branchMap: {
				'1': {
					loc: {
						start: {
							line: 9,
							column: 1
						},
						end: {
							line: 10,
							column: 37
						}
					},
					type: 'if',
					locations: [{
						start: {
							line: 9,
							column: 1
						},
						end: {
							line: 10,
							column: 37
						}
					}, {
						start: {
							line: 9,
							column: 1
						},
						end: {
							line: 10,
							column: 37
						}
					}]
				}
			},
			s: {
				'1': 0,
				'2': 0,
				'3': 0
			},
			f: {
				'1': 0
			},
			b: {
				'1': [0, 0]
			}
		},
		    coverage = global[gcv] || (global[gcv] = {});

		if (coverage[path] && coverage[path].hash === hash) {
			return coverage[path];
		}

		coverageData.hash = hash;
		return coverage[path] = coverageData;
	}(); /*
	      * 	Dependencies
	      */

	function mongo(config) {
		++__cov_LIB2QB2Hm4g7vq0I0NFsi6w5QZQ.f['1'];
		++__cov_LIB2QB2Hm4g7vq0I0NFsi6w5QZQ.s['1'];

		if (!_mongoose2.default.connection.readyState) {
				++__cov_LIB2QB2Hm4g7vq0I0NFsi6w5QZQ.b['1'][0];
				++__cov_LIB2QB2Hm4g7vq0I0NFsi6w5QZQ.s['2'];

				_mongoose2.default.connect(config.mongo.uri);
			} else {
			++__cov_LIB2QB2Hm4g7vq0I0NFsi6w5QZQ.b['1'][1];
		}++__cov_LIB2QB2Hm4g7vq0I0NFsi6w5QZQ.s['3'];
		return _mongoose2.default;
	}

	exports.mongo = mongo;
	exports.default = mongo;

/***/ },
/* 17 */
/***/ function(module, exports) {

	module.exports = require("cors");

/***/ },
/* 18 */
/***/ function(module, exports) {

	module.exports = require("morgan");

/***/ },
/* 19 */
/***/ function(module, exports) {

	module.exports = require("winston");

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	exports.default = function () {
	  ++__cov_BqmW6hQ9YRbWalnwEw7NNXHJmks.f['1'];

	  var env = (++__cov_BqmW6hQ9YRbWalnwEw7NNXHJmks.s['2'], (++__cov_BqmW6hQ9YRbWalnwEw7NNXHJmks.b['6'][0], process.env.NODE_ENV) || (++__cov_BqmW6hQ9YRbWalnwEw7NNXHJmks.b['6'][1], 'defaults'));
	  ++__cov_BqmW6hQ9YRbWalnwEw7NNXHJmks.s['3'];
	  return (0, _objectMerge2.default)(config.defaults, config[env]); //overwrite the defaults with the environment settings
	};

	var _objectMerge = __webpack_require__(21);

	var _objectMerge2 = _interopRequireDefault(_objectMerge);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var __cov_BqmW6hQ9YRbWalnwEw7NNXHJmks = function () {
	  var path = 'D:\\radea\\Documents\\GitHub\\cv-api\\src\\app\\boot\\config.js',
	      hash = '73265c89d1814e5a7b605337b4a9bd47e9134ffb',
	      global = new Function('return this')(),
	      gcv = '__coverage__',
	      coverageData = {
	    path: 'D:\\radea\\Documents\\GitHub\\cv-api\\src\\app\\boot\\config.js',
	    statementMap: {
	      '1': {
	        start: {
	          line: 7,
	          column: 16
	        },
	        end: {
	          line: 38,
	          column: 2
	        }
	      },
	      '2': {
	        start: {
	          line: 41,
	          column: 14
	        },
	        end: {
	          line: 41,
	          column: 48
	        }
	      },
	      '3': {
	        start: {
	          line: 42,
	          column: 2
	        },
	        end: {
	          line: 42,
	          column: 46
	        }
	      }
	    },
	    fnMap: {
	      '1': {
	        name: '(anonymous_1)',
	        decl: {
	          start: {
	            line: 40,
	            column: 16
	          },
	          end: {
	            line: 40,
	            column: 17
	          }
	        },
	        loc: {
	          start: {
	            line: 40,
	            column: 27
	          },
	          end: {
	            line: 43,
	            column: 2
	          }
	        }
	      }
	    },
	    branchMap: {
	      '1': {
	        loc: {
	          start: {
	            line: 10,
	            column: 11
	          },
	          end: {
	            line: 10,
	            column: 67
	          }
	        },
	        type: 'binary-expr',
	        locations: [{
	          start: {
	            line: 10,
	            column: 11
	          },
	          end: {
	            line: 10,
	            column: 39
	          }
	        }, {
	          start: {
	            line: 10,
	            column: 43
	          },
	          end: {
	            line: 10,
	            column: 67
	          }
	        }]
	      },
	      '2': {
	        loc: {
	          start: {
	            line: 20,
	            column: 10
	          },
	          end: {
	            line: 20,
	            column: 66
	          }
	        },
	        type: 'binary-expr',
	        locations: [{
	          start: {
	            line: 20,
	            column: 10
	          },
	          end: {
	            line: 20,
	            column: 38
	          }
	        }, {
	          start: {
	            line: 20,
	            column: 42
	          },
	          end: {
	            line: 20,
	            column: 66
	          }
	        }]
	      },
	      '3': {
	        loc: {
	          start: {
	            line: 26,
	            column: 11
	          },
	          end: {
	            line: 26,
	            column: 67
	          }
	        },
	        type: 'binary-expr',
	        locations: [{
	          start: {
	            line: 26,
	            column: 11
	          },
	          end: {
	            line: 26,
	            column: 39
	          }
	        }, {
	          start: {
	            line: 26,
	            column: 43
	          },
	          end: {
	            line: 26,
	            column: 67
	          }
	        }]
	      },
	      '4': {
	        loc: {
	          start: {
	            line: 33,
	            column: 10
	          },
	          end: {
	            line: 33,
	            column: 34
	          }
	        },
	        type: 'binary-expr',
	        locations: [{
	          start: {
	            line: 33,
	            column: 10
	          },
	          end: {
	            line: 33,
	            column: 26
	          }
	        }, {
	          start: {
	            line: 33,
	            column: 30
	          },
	          end: {
	            line: 33,
	            column: 34
	          }
	        }]
	      },
	      '5': {
	        loc: {
	          start: {
	            line: 34,
	            column: 9
	          },
	          end: {
	            line: 34,
	            column: 53
	          }
	        },
	        type: 'binary-expr',
	        locations: [{
	          start: {
	            line: 34,
	            column: 9
	          },
	          end: {
	            line: 34,
	            column: 31
	          }
	        }, {
	          start: {
	            line: 34,
	            column: 35
	          },
	          end: {
	            line: 34,
	            column: 53
	          }
	        }]
	      },
	      '6': {
	        loc: {
	          start: {
	            line: 41,
	            column: 14
	          },
	          end: {
	            line: 41,
	            column: 48
	          }
	        },
	        type: 'binary-expr',
	        locations: [{
	          start: {
	            line: 41,
	            column: 14
	          },
	          end: {
	            line: 41,
	            column: 34
	          }
	        }, {
	          start: {
	            line: 41,
	            column: 38
	          },
	          end: {
	            line: 41,
	            column: 48
	          }
	        }]
	      }
	    },
	    s: {
	      '1': 0,
	      '2': 0,
	      '3': 0
	    },
	    f: {
	      '1': 0
	    },
	    b: {
	      '1': [0, 0],
	      '2': [0, 0],
	      '3': [0, 0],
	      '4': [0, 0],
	      '5': [0, 0],
	      '6': [0, 0]
	    }
	  },
	      coverage = global[gcv] || (global[gcv] = {});

	  if (coverage[path] && coverage[path].hash === hash) {
	    return coverage[path];
	  }

	  coverageData.hash = hash;
	  return coverage[path] = coverageData;
	}(); /* 
	     * Dependencies 
	     */

	var config = (++__cov_BqmW6hQ9YRbWalnwEw7NNXHJmks.s['1'], {
	  development: {
	    mongo: {
	      uri: (++__cov_BqmW6hQ9YRbWalnwEw7NNXHJmks.b['1'][0], process.env.MONGO_CONNECTION) || (++__cov_BqmW6hQ9YRbWalnwEw7NNXHJmks.b['1'][1], 'mongodb://localhost/cv')
	    }
	  },
	  test: {
	    mongo: {
	      uri: 'mongodb://localhost/cv_test'
	    }
	  },
	  production: {
	    mongo: {
	      uri: (++__cov_BqmW6hQ9YRbWalnwEw7NNXHJmks.b['2'][0], process.env.MONGO_CONNECTION) || (++__cov_BqmW6hQ9YRbWalnwEw7NNXHJmks.b['2'][1], 'mongodb://localhost/cv')
	    },
	    logging: 'tiny'
	  },
	  defaults: {
	    mongo: {
	      uri: (++__cov_BqmW6hQ9YRbWalnwEw7NNXHJmks.b['3'][0], process.env.MONGO_CONNECTION) || (++__cov_BqmW6hQ9YRbWalnwEw7NNXHJmks.b['3'][1], 'mongodb://localhost/cv')
	    },
	    sqlLite: {},
	    logging: 'dev',
	    server: {
	      port: (++__cov_BqmW6hQ9YRbWalnwEw7NNXHJmks.b['4'][0], process.env.PORT) || (++__cov_BqmW6hQ9YRbWalnwEw7NNXHJmks.b['4'][1], 8080),
	      url: (++__cov_BqmW6hQ9YRbWalnwEw7NNXHJmks.b['5'][0], process.env.HEROKU_URI) || (++__cov_BqmW6hQ9YRbWalnwEw7NNXHJmks.b['5'][1], 'http://localhost')
	    }
	  }

	});

/***/ },
/* 21 */
/***/ function(module, exports) {

	module.exports = require("object-merge");

/***/ },
/* 22 */
/***/ function(module, exports) {

	module.exports = require("chai");

/***/ },
/* 23 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var __cov_V$38dNrjLau7JxBOuIUZTUABdJg = function () {
		var path = "D:\\radea\\Documents\\GitHub\\cv-api\\src\\test\\personStub.js",
		    hash = "f3ad75b5c3f1da984a5edb87094e80e4d7c5a7ad",
		    global = new Function('return this')(),
		    gcv = "__coverage__",
		    coverageData = {
			path: "D:\\radea\\Documents\\GitHub\\cv-api\\src\\test\\personStub.js",
			statementMap: {
				"1": {
					start: {
						line: 1,
						column: 13
					},
					end: {
						line: 165,
						column: 2
					}
				}
			},
			fnMap: {},
			branchMap: {},
			s: {
				"1": 0
			},
			f: {},
			b: {}
		},
		    coverage = global[gcv] || (global[gcv] = {});

		if (coverage[path] && coverage[path].hash === hash) {
			return coverage[path];
		}

		coverageData.hash = hash;
		return coverage[path] = coverageData;
	}();

	var stub = (++__cov_V$38dNrjLau7JxBOuIUZTUABdJg.s["1"], {
		"name": "Ryan Dean",
		"tagline": "Precise. Thorough. Adaptable.",
		"email": "radean0909@gmail.com",
		"phone": "970-691-3171",
		"city": "San Jose",
		"state": "CA",
		"image": "https://scontent-sjc2-1.xx.fbcdn.net/v/t1.0-9/1484692_10102112738482133_2538304288088055969_n.jpg?oh=71085a088e69207e5dc733c037c1bd68&oe=58394A23",
		"views": 3,
		"intro": "A <strong>Full Stack Web Developer</strong> that approaches problems with a <strong>data first</strong> mentality, enabling creation of <strong>scalable</strong> apps with <strong>rapid, test-driven development</strong>. Performance enthusiast with a <strong>proven track-record</strong> of writing effective, <strong>enterprise</strong> web applications.<script> console.log('run this'); </script>",
		"projects": [{
			"name": "ELLIS (Electronic Life Improvement System)",
			"description": "An ironically grandiouse personal project, Raspberry Pi alarm clock sets sleep and wake cycles, through worker processes, to aide in falling asleep gently and waking gradually, with several different personalization settings.",
			"repo": "http://www.github.com/radean0909/ellis",
			"startDate": "August 2016"
		}],
		"education": [{
			name: 'Bachelor\'s of Science, Bachelor\'s of Arts',
			type: 'Computer Science, Philosophy, Math',
			school: 'Colorado State University',
			city: 'Fort Collins',
			state: 'CO',
			dates: '2003-2008, various',
			status: 'in progress',
			achievements: 'Speccial triple major approval by Dean\'s office'
		}],
		"strengths": [{
			"name": "Backend/Server Development",
			"score": 9,
			"skills": ["PHP", "<strong>Phalcon</strong>", "<strong>NodeJS</strong>", "Wordpress", "Redis", "<strong>REST APIs</strong>", "Mocha/Chai", "Supertest", "PHPUnit", "<strong>Express/Koa</strong>", "Socket.io", "<strong>mySQL</strong>", "ElasticSearch", "<strong>MongoDB</strong>"]
		}, {
			"name": "Frontend Development",
			"score": 7,
			"skills": ["<strong>HTML5</strong>", "CSS", "SASS", "<strong>Volt</strong>", "Mustache", "<strong>jQuery</strong>", "React", "<strong>Bootstrap</strong>", "Foundation", "Javascript", "Responsive Design"]
		}, {
			"name": "Environments/Tools",
			"skills": ["<strong>Linux</strong>", "Windows", "Apache", "NGINX", "<strong>Git</strong>", "Subversion", "Chef", "<strong>Heroku</strong>", "<strong>AWS</strong>", "Assembla", "Slack", "<strong>Loader.io</strong>", "Travis-CI", "Coveralls.io", "<strong>Fastly</strong>", "Babel", "Webpack", "npm", "composer"]
		}, {
			"name": "Practices",
			"skills": ["<strong>Test Driven Development</strong>", "Code Review", "Internal/External Documentation", "<strong>Agile Development</strong>", "<strong>Project Spec/Scoping</strong>"]
		}],
		"employers": [{
			"name": "Solomid Corporation",
			"title": "Web Developer / Project Manager",
			"dates": "May 2015 - August 2016",
			"description": "Solomid is a company that has a network of <strong>high-traffic</strong> web-apps predominately focused on the video-game industry that generate approximately 180-200 million pageviews per month. I was tasked to design and implement a <strong>cohesion strategy</strong> for their outdated and unorganized apps. I aided in the <strong>hiring and onboarding</strong> of the entire develpoment team, complete with interns. I was directly involved in every project and was the project lead on several significant overhauls. Work included <a href=\"http://www.solomid.net\" target=\"_blank\">integrating new designs</a> into existing sites, large scale <a href=\"http://www.probuilds.net\" target=\"_blank\">data migrations</a>, creation of a <a href=\"http://www.championselect.net\" target=\"_blank\">service-based</a> methodology, and designing and developing several <a href=\"http://api.champion.gg/\" target=\"_blank\">complex RESTful APIs</a>.",
			"achievements": "<ul><li>Overhauled outdated and custom PHP projects</li><li>Moved towards <strong>modular</strong> development practices</li><li>Several high profile <strong>emergency deployments</strong> of complete site relauches</li><li>Development of several integral <strong>NodeJS</strong> and <strong>Phalcon APIs</strong></li><li>Integration and set-up of purchased properties</li></ul>",
			"difficulties": "<ul><li>Interfaced with an entrirely remote team</li><li>Pre-existing code was highly custom with no documentation or design philosophy in place</li><li>Challeneges associated with implementing significant redesigns on an already popular network of sites with strong brand loyalty</li><li>Frequently adjusting tech stack based upon new hire coding preferences</li></ul>"
		}, {
			"name": "Blue Sun Media",
			"title": "Web Developer",
			"dates": "March 2014 - July 2015",
			"description": "Blue Sun Media is a small but effective web development firm, primarily focused on the radio and media industry. Blue Sun's clients included household names such as <strong>Jerry Springer</strong>, <strong>Artie Lang</strong>, <strong>Rich Eisen</strong>, and <strong>Dan Patrick</strong>. Originally hired as a freelance developer, I was quickly brought into the fold full-time. I implemented and designed several complex and <strong>highly customized Wordpress solutions</strong> for applications ranging from crowdsourced non-profit communities by the reputable <strong>GBG Foundation</strong>, Investment banker tools, and large scale podcast programs. Tight deadlines and timetables, rapid pivoting, and consistant multitasking were all serious expectations, at which I excelled.",
			"achievements": "<ul><li>Designed and created a complex, project-based, <a href=\"http://www.csrmatch.org/\" target=\"_blank\">non-profit directory</a> with a robust searching mechanism</li><li>Helped to develop and deploy several improvements for <a href=\"http://www.jerryspinger.com\" target=\"_blank\">media</a> <a href=\"http://www.richeisenshow.com/\" target=\"_blank\">personality</a> <a href=\"http://www.danpatrick.com/\" target=\"_blank\">sites</a></li><li>Launched an authenticated and commercial <a href=\"http://www.artiequitter.com/\" target=\"_blank\"> Artie Lange podcast</a></li><li>Overhauled wordpress data designs for projects that required custom mySQL schemas</li></ul>",
			"difficulties": "<ul><li>Interfaced with an entrierly remote team</li><li>Frequent pivoting due to client scope creep and fluctuating priorities</li><li>Frequent and tight deadlines</li><li>Zero downtime tolerance</li><li>Highly customized, media-rich Wordpress site designs</li></ul>"
		}, {
			"name": "Community Funded",
			"title": "Web Developer / Project Lead",
			"dates": "May 2011 - November 2013",
			"description": "<a href=\"http://www.communityfunded.com\" target=\"_blank\">Community Funded</a>, a crowdsource funding platform and white-label solution, is a small, passionate startup. I was added to the one-man development team prior to launch. I volunteered my time, pro-bono, until the company became funded, several months later. Then, team was scaled from two to ten and rapid development of version 2.0 began. I was responsible for leading the team on the complete redesign with siginificant <strong>user and dashboard</strong> focused as well as <strong>large-scale payment integration</strong>. Further, I acted as a <strong>team leader</strong>, reporting directly to management and overseeing other developers' tasks.",
			"achievements": "<ul><li>Launched project with original team</li><li>Acted as <strong>project lead</strong> for new, larger development team</li><li>Participated in and oversaw the complete visual overhaul of the site and </li><li>Implemented client-facing custom dashboard and management app</li><li>Designed and implemented a <strong>large scale, modularized payment service</strong> overhaul</li></ul>",
			"difficulties": "<ul><li>Very frequent pivots</li><li>Highly complex and customized Wordpress install</li><li>Rapidly changing company structure often left team wondering with whom to report</li><li>Significant ground-breaking precedents being set</li></ul>"
		}, {
			"name": "Scout Development (Self Employed)",
			"title": "Web Developer / Owner",
			"dates": "Various Spring 2008 - Spring 2014",
			"description": "Scout Development was a web development firm owned and operated solely by myself. It focused on the thriving artist/musician and small-business community in the vibrant college town oif Fort Collins, CO. I focused on complete end-to-end custom sites design and implementation both locally and remotely. Development was primarily focused on <strong>HTML</strong>, <strong>Javascript</strong>, and <strong>PHP</strong>."
		}],
		"references": [{
			"name": "Alejandro Baltra",
			"email": "alejandro@solomid.net",
			"quote": "Ryan's a great, proactive teammate. Always willing to help and learn new technologies as projects require.",
			"title": "Project Manager",
			"company": "Solomid"
		}, {
			"name": "Russ Gilbert",
			"email": "russ@bluesunmedia.com",
			"quote": "Ryan is a great addition to any development team! His commitment to quality is second-to-none!",
			"title": "Owner",
			"company": "Blue Sun Media"
		}, {
			"name": "Roger Seflinger",
			"email": "roger@bluesunmedia.com",
			"title": "CIO",
			"company": "Blue Sun Media"
		}, {
			"name": "Adam Nowak",
			"email": "adam@hyperspacial.com",
			"quote": "Ryan was a great developer and project leader to work with when we were at Community Funded together.",
			"title": "Senior Web Developer",
			"company": "a-train marketing"
		}]
	});
	exports.stub = stub;
	exports.default = stub;

/***/ }
/******/ ]);