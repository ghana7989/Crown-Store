import React from 'react';
import FormInput from '../form-input/form-input.component';

import "./signup.styles.scss"
import CustomButton from '../custom-button/custom-button.component';
import { auth, createUserProfileDocument } from "../../firebase/firebase.utils";

class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            displayName: "",
            email: "",
            password: "",
            confirmPassword: ""
        }
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        const { displayName, email, password, confirmPassword } = this.state

        if (password !== confirmPassword) {
            alert("Passwords Don't match")
            return
        }
        try {
            const { user } = await auth.createUserWithEmailAndPassword(email, password)

            await createUserProfileDocument(user, { displayName })
            this.setState({
                displayName: "",
                email: "",
                password: "",
                confirmPassword: ""
            })

        } catch (error) {
            let errorCode = error.code;
            let errorMessage = error.message;
            if (errorCode === 'auth/weak-password') {
                alert('The password is too weak.');
            } else {
                alert(errorMessage);
            }
            console.log(error);
        }
    }

    handleChange = (e) => {
        const { name, value } = e.target;

        this.setState({
            [name]: value
        })
    }

    render() {
        const { displayName, email, password, confirmPassword } = this.state
        return (
            <div className="sign-up">
                <h2 className="title">
                    I do not have an account
                </h2>
                <span>Sign Up with email and password</span>
                <form className="sign-up-form" onSubmit={this.handleSubmit}>
                    <FormInput
                        type="text"
                        name="displayName"
                        value={displayName}
                        onChange={this.handleChange}
                        label="Display Name"
                        required
                    ></FormInput>
                    <FormInput
                        type="email"
                        name="email"
                        value={email}
                        onChange={this.handleChange}
                        label="email"
                        required
                    ></FormInput>
                    <FormInput
                        type="password"
                        name="password"
                        value={password}
                        onChange={this.handleChange}
                        label="password"
                        required
                    ></FormInput>
                    <FormInput
                        type="password"
                        name="confirmPassword"
                        value={confirmPassword}
                        onChange={this.handleChange}
                        label="confirmPassword"
                        required
                    ></FormInput>
                    <CustomButton type="submit">
                        SIGN UP
                    </CustomButton>
                </form>
            </div>
        );
    }
}

export default SignUp;