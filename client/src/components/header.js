import React, { Component } from 'react';
import '../css/cv.scss';
import FontAwesome from 'react-fontawesome';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import Bio from './bio';
import Intro from './intro';

export const Header = React.createClass({
	mixins: [PureRenderMixin],
    render: function() {
        return (
        	<div className="header row">
		        <div className="basic col-lg-3">
		            <Bio 
		              image={this.props.image} 
		              name={this.props.name} 
		              phone={this.props.phone} 
		              city={this.props.city} 
		              state={this.props.state} 
		              email={this.props.email}
		              linkedin={this.props.linkedin} />
		        </div>
		        <div className="content col-lg-9">
	            	<Intro name={this.props.name} tagline={this.props.tagline} intro={this.props.intro} />
	          	</div>
          	</div>
		)
	}
});

export default Header;