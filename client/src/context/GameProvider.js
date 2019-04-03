import React, {Component} from 'react'
import {js, react} from '../cards.json'

const GameContext = React.createContext()

class GameProvider extends Component {
    constructor(){
        super()
        this.state = {
           currentDeck: []

        }
    }

    selectADeck = deckName => {
        if(deckName === 'react') {
            this.setState({
                currentDeck: react
            }, () => this.props.history.push('/game'))
        }
        if(deckName === 'js') {
            this.setState({
                currentDeck: js
            }, () => this.props.history.push('/game'))
        }
    }

    

    render() {
        return (
            <GameContext.Provider
                value={{
                    ...this.state,
                    selectADeck: this.selectADeck
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