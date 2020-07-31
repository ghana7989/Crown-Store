import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import HomePage from './pages/Homepage/homepage.components';


const HatsPage = () => (
  <div>
    <h1> HATSSSSS </h1>
  </div>
)


class App extends Component {
  render() {
    return <div>
      <Switch>
        <Route exact component={HomePage} path="/"></Route>
        <Route component={HatsPage} path="/hats"></Route>
      </Switch>

    </div>;
  }
}

export default App;
