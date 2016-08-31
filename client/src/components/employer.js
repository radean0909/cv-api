import React, { Component } from 'react';
import '../css/cv.css';
import FontAwesome from 'react-fontawesome';
import PureRenderMixin from 'react-addons-pure-render-mixin';

export const Employer = React.createClass({
    mixins: [PureRenderMixin],
    render: function() {
    	const parsedHTML = function(html) {
    		// remove all script tags, just to be safe (they shouldn't be run as innerHTML anyway)
			return { __html: html.replace(/<script.*?>.*?<\/script>/igm, '') }; 
    	}
    	return (
    		<div className="row">
	    		<div className="col-lg-3">
		    		<h5>{this.props.data.get('name')}</h5>
		    		<h6>{this.props.data.get('title')}</h6>
		    		<small>{this.props.data.get('dates')}</small>
		    	</div>
		    	<div className="col-lg-9">
		    		<p><strong>Description: </strong><span dangerouslySetInnerHTML={parsedHTML(this.props.data.get('description'))} /></p>
		    		<p><strong>Achievements: </strong><span dangerouslySetInnerHTML={parsedHTML(this.props.data.get('achievements'))} /></p>
		    		<p><strong>Difficulties: </strong><span dangerouslySetInnerHTML={parsedHTML(this.props.data.get('difficulties'))} /></p>
	    		</div>
    		</div>
    	)
  	}
});

export default Employer;