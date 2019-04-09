import React, {Component} from 'react'
import {javascript, react, html, css} from '../cards.json'

const GameContext = React.createContext()

class GameProvider extends Component {
    constructor(){
        super()
        this.state = {
           currentDeck: [],
           playerSelectDeck: '',
           deckToPlay: [],
           isWiggled: false,
           time: 0,
           bestTime: ''

        }
    }

    updateScore = () => {
        if(this.state.bestTime > this.state.time ) {
        const {time} = this.props
        const userUpdate = {
            time
        }
        this.props.updateUser(userUpdate)
        }
    }

    getDeck = (deck) => {
        console.log(deck)
        if(deck === 'react') {
            this.setState({
                deckToPlay: this.state.currentDeck.react
            })
        }
        if(deck === 'javascript') {
            this.setState({
                deckToPlay: this.state.currentDeck.javascript
            })
        }
        if(deck === 'html') {
            this.setState({
                deckToPlay: this.state.currentDeck.html
            })
        }
        if(deck === 'css') {
            this.setState({
                deckToPlay: this.state.currentDeck.css
            })
        }
    }

    
    selectADeck = (username, deckName, history) => {
        if(deckName === 'react') {
            this.getDeck("react")
            this.setState({
                playerSelectDeck: "react",
                currentDeck: react
            }, () => history.push(`/${username}/game`))
        }
        if(deckName === 'javascript') {
            this.getDeck("javascript")
            this.setState({
                playerSelectDeck: "javascript",
                currentDeck: javascript
            }, () => history.push(`/${username}/game`))
        }
        if(deckName === 'html') {
            this.getDeck("html")
            this.setState({
                playerSelectDeck: "html",
                currentDeck: html
            }, () => history.push(`/${username}/game`))
        }
        if(deckName === 'css') {
            this.getDeck("css")
            this.setState({
                playerSelectDeck: "css",
                currentDeck: css
            }, () => history.push(`/${username}/game`))
        }
    }

    incrementTime = () => {
        this.setState(p => ({
           time: p.time += 1
        }))
    }
    

    render() {
        return (
            <GameContext.Provider
                value={{
                    ...this.state,
                    selectADeck: this.selectADeck,
                    getDeck: this.getDeck,
                    incrementTime: this.incrementTime
                }}>
                {this.props.children}
            </GameContext.Provider>
        )
    }
}

export default GameProvider

export const withGame = C => props => (
    <GameContext.Consumer>
        {value => <C {...props} {...value} />}
    </GameContext.Consumer>
)