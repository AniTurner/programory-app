import React, { Component } from 'react'
import { withData } from '../context/DataProvider.js'
import { TimelineLite } from 'gsap'
// import '../styles-admin.css'


class UserInfo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: props.user.username,
            nickname: props.user.nickname,
            imgUrl: props.user.imgUrl,
        }

        this.modalElement = null
        this.tl = new TimelineLite({ paused: true })
    }

    toggleModal = () => {
        const { modalToggle } = this.state
        if (!modalToggle) {
            this.tl.to(this.modalElement, 0.3, { autoAlpha: 1 })
                .to(this.modalElement, 0.5, { top: 50, scale: 1 }, "-=0.3")
                .play()
        } else {
            this.tl.to(this.modalElement, 0.3, { autoAlpha: 0 })
                .to(this.modalElement, 0.5, { top: 0, scale: 0.75 }, "-=0.3")
                .play()
        }
        this.setState(pervState => ({ modalToggle: !pervState.modalToggle }))
    }

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = e => {
        e.preventDefault()
        const userUpdate = {
            username: this.state.username,
            nickname: this.state.nickname,
            imgUrl: this.state.imgUrl,
        }

        this.props.updateUser(this.props.user._id , userUpdate)
        console.log('hi')

    }
    render() {
        console.log(this.props.user)
        return (
            <main>
                <div>

                    <h2>User Information</h2>
                    <hr />
                    <h1>{`${this.state.username}`}</h1>

                    <form onSubmit={this.handleSubmit}>
                        <div>
                            <img src={this.state.imgUrl ? this.state.imgUrl : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROJlZBm6kPxbsgHqvL2GNBMrLY_Ns4mhJFiOa4L1Sgkz1u-J2gtg"} alt={this.state.username} />
                            <input type="text" name="imgUrl" value={this.state.imgUrl} placeholder="Profile Image URL" onChange={this.handleChange} />
                        </div>
                        <div>
                            {/* <label>User Name:</label> */}
                            <input type="text" name="username" value={this.state.username} placeholder="Username" onChange={this.handleChange} disabled />
                            {/* <label>First Name:</label> */}
                            <input type="text" name="nickname" value={this.state.nickname ? this.state.nickname : ""} placeholder="Nickname" onChange={this.handleChange} />
                            
                        </div>
                        <div>
                            <button>Save</button>
                        </div>

                    </form>

                    <div ref={div => this.modalElement = div} className="modal">
                        <p>Your Update has been saved</p>
                        <button onClick={this.toggleModal}>Close</button>
                    </div>

                </div>
            </main>
        )
    }
}

export default withData(UserInfo)