import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Avatar, Button, Card, Divider, Icon, Layout, List, Modal, message} from 'antd';
import GdMap from "../../../components/map/GDMap";
import { ExclamationCircleOutlined } from '@ant-design/icons';
import Clue from './clue/clue';
import Order from './order/order';
import {postpone_data, complete_data, clue_data, task_data} from '../../../utils/mockUtils.new';
import XLSX from 'xlsx';

import './home.less'
import LinkButton from "../../../components/link-button";
import ClueAddForm from "../command/clue/add-form"
import OrderAddForm from "../command/order/add-form"
import PauseTask from "./pauseTask/pauseTask";
import {formateDate, format} from "../../../utils/dateUtils";
import {openDownloadDialog, sheet2blob} from "../../../utils/xlsxUtil";
import ajax from "../../../api/ajax";
import {Marker, Polyline} from "react-amap";
import {reqAddClue, reqAddInstruction, reqMemberByTaskId} from "../../../api";

const {Sider, Header, Content, Footer} = Layout;
const GDKEY = "ba37a34a8bbf80e97c285b9ab129ca26";
class Home extends Component {
    state = {
        isShowClueAdd: false,
        isShowOrderAdd: false,
        isShowPauseTask: false,
        isShowExport: false,
        confirmLoading: false,
        members: [],
        polylines: [],
        clue_markers: [
            {
                "coordinate":{
                    "latitude": 29.71628,
                    "longitude": 106.64223,
                },
                "title": "重庆西站"
            },
            {
                "coordinate":{
                    "latitude": 29.533085,
                    "longitude": 106.508156,
                },
                "title": "重庆医科大学"
            },
            {
                "coordinate":{
                    "latitude": 29.622889,
                    "longitude": 106.271881,
                },
                "title": "水天池景区"
            },
            {
                "coordinate":{
                    "latitude": 29.514042,
                    "longitude": 106.288033,
                },
                "title": "重庆射击射箭运动管理中心"
            },
            {
                "coordinate":{
                    "latitude": 29.504015,
                    "longitude": 106.22451,
                },
                "title": "璧山站"
            },
        ],
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
        console.log(this.form);
        this.form.validateFields(async (error, values) => {
            if(!error){
                console.log(values);
                console.log(values.time.format(format));
            //    task_id, member_id, text, time, location, photo_name
                const data = {};
                data.task_id = this.props.location.state.mission_id;
                data.member_id = this.props.user.member_id;
                data.text = values.text;
                data.time = values.time.format(format);
                data.location = values.location;
                this.setState(() => ({
                    confirmLoading: true,
                }))
                const response = await reqAddClue(data);
                console.log(response);
                if(response){
                    message.success("添加线索成功");
                }
                Modal.success({
                    content: "提交成功",
                    okText: "确定",
                })
                this.setState({
                    isShowClueAdd: false,
                    confirmLoading: false,
                })
            }
            console.log(error);
        })
    }

    addOrder = () => {
        console.log('addOrder');
        console.log(this.form);
        this.form.validateFields(async (error, values) => {
            if(!error){
                console.log(values);
                console.log(values.time.format(format));
                //    task_id, member_id, text, time, location, photo_name
                const data = {};
                data.task_id = this.props.location.state.mission_id;
                data.member_id = this.props.user.member_id;
                data.text = values.text;
                data.time = values.time.format(format);
                data.location = values.location;
                this.setState(() => ({
                    confirmLoading: true,
                }))
                const response = await reqAddInstruction(data);
                console.log(response);
                if(response){
                    message.success("添加指令成功");
                }
                Modal.success({
                    content: "提交成功",
                    okText: "确定",
                })
                this.setState({
                    isShowOrderAdd: false,
                    confirmLoading: false,
                })
            }
            console.log(error);
        })
    }

