import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import HomePage from './pages/Homepage/homepage.components';
import ShopPage from './pages/shop/shop.components.jsx'
import Header from './components/header-component/header.component';
import SignInAndSignOutPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';





class App extends Component {
  render() {
    return <div>
      <Header></Header>
      <Switch>
        <Route exact component={HomePage} path="/"></Route>
        <Route component={ShopPage} path="/shop"></Route>
        <Route component={SignInAndSignOutPage} path="/signin"></Route>
      </Switch>

    </div>;
  }
}

export default App;
