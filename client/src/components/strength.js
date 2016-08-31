import React, { Component } from 'react';
import '../css/cv.css';
import FontAwesome from 'react-fontawesome';
import PureRenderMixin from 'react-addons-pure-render-mixin';

export const Strength = React.createClass({
    mixins: [PureRenderMixin],
    render: function() {
    	const name = this.props.data.get('name');
    	const score = this.props.data.get('score');
    	const skills = this.props.data.get('skills');
    	const bars = function(score) {
    		let out = [];
    		for( let i = 1; i <= score; i++ ) {
    			out.push(<span className="parallelogram"></span>);
    		}
    		for( let i = score; i < 10; i++) {
    			out.push(<span className="parallelogram inactive"></span>);
    		}
    		return out;
    	};

    	const skillHTML = function(skill, last = false) {
            // remove all script tags, just to be safe (they shouldn't be run as innerHTML anyway)
    		return {__html: (!last) ? (skill + ', ').replace(/<script.*?>.*?<\/script>/igm, '') : skill.replace(/<script.*?>.*?<\/script>/igm, '') };
    	}
      	return (
	      	<div>
		      	<h5>{name}</h5>
		        {bars(score)}
		        <div className="skills">
		        	{skills.map(function(skill, i) {
	        			if (i < skills.size - 1)
	        				return <span key={'strengths-' + name + '-' + i} dangerouslySetInnerHTML={skillHTML(skill)} />
	        			else
	        				return <span key={'strengths-' + name + '-' + i} dangerouslySetInnerHTML={skillHTML(skill, true)} />
		        	})}
		        		
		        </div> 
		    	<br />
	      	</div>
	    )
    }
});

export default Strength;
