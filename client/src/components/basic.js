import React, { Component } from 'react';
import '../css/cv.css';
import FontAwesome from 'react-fontawesome';
import Bio from './bio';
import Skills from  './skills';
import References from './references';
import PureRenderMixin from 'react-addons-pure-render-mixin';

class Basic extends Component {
  render() {
    return (
    	 <div className="basic col-lg-3">
            <Bio 
              image={this.props.image} 
              name={this.props.name} 
              phone={this.props.phone} 
              city={this.props.city} 
              state={this.props.state} 
              email={this.props.email} />
            <hr />
            <Skills strengths={this.props.strengths}/>
            <hr />
            <References references={this.props.references} />
          </div>
    );
  }
}

export default Basic;