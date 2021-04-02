import React, {Component} from 'react';
import {Descriptions, Divider, Layout, List, Avatar} from 'antd';
import InfiniteScroll from 'react-infinite-scroller';
import poster from '../../assets/images/百度地图海报.jpg';
import {member_data} from '../../utils/mockUtils';

import './command.less'

const {Sider, Header, Content, Footer} = Layout;
const teamData = [
    {
        title: 'Ant Design Title 1',
    },
    {
        title: 'Ant Design Title 2',
    },
    {
        title: 'Ant Design Title 3',
    },
    {
        title: 'Ant Design Title 4',
    },
];
class Command extends Component {
    render() {
        const {data} = this.props.location.state;
        console.log(member_data.items)
        return (
            <Layout className="container">
                <Layout className="left-container">
                    <Header className="title">{`正在进行：寻找失踪者${data.lost_name}`}</Header>
                    <Divider/>
                    <Layout style={{backgroundColor: "#fff"}}>
                        <Content style={{paddingRight: "10px"}}>
                            <Descriptions
                                column={6}
                                size={"small"}
                            >
                                <Descriptions.Item label="姓名">{data.lost_name}</Descriptions.Item>
                                <Descriptions.Item label="性别">{data.lost_gender}</Descriptions.Item>
                                <Descriptions.Item label="年龄">{data.lost_age}</Descriptions.Item>
                                <Descriptions.Item label="失踪地点">{data.lost_location}</Descriptions.Item>
                            </Descriptions>
                            <img src={poster}/>
                        </Content>
                        <Sider>
                            sider
                        </Sider>
                    </Layout>
                    {/*按钮区*/}
                    <Footer className="bottom-container">按钮区</Footer>
                </Layout>
                {/*队员列表*/}
                <Sider className='right-container'
                       style={{
                           overflow: "auto",
                           height: "100vh",
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
                                    title={item.member_name}
                                    description={item.member_phone}
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
