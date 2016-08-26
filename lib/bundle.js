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

	'use strict';

	var _express = __webpack_require__(1);

	var _express2 = _interopRequireDefault(_express);

	var _config = __webpack_require__(2);

	var _config2 = _interopRequireDefault(_config);

	var _mongoose = __webpack_require__(4);

	var _mongoose2 = _interopRequireDefault(_mongoose);

	var _knex = __webpack_require__(5);

	var _knex2 = _interopRequireDefault(_knex);

	var _morgan = __webpack_require__(6);

	var _morgan2 = _interopRequireDefault(_morgan);

	var _routes = __webpack_require__(7);

	var _routes2 = _interopRequireDefault(_routes);

	var _winston = __webpack_require__(14);

	var _winston2 = _interopRequireDefault(_winston);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// create app
	var app = (0, _express2.default)(); /* 
	                                     * Dependencies 
	                                     */

	var config = new _config2.default();

	_mongoose2.default.connect(config.mongo.uri);
	(0, _routes2.default)(app);

	// logging
	var logger = (0, _morgan2.default)(config.logging);
	app.use(logger);

	app.listen(config.server.port, function () {
	  _winston2.default.log('App listening on port %d', config.server.port);
	});

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = require("express");

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	exports.default = function () {
	  var env = process.env.NODE_ENV | 'defaults';

	  if (env !== 'defaults') return _lodash2.default.defaultsDeep(config[env], config.defaults); //overwrite teh defaults with the environment settings
	  else return config.defaults;
	};

	var _lodash = __webpack_require__(3);

	var _lodash2 = _interopRequireDefault(_lodash);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var config = {
	  development: {
	    mongo: {
	      uri: 'mongodb://localhost/cv'
	    },
	    sqlLite: {}
	  },
	  test: {
	    mongo: {
	      uri: 'mongodb://localhost/cv'
	    },
	    sqlLite: {}
	  },
	  production: {
	    mongo: {
	      uri: 'mongodb://localhost/cv'
	    },
	    sqlLite: {},
	    logging: 'tiny'
	  },
	  defaults: {
	    mongo: {
	      uri: 'mongodb://localhost/cv'
	    },
	    sqlLite: {},
	    logging: 'dev',
	    server: {
	      port: 8080
	    }
	  }

	}; /* 
	   * Dependencies 
	   */

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = require("lodash");

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = require("mongoose");

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = require("knex");

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = require("morgan");

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

	exports.default = function (app) {

		// Endpoints
		app.get('/', function (req, res) {
			res.json({ status: 'success' });
		});

		app.get('/applicant', _person2.default.get);
	}; /** 
	    * 	Dependencies
	    */

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	exports.default = function () {
		get: (function (req, res, next) {
			var params = req.params;

			_applicant2.default.findOne(params, { lean: true }, function (err, results) {
				if (err) return res.json(err);
				if (results) return res.json(results);else return res.json({ error: 'No data found!' });
			});
		});
	};

	var _applicant = __webpack_require__(9);

	var _applicant2 = _interopRequireDefault(_applicant);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.sql = exports.mongo = undefined;

	var _employer = __webpack_require__(10);

	var _employer2 = _interopRequireDefault(_employer);

	var _strength = __webpack_require__(11);

	var _strength2 = _interopRequireDefault(_strength);

	var _education = __webpack_require__(12);

	var _education2 = _interopRequireDefault(_education);

	var _project = __webpack_require__(13);

	var _project2 = _interopRequireDefault(_project);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/*
	 *	Dependencies
	 */
	function mongo(mongoose) {

		var Schema = mongoose.Schema;

		var applicantSchema = new Schema({
			name: String,
			title: String,
			email: String,
			phone: String,
			city: String,
			state: { type: String, maxLength: 2 },
			image: String,
			employers: [_employer2.default],
			strengths: [_strength2.default],
			education: [_education2.default],
			projects: [_project2.default]
		});

		return mongoose.model('Applicant', applicantSchema);
	}

	function sql(sequelize) {
		// TODO: Implement SQL version of model.

	}

	exports.mongo = mongo;
	exports.sql = sql;

/***/ },
/* 10 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	function mongo(mongoose) {

		var Schema = mongoose.Schema;

		var employerSchema = new Schema({
			name: String,
			title: String,
			startDate: String,
			endDate: String,
			description: String,
			challenges: [String],
			achievements: [String]
		});

		// this is a subdocument, so doesn't need to return a model
		return employerSchema;
	}

	function sql(sequelize) {
		// TODO: Implement SQL version of model.

	}

	exports.mongo = mongo;
	exports.sql = sql;

/***/ },
/* 11 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	function mongo(mongoose) {

		var Schema = mongoose.Schema;

		var strengthSchema = new Schema({
			name: String,
			score: { type: Number, min: 1, max: 10 },
			skills: [String]
		});

		// this is a subdocument, so doesn't need to return a model
		return strengthSchema;
	}

	function sql(sequelize) {
		// TODO: Implement SQL version of model.

	}

	exports.mongo = mongo;
	exports.sql = sql;

/***/ },
/* 12 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	function mongo(mongoose) {

		var Schema = mongoose.Schema;

		var educationSchema = new Schema({
			name: String,
			type: String,
			school: String,
			city: String,
			state: { type: String, maxLength: 2 },
			startDate: String,
			endDate: String,
			status: String,
			achievements: [String]
		});

		// this is a subdocument, so doesn't need to return a model
		return educationSchema;
	}

	function sql(sequelize) {
		// TODO: Implement SQL version of model.

	}

	exports.mongo = mongo;
	exports.sql = sql;

/***/ },
/* 13 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	function mongo(mongoose) {

		var Schema = mongoose.Schema;

		var projectSchema = new Schema({
			name: String,
			type: String,
			url: String,
			repo: String,
			startDate: String,
			description: String
		});

		// this is a subdocument, so doesn't need to return a model
		return projectSchema;
	}

	function sql(sequelize) {
		// TODO: Implement SQL version of model.

	}

	exports.mongo = mongo;
	exports.sql = sql;

/***/ },
/* 14 */
/***/ function(module, exports) {

	module.exports = require("winston");

/***/ }
/******/ ]);