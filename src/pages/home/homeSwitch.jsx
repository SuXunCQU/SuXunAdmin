import React, {Component} from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'

import Home from './home';
import Command from './command';
import AddClue from './clue/add-clue';
import AddOrder from "./order/add-order";

import './home.less'

/*
走失事件路由
 */
export default class HomeSwitch extends Component {
    render() {
        return (
            <Switch>
                <Route path='/home' component={Home} exact/> {/*路径完全匹配*/}
                <Route path='/home/command' component={Command}/>
                <Route path='/home/addClue' component={AddClue}/>
                <Route path='/home/addOrder' component={AddOrder}/>
                <Redirect to='/home'/>
            </Switch>
        )
    }
}
