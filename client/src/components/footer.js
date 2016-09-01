import React, { Component } from 'react';
import '../css/cv.css';
import FontAwesome from 'react-fontawesome';

class Footer extends Component {
  render() {
    return (
        <div className="row footer">
          <div className="col-lg-12">
            <p>This resume was built using <strong>modern web technologies</strong> (<strong>NodeJS</strong>, Express, <strong>React</strong>, SASS, <strong>HTML5</strong>, <strong>Bootstrap4</strong>, etc) with appropriate <strong>testing practices</strong>. Please, view the code on <a href="http://www.github.com/radean0909/cv-api" target="_blank"><FontAwesome name="github" /> Github (http://www.github.com/radean0909/cv-api)</a>!</p>
          </div>
        </div>
    )
  }
}

export default Footer;