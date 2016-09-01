import React, { Component } from 'react';
import '../css/cv.css';
import FontAwesome from 'react-fontawesome';
import Basic from './basic';
import Content from './content';
import Footer from './footer';
import Header from './header';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { connect } from 'react-redux';


export const CV = React.createClass({
  mixins: [PureRenderMixin],
  render: function () {
    return (
      <div className="container">
        <div className="CV">
          <Header {...this.props} />
          <div className="row row-same-height">
            <Basic {...this.props} />
            <Content {...this.props} />
          </div>
        </div>
        <Footer />
      </div>
    );
  }
});

function mapStateToProps(state) {
  return {
    email: state.get('email'),
    phone: state.get('phone'),
    name: state.get('name'),
    tagline: state.get('tagline'),
    intro: state.get('intro'),
    city: state.get('city'),
    state: state.get('state'),
    image: state.get('image'),
    views: state.get('views'),
    projects: state.get('projects'),
    education: state.get('education'),
    strengths: state.get('strengths'),
    employers: state.get('employers'),
    references: state.get('references')
  }
}

export const CVContainer = connect(mapStateToProps)(CV);