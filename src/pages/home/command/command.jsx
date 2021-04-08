import React, {Component} from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'

import Home from './home';
import ExitTask from "./exitTask/exitTask";
import FinishTask from "./finishTask/finishTask";

import './home.less'

/**
 * 行动指挥路由
 */
export default class Command extends Component {
    render() {
        return (
            <Switch>
                <Route path='/home/command' component={Home} exact/> {/*路径完全匹配*/}
                <Route path='/home/command/exitTask' component={ExitTask}/>
                <Route path='/home/command/finishTask' component={FinishTask}/>
                <Redirect to='/home/command'/>
            </Switch>
        )
    }
}
