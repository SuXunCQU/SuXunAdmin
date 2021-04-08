import React, {Component} from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'
import { Layout } from 'antd'
import {connect} from 'react-redux'

import LeftNav from '../../components/left-nav'
import Header from '../../components/header'
import Home from '../home/home'
import ExitTask from "../home/command/exitTask/exitTask";
import HomeSwitch from '../home/homeSwitch'
import Category from '../category/category'
import Incident from '../incident/incident'
import Role from '../role/role'
import User from '../user/user'
import NotFound from '../not-found/not-found'
import Order from '../order/order'
import Task from "../task/task";
import TaskStats from "../charts/taskStats/taskStats";
import UserStats from "../charts/userStats/userStats";

const { Footer, Sider, Content } = Layout

/**
 * 后台管理的路由组件
 */
class Navigator extends Component {
  render () {
    const user = this.props.user
    // 如果内存没有存储user ==> 当前没有登陆
    if(!user || !user.token) {
      // 自动跳转到登陆(在render()中)
      // todo 测试用，记得取消下面的注释
      // return <Redirect to='/login'/>
    }
    return (
      <Layout style={{minHeight: '100%'}}>
        <Sider>
          <LeftNav/>
        </Sider>
        <Layout>
          <Header>Header</Header>
          <Content style={{margin: 20, backgroundColor: '#fff'}}>
            <Switch>
              <Redirect exact from='/' to='/home'/>
              {/*<Route path='/home' component={Home}/>*/}
              <Route path='/home' component={HomeSwitch}/>
              <Route path='/incident' component={Incident}/>
              <Route path='/user' component={User}/>
              <Route path='/task' component={Task}/>
              <Route path='/charts/taskStats' component={TaskStats}/>
              <Route path='/charts/userStats' component={UserStats}/>
              <Route path='/role' component={Role}/>
              <Route component={NotFound}/> {/*上面没有一个匹配, 直接显示*/}
            </Switch>
          </Content>
          <Footer style={{textAlign: 'center', color: '#cccccc'}}>推荐使用谷歌浏览器，可以获得更佳页面操作体验</Footer>
        </Layout>
      </Layout>
    )
  }
}


export default connect(
  state => ({user: state.user}),
  {}
)(Navigator)
