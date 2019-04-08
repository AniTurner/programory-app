import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {withData} from '../context/DataProvider.js'

class Nav extends Component {
    constructor(props){
        super(props)
    }

    render() {
        const {user, logout} = this.props
        return(
            <div className="center-crop">
                <div role="navigation" id="nav">
                    <li id="logo"><Link to={`/${user.username}/home`} className="title">PROGRAMORY</Link></li>
                    <li className="tab"><Link to={`/${user.username}/userinfo`}><div></div>My Profile</Link></li>
                    <li className="tab"><Link to={`/${user.username}/decksdisplay`}><div></div>Options</Link></li>
                    {this.props.token && <li><Link to={'/'} onClick={logout}><div></div>Log Out</Link></li>}
                </div>
            </div>
        )
    }
}

export default withData(Nav)
