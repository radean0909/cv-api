import React, { Component } from 'react';
import '../css/cv.scss';
import FontAwesome from 'react-fontawesome';
import PureRenderMixin from 'react-addons-pure-render-mixin';

const Project = React.createClass({
  	mixins: [PureRenderMixin],
  	render: function() {
  		const parsedHTML = function(html) {
    		// remove all script tags, just to be safe (they shouldn't be run as innerHTML anyway)
			return { __html: html.replace(/<script.*?>.*?<\/script>/igm, '') }; 
    	}
    	return (
    		<div className="row">
				<div className="col-lg-12">
				    <h5>{this.props.data.name}</h5>
				    <h6><FontAwesome name="github" /> <a href="{this.props.data.repo}" target="_blank">{this.props.data.repo}</a></h6>
				    <small>{this.props.data.startDate}</small>
				    <p><strong>Description: </strong><span dangerouslySetInnerHTML={parsedHTML(this.props.data.description)} /></p>
				</div>
			</div>
	 	)
  	}
});

export default Project