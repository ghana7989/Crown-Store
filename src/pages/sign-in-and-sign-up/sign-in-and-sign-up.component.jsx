import React from 'react';
import "./sign-in-and-sign-up.styles.scss"
import SignIn from '../../components/sign-in/sign-in.component';
import SignUp from '../../components/signup-component/signup.component';

const SignInAndSignOutPage = ()=>(
    <div className="sign-in-and-sign-up">
        <SignIn></SignIn>
        <SignUp></SignUp>
    </div>
)



export default SignInAndSignOutPage