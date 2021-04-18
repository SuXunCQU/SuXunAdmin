import React, {Component} from 'react';
import {Avatar, Button, Card, Icon, Layout, List, Modal} from 'antd';
import GdMap from "../../../components/map/GDMap";
import { ExclamationCircleOutlined } from '@ant-design/icons';
import Clue from './clue/clue';
import Order from './order/order';
import poster from '../../../assets/images/百度地图海报.jpg';
import {member_data, task_data, postpone_data, complete_data} from '../../../utils/mockUtils.new';

import './home.less'
import LinkButton from "../../../components/link-button";
import ClueAddForm from "../command/clue/add-form"
import OrderAddForm from "../command/order/add-form"
import PauseTask from "./pauseTask/pauseTask";

const {Sider, Header, Content, Footer} = Layout;

class Home extends Component {

    state = {
        isShowClueAdd: false,
        isShowOrderAdd: false,
        isShowPauseTask: false,
        isShowExport: false,
    }

    showClueAdd = () => {
        this.setState({
            isShowClueAdd: true,
        })
    }

    showOrderAdd = () => {
        this.setState({
            isShowOrderAdd: true,
        })
    }

    showPauseTask = () => {
        this.setState({
            isShowPauseTask: true,
        })
    }

    showExport = () => {
        Modal.success({content: "导出成功！"})
    }

    addClue = () => {
        console.log('addClue');
        this.setState({
            isShowClueAdd: false
        })
    }

    addOrder = () => {
        console.log('addOrder');
        this.setState({
            isShowOrderAdd: false
        })
    }

    pauseTaskConfirm = () => {
        Modal.confirm({
            title: '是否暂缓任务',
            icon: <ExclamationCircleOutlined />,
            content: '您是否确定暂缓该任务？暂缓任务后只能在任务管理中修改任务状态。',
            okText: '确认',
            cancelText: '取消',
            onOk:this.pauseTask
        });
    }

    pauseTask=()=>{
        console.log('pauseTask');
        this.setState({
            isShowPauseTask: false,
        })
    }

    searchPostponeData = (task_id) => {
        const postponeItems = postpone_data.items;
        let reason = "", time = "";
        console.log(postpone_data);
        for (let x in postponeItems){
            if(postponeItems[x].task_id === task_id){
                reason = postponeItems[x].reason;
                time = postponeItems[x].time;
            }
        }
        return [reason, time];
    }

    searchCompleteData = (task_id) => {
        const completeItems = complete_data.items;
        console.log(complete_data);
        let certificate_photo = "", time = "";
        for (let x in completeItems) {
            if (completeItems[x].task_id === task_id) {
                // console.log(completeItems[x]);
                certificate_photo = completeItems[x].certificate_photo;
                time = completeItems[x].time;
                console.log(time);
            }
        }
        return [certificate_photo, time];
    }

