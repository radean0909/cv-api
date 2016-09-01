import React, { Component } from 'react';
import '../css/cv.css';
import Strength from './strength';
import FontAwesome from 'react-fontawesome';
import PureRenderMixin from 'react-addons-pure-render-mixin';

export const Skills = React.createClass({
    mixins: [PureRenderMixin],
    render: function() {
      return (
        <div>
          <h3><FontAwesome name="code" inverse /> Skills</h3>
          <br />
          {this.props.strengths.map(function(strength, i) {
            return <Strength key={'strength-'+i} data={strength} />
          })}
        </div>
      )
  }
});

export default Skills;