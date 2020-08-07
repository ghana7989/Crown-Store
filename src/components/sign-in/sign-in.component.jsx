import React from 'react';
import "./sign-in.styles.scss"
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';


class SignIn extends React.Component {
    constructor(props) {
        super(props);


        this.state = {
            email: "",
            password: ""
        }
    }

    handleSubmit = event => {
        event.preventDefault()
        this.setState(
            {
                email: "",
                password: ""
            }
        )
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
                    <CustomButton
                    type="submit"
                    >
                        Sign In
                    </CustomButton>
                </form>
            </div>
        )
    }
}

export default SignIn 