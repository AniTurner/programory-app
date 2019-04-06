import React from 'react'
import { withGame} from "../context/GameProvider.js"
import Deck from '../components/Deck.js'


const DecksDisplay = (props) => {
    return (
        <div className='deck-container'>
            <div className="deck-title">Select a deck</div>
            <Deck  deckType={"react"}  history={props.history}/>
            {/* //will route to /game */}
            <Deck  deckType={"js"} history={props.history}/>
            {/* <Deck deckType={"css"} selectADeck={props.selectADeck}/> //need to create a css option */}
        </div>
    )
}

export default withGame(DecksDisplay)