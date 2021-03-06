import React, { Component } from 'react'
import { withData } from '../context/DataProvider.js'

class Signup extends Component {
    constructor() {
        super()
        this.state = {
            username: '',
            password: '',
            nickname: "",
            authToggle: false,
            errorMessage: ""

        }
    }

    clearInputs = () => {
        this.setState({
            username: "",
            password: "",
            nickname: "",
            errorMessage: ""
        })
    }

    handleChange = event => {
        const { name, value } = event.target
        this.setState({ [name]: value })
    }

    handleSubmit = event => {
        event.preventDefault()
        this.props.signup(this.state)
            .then(() => '')
            .catch(err => {
                this.setState({ errorMessage: err.response.data.errMsg })
            })

    }
    toggler = () => {
        this.setState(prevState => ({
            authToggle: !prevState.authToggle
        }))
    }

    render() {
        return (
            <form className="login-form" onSubmit={this.handleSubmit}>

                <input
                    type="text"
                    onChange={this.handleChange}
                    name="username"
                    value={this.state.username}
                    placeholder="username"
                />

                <input
                    name="password"
                    type="password"
                    onChange={this.handleChange}
                    value={this.state.password}
                    placeholder="password"
                />

                <input
                    type="text"
                    name="nickname"
                    onChange={this.handleChange}
                    value={this.state.nickname}
                    placeholder="nickname"
                />



                <button id='login-button'>Signup</button>
                
                {this.state.errorMessage && <p style={{ color: "red" }}>{this.state.errorMessage}</p>}
                {/* <p onClick={this.toggler}>Already have an account? Login</p> */}


            </form>

        )
    }
}

export default withData(Signup) 