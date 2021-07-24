import React, {Component} from 'react'
import {Button, Card, Col, Icon, List, message, Modal, Row} from 'antd'

import memoryUtils from "../../../../utils/memoryUtils";
import LinkButton from "../../../../components/link-button";
import lostPhoto from './lost.jpg';
import memberPhoto from './reporter.jpg';
import confirmPhoto from './confirm.png';
import {reqReadFinishTask, reqUpdateFinishTask} from "../../../../api";

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
        finish_id:null,
        finishTask:null,
    }

    constructor(props) {
        super(props);
        this.setState({
            finish_id:props.location.state.finish_id,
        })
    }


    /**
     * 修改申请状态
     * @param finish_id
     * @param newStatus
     */
    updateStatus= async (finish_id,newStatus)=>{
        const response = await reqUpdateFinishTask({apply_id:finish_id,status:newStatus});
        console.log("updateStatus",response);
        if(response){
            message.success("批准退出任务申请成功！");
            await this.getFinishTasks();
        }else{
            message.error("批准退出任务申请失败，请检查网络连接！");
        }
    }

    getFinishTask=async ()=>{
        const {finish_id} = this.state;
        const response = await reqReadFinishTask(finish_id);
        console.log("response read finish_id",response);
        if(response.status == -1 || response.error){
            message.error("获取任务完成申请信息失败，请检查网络连接！");
        }else{

            message.success("获取任务完成申请信息成功！");
        }
    }

    async componentDidMount() {
        await this.getFinishTask();
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
        } = this.state;

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
                                <img
                                    key={0}
                                    src={lostPhoto}
                                    className="evidence-img"
                                    alt="img"
                                />
                            </span>
                        </Item>


                    <Item style={{justifyContent: 'left'}}>
                        <span className="left">报失者图片:</span>
                        <span><img
                            key={certificatePicture}
                            src={memberPhoto}
                            className="evidence-img"
                            alt="img"
                        /></span>
                    </Item>
                    <Item style={{justifyContent: 'left'}}>
                        <span className="left">家属确认函:</span>
                        <span><img
                            key={certificatePicture}
                            src={confirmPhoto}
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
                        <Button type='primary' onClick={() => {
                            Modal.confirm({
                                content: "请确认是否要确认通过？",
                                cancelText: "取消",
                                okText: "提交",
                                onOk: () => {
                                    return new Promise((resolve, reject) => {
                                        setTimeout(() => {
                                            Modal.success({
                                                content: "提交成功",
                                                okText: "确定",
                                            });
                                            resolve("success");
                                        }, 1000)
                                    })
                                }
                            })
                        }}>通过</Button>
                        <Button type='danger' onClick={this.updateStatus(NOPASS)}>不通过</Button>
                    </Item>
                </List>
            </Card>
        )
    }
}
