import React, {Component} from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'

import TaskHome from './home'
import TaskAddUpdate from './add-update'

import './task.less'

/*
任务路由
 */
export default class Task extends Component {
    render() {
        return (
            <Switch>
                <Route path='/task' component={TaskHome} exact/> {/*路径完全匹配*/}
                <Route path='/task/addUpdate' component={TaskAddUpdate}/>
                <Redirect to='/task'/>
            </Switch>
        )
    }
}
