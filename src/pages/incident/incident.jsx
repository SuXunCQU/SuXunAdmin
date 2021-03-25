import React, {Component} from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'

import IncidentHome from './home'
import IncidentAddUpdate from './add-update'
import IncidentDetail from './detail'

import './incident.less'

/*
走失事件路由
 */
export default class Incident extends Component {
  render() {
    return (
      <Switch>
        <Route path='/incident' component={IncidentHome} exact/> {/*路径完全匹配*/}
        <Route path='/incident/addUpdate' component={IncidentAddUpdate}/>
        <Route path='/incident/detail' component={IncidentDetail}/>
        <Redirect to='/incident'/>
      </Switch>
    )
  }
}
