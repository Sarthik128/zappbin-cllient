import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NewFile from './NewFile';
import Home from './Home';
import ExistingFile from './ExistingFile';
import Error404 from './Error404';



function App() {
  return (
    <Router>
      <Switch>
      <Route exact path="/"  component={Home} />
      <Route exact path="/new" component={NewFile} />
      <Route exact path="/error" component={Error404} />
      <Route exact path="/:id" component={ExistingFile} />
      <Route exact path="*" component={Error404} />
      </Switch>
    </Router>
  );
}

export default App;
