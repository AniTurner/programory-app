import React, { Component } from 'react'
import { withData } from '../context/DataProvider.js'
import { TimelineLite } from 'gsap'
import axios from 'axios'
// import '../styles-admin.css'


class UserInfo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: props.user.username,
            nickname: props.user.nickname,
            userImg: props.user.userImg,
            selectedFile: null
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
        const {username, nickname, userImg} = this.state
        const userUpdate = {
            username,
            nickname,
            userImg,
        }

        this.props.updateUser(this.props.user._id , userUpdate)
        console.log('hi')

    }

    fileSelectedHandler = e => {
        this.setState({
            selectedFile: e.target.files[0]
        })
    }

    fileUploadHandler = () => {
        const fd = new FormData()
        fd.append('image', this.state.selectedFile, this.state.selectedFile.name)
        axios.put('/api/user', fd,{headers: {Authorization: `Bearer ${localStorage.token}`}}, {
            onUploadProgress: progressEvent => {
                console.log('Upload Progress: ' + Math.round(progressEvent.loaded / progressEvent.total * 100) + '%' )
            }
        })
            .then(res => {
            console.log(res)
        })
    }
    render() {
        console.log(this.props.user)
        const {username, userImg, nickname} = this.state
        return (
            <main>
                <div>

                    <h2>User Information</h2>
                    <hr />
                    <h1>{`${username}`}</h1>

                    <form onSubmit={this.handleSubmit}>
                        <div>
                            <img style={{width: 250, height: 250}}src={userImg ? userImg : "http://4.bp.blogspot.com/-5ijT9UQtWTQ/T3B-jJpkoII/AAAAAAAABAg/ylbNzWxASXA/s1600/brain+sketch_69563776.jpg"} alt={username} />
                            <input 
                                style={{display: 'none'}}
                                type="file" 
                                name="userImg" 
                                value={userImg} 
                                placeholder="Profile Image URL" 
                                onChange={this.fileSelectedHandler}
                                ref={fileInput => this.fileInput = fileInput} />
                            <button onClick={() => this.fileInput.click()}>Pick File</button>
                            <button onClick={this.fileUploadHandler}>Upload</button>
                        </div>
                        <div>
                            {/* <label>User Name:</label> */}
                            <input type="text" name="username" value={username} placeholder="Username" onChange={this.handleChange} disabled />
                            {/* <label>First Name:</label> */}
                            <input type="text" name="nickname" value={nickname ? nickname : ""} placeholder="Nickname" onChange={this.handleChange} />
                            
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