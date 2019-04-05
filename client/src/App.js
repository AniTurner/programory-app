import React, {Component} from 'react'
import {Switch, Route, withRouter, Redirect} from 'react-router-dom'
import DecksDisplay from './components/DecksDisplay.js'
import Game from './components/Game.js'
import {withData} from './context/DataProvider.js'
import ProtectedRoute from './components/ProtectedRoute'


import Nav from './components/Nav.js'
import Footer from './components/Footer.js'
import Home from './components/Home.js'
import UserInfo from './components/UserInfo.js'
import './styles.css'




class App extends Component {
    constructor(props) {
        super(props) 
    }
    componentDidMount = () => {
        this.props.token && this.props.getUsers()
    }

    

    render() {
        // document.title = this.props.location.pathname.slice(1)[0].toUpperCase() + this.props.location.pathname.slice(2) //make name of tab in browser display the title of the page
        return (
            <article>
            <header>
                {(this.props.token) ? <Nav /> : ``}
            </header>
            <Switch>
                <Route 
                    exact path='/' 
                    render={rProps => !this.props.token 
                    ? 
                    <Home {...rProps} /> 
                    : 
                    <Redirect 
                        to={`/${this.props.user.username}/userinfo`} 
                        />} 
                    />
                <ProtectedRoute 
                    path='/:_username/decksdisplay' 
                    render={DecksDisplay} />
                <ProtectedRoute 
                    path='/:_username/game' 
                    render={Game} />
                <ProtectedRoute 
                    path='/:_username/userinfo' 
                    render={UserInfo} />
                {/* login page */}
                {/* //display decks  */}
                {/* //make main route to /game -- make game component and can choose either start button or start game again  */}
            </Switch>

            <footer>
                <Footer />
            </footer>
            </article>
        )
    }
}

export default withRouter(withData(App))

