import React from 'react';
import {Route, Switch} from 'react-router-dom';
import {LoginView, Home, test} from '../view';

const App = () => {
      return (
          <div>
              <Route exact path="/" component={LoginView}/>
              <Switch>
              <Route path="/test/:name" component={Home}/>
              <Route path="/test" component={test}/>
              </Switch>
          </div>
      );
};

export default App;
