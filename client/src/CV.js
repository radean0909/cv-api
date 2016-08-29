import React, { Component } from 'react';
import logo from './logo.svg';
import './CV.css';
import FontAwesome from 'react-fontawesome';

class CV extends Component {
  render() {
    return (
      <div className="CV container row">
        <div className="CV-basic col-lg-3">
          <img src={logo} className="App-photo" alt="photo" />
          <h2>Ryan Dean</h2>
          <h3>Adaptable Full-Stack Developer</h3>
          <h4>radean0909@gmail.com</h4>
          <h4>970-691-3171</h4>
          <hr />
          <h3>
            <FontAwesome
                name="code"
                inverse /> Skills
          </h3>
          <h5>Back-end Technologies</h5>
            <span className="parallelogram"></span>
            <span className="parallelogram"></span>
            <span className="parallelogram"></span>
            <span className="parallelogram"></span>
            <span className="parallelogram"></span>
            <span className="parallelogram"></span>
            <span className="parallelogram"></span>
            <span className="parallelogram"></span>
            <span className="parallelogram"></span>
            <span className="parallelogram inactive"></span>
        </div>
        <div className="CV-details col-lg-8 col-lg-offset-1">
          To get started, edit <code>src/App.js</code> and save to reload.
        </div>
      </div>
    );
  }
}

export default CV;
