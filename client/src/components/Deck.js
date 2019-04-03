import React from 'react'

const Deck = props => {
    return (
        <div>
            <div>Choose one of the topics below:</div>
            <div onClick={() => props.selectADeck(props.deckType)}>Javascript</div>
            <div onClick={() => props.selectADeck(props.deckType)}>React</div>
        </div>

    )
}

export default Deck