import React from 'react'



const AfterGame = (props) => {
    return (
        <div>
            <p style={{color: 'white'}}>Your Score is: {props.time}</p>
        </div>
    )
}

export default AfterGame