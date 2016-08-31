import React, { Component } from 'react';
import '../css/cv.css';
import Employer from './employer';
import FontAwesome from 'react-fontawesome';
import PureRenderMixin from 'react-addons-pure-render-mixin';

export const Experience = React.createClass({
    mixins: [PureRenderMixin],
    render: function() {
    return (
      <div className="experience">
        <h3><FontAwesome name="database" /> Experience</h3><br />
        {this.props.employers.map( function(employer, i) {
          return <Employer key={'employer-' + i} data={employer} />
        })}
      </div>
    )
  }
})

export default Experience;