import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import HomePage from './pages/Homepage/homepage.components';
import ShopPage from './pages/shop/shop.components.jsx'
import Header from './components/header-component/header.component';
import SignInAndSignOutPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import { auth, createUserProfileDocument } from "./firebase/firebase.utils"
import { connect } from 'react-redux';
import { setCurrentUser } from "./redux/user/user.actions"



class App extends Component {


  unsubscribeFromAuth = null;

  componentDidMount() {
    const { setCurrentUser } = this.props
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth)

        userRef.onSnapshot(snapshot => {
          setCurrentUser({
            currentUser: {
              id: snapshot.id,
              ...snapshot.data()
            }
          }
          )
        })

      } else {
        setCurrentUser({
          currentUser: userAuth
        })
      }
    })    
  }
  componentWillUnmount() {
    this.unsubscribeFromAuth()
    console.log(this.unsubscribeFromAuth);
  }



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

const mapDispatchToProps = (dispatch) => {
  return {
    setCurrentUser: user => dispatch(setCurrentUser(user))
  }
}

export default connect(null, mapDispatchToProps)(App);
