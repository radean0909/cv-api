import React, { Component } from 'react';
import '../css/cv.css';
import FontAwesome from 'react-fontawesome';
import PureRenderMixin from 'react-addons-pure-render-mixin';

class Photo extends Component {
	render() {
		return (
			<div className="photo">
				<div className="img-container">
					<img src={this.props.image} className="App-photo" alt={this.props.name} />
				</div>
			</div>
		)
	}
}

export default Photo;