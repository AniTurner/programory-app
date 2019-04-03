import React, {Component} from 'react'
import axios from 'axios'
// import {withRouter} from 'react-router-dom'
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
            console.log(user)
            localStorage.setItem('user', JSON.stringify(user))
            this.setState({
                user,
                token
            })
            return res
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
        return (
            <DataContext.Provider
                value={{
                    user: this.state.user,
                    token: this.state.token,
                    signup: this.signup,
                    login: this.login,
                    logout: this.logout
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