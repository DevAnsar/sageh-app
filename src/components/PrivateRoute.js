import React from "react"
import {Redirect, Route} from "react-router-dom"
import {useToken} from "../providers/AuthProvider"

function PrivateRoute(props) {

    const status = false;
    const token = useToken();

    // console.log('hasLogin', has_auth);
    return status ? (token!==null ?
        <Route exact={props.exact} {...props} /> :
        <Redirect to={{
                pathname: "/login",
                state: {from: '/categories'}
        }}/>) : <Route exact={props.exact} {...props} />;

}

export default PrivateRoute