    render() {
        const {data, mission_id, status} = this.props.location.state;
        const {isShowClueAdd, isShowOrderAdd, isShowPauseTask, isShowExport} = this.state;
        const {history} = this.props;
        let reason, time, certificate_photo;
        if(status === 2){
            [reason, time] = this.searchPostponeData(mission_id);
        }
        else if(status === 3){
            [certificate_photo, time] = this.searchCompleteData(mission_id);
        }
        console.log(time);

        // 头部左侧标题
        const title = (
            <span>
                <LinkButton onClick={() => this.props.history.goBack()}>
                    <Icon type='arrow-left' style={{fontSize: 20}}/>
                </LinkButton>
                <span style={{marginRight: "16px"}}>正在进行：寻找失踪者{data.lost_name}</span>
            </span>
        )

        const extra = (
            <span>
                <Button style={{marginRight: "16px"}} type={"primary"} onClick={this.showExport}>导出详情信息</Button>
                <Button style={{marginRight: "16px"}} type={"primary"} onClick={this.showExport}>导出线索列表</Button>
                <Button style={{marginRight: "16px"}} type={"primary"} onClick={this.showExport}>导出行动结果</Button>
                <Button style={{marginRight: "16px"}} type={"primary"} onClick={this.showExport}>一键导出</Button>
            </span>
        )

        return (
            <Card title={title} extra={extra}>
                <Layout className="container">
                    {/*队员列表*/}
                    <Sider className='right-container'
                           style={{
                               overflow: "auto",
                               backgroundColor: "#fff",
                           }}
                           width="230px"
                    >
                        <List
                            itemLayout="horizontal"
                            className="member-list"
                            dataSource={member_data.items}
                            renderItem={item => (
                                <List.Item>
                                    <List.Item.Meta
                                        avatar={<Avatar
                                            src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"/>}
                                        title={item.member_name}
                                        description={item.member_phone}
                                    />
                                </List.Item>
                            )}
                        />
                    </Sider>
                    {/* 走失者信息和地图区 */}
                    <Layout className="left-container">
                        {/*<Header className="title">{`正在进行：寻找失踪者${data.lost_name}`}</Header>*/}
                        <Layout style={{backgroundColor: "#fff", flexDirection: "row"}}>
                            <Layout className="left-container-content" style={{backgroundColor: '#fff'}}>
                                <Header className="descriptions-container">
                                    <div>
                                        <span>姓名：{data.lost_name}</span>
                                        <span>性别：{data.lost_gender ? "男" : "女"}</span>
                                        <span>年龄：{data.lost_age}</span>
                                        <span>走失地点：{data.lost_place}</span>
                                    </div>
                                    <Button type="primary" onClick={() => history.push('/incident/addUpdate', {data})}>
                                        查看详细信息
                                        <Icon type="double-right"/>
                                    </Button>
                                </Header>
                                <Content className="map-container">
                                    {/* 地图占位 */}
                                    {status >= 2 ? (
                                        <div style={{ background: '#ECECEC', padding: '30px', height: "100%", width: "100%"}}>
                                            <Card title={status === 2 ? "任务暂缓信息" : "任务完成信息"} bordered={false} style={{ width: 300 }}>
                                                {status === 2 ? (<div>
                                                    <p>暂缓原因：{reason}</p>
                                                    <p>暂缓审批时间：{time}</p>
                                                </div>) : (<div>
                                                    <p>完成审批时间：{time}</p>
                                                </div>)
                                                }

                                            </Card>
                                        </div>
                                    ): <GdMap/>}
                                </Content>
                            </Layout>
                            {/* 线索和指令区 */}
                            <Content className="left-container-sider">
                                <Layout>
                                    <Content className="clue-container">
                                        <Clue mission_id={mission_id} addNewItem={this.showClueAdd}/>
                                    </Content>
                                    <Content className="order-container">
                                        <Order mission_id={mission_id} addNewItem={this.showOrderAdd}/>
                                    </Content>
                                </Layout>
                            </Content>
                        </Layout>
                        {/*按钮区*/}
                        <Footer className="bottom-container">
                            <Button type="primary"
                                    onClick={() => this.props.history.push('/home/command/exitTask', {mission_id})}>任务退出审批</Button>
                            <Button type="primary"
                                    onClick={() => this.props.history.push('/home/command/finishTask', {mission_id})}>任务完成审批</Button>
                            <Button type="primary"
                                    onClick={this.showPauseTask}>提请任务暂缓</Button>
                        </Footer>
                    </Layout>

                </Layout>
                <Modal
                    title='添加线索'
                    visible={isShowClueAdd}
                    onOk={this.addClue}
                    onCancel={() => {
                        this.form.resetFields()
                        this.setState({isShowClueAdd: false})
                    }}
                >
                    <ClueAddForm
                        setForm={form => this.form = form}
                        // roles={roles}
                        // user={user}
                    />
                </Modal>
                <Modal
                    title='添加指令'
                    visible={isShowOrderAdd}
                    onOk={this.addOrder}
                    onCancel={() => {
                        this.form.resetFields()
                        this.setState({isShowOrderAdd: false})
                    }}
                >
                    <OrderAddForm
                        setForm={form => this.form = form}
                        // roles={roles}
                        // user={user}
                    />
                </Modal>
                <Modal
                    title='提请任务暂缓'
                    visible={isShowPauseTask}
                    onOk={this.pauseTaskConfirm}
                    onCancel={() => {
                        this.form.resetFields()
                        this.setState({isShowPauseTask: false})
                    }}
                >
                    <PauseTask
                        setForm={form => this.form = form}
                        // roles={roles}
                        // user={user}
                    />
                </Modal>
            </Card>
        )
    }

}

export default Home;
