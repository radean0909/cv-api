import React, { Component } from 'react';
import '../css/cv.scss';
import FontAwesome from 'react-fontawesome';
import PureRenderMixin from 'react-addons-pure-render-mixin';

export const Employer = React.createClass({
    mixins: [PureRenderMixin],
    render: function() {
    	const parsedHTML = function(html) {
    		// remove all script tags, just to be safe (they shouldn't be run as innerHTML anyway)
			return { __html: html.replace(/<script.*?>.*?<\/script>/igm, '') }; 
    	}

    	const achievements = (this.props.data.achievements) ? <p><strong>Achievements: </strong><span dangerouslySetInnerHTML={parsedHTML(this.props.data.achievements)} /></p> : null;
    	const challenges = (this.props.data.difficulties) ? <p><strong>Challenges: </strong><span dangerouslySetInnerHTML={parsedHTML(this.props.data.difficulties)} /></p> : null;
    	return (
    		<div className="row">
	    		<div className="col-lg-3">
		    		<h5>{this.props.data.name}</h5>
		    		<h6>{this.props.data.title}</h6>
		    		<small>{this.props.data.dates}</small>
		    	</div>
		    	<div className="col-lg-9">
		    		<p><strong>Description: </strong><span dangerouslySetInnerHTML={parsedHTML(this.props.data.description)} /></p>
		    		{achievements}
		    		{challenges}
	    		</div>
    		</div>
    	)
  	}
});

export default Employer;