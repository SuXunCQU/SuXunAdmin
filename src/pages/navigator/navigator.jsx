import React, {Component} from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'
import {Layout, Spin} from 'antd'
import {connect} from 'react-redux'

import LeftNav from '../../components/left-nav'
import Header from '../../components/header'
import Home from '../home/home'
import HomeSwitch from '../home/homeSwitch'
import Incident from '../incident/incident'
import Role from '../role/role'
import User from '../user/user'
import NotFound from '../not-found/not-found'
import Task from "../task/task";
import TaskStats from "../charts/taskStats/taskStats";
import IncidentStats from "../charts/incidentStats/incidentStats";
import FaceCompare from "../faceCompare/faceCompare";
import StartStandard from "../startStandard/startStandard";
import {checkTokenValidation} from "../../api";

import "./navigator.less";

const {Footer, Sider, Content} = Layout

/**
 * 后台管理的路由组件
 */
class Navigator extends Component {

    constructor() {
        super();
        this.state = {
            loading: true,
            tokenValidated: true,
        }
    }

    async componentDidMount() {
        const user = this.props.user
        // 如果内存没有存储user ==> 当前没有登陆
        if (!user || !user.token) {
            this.setState({
                tokenValidated: false,
            })
        } else if (user && user.token) {
            const response = await checkTokenValidation();
            console.log(response);
            if (response.status === 0) {
                this.setState({
                    tokenValidated: false,
                })
            }
            else{
                this.setState({
                    loading: false,
                })
            }
        }


        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((result) => {
                console.log(result);
            })
        }
    }

    render() {
        const {tokenValidated, loading} = this.state;
        console.log(tokenValidated);
        const user = this.props.user
        // 如果内存没有存储user ==> 当前没有登陆
        if (!user || !user.token) {
            // 自动跳转到登陆(在render()中)
            return <Redirect to='/login'/>
        }

        if (!tokenValidated) {
            return <Redirect to='/login'/>
        }

        return (
            <Spin spinning={loading}>
                {
                    loading ? null :
                        (
                            <Layout style={{minHeight: '100%'}}>
                                <Sider id={"sideNavigator"}>
                                    <LeftNav/>
                                </Sider>
                                <Layout>
                                    <Header>Header</Header>
                                    <Content style={{margin: 20, backgroundColor: '#fff'}}>
                                        <Switch>
                                            <Redirect exact from='/' to='/home'/>
                                            <Route path='/home' component={HomeSwitch}/>
                                            <Route path='/incident' component={Incident}/>
                                            <Route path='/user' component={User}/>
                                            <Route path='/task' component={Task}/>
                                            <Route path='/charts/taskStats' component={TaskStats}/>
                                            <Route path='/charts/incidentStats' component={IncidentStats}/>
                                            <Route path='/faceCompare' component={FaceCompare}/>
                                            <Route path='/startStandard' component={StartStandard}/>
                                            <Route path='/role' component={Role}/>
                                            <Route component={NotFound}/> {/*上面没有一个匹配, 直接显示*/}
                                        </Switch>
                                    </Content>
                                    <Footer style={{
                                        textAlign: 'center',
                                        color: '#cccccc'
                                    }}>推荐使用谷歌浏览器，可以获得更佳页面操作体验</Footer>
                                </Layout>
                            </Layout>
                        )
                }
            </Spin>
        )
    }
}

const mapStateToProps = (state) => ({
    user: state.user
})
export default connect(mapStateToProps)(Navigator)
