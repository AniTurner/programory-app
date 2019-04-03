import React, { Component } from 'react'
import Login from './Login.js'
import Signup from './Signup.js'

class LoginSignup extends Component {
    constructor() {
        super() 
        this.state = {
            userChoice: 'login'
        }
        localStorage.setItem('isLoggedIn', "false")
        // localStorage.setItem('isPreview', "false")
    }

    setUserChoice = (str) => {
        this.setState ({
            userChoice: str
        })
    }
    render() {
       
        return (
            <div>
                <div>
                <div>
                    <h1>Programory</h1>
                    <span><button className="tab" onClick={() => this.setUserChoice('login')}>Login</button></span>
                    <span><button className="tab" onClick={() => this.setUserChoice('signup')}>Sign Up</button></span>
                    {/* DISPLAY DIV ONLY IF USERS EXIST */}
                    {(this.state.userChoice === 'signup') 
                    ?
                    <div>
                        <Signup />
                    </div>
                    :
                    <div>
                        <Login />
                    </div>
                    }                    
                </div>    
                </div>
            </div>
        )
    }

}

export default LoginSignup