import React, {Component} from 'react'
import {withData} from '../context/DataProvider.js'


class Login extends Component {
    constructor(){
        super()
        this.state = {
            username: '',
            password: '',
            errorMessage: ""

        }
    }

    clearInputs = () => {
        this.setState({
            username: "",
            password: "",
            authToggle: false,
            errorMessage: ""
        })
    }

    handleChange = event => {
        const { name, value } = event.target
        this.setState({ [name]: value })
    }

    handleSubmit = event => {
        event.preventDefault()
        this.props.login(this.state)
        .then(() => this.clearInputs())
        // .catch(err => {
        //     this.setState({errorMessage: err.response.data.errMsg})
        // })
    }

    toggler = () => {
        this.setState(prevState => ({
            authToggle: !prevState.authToggle
        }))
    }

    render(){
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
                        type= "password"
                        name="password"
                        onChange={this.handleChange} 
                        value={this.state.password}
                        placeholder="password"
                    />

                    <button id='login-button'>Login</button>
                    
                    {this.state.errorMessage && <p style={{color: "red"}}>{this.state.errorMessage}</p>}
                    {/* <p onClick={this.toggler}>Don't have an account? Sign Up</p> */}


            </form>

        )
    }
}

export default withData(Login)