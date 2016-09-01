import React, { Component } from 'react';
import '../css/cv.scss';
import Project from './project';
import FontAwesome from 'react-fontawesome';
import PureRenderMixin from 'react-addons-pure-render-mixin';

class Projects extends Component {
  render() {
    return (
		<div className="projects">
			<h3><FontAwesome name="file-code-o" /> Projects</h3> <br />
			{this.props.projects.map(function(project, i) {
				return <Project key={'project-' + i} data={project} />
			})}
			
			
		</div> 
    )
  }
}

export default Projects