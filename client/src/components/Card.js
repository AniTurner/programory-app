import React from 'react'

const Card = props => {
    const {answer, question, answerID, selectCard} = props


    return (
        <div onClick={() => selectCard(answerID)}>
            <h1>{question}</h1>
            <h1>{answer}</h1>
        </div>
    )
}