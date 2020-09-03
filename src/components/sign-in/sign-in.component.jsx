import React from 'react';
import "./sign-in.styles.scss"
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import { auth, signInWithGoogle } from "../../firebase/firebase.utils.js"

class SignIn extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: ""
        }
    }

    handleSubmit = async event => {
        event.preventDefault()

        const { email, password } = this.state

        try {
            await auth.signInWithEmailAndPassword(email, password)

            this.setState(
                {
                    email: "",
                    password: ""
                }
            )
        } catch (error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            if (errorCode === 'auth/wrong-password') {
                alert('Wrong password.');
            } else {
                alert(errorMessage);
            }
            console.log(error);
        }


    }

    handleChange = event => {
        console.log("Event Listening");
        const { value, name } = event.target;
        this.setState({
            [name]: value
        }
        )
    }
    render() {
        return (
            <div className="sign-in">
                <h2>
                    I already have an account
                </h2>
                <span>
                    Sign In with your Email and Password
                </span>
                <form onSubmit={this.handleSubmit}>
                    <FormInput
                        handleChange={this.handleChange}
                        name="email"
                        value={this.state.email}
                        required
                        label="email"
                        type="email">
                    </FormInput>
                    <FormInput handleChange={this.handleChange} name="password" value={this.state.password} required type="password"
                        label="password"
                    ></FormInput>
                    <div className="buttons">
                        <CustomButton
                            type="button"
                        >
                            Sign In
                    </CustomButton>
                        <CustomButton
                            type="button"
                            onClick={signInWithGoogle}
                            isGoogleSignIn
                        >
                            Sign In With Google
                    </CustomButton>

                    </div>
                </form>
            </div>
        )
    }
}

export default SignIn 