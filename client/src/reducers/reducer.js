import {List, Map} from 'immutable';

function setState(state, newState) {
  return state.merge(newState);
}

function visit(state) {
  return state.update('views', (v) => {
    return v++;
  });
  
}


export default function(state = Map(), action) {
  switch (action.type) {
  case 'SET_STATE':
    return setState(state, action.state);
  case 'VISIT':
    return visit(state);
  }
  return state;
}