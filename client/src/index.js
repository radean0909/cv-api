import React from 'react';
import ReactDOM from 'react-dom';
import reducer from './reducer';
import { getResumeFromServer, doView } from './actions';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { CVContainer } from './components/cv';
import './css/index.css';
import {Router, Route} from 'react-router';
import ReactGA from 'react-ga';

const store = createStore(reducer, applyMiddleware(thunk));

ReactGA.initialize('UA-83444622-1');

function logPageView() {
	ReactGA.set({ page: window.location.pathname });
  	ReactGA.pageview(window.location.pathname);
  	addView();
}

function addView() {
	// Send data to the server to increment views
	store.dispatch({type: 'VIEW', state: store.getState});
}

const routes = (
	<Route component={CVContainer} >
		<Route path="/resume" component={CVContainer} />
		<Route path="/" component={CVContainer} />
	</Route>
);

// Get initial state and then start rendering
store.dispatch(getResumeFromServer()).then( () => {
	ReactDOM.render(
	  <Provider store={store}>
	  	<Router routes={routes} onUpdate={logPageView} />
	  </Provider>,
	  document.getElementById('root'));
});
