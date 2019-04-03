import React from "react"
import { Route, Redirect } from "react-router-dom";
import { withData } from "../context/DataProvider.js"

const ProtectedRoute = (props) => {
    //set state user: _id
    const { component: Component, ...rest } = props;
    console.log(rest)
    return (
        props.token ?
            <Route {...rest} component={Component} /> :
            <Redirect to="/" />
    )
}

export default withData(ProtectedRoute); 