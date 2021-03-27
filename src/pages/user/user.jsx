import React, {Component} from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'

import UserHome from "./home";
import UserAddUpdate from "./add-update";


/*
队员路由
 */
export default class User extends Component {
    render() {
        return (
            <Switch>
                <Route path='/user' component={UserHome} exact/> {/*路径完全匹配*/}
                <Route path='/user/addUpdate' component={UserAddUpdate}/>
                <Redirect to='/user'/>
            </Switch>
        )
    }
}
