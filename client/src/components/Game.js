import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'
import swal from 'sweetalert';
import Sound from 'react-sound';
import sound from './music.mp3'

import {withData} from '../context/DataProvider.js'

import {withGame} from '../context/GameProvider.js'
const shuffle = require('lodash.shuffle');



class Game extends Component {
    constructor(props){
        super(props)
        this.state = {
            selectedItem1: '',
            selectedItem2: '',
            shuffledDeck: [],
            gameStart: false,
            selectedItem1Text: ''
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
      

    selectCard = (answerID, questiontext, answertext) => {
        if(!this.state.selectedItem1) {
            if(questiontext) {
                this.setState({selectedItem1: answerID, 
                selectedItem1Text: questiontext
                })

            } else if (answertext) {
                this.setState({selectedItem1: answerID, 
                    selectedItem1Text: answertext
                    })
            }
        } else if (!this.state.selectedItem2) {
            if(questiontext !== this.state.selectedItem1Text && answertext !== this.state.selectedItem1Text) {
                this.setState({selectedItem2: answerID}, () => {
                   
                if (this.state.selectedItem1 && this.state.selectedItem2) {
                        if (this.state.selectedItem1 === this.state.selectedItem2) {
                            this.matchItems(answerID)
                            
                        } else {
                            this.notMatch()
                        }
                    }
                })
            }
            
        }    
    }
  
    
    matchItems = (answerID) => {
        // console.log('clicked')
        this.setState(prevState => ({
            shuffledDeck: prevState.shuffledDeck.filter(card => card.answerID !== answerID),
            selectedItem1: '',
            selectedItem2: '',
            selectedItem1Text: ''
        }), ()=> {
            if(!this.state.shuffledDeck.length) {
                clearInterval(this.clockId)
                this.gameEnd()

                //time stops when game over
                
                //update user object first
                //this.props.history.push('/')
            }
        })
        console.log("it's a match")
    }

    gameEnd = () => {
        this.bestScore()
        swal("Good job!", `Your time is ${this.props.time} seconds !`, "success");

    }

    notMatch = () => {
        this.setState({
            selectedItem1: '',
            selectedItem2: '',
            selectedItem1Text: ''
        })
        console.log('not a match')
    }

    startGame = () => {
        console.log(this.props.incrementTime)
        this.clockId = setInterval(() => this.props.incrementTime(), 1000)
        this.setState({
            gameStart: true
        })
    }

    render(){

    const mappedDeck = this.state.shuffledDeck.map(item => {
        return (
            <div onClick={() => this.selectCard(item.answerID, item.question, item.answer)} className="mapped-item spin" key={item.id}>
                <div>{item.question}</div>  
                <div>{item.answer}</div>
            </div>
        )
    })
    return (

        <div className="mapped-deck-container">
            <div className="timer-container">
                <div className="time">{this.props.time} seconds</div>
            </div>
            <div className="mapped-deck">
            {this.state.gameStart && mappedDeck}
            </div>
            <div className="start-button-container">
            {!this.state.gameStart
            &&
            <> 
                <button className='start-game-button' onClick={this.startGame}>Start Game</button>
                <div ref={this.messagesEnd} /> 
            </>}
            </div>
            {this.state.gameStart
            &&
            <Sound
                url={sound}
                playStatus={Sound.status.PLAYING}
                onPlaying={this.handleSongPlaying}
                onFinishedPlaying={this.handleSongFinishedPlaying}
            />
            }
            {/* {this.gameEnd &&
            <Redirect 
                to={`/${this.props.user.username}/decksdisplay`} 
            />}  */}
            }
            
        </div>
    )
}
}

export default withData(withGame(Game))