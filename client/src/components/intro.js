import React, { Component } from 'react';
import '../css/cv.css';
import FontAwesome from 'react-fontawesome';

class Intro extends Component {
	render() {
		const introHTML = function(intro) {
			// remove all script tags, just to be safe (they shouldn't be run as innerHTML anyway)
			return { __html: intro.replace(/<script.*?>.*?<\/script>/igm, '') };
		}
		return (
			<div className="row">
	          <div className="jumbotron jumboptron-fluid">
	            <h1 className="display-3">{this.props.name} <small className="text-muted">{this.props.tagline}</small></h1>
	            <p className="lead" dangerouslySetInnerHTML={introHTML(this.props.intro)} />
	          </div>
	        </div>
    	)
    }
}

export default Intro; 

