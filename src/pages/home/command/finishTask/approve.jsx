import React, {Component} from 'react'
import {Button, Card, Col, Icon, List, Row} from 'antd'

import memoryUtils from "../../../../utils/memoryUtils";
import LinkButton from "../../../../components/link-button";

const Item = List.Item

const BASE_IMG_URL = "";
const PASS = 2; // 通过
const NOPASS = 1; // 不通过


/**
 * 任务完成的审核子路由组件
 */
export default class TaskDetail extends Component {

    state = {
        taskId: 12,
        taskName: '寻找65岁老人李玉兰',
        taskLevel: 3,
        memberName: "张三",
        memberGender: 1,
        memberPhone: '156224655233',
        time: '2021-3-12 15:12',
        status: 0,
        lostId: 3,
        lostName: '李玉兰',
        lostGender: 0,
        lostAge: 1,
        reporterName: "李四",
        reporterGender: 0,
        reporterPhone: '17774589324',
        lostPictures: ['http://n.sinaimg.cn/ent/4_img/upload/0b3147ad/10/w690h920/20210407/e96e-knipfsf0484492.jpg',
            'http://n.sinaimg.cn/ent/4_img/upload/0b3147ad/10/w690h920/20210407/e96e-knipfsf0484492.jpg',
            'http://n.sinaimg.cn/ent/4_img/upload/0b3147ad/10/w690h920/20210407/e96e-knipfsf0484492.jpg'],
        reporterPicture: "http://n.sinaimg.cn/ent/4_img/upload/0b3147ad/10/w690h920/20210407/e96e-knipfsf0484492.jpg",
        certificatePicture: 'http://n.sinaimg.cn/ent/4_img/upload/0b3147ad/10/w690h920/20210407/e96e-knipfsf0484492.jpg',
        groupPicture: 'http://n.sinaimg.cn/ent/4_img/upload/0b3147ad/10/w690h920/20210407/e96e-knipfsf0484492.jpg',
    }

    componentDidMount() {


    }

    /**
     * 在卸载之前清除保存的数据
     */
    componentWillUnmount() {
        memoryUtils.task = {}
    }


    setNewStatus = (newStatus) => {
        console.log('newStatus', newStatus);
    }


    render() {

        // 读取携带过来的state数据
        const {
            taskName,
            taskLevel,
            memberName,
            memberGender,
            memberPhone,
            time,
            lostName,
            lostGender,
            lostAge,
            reporterName,
            reporterGender,
            reporterPhone,
            lostPictures,
            reporterPicture,
            certificatePicture,
            groupPicture
        } = this.state

        const title = (
            <span>
                <LinkButton>
                    <Icon
                        type='arrow-left'
                        style={{marginRight: 10, fontSize: 20}}
                        onClick={() => this.props.history.goBack()}
                    />
                </LinkButton>
                <span>任务完成审核</span>
            </span>)

        return (
            <Card title={title} className='finishTask-detail'>
                <List>
                    <Row gutter={[16, 16]}>
                        <Col span={12}>
                            <Item style={{justifyContent: 'left'}}>
                                <span className="left">任务名称:</span>
                                <span>{taskName}</span>
                            </Item>
                        </Col>
                        <Col span={12}>
                            <Item style={{justifyContent: 'left'}}>
                                <span className="left">走失者姓名:</span>
                                <span>{lostName}</span>
                            </Item>
                        </Col>
                    </Row>
                    <Row gutter={[16, 16]}>
                        <Col span={12}>
                            <Item style={{justifyContent: 'left'}}>
                                <span className="left">任务级别:</span>
                                <span>{taskLevel}</span>
                            </Item>
                        </Col>
                        <Col span={12}>
                            <Item style={{justifyContent: 'left'}}>
                                <span className="left">走失者性别:</span>
                                <span>{lostGender === 1 ? '男' : '女'}</span>
                            </Item>
                        </Col>
                    </Row>
                    <Row gutter={[16, 16]}>
                        <Col span={12}>
                            <Item style={{justifyContent: 'left'}}>
                                <span className="left">队员姓名:</span>
                                <span>{memberName}</span>
                            </Item>
                        </Col>
                        <Col span={12}>
                            <Item style={{justifyContent: 'left'}}>
                                <span className="left">走失者年龄:</span>
                                <span>{lostAge}</span>
                            </Item>
                        </Col>
                    </Row>
                    <Row gutter={[16, 16]}>
                        <Col span={12}>
                            <Item style={{justifyContent: 'left'}}>
                                <span className="left">队员性别:</span>
                                <span>{memberGender === 1 ? '男' : '女'}</span>
                            </Item>
                        </Col>
                        <Col span={12}>
                            <Item style={{justifyContent: 'left'}}>
                                <span className="left">报失者姓名:</span>
                                <span>{reporterName}</span>
                            </Item>
                        </Col>
                    </Row>
                    <Row gutter={[16, 16]}>
                        <Col span={12}>
                            <Item style={{justifyContent: 'left'}}>
                                <span className="left">队员电话:</span>
                                <span>{memberPhone}</span>
                            </Item>
                        </Col>
                        <Col span={12}>
                            <Item style={{justifyContent: 'left'}}>
                                <span className="left">报失者性别:</span>
                                <span>{reporterGender === 1 ? '男' : '女'}</span>
                            </Item>
                        </Col>
                    </Row>
                    <Row gutter={[16, 16]}>
                        <Col span={12}>
                            <Item style={{justifyContent: 'left'}}>
                                <span className="left">申请时间:</span>
                                <span>{time}</span>
                            </Item>
                        </Col>
                        <Col span={12}>
                            <Item style={{justifyContent: 'left'}}>
                                <span className="left">报失者电话:</span>
                                <span>{reporterPhone}</span>
                            </Item>
                        </Col>
                    </Row>
                    <hr style={{color:"#E8E8E8",opacity:'0.2'}} />
                    <Row></Row>
                        <Item style={{justifyContent: 'left'}}>
                            <span className="left">走失者图片:</span>
                            <span>
                                {
                                    lostPictures.map(img => {
                                        console.log(BASE_IMG_URL + img)
                                        return (
                                            <img
                                                key={img}
                                                src={BASE_IMG_URL + img}
                                                className="evidence-img"
                                                alt="img"
                                            />
                                        )
                                    })
                                }
                            </span>
                        </Item>


                    <Item style={{justifyContent: 'left'}}>
                        <span className="left">报失者图片:</span>
                        <span><img
                            key={certificatePicture}
                            src={BASE_IMG_URL + reporterPicture}
                            className="evidence-img"
                            alt="img"
                        /></span>
                    </Item>
                    <Item style={{justifyContent: 'left'}}>
                        <span className="left">家属确认函:</span>
                        <span><img
                            key={certificatePicture}
                            src={BASE_IMG_URL + certificatePicture}
                            className="evidence-img"
                            alt="img"
                        /></span>
                    </Item>
                    <Item style={{justifyContent: 'left'}}>
                        <span className="left">走失者、报失者、队员三方合照:</span>
                        <span><img
                            key={groupPicture}
                            src={BASE_IMG_URL + groupPicture}
                            className="evidence-img"
                            alt="img"
                        /></span>
                    </Item>
                    <Item style={{justifyContent: 'space-around', paddingLeft: '200px', paddingRight: '200px'}}>
                        <Button type='primary' onClick={this.setNewStatus(PASS)}>通过</Button>
                        <Button type='danger' onClick={this.setNewStatus(NOPASS)}>不通过</Button>
                    </Item>
                </List>
            </Card>
        )
    }
}