    pauseTaskConfirm = () => {
        Modal.confirm({
            title: '是否暂缓任务',
            icon: <ExclamationCircleOutlined />,
            content: '您是否确定暂缓该任务？暂缓任务后只能在任务管理中修改任务状态。',
            okText: '确认',
            cancelText: '取消',
            onOk: () => {
                return new Promise((resolve, reject) => {
                    setTimeout(() => {
                        Modal.success({
                            content: "提交成功",
                            okText: "确定",
                        });
                        this.pauseTask();
                        resolve("success");
                    }, 1000)
                })
            }
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
        let reason = "", timestamp = "";
        console.log(postpone_data);
        for (let x in postponeItems){
            if(postponeItems[x].task_id === task_id){
                reason = postponeItems[x].reason;
                timestamp = postponeItems[x].timestamp;
            }
        }
        return [reason, timestamp];
    }

    searchCompleteData = (task_id) => {
        const completeItems = complete_data.items;
        console.log(complete_data);
        console.log(task_id);
        let certificate_photo = "", timestamp = "";
        for (let x in completeItems) {
            if (completeItems[x].task_id === task_id) {
                // console.log(completeItems[x]);
                certificate_photo = completeItems[x].certificate_photo;
                timestamp = completeItems[x].timestamp;
                console.log(timestamp);
            }
        }
        return [certificate_photo, timestamp];
    }

    exportIncident2csv = async (data) => {
        this.setState({
            isIncidentExporting: true,
        })
        const result = await new Promise(async (resolve, reject) => {
            const worksheet = XLSX.utils.json_to_sheet([data]);
            const result = await openDownloadDialog(sheet2blob(worksheet), `incident_${data.lostinfo.lost_name}.csv`);
            console.log(result);
            resolve("success");
        });
        this.setState({
            isIncidentExporting: false,
        });
        Modal.success({
            content: "导出成功",
            okText: "确认",
        });
    }

     exportClue2csv = async (data) => {
         this.setState({
             isClueExporting: true,
         })
         const result = await new Promise(async (resolve, reject) => {
             const worksheet = XLSX.utils.json_to_sheet(data);
             const result = await openDownloadDialog(sheet2blob(worksheet), `clue_${data.clue_id}.csv`);
             console.log(result);
             resolve("success");
         })
         this.setState({
             isClueExporting: false,
         });
         Modal.success({
             content: "导出成功",
             okText: "确认",
         });
    }

     exportResult2csv = (data) => {
        this.setState({
            isResultExporting: true,
        })
        const result = new Promise((resolve, reject) => {
            const worksheet = XLSX.utils.json_to_sheet([data]);
            openDownloadDialog(sheet2blob(worksheet), `result_${data.pause_id ? data.pause_id : data.finish_id}.csv`);
            resolve("success");
        }).then(() => {
            this.setState({
                isResultExporting: false,
            });
            Modal.success({
                content: "导出成功",
                okText: "确认",
            });
        })
    }

     exportAll2csv = (incident, clues, result) => {
        this.setState({
            isExporting: true,
        })
        const res = new Promise((resolve, reject) => {
            this.exportIncident2csv(incident);
            this.exportClue2csv(clues);
            this.exportResult2csv(result);
            resolve("success");
        }).then(() => {
            this.setState({
                isExporting: false,
            });
            Modal.success({
                content: "导出成功",
                okText: "确认",
            });
        })
    }

    mockPaths = async () => {
        let locations = ['重庆西站', '重庆北站', '西南大学', '枫香湖儿童公园', '恒大酒店'];
        for(let i = 0; i < locations.length; i++){
            let results = await ajax(`https://restapi.amap.com/v3/place/text?keywords=${locations[i]}&city=chongqing&offset=20&page=1&key=${GDKEY}&extensions=all&output=JSON`);
            await this.drawPath(results.pois[0].location, "member");
        }

    }

    drawPath = async (coordinate, type) => {
        console.log(coordinate);
        const url = `https://restapi.amap.com/v3/direction/walking?origin=${this.state.center.longitude},${this.state.center.latitude}&destination=${coordinate}&output=JSON&key=${GDKEY}`;
        const res = await ajax(url);
        console.log(res);
        const response = res;
        const data = response.data ? response.data.data : response;
        const steps = data.route.paths[0].steps;
        const polylines = [];
        steps.map((item, index) => {
            let polyline = item.polyline.split(";");
            polylines.push(...polyline);
        });
        const _polylines = [];
        polylines.map((item) => {
            let polyline = item.split(",");
            _polylines.push({
                "latitude": parseFloat(polyline[1]),
                "longitude": parseFloat(polyline[0]),
            })
        })
        if(type === "member"){
            this.setState(()=>({
                "polylines": [...this.state.polylines, _polylines],
            }))
        }
        else if(type === "marker"){
            // console.log(_polylines)
            this.setState(()=>({
                "marker_polylines": _polylines,
            }))
        }

    }

    markerOnPress = async (coordinate) => {
        const param = `${coordinate.longitude},${coordinate.latitude}`;
        this.drawPath(param, "marker");
    }

    componentDidMount() {
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition((location)=>{
                this.setState(() => ({
                    center: {
                        "longitude": location.coords.longitude,
                        "latitude": location.coords.latitude,
                    }
                }), () => {
                    this.mockPaths();
                })
            })
        }

        const task_id = this.props.location.state.mission_id;
        this.getMemberList(task_id);
    }

    getMemberList = async (task_id) => {
        this.setState(() => ({
            member_loading: true,
        }))

        const response = await reqMemberByTaskId(task_id);
        if(response.status ===  0){
            this.setState(() => ({
                members: response.result,
            }))
        }
        this.setState(() => ({
            member_loading: false,
        }))
    }

    render() {
        const {data, mission_id, status} = this.props.location.state;
        const incident = data.lostinfo;
        const {
            isIncidentExporting,
            isClueExporting,
            isResultExporting,
            isExporting,
            isShowClueAdd,
            isShowOrderAdd,
            isShowPauseTask,
            member_loading,
            members,
        } = this.state;
        const {history} = this.props;
        let reason, timestamp, certificate_photo;
        if(status === 2){
            [reason, timestamp] = this.searchPostponeData(mission_id);
        }
        else if(status === 3){
            [certificate_photo, timestamp] = this.searchCompleteData(mission_id);
        }

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
                <Button style={{marginRight: "16px"}} type={"primary"} onClick={() => this.exportIncident2csv(data)} loading={isIncidentExporting}>导出详情信息</Button>
                <Button style={{marginRight: "16px"}} type={"primary"} onClick={() => this.exportClue2csv(clue_data.items)} loading={isClueExporting}>导出线索列表</Button>
                {status > 2 ? <Button style={{marginRight: "16px"}} type={"primary"} onClick={() => this.exportResult2csv(postpone_data.items)} loading={isResultExporting}>导出行动结果</Button> : null}
                <Button style={{marginRight: "16px"}} type={"primary"} onClick={() => this.exportAll2csv(data, clue_data.items, postpone_data.items)} loading={isExporting}>一键导出</Button>
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
                            loading={member_loading}
                            dataSource={members}
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
                        <Layout style={{backgroundColor: "#fff", flexDirection: "row"}}>
                            <Layout className="left-container-content" style={{backgroundColor: '#fff'}}>
                                <Header className="descriptions-container">
                                    <div>
                                        <span>姓名：{incident.lost_name}</span>
                                        <span>性别：{incident.lost_gender ? "男" : "女"}</span>
                                        <span>年龄：{incident.lost_age}</span>
                                        <span>走失地点：{incident.lost_place}</span>
                                    </div>
                                    <Button type="primary" onClick={() => history.push('/incident/addUpdate', {incident})}>
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
                                                    <p>暂缓审批时间：{formateDate(timestamp)}</p>
                                                </div>) : (<div>
                                                    <p>完成审批时间：{formateDate(timestamp)}</p>
                                                </div>)
                                                }

