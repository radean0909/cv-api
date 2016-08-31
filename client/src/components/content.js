import React, { Component } from 'react';
import '../css/cv.css';
import FontAwesome from 'react-fontawesome';
import Intro from './intro';
import Experience from './experience';
import Projects from './projects';
import PureRenderMixin from 'react-addons-pure-render-mixin';

const Content = React.createClass({
  mixins: [PureRenderMixin],
  render: function() {
    return (
          <div className="content col-lg-9">
            <Intro name={this.props.name} tagline={this.props.tagline} intro={this.props.intro} />
            <div className="row">
              <Experience employers={this.props.employers} />
              <hr />
              <Projects projects={this.props.projects}/>
            </div>
          </div>
    )
  }
});

export default Content