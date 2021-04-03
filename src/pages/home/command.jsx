import React, {Component} from 'react';
import {Descriptions, Divider, Layout, List, Avatar, Button, Icon} from 'antd';
import Clue from './clue';
import Order from './order';
import poster from '../../assets/images/百度地图海报.jpg';
import {member_data} from '../../utils/mockUtils';

import './command.less'

const {Sider, Header, Content, Footer} = Layout;
class Command extends Component {
    render() {
        const {data} = this.props.location.state;
        console.log(member_data.items)
        return (
            <Layout className="container">
                <Layout className="left-container">
                    <Header className="title">{`正在进行：寻找失踪者${data.lost_name}`}</Header>
                    <Layout style={{backgroundColor: "#fff", flexDirection: "row"}}>
                        <Layout className="left-container-content" style={{backgroundColor: '#fff'}}>
                            <Header className="descriptions-container">
                                <div>
                                    <span>姓名：{data.lost_name}</span>
                                    <span>性别{data.lost_gender}</span>
                                    <span>年龄：{data.lost_age}</span>
                                    <span>走失地点：{data.lost_location}</span>
                                </div>
                                <Button type="primary">查看详细信息<Icon type="double-right"/></Button>
                            </Header>
                            <Content className="map-container">
                                {/* 地图占位 */}
                                <img className="map" src={poster}/>
                            </Content>
                        </Layout>
                        {/* 线索和指令区 */}
                        <Content className="left-container-sider">
                            <Layout>
                                <Content className="clue-container">
                                    <Clue />
                                </Content>
                                <Content className="order-container">
                                    <Order />
                                </Content>
                            </Layout>
                        </Content>
                    </Layout>
                    {/*按钮区*/}
                    <Footer className="bottom-container">
                        <Button type="primary">任务变更审批</Button>
                        <Button type="primary">行动完成审批</Button>
                        <Button type="primary">任务完成申请</Button>
                        <Button type="primary">任务暂缓申请</Button>
                    </Footer>
                </Layout>
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
                                    avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                                    title={item.name}
                                    description={item.phone}
                                />
                            </List.Item>
                        )}
                    />
                </Sider>
            </Layout>
        );
    }
}

export default Command;
