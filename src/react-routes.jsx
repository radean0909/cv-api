import React from 'react';
import {Route, IndexRoute} from 'react-router';
import ReactDOMServer from 'react-dom/server';
import Index from './index';

var routes = (
    <Route path="/" component={Index}>
      <IndexRoute component={CommentBox}/>
    </Route>
)

export default {
  routes: routes
}