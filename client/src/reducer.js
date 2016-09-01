import {List, Map} from 'immutable';

function setState(state, newState) {
  return state.merge(newState);
}

function visit(state) {
  return state.update('views', (v) => {
    return v++;
  }); 
}

function savePerson(state) {
  return new Map(state);
}

function getPerson(person) {
  state = state.setIn(['react', 'person', 'id'], person || 'default');
  return state.setIn(['react', 'person', 'isFetching'], true);
}

export default function(state = Map(), action) {
  switch (action.type) {
  case 'SET_STATE':
    return setState(state, action.state);
  case 'VISIT':
    return visit(state);
  case 'REQUEST_PERSON':
    console.log('REQUEST_PERSON', action);
    return getPerson(action);
  case 'RESPONSE_PERSON':
    return savePerson(action.person);
  default:
    return state;
  }
}