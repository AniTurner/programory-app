import React from 'react'
import {withGame} from '../context/GameProvider.js'
import {withData} from '../context/DataProvider.js'

const Deck = props => {
    console.log(props)
    return (
        <div style={{color: 'white'}}>
            <div onClick={() => props.selectADeck(props.username, props.deckType, props.history)}>{props.deckType}</div>
        </div>
    )
}

export default withGame(withData(Deck))