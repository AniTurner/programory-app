import React, {Component} from 'react'
import {Switch, Route, withRouter, Redirect} from 'react-router-dom'
import {withData} from './context/DataProvider.js'
import ProtectedRoute from './components/ProtectedRoute'


import Footer from './components/Footer.js'
import Home from './components/Home.js'
import UserInfo from './components/UserInfo.js'
// import './styles.css'

class App extends Component {
    constructor() {
        super() 
        this.state = {

        }
    }

    render() {
        return (
            <article>
            <header>
            </header>
            <Switch>
                <Route exact path='/' render={rprops => !this.props.token ? <Home {...rprops} /> : <Redirect to={`/${this.props.user.username}/userinfo`} />} />
                <ProtectedRoute path='/:_username/decksdisplay' component={DecksDisplay} />
                <ProtectedRoute path='/:_username/game' component={Game} />
                <ProtectedRoute path='/:_username/userinfo' component={UserInfo} />
                //login page
                //display decks 
                //make main route to /game -- make game component and can choose either start button or start game again 
            </Switch>

            <footer>
                <Footer />
            </footer>
            </article>
        )
    }
}

export default withRouter(withData(App))
