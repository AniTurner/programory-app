import React from 'react'

const Deck = props => {
    return (
        <div onClick={() => props.selectADeck(props.deckType)}></div>
    )
}

export default Deck