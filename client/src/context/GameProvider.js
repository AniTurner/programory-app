import React, {Component} from 'react'
import {js, react} from '../cards.json'

const GameContext = React.createContext()

class GameProvider extends Component {
    constructor(){
        super()
        this.state = {
           currentDeck: [],
           playerSelectDeck: '',
           deckToPlay: []

        }
    }

    getDeck = (deck) => {
        console.log(deck)
        if(deck === 'react') {
            this.setState({
                deckToPlay: this.state.currentDeck.react
            })
        }
        if(deck === 'js') {
            this.setState({
                deckToPlay: this.state.currentDeck.js
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
        if(deckName === 'js') {
            this.getDeck("js")
            this.setState({
                playerSelectDeck: "js",
                currentDeck: js
            }, () => history.push(`/${username}/game`))
        }
    }

    

    render() {
        return (
            <GameContext.Provider
                value={{
                    ...this.state,
                    selectADeck: this.selectADeck,
                    getDeck: this.getDeck
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