import React, { Component } from 'react'

class Footer extends Component {
    render() {
        return (
            <div>
                <p>{(new Date().getFullYear())} &copy; Programory by &amp; <a href="https://github.com/AniTurner">Ani Turner</a></p>
            </div>
        )
    }
}
export default Footer