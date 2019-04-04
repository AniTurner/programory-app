import React, { Component } from 'react'
import { withData } from '../context/DataProvider.js'
import LoginSignup from './LoginSignup.js'
// import { PageFade } from '../transitions/transition.js'

// import './transitionstyles.css'
import './styles.css'

class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
        localStorage.setItem('isLoggedIn', "false")
        // localStorage.setItem('isPreview', "false")
    }

  

    render() {

        return (
            <div id="welcome-screen">
                <div className="outer-div">
                <h1 style={{color: 'white', fontSize: 50, textAlign: 'center', marginTop: 30}}>Programory</h1>

                    <div className="inner-div"></div>
                </div>
                <div className="z-content">
                    <div className="vertical-align-parent">
                        <div location={this.location}>
                            <div className="vertical-align-child">
                                <LoginSignup />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withData(Home)