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

	var _bodyParser = __webpack_require__(2);

	var _bodyParser2 = _interopRequireDefault(_bodyParser);

	var _routes = __webpack_require__(3);

	var _routes2 = _interopRequireDefault(_routes);

	var _cors = __webpack_require__(13);

	var _cors2 = _interopRequireDefault(_cors);

	var _morgan = __webpack_require__(14);

	var _morgan2 = _interopRequireDefault(_morgan);

	var _winston = __webpack_require__(15);

	var _winston2 = _interopRequireDefault(_winston);

	var _config = __webpack_require__(16);

	var _config2 = _interopRequireDefault(_config);

	var _db = __webpack_require__(12);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// create app
	/* 
	 * Dependencies 
	 */

	var app = (0, _express2.default)();
	var config = new _config2.default();

	(0, _db.mongo)(config);

	// logging
	var logger = (0, _morgan2.default)(config.logging);

	app.use(_bodyParser2.default.json()).use(_bodyParser2.default.urlencoded({ extended: true })).use(logger).use((0, _cors2.default)()).use(_express2.default.static('client/build'));

	(0, _routes2.default)(app);

	app.listen(config.server.port, function () {
		_winston2.default.info('App listening on port %d', config.server.port);
	});

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = require("express");

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = require("body-parser");

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _person = __webpack_require__(4);

	var _person2 = _interopRequireDefault(_person);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function (app) {

		// Endpoints

		app.get('/person', _person2.default.get);
		app.get('/person/:id', _person2.default.get);

		app.post('/person', _person2.default.create);

		app.put('/person/:id', _person2.default.update);
		app.put('/person/addView/:id', _person2.default.addView);
		app.delete('/person/:id', _person2.default.remove);
		app.delete('/person/:id/:force', _person2.default.remove);
	}; /** 
	    * 	Dependencies
	    */

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.addView = exports.remove = exports.update = exports.create = exports.get = undefined;

	var _person = __webpack_require__(5);

	var _person2 = _interopRequireDefault(_person);

	var _db = __webpack_require__(12);

	var _db2 = _interopRequireDefault(_db);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/*
	 * 	Basic CRUD functionality with minimal search and soft/hard remove logic
	 */

	/** 
	 * 	Dependencies
	 */

	function get(req, res, next) {
		var query = req.query.s ? new RegExp(req.query.s, "i") : null;

		var params = query ? { name: query, $or: [{ deleted: false }, { deleted: { $exists: false } }] } : { $or: [{ deleted: false }, { deleted: { $exists: false } }] };

		_person2.default.findOne(params, null, { lean: true }, function (err, results) {
			if (err) return res.json(err);
			if (results) return res.json(results);else return res.json({ error: _person2.default.modelName + ' not found.' });
		});
	}

	function create(req, res, next) {
		var person = new _person2.default(req.body);

		person.save(function (err) {
			if (err) return res.json({ status: 'error', error: err });
			return res.json({ status: 'saved', data: person });
		});
	}

	function update(req, res, next) {
		var id = req.params.id;
		var data = req.body;
		var params = { _id: id, $or: [{ deleted: false }, { deleted: { $exists: false } }] };

		if (!id) return res.json({ error: 'Invalid params, id required' });

		_person2.default.findOneAndUpdate(params, { $set: data }, { lean: true, new: true }, function (err, results) {
			if (err) return res.json(err);
			if (results) return res.json(results);else return res.json({ error: _person2.default.modelName + ' not found.' });
		});
	}

	function remove(req, res, next) {
		var id = req.params.id;
		var force = req.params.force || false;

		if (!id) return res.json({ error: 'Invalid params, id required' });

		if (force) {
			// hard remove
			_person2.default.findOneAndRemove({ _id: id }, function (err, results) {
				if (err) return res.json(err);
				if (results) return res.json(results);else return res.json({ error: _person2.default.modelName + ' not found.' });
			});
		} else {
			// soft remove
			_person2.default.findOneAndUpdate({ _id: id }, { $set: { deleted: true } }, { lean: true, new: true }, function (err, results) {
				if (err) return res.json(err);
				if (results) return res.json(results);else return res.json({ error: _person2.default.modelName + ' not found.' });
			});
		}
	}

	/*
	 *	Additional business logic
	 */

	function addView(req, res, next) {
		var id = req.params.id;
		_person2.default.findOneAndUpdate({ _id: id }, { $inc: { views: 1 } }, { new: true, lean: true }, function (err, results) {
			if (err) return res.json(err);
			if (results) return res.json({ views: results.views });else return res.json({ error: _person2.default.modelName + ' not found.' });
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
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _mongoose = __webpack_require__(6);

	var _mongoose2 = _interopRequireDefault(_mongoose);

	var _education = __webpack_require__(7);

	var _education2 = _interopRequireDefault(_education);

	var _employer = __webpack_require__(8);

	var _employer2 = _interopRequireDefault(_employer);

	var _project = __webpack_require__(9);

	var _project2 = _interopRequireDefault(_project);

	var _strength = __webpack_require__(10);

	var _strength2 = _interopRequireDefault(_strength);

	var _reference = __webpack_require__(11);

	var _reference2 = _interopRequireDefault(_reference);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/*
	 *	Dependencies
	 */

	var Schema = _mongoose2.default.Schema;

	var personSchema = new Schema({
		name: String,
		title: String,
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
	});

	exports.default = _mongoose2.default.model('Person', personSchema);

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = require("mongoose");

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.sql = undefined;

	var _mongoose = __webpack_require__(6);

	var _mongoose2 = _interopRequireDefault(_mongoose);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Schema = _mongoose2.default.Schema; /*
	                                         *	Dependencies
	                                         */

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

	function sql(sequelize) {
		// TODO: Implement SQL version of model.

	}

	exports.sql = sql;
	exports.default = educationSchema;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.sql = undefined;

	var _mongoose = __webpack_require__(6);

	var _mongoose2 = _interopRequireDefault(_mongoose);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Schema = _mongoose2.default.Schema; /*
	                                         *	Dependencies
	                                         */

	var employerSchema = new Schema({
		name: String,
		title: String,
		startDate: String,
		endDate: String,
		description: String,
		difficulties: String,
		achievements: String
	});

	function sql(sequelize) {
		// TODO: Implement SQL version of model.

	}

	exports.default = employerSchema;
	exports.sql = sql;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.sql = undefined;

	var _mongoose = __webpack_require__(6);

	var _mongoose2 = _interopRequireDefault(_mongoose);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Schema = _mongoose2.default.Schema; /*
	                                         *	Dependencies
	                                         */

	var projectSchema = new Schema({
		name: String,
		type: String,
		url: String,
		repo: String,
		startDate: String,
		description: String
	});

	function sql(sequelize) {
		// TODO: Implement SQL version of model.

	}

	exports.sql = sql;
	exports.default = projectSchema;

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.sql = undefined;

	var _mongoose = __webpack_require__(6);

	var _mongoose2 = _interopRequireDefault(_mongoose);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Schema = _mongoose2.default.Schema; /*
	                                         *	Dependencies
	                                         */

	var strengthSchema = new Schema({
		name: String,
		score: { type: Number, min: 1, max: 10 },
		skills: [String]
	});

	function sql(sequelize) {
		// TODO: Implement SQL version of model.

	}

	exports.sql = sql;
	exports.default = strengthSchema;

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.sql = undefined;

	var _mongoose = __webpack_require__(6);

	var _mongoose2 = _interopRequireDefault(_mongoose);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Schema = _mongoose2.default.Schema; /*
	                                         *	Dependencies
	                                         */

	var referenceSchema = new Schema({
		name: String,
		email: String,
		company: String,
		title: String,
		quote: String
	});

	function sql(sequelize) {
		// TODO: Implement SQL version of model.

	}

	exports.sql = sql;
	exports.default = referenceSchema;

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.mongo = undefined;

	var _mongoose = __webpack_require__(6);

	var _mongoose2 = _interopRequireDefault(_mongoose);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function mongo(config) {
		if (!_mongoose2.default.connection.readyState) _mongoose2.default.connect(config.mongo.uri);
		return _mongoose2.default;
	} /*
	   * 	Dependencies
	   */

	exports.mongo = mongo;
	exports.default = mongo;

/***/ },
/* 13 */
/***/ function(module, exports) {

	module.exports = require("cors");

/***/ },
/* 14 */
/***/ function(module, exports) {

	module.exports = require("morgan");

/***/ },
/* 15 */
/***/ function(module, exports) {

	module.exports = require("winston");

/***/ },
/* 16 */
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

	var _lodash = __webpack_require__(17);

	var _lodash2 = _interopRequireDefault(_lodash);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var config = {
	  development: {
	    mongo: {
	      uri: process.env.MONGO_CONNECTION || 'mongodb://localhost/cv'
	    }
	  },
	  test: {
	    mongo: {
	      uri: 'mongodb://localhost/cv'
	    }
	  },
	  production: {
	    mongo: {
	      uri: process.env.MONGO_CONNECTION || 'mongodb://localhost/cv'
	    },
	    logging: 'tiny'
	  },
	  defaults: {
	    mongo: {
	      uri: process.env.MONGO_CONNECTION || 'mongodb://localhost/cv'
	    },
	    sqlLite: {},
	    logging: 'dev',
	    server: {
	      port: process.env.PORT || 8080,
	      url: process.env.HEROKU_URI || 'http://localhost'
	    }
	  }

	}; /* 
	   * Dependencies 
	   */

/***/ },
/* 17 */
/***/ function(module, exports) {

	module.exports = require("lodash");

/***/ }
/******/ ]);