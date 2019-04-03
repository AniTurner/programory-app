import React from 'react'
import { withGame} from "../context/GameProvider.js"


const DecksDisplay = (props) => {
    return (
        <div>
            <Deck deckType={"react"} selectADeck={props.selectADeck}/>
            <Deck deckType={"js"} selectADeck={props.selectADeck}/>
            <Deck deckType={"css"} selectADeck={props.selectADeck}/>
        </div>
    )
}

export default withGame(DecksDisplay)