import React from 'react'
import { withGame} from "../context/GameProvider.js"
import Deck from './component/Deck.js'


const DecksDisplay = (props) => {
    return (
        <div>
            <Deck deckType={"react"} selectADeck={props.selectADeck}/>  //will route to /game
            <Deck deckType={"js"} selectADeck={props.selectADeck}/>
            {/* <Deck deckType={"css"} selectADeck={props.selectADeck}/> */} //need to create a css option
        </div>
    )
}

export default withGame(DecksDisplay)