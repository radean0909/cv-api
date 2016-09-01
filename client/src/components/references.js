import React, { Component } from 'react';
import '../css/cv.scss';
import FontAwesome from 'react-fontawesome';
import PureRenderMixin from 'react-addons-pure-render-mixin';



export const References = React.createClass({
    mixins: [PureRenderMixin],
    render: function() {
        return (
            <div>
                <h3><FontAwesome name="check-square-o" inverse /> References</h3>
                <br />
                {this.props.references.map(function (ref, i) {
                    const quote = (ref.quote) ? <blockquote>
                              <p className="m-b-0">"{ref.quote}"</p>
                            </blockquote> : null;
                    return ( 
                        <div key={'reference-' + i}>
                            <h5>{ref.name}</h5> 
                            <h5><small className="text-muted">{ref.title} - {ref.company}</small></h5>
                            <h6><FontAwesome name="envelope" /> {ref.email}</h6>
                            {quote}
                        </div> 
                    )
                })}
            </div>
        )
    }
});
export default References;