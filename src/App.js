import React, { useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import GlobalStyle from "./global.styles"

import ShopPage from './pages/shop/shop.component';
import HomePage from "./pages/homepage/homepage.component"
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import Header from './components/header/header.component';
import { createStructuredSelector } from "reselect"
import { selectCurrentUser } from "./redux/user/user.selector";
import Checkout from './pages/checkout/checkout.component';

import { checkUserSession } from "./redux/user/user.actions"



const App = ({ checkUserSession, currentUser }) => {

  // componentDidMount() {
  //   const { checkUserSession } = this.props
  //   checkUserSession()
  // }

  // componentWillUnmount() {
  //   this.unsubscribeFromAuth();
  // }
  useEffect(() => {
    checkUserSession()
  }, [checkUserSession])


  return (
    <div>
      <GlobalStyle/>
      <Header />
      <Switch>
        {/* Route Automatically passes three props {match , location , history} */}
        <Route exact path='/' component={HomePage} />
        <Route exact path='/Crown-Store' component={HomePage} />
        <Route path='/shop' component={ShopPage} />
        <Route
          exact
          path='/signin'
          render={() =>
            currentUser ? (
              <Redirect to='/' />
            ) : (
                <SignInAndSignUpPage />
              )
          }
        />
        <Route exact path="/checkout" component={Checkout} />
      </Switch>
    </div>
  );

}

// const mapStateToProps = (state) => ({
//   currentUser: selectCurrentUser(state)
// });

// In this way we can use multiple selectors in an easy way
// instead of calling state on a whole all the time we invoke a selector
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
})

const mapDispatchToProps = dispatch => ({
  checkUserSession: () => dispatch(checkUserSession())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
