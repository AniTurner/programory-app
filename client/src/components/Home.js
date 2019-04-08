import React from 'react'
import { withData } from '../context/DataProvider.js'
import LoginSignup from './LoginSignup.js'
// import { PageFade } from '../transitions/transition.js'

import './homeStyles.css'

const Home = () => {
    return (
        <div id="welcome-screen">
            <div className="outer-div">
            <h1>Programory</h1>
            <p className="description">Welcome! </p>

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


export default withData(Home)