/**
 * 	Dependencies
 */
import fetch from 'isomorphic-fetch';

function getPerson(person) {
	return {
		type: 'REQUEST_PERSON',
		person
	}
}

function savePerson(person) {
	return {
		type: 'RESPONSE_PERSON',
		person
	}
}

function fetchPerson(person) {
	console.log('fetching:',person)
	return fetch('//localhost:8080/person/' + person);
}

export function doView() {
	return {
		type: 'VISIT'
	}
}

export function getResumeFromServer(person) {

	return function(dispatch) {
		return fetchPerson().then(
			response => {return response.json(); }
		).then(
			person => dispatch(savePerson(person))
		)
	}
}