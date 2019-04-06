import React from 'react'
import {withGame} from '../context/GameProvider.js'
import {withData} from '../context/DataProvider.js'

const Deck = props => {
    return (
        <div className="deck-option-container" >
            <div >
                <div className="deck-options" onClick={() => props.selectADeck(props.user.username, props.deckType, props.history)}>{props.deckType}</div>
            </div>
        </div>
    )
}

export default withGame(withData(Deck))