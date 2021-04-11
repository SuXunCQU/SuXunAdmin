import React, {Component} from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'

import FinishTaskHome from "./home";
import FinishTaskApprove from "../../../home/command/finishTask/approve";

import './finishTask.less';

/**
 * 任务完成审批路由
 */
export default class FinishTask extends Component {
  render() {
    return (
      <Switch>
        <Route path='/home/command/finishTask' component={FinishTaskHome} exact/> {/*路径完全匹配*/}
          <Route path='/home/command/finishTask/approve' component={FinishTaskApprove}/>
        <Redirect to='/home/command'/>
      </Switch>
    )
  }
}
