import React, {Component} from 'react'
import axios from 'axios'
const dataAxios = axios.create()

dataAxios.interceptors.request.use((config) => {
    const token = localStorage.getItem("token")
    config.headers.Authorization = `Bearer ${token}`
    return config
})

const DataContext = React.createContext()

class DataProvider extends Component {
    constructor(){
        super()
        this.state = {
            user: JSON.parse(localStorage.getItem("user")) || {},
            token: localStorage.getItem("token") || "",
            newUsername: '',
            allUsers: [],
        }
    }

    signup = (credentials) => {
        return axios.post("/auth/signup", credentials).then(res => {
            const {user, token} = res.data
            localStorage.setItem('token', token)
            localStorage.setItem('user', JSON.stringify(user))
            this.setState({
                user,
                token
            })
            return res
        })
    }

    login = (credentials) => {
        return axios.post('/auth/login', credentials).then(res => {
            const {token, user} = res.data
            localStorage.setItem("token", token)
            localStorage.setItem('user', JSON.stringify(user))
            this.setState({
                user,
                token
            })
            return res
        })
    }

    //get all users
    getUsers = () => {
        dataAxios.get('/api/user').then(res => {
            this.setState({
                allUsers: res.data
            })
        })
    }

    //get user
    getUser = (_id) => {
        dataAxios.get('/api/user' + _id).then(res => {
            this.setState({
                currentUser: res.data
            })
        })
    }

    addUser = (newUsername) => {
        dataAxios.post('/api/user' , newUsername).then(res => {
            this.setState(prevState => ({
                allUsers: [...prevState.allUsers, res.data]
            }))
        })
    }

    
    // update user
    updateUser = (updates) => {
        console.log(updates)
        dataAxios.put('/api/user', updates).then(res => {
            localStorage.user = JSON.stringify(res.data)
            this.setState({
                user: res.data
            })
        })
    }

    logout = () => {
        localStorage.removeItem('user')
        localStorage.removeItem('token')
        this.setState({
            user: {},
            token: ''
        })
    }


    

    render() {
        console.log(this.state.newUsername)
        return (
            <DataContext.Provider
                value={{
                    ...this.state,
                    signup: this.signup,
                    login: this.login,
                    logout: this.logout,
                    getUser: this.getUser,
                    getUsers: this.getUsers,
                    addUser: this.addUser,
                    newUsername: this.state.newUsername,
                    allUsers: this.state.allUsers,
                    updateUser: this.updateUser
                }}>
                {this.props.children}
            </DataContext.Provider>
        )
    }
}

export default DataProvider

export const withData = C => props => (
    <DataContext.Consumer>
        {value => <C {...props} {...value} />}
    </DataContext.Consumer>
)