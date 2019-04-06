import React, { Component } from 'react'
import { withData } from '../context/DataProvider.js'
import { TimelineLite } from 'gsap'
import {storage} from '../firebase'
import '../styles-userinfo.css'



class UserInfo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: props.user.username,
            nickname: props.user.nickname,
            image: null,
            userImg: '',
            progress: 0
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
        if(e.target.files[0]) {
            const image = e.target.files[0]
            this.setState(() => ({image}))
        }
    }

    handleSaveChange = e => {
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
    handleUpload = () => {
        const {image} = this.state
        const uploadTask = storage.ref(`images/${image.name}`).put(image)
        uploadTask.on('state_changed',(snapshot) => {
            const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
            this.setState({progress})
        }, (error) => {
            console.log(error)
        }, () => {
            storage.ref('images').child(image.name).getDownloadURL().then(url => {
                const updates = { userImg: url}
                this.props.updateUser(updates)
            })
        })
    }

    render() {
        // const style = {
        //     height: '100vh',
        //     display: 'fex',
        //     flexDirection: 'column',
        //     alignItems: 'center',
        //     justifyContent: 'center'
        // }
        const {username, userImg, nickname} = this.state

        return (
            <main>
                <div id="user-info-edit-screen" className="center-crop">

                    {/* <h2>Me</h2> */}
                    {/* <hr /> */}
                    <h1>Hi {`${nickname}`} !</h1>

                    <form id="user-info-form" onSubmit={this.handleSubmit}>
                        <div>
                            <img src={this.props.user.userImg || 'http://via.placeholder.com/400x300'} alt='Uploaded image' height='300' width='400' />
                            {this.state.progress > 99 || this.state.progress == 0
                            ?
                            null
                            :
                            <progress id="progress-bar" value={this.state.progress} max="100" />}
                            <br/>
                            <label className='custom-file-upload'>Select Image
                            <input
                                id="choosefile-button"
                                size= '160px'
                                type="file" 
                                name="userImg" 
                                value={userImg} 
                                placeholder="Profile Image URL" 
                                onChange={this.handleChange}
                                ref={fileInput => this.fileInput = fileInput} />
                            </label>
                            <button id="upload-button" onClick={this.handleUpload}>Upload</button>
                            <br/>
                        </div>
                        <div>
                            <label className='input-label'>Username:<br/>
                            <input type="text" name="username" value={username} placeholder="Username" onChange={this.handleSaveChange} disabled />
                            </label>
                            <label className='input-label'>Nickname:<br/>
                            <input type="text" name="nickname" value={nickname ? nickname : ""} placeholder="Nickname" onChange={this.handleSaveChange} />
                            </label>
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