import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import HomePage from './pages/Homepage/homepage.components';
import ShopPage from './pages/shop/shop.components.jsx'
import Header from './components/header-component/header.component';
import SignInAndSignOutPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import { auth, createUserProfileDocument } from "./firebase/firebase.utils"




class App extends Component {

  constructor() {
    super();
    this.state = {
      currentUser: null,
    }
  }

  unsubscribeFromAuth = null;

  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth)

        userRef.onSnapshot(snapshot => {
          this.setState({
            currentUser: {
              id: snapshot.id,
              ...snapshot.data()
            }
          }
          )
        })

      } else {
        this.setState({
          currentUser: userAuth
        })
      }
      console.log(this.state.currentUser)
    })
  }
  componentWillUnmount() {
    this.unsubscribeFromAuth()
    console.log(this.unsubscribeFromAuth);
  }



  render() {
    return <div>
      <Header currentUser={this.state.currentUser}></Header>
      <Switch>
        <Route exact component={HomePage} path="/"></Route>
        <Route component={ShopPage} path="/shop"></Route>
        <Route component={SignInAndSignOutPage} path="/signin"></Route>
      </Switch>

    </div>;
  }
}

export default App;
