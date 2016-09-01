import React, { Component } from 'react';
import '../css/cv.css';
import FontAwesome from 'react-fontawesome';
import Photo from './photo';
import PureRenderMixin from 'react-addons-pure-render-mixin';

export const Bio = React.createClass({
	mixins: [PureRenderMixin],
    render: function() {
        return (
        	<div>
	        	<Photo image={this.props.image} name={this.props.name} />
				<h4><FontAwesome name="envelope" /> {this.props.email}</h4>
				<h4><FontAwesome name="phone" /> {this.props.phone}</h4>
				<h5><small>{this.props.city}, {this.props.state}</small></h5>
			</div>
		)
	}
});

export default Bio;