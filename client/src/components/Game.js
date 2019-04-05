import React, {Component} from 'react'
import {withGame} from '../context/GameProvider.js'
const shuffle = require('lodash.shuffle');

class Game extends Component {
    constructor(props){
        super(props)
        this.state = {
            selectedItem1: '',
            selectedItem2: '',
            shuffledDeck: []
        }
        
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
            shuffledDeck: prevState.shuffledDeck.filter(card => card.answerID !== answerID)
        }))
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
        console.log('not a match')
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
        <div>
            {mappedDeck}
        </div>
    )
}
}

export default withGame(Game)