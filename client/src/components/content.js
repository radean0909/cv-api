import React, { Component } from 'react';
import '../css/cv.css';
import FontAwesome from 'react-fontawesome';
import Experience from './experience';
import Projects from './projects';
import PureRenderMixin from 'react-addons-pure-render-mixin';

const Content = React.createClass({
  mixins: [PureRenderMixin],
  render: function() {
    return (
          <div className="content col-lg-9">
            <Experience employers={this.props.employers} />
            <hr />
            <Projects projects={this.props.projects}/>
          </div>
    )
  }
});

export default Content