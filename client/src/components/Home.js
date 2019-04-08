import React, {Component} from 'react'
import { withData } from '../context/DataProvider.js'
import LoginSignup from './LoginSignup.js'
import {withGame} from '../context/GameProvider.js'

// import { PageFade } from '../transitions/transition.js'

import './homeStyles.css'

class Home extends Component {
    constructor(props) {
        super(props) 
      
    }

    render() {
    return (
        <div id="welcome-screen">
            <div className="outer-div">
            <h1>Programory</h1>
            {this.props.token && <p className="description" style={{color: 'white'}}>Welcome! </p>}

            <div className="inner-div"></div>
            </div>
            <div className="z-content">
                <div className="vertical-align-parent">
                    <div>
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


export default withData(withGame(Home))