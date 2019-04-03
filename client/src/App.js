import React, {Component} from 'react'
import {withData} from './context/DataProvider.js'
// import ProtectedRouter from './components/ProtectedRoute'

// import './styles.css'

class App extends Component {
    constructor() {
        super() 
        this.state = {

        }
    }

    render() {
        return (
            <div>
                
            </div>
        )
    }
}

export default withData(App)
