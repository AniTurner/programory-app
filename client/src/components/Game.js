import React, {Component} from 'react'
import {withGame} from '../context/GameProvider.js'
const shuffle = require('lodash.shuffle');

class Game extends Component {
    constructor(props){
        super(props)
        this.state = {
            selectedItem1: '',
            selectedItem2: '',
            shuffledDeck: [],
            time: 0,
            gameStart: false
        }
        this.clockId = null
    }

    // When routed to decks, it immediately scrolls to the bottom for start button

    messagesEnd = React.createRef()


    scrollToBottom = () => {
        this.messagesEnd.current.scrollIntoView({ behavior: 'smooth' })
      }

    componentDidMount(){
        this.scrollToBottom();
        const shuffledDeck = shuffle(this.props.currentDeck)
        this.setState({
            shuffledDeck
        })
       
    }
      

    selectCard = answerID => {
        if(!this.state.selectedItem1) {
            this.setState({selectedItem1: answerID})
        } else if (!this.state.selectedItem2) {
            this.setState({selectedItem2: answerID}, () => {
                console.log(this.state.selectedItem1)
                console.log(this.state.selectedItem2)
                console.log({selectedItem1: answerID})
                console.log({selectedItem2: answerID})
                if(this.state.selectedItem1 && this.state.selectedItem2) {
                    if (this.state.selectedItem1 === this.state.selectedItem2) {
                        this.matchItems(answerID)
                        
                    } else {
                        this.notMatch()
                    }
                }
            })
        }
        

        
    }
    
    matchItems = (answerID) => {
        // console.log('clicked')
        this.setState(prevState => ({
            shuffledDeck: prevState.shuffledDeck.filter(card => card.answerID !== answerID),
            selectedItem1: '',
            selectedItem2: ''
        }), ()=> {
            if(!this.state.shuffledDeck.length) {
                clearInterval(this.clockId) //time stops when game over
                
                //update user object first
                //this.props.history.push('/')
            }
        })
        console.log("it's a match")
    }

    notMatch = () => {
        this.setState({
            selectedItem1: '',
            selectedItem2: ''
        })
        console.log('not a match')
    }

    startGame = () => {
        this.clockId = setInterval(() => this.setState(p => ({ time: p.time + 1})), 1000)
        this.setState({
            gameStart: true
        })
    }

    render(){

    const mappedDeck = this.state.shuffledDeck.map(item => {
        return (
            <div className="mapped-item" key={item.id}>
                <div onClick={() => this.selectCard(item.answerID)}>{item.question}</div>  
                <div onClick={() => this.selectCard(item.answerID)} >{item.answer}</div>
            </div>
        )
    })
    return (

        <div className="mapped-deck-container">
            <div className="timer-container">
                <div className="time">{this.state.time} seconds</div>
            </div>
            <div className="mapped-deck">
            {this.state.gameStart && mappedDeck}
            </div>
            <div className="start-button-container">
            {!this.state.gameStart
            &&
           <> <button className='start-game-button' onClick={this.startGame}>Start Game</button>
            <div ref={this.messagesEnd} /> </>}
            </div>
            
        </div>
    )
}
}

export default withGame(Game)