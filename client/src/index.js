import React from 'react';
import ReactDOM from 'react-dom';
import reducer from './reducers/reducer';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { CVContainer } from './components/cv';
import './css/index.css';
import {Router, Route} from 'react-router';
import ReactGA from 'react-ga';

const store = createStore(reducer);

ReactGA.initialize('UA-83444622-1');
// set initial state - THIS IS TEST DATA
store.dispatch({
	type: 'SET_STATE',
	state: {
		name: "Ryan Dean",
		tagline: "Precise. Thorough. Adaptable.",
		email: "radean0909@gmail.com",
		phone: "970-691-3171",
		city: "San Jose",
		state: "CA",
		image: "https://media.licdn.com/mpr/mpr/shrinknp_400_400/AAEAAQAAAAAAAAfvAAAAJGM5Mzk1MTRiLWYxNGMtNDYyZi05ODViLTllMTc0ZDZkODZkOA.jpg",
		views: 3,
		intro: "A <strong>Full Stack Web Developer</strong> that approaches problems with a <strong>data first</strong> mentality, enabling creation of <strong>scalable</strong> apps with <strong>rapid, test-driven development</strong>. Performance enthusiast with a <strong>proven track-record</strong> of writing effective, <strong>enterprise</strong> web applications.<script> console.log('run this'); </script>",
		projects: [
		{
		  name: "Ellis",
		  description: "Node/React Interface for homemade Raspberry Pi alarm clock",
		  repo: "http://www.github.com/radean0909/ellis",
		  startDate: "August 2016",
		}
		],
		education: [],
		strengths: [
		{
		  name: "Backend/Server Development",
		  score: 9,
		  skills: [
		    "PHP",
		    "Phalcon (PHP)",
		    "<strong>NodeJS</strong>",
		    "Express/Koa",
		    "Redis",
		    "Fastly (Varnish Cache)",
		    "Mocha/Chai",
		    "Supertest (Integration Testing)",
		    "PHPUnit"
		  ]
		},
		{
		  name: "Front-end Development",
		  score: 7,
		  skills: [
		    "HTML5",
		    "CSS",
		    "LESS/SASS",
		    "Volt",
		    "Mustache (Templating Engine)",
		    "jQuery",
		    "React",
		    "Bootstrap",
		    "Foundation",
		    "Fastly (Varnish Cache)",
		    "Loader.io"
		  ]
		}
		],
		employers: [
			{
				name: 'Solomid Corporation',
				title: 'Web Developer / Project Manager',
				dates: 'May 2015 - August 2016',
				description: 'This is a desccription',
				achievements: 'Some achievements are listed <strong>here</strong>',
				difficulties: 'And the difficulties'
			}
		],
		references: [
			{
				name: 'Alejandro Baltra',
				email: 'alejandro@solomid.net',
				quote: 'Ryan\'s a great, proactive teammate. Always willing to help and learn new technologies as projects require',
				title: 'Project Manager',
				company: 'Solomid'
			},
			{
				name: 'Russ Gilbert',
				email: 'russ@bluesunmedia.com',
				quote: 'Ryan is a fantastic developer and I would re-hire him in an instant!',
				title: 'Owner',
				company: 'Blue Sun Media'
			},
			{
				name: 'Adam Nowak',
				email: 'adam@hyperspacial.com',
				quote: 'Ryan was a great developer when we worked together, and we still stay in touch. He helps me often with problems even to this day!',
				title: 'Senior Web Developer',
				company: 'A-train Marketing'
			},
		]
	}
})

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

ReactDOM.render(
  <Provider store={store}>
  	<Router routes={routes} onUpdate={logPageView} />
  </Provider>,
  document.getElementById('root')
);
