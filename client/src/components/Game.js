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

    componentDidMount(){
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
                //this.props.history.push('/site')
            }
        })
        console.log("it's a match")

        // this.setState({
        //     selectedItem1: id,
        //     selectedItem2: id
        // })
        // if (this.state.selectedItem1 === this.state.selectedItem2) {
        //     console.log("correct answer")
        // }
       
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
        console.log(this.state.selectedItem1)
        console.log(this.state.selectedItem2)
        //create card component, mappedCard = this.
        return (
            <div style={{color: 'white'}} key={item.id}>
                <div onClick={() => this.selectCard(item.answerID)}>{item.question}</div>  
            {/* //when function gets fired in onclick function e.target.key //selected item 1,2, etc. in state // have a counter in state  */}
                <div onClick={() => this.selectCard(item.answerID)} >{item.answer}</div>
            </div>
        )
    })
    return (
        <div style={{color: "white"}}>
            {this.state.time}
            {this.state.gameStart && mappedDeck}
            {!this.state.gameStart && <button onClick={this.startGame}>Start Game</button>}
        </div>
    )
}
}

export default withGame(Game)