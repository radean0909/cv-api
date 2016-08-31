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
		  name: "ELLIS (Electronic Life Improvement System)",
		  description: "The alarm clock sets sleep and wake cycles, through worker processes, to aide in falling asleep gently and waking gradually, with several different personalization settings.",
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
		    "<strong>Phalcon</strong>",
		    "<strong>NodeJS</strong>",
		    "Wordpress",
		    "Redis",
		    "<strong>REST APIs</strong>",
		    "Mocha/Chai",
		    "Supertest",
		    "PHPUnit",
		    "<strong>Express/Koa</strong>",
		    "Socket.io",
		    "<strong>mySQL</strong>",
		    "ElasticSearch",
		    "<strong>MongoDB</strong>"
		  ]
		},
		{
		  name: "Frontend Development",
		  score: 7,
		  skills: [
		    "<strong>HTML5</strong>",
		    "CSS",
		    "SASS",
		    "<strong>Volt</strong>",
		    "Mustache",
		    "<strong>jQuery</strong>",
		    "React",
		    "<strong>Bootstrap</strong>",
		    "Foundation",
		    "Javascript",
		    "Responsive Design"
		  ]
		},
		{
			name: "Environments/Tools",
			skills: [
				"<strong>Linux</strong>",
				"Windows",
				"Apache",
				"NGINX",
				"<strong>Git</strong>",
				"Subversion",
				"Chef",
				"<strong>Heroku</strong>",
				"<strong>AWS</strong>",
				"Assembla",
				"Slack",
				"<strong>Loader.io</strong>",
				"Travis-CI",
				"Coveralls.io",
				"<strong>Fastly</strong>",
				"Babel",
				"Webpack",
				"npm",
				"composer"
			]
		},
		{
			name: "Practices",
			skills: [
				"<strong>Test Driven Development</strong>",
				"Code Review",
				"Internal/External Documentation",
				"<strong>Agile Development</strong>",
				"<strong>Project Spec/Scoping</strong>"
			]
		}
		],
		employers: [
			{
				name: 'Solomid Corporation',
				title: 'Web Developer / Project Manager',
				dates: 'May 2015 - August 2016',
				description: 'Solomid is a company that has a network of <strong>high-traffic</strong> (~180-200 mil pageviews/month) web-apps predominately focused on the video-game industry surrounding <strong>League of Legends</strong>. I was tasked to <strong>design</strong> and <strong>implement</strong> a cohesion strategy for their outdated and unorganized apps. In addition, I aided in the <strong>hiring</strong> and onboarding of an entire dev team, complete with interns. I was directly involved in every project and the project lead on several significant overhauls. Work included <a href="http://www.solomid.net" target="_blank">integrating new designs</a> into existing sites, large scale <a href="http://www.probuilds.net" target="_blank">data migrations</a>, creation of a <a href="http://www.championselect.net" target="_blank">service-based</a> methodology and several designing and developing <a href="http://api.champion.gg/" target="_blank">complex RESTful APIs</a>.',
				achievements: 'Overhauled outdated and custom PHP projects. Moved towards <strong>modular</strong> development practices. Several high profile <strong>emergency deployments</strong> of complete site overhauls. Development of several integral <strong>NodeJS</strong> and <strong>Phalcon</strong> APIs. Integration and set-up of purchased properties.',
				difficulties: 'Interfaced with entrierly remote team. Original project creators no longer part of company with minimal direction, documentation or guidence and highly customized code. Implementing significant redesigns on an already popular network of sites with strong brand loyalty. Adjusting tech stack based upon new hire\'s expertise.'
			},
			{
				name: 'Blue Sun Media',
				title: 'Web Developer',
				dates: 'March 2014 - July 2015',
				description: 'Blue Sun Media is a small but effective web development firm. Primarily focused (though hardly exclusively) on the radio and media industry, clients included household names such as <strong>Jerry Springer</strong>, <strong>Artie Lang</strong>, <strong>Rich Eisen</strong>, and <strong>Dan Patrick</strong>. Originally hired as a freelance developer, I was quickly brought into the fold full-time. I implemented and designed several complex and <strong>highly customized Wordpress</strong> solutions for applications ranging from crowdsourced non-profit communities by the reputable <strong>GBG Foundation</strong>, Investment Banker tools, and large scale podcasat programs. Tight deadlines and timetables, rapid pivoting, and serious multitasking were all serious expectations, at which I excelled.',
				achievements: 'Designed and created complex project-based non-profit directory <a href="http://www.csrmatch.org/" target="_blank">CSR Match</a> with a robust searching mechanism. Helped to develop and deploy several improvements for media-personality sites. Launched a private and commercial <a href="http://www.artiequitter.com/" target="_blank"> Artie Lange podcast</a>. Overhauled wordpress data designs for projects that required custom mySQL schemas.',
				difficulties: 'Interfaced with entrierly remote team. Frequent pivoting due to client scope creep or focus pivots. Frequent and tight deadlines. Zero downtime tolerance. Rich multimedia, highly customized Wordpress sites.'
			},
			{
				name: 'Community Funded',
				title: 'Web Developer / Project Lead',
				dates: 'May 2011 - November 2013',
				description: 'Community Funded, a crowdsource funding platform and white-label solution, is a small, passionate startup. I was added to the one-man development team prior to launch. I volunteered my time as pro-bono services until the company became funded, several months later. At this time, the team was scaled from two to ten and rapid development of version 2.0 began. I was responsible for leading the team on the <strong>complete redesign</strong> with siginificant <strong>user and dashboard</strong> focused development as well as <strong>large-scale payment integration</strong>. Further, I acted as a team leader, reporting directly to management and overseeing other developers tasks.',
				achievements: 'Launched project with original team. Acted as <strong>Project Lead</strong> for new, larger development team. Participated and <strong>oversaw</strong> the complete visual overhaul of the site and <strong>implemented client-facing custom dashboard and management app</strong>. Designed and implemented a <strong>large scale, modularized payment service</strong> overhaul.',
				difficulties: 'Very frequent pivots. Highly complex and customized Wordpress install. Rapidly changing company structure often left team wondering who to report to. Significant ground-breaking precedents being set.'
			},
			{
				name: 'Scout Development (Self Employed)',
				title: 'Web Developer / Owner',
				dates: 'Various Spring 2008 - Spring 2014',
				description: 'Personal and small business web development business owned and operated solely by myself. Focused on the thriving artist/musician community and the small-business community in a vibrant college town. Complete end-to-end custom sites design and implementation. Freelance work both locally and remotely. Primarily focused on HTML, Javascript, and PHP.',
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
				quote: 'Ryan is a great addition to any development team! His commitment to quality is second-to-none!',
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
