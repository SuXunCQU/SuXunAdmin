import React, {Component} from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'

import ExitTaskHome from './home'

/**
 * 退出任务审批路由
 */
export default class ExitTask extends Component {
    render() {
        return (
            <Switch>
                <Route path='/home/command/exitTask' component={ExitTaskHome} exact/> {/*路径完全匹配*/}
                {/*<Route path='/exitTask/addUpdate' component={ExitTaskAddUpdate}/>*/}
                <Redirect to='/home/command'/>
            </Switch>
        )
    }
}