                                            </Card>
                                        </div>
                                    ): <GdMap>
                                        {
                                            this.state.polylines ?
                                            this.state.polylines.map((item, index) => {
                                                return <Polyline
                                                    path={item}
                                                    style={{
                                                        strokeColor: "#8e44ad",
                                                    }}
                                                    key={index}
                                                />
                                            })
                                            : null}
                                        {
                                            this.state.clue_markers ?
                                            this.state.clue_markers.map((item, index) => {
                                                return <Marker
                                                    position={item.coordinate}
                                                    title={item.title}
                                                    key={index}
                                                    clickable
                                                    events={{
                                                        "click": () => this.markerOnPress(item.coordinate),
                                                    }}
                                                />
                                            }) : null
                                        }
                                        {
                                            this.state.marker_polylines && this.state.marker_polylines.length ? (
                                                <Polyline
                                                    style={{
                                                        strokeColor: '#121212',
                                                        strokeWidth: 3,
                                                    }}
                                                    path={this.state.marker_polylines}/>
                                            ) : null
                                        }
                                    </GdMap>}
                                </Content>
                            </Layout>
                            {/* 线索和指令区 */}
                            <Content className="left-container-sider">
                                <Layout>
                                    <Content className="clue-container">
                                        <Clue mission_id={mission_id} addNewItem={this.showClueAdd}  clueUpdate={this.state.confirmLoading}/>
                                    </Content>
                                    <Divider />
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
                    confirmLoading={this.state.confirmLoading}
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
                    okText={"确认"}
                    cancelText={"取消"}
                    onOk={this.addOrder}
                    confirmLoading={this.state.confirmLoading}
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
                    okText={"确认"}
                    cancelText={"取消"}
                    onOk={this.pauseTaskConfirm}
                    onCancel={() => {
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

const mapStateToProps = (state) => ({
    user: state.user,
});

export default connect(mapStateToProps)(Home);
