import React, {PureComponent} from 'react'
import {Button, Card, Col, DatePicker, Form, Icon, Input, message, Modal, Radio, Row} from 'antd'
import TextArea from "antd/es/input/TextArea";
import XLSX from 'xlsx';
import Index from '../../components/pictures-wall'
import LinkButton from '../../components/link-button'
import {reqAddIncident, reqAddOrUpdateIncident} from '../../api'
import Locale from 'antd/es/date-picker/locale/zh_CN';


import moment from "moment";
import 'moment/locale/zh-cn';
import {format, formatTime} from "../../utils/dateUtils";
import {validateAge, validateIDNumber} from "../../utils/validateUtils";
import {openDownloadDialog, sheet2blob} from "../../utils/xlsxUtil";

moment.locale('zh-cn');

const {Item} = Form

/*
Incident的添加和更新的子路由组件
 */
class IncidentAddUpdate extends PureComponent {

    state = {
        isExporting: false,
    }

    constructor(props) {
        super(props)

        // 创建用来保存ref标识的标签对象的容器
        this.pictureWall = React.createRef()
    }

    componentWillMount() {
        // 取出携带的state
        // 保存是否是更新的标识
        this.isUpdate = !!this.props.location.state;

        // 如果是更新，保存事件、默认日期与时间
        if (this.isUpdate) {
            const incident = this.props.location.state.incident || {};
            this.incident = incident;
        } else {
            this.incident = {};
            // 初始化时间选择框
            this.incident.lostTime = moment(moment().format(format), format);
        }
    }

    /**
     * 表单提交
     */
    submit = () => {
        // 进行表单验证, 如果通过了, 才发送请求
        this.props.form.validateFields(async (error, values) => {
            console.log(values)
            if (!error) {

                // 1. 收集数据, 并封装成incident对象
                // const {
                //     theLostName,
                //     theLostGender,
                //     theLostAge,
                //     theLostIDNumber,
                //     lostTime,
                //     lostArea,
                //     theLostFeatures,
                //     reporterName,
                //     reporterGender,
                //     reporterIDNumber,
                //     reporterIDPictures,
                //     relationship,
                //     reporterLocation,
                //     reporterPhoneNumber,
                //     reporterWeChat
                // } = values
                const theLostPictures = this.pictureWall.current.getImgs() || [];

                // // 格式化走失时间为字符串
                values.lost_time = values['lost_time'].format(format);

                const incident = {...values, theLostPictures};

                // 如果是更新, 需要添加id
                if (this.isUpdate) {
                    incident.id = this.incident.id
                }

                // TO DO
                // 2. 调用接口请求函数去添加/更新
                const result = await reqAddIncident(incident)
                // 3. 根据结果提示
                if (result) {
                    message.success(`${this.isUpdate ? '更新' : '添加'}事件成功!`)
                    this.props.history.goBack()
                } else {
                    message.error(`${this.isUpdate ? '更新' : '添加'}事件失败!`)
                }
            }
        })
    }

    exportIncident2csv = (data) => {
        this.setState({
            isExporting: true,
        })
        const result = new Promise((resolve, reject) => {
            const worksheet = XLSX.utils.json_to_sheet([data]);
            openDownloadDialog(sheet2blob(worksheet), `incident_${data.lost_name}.csv`);
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

    render() {
        const {isUpdate} = this
        const incident = this.incident;
        const {theLostPictures, reporterIDPictures} = incident;
        let data = {};
        if(isUpdate)
            data = this.props.location.state.incident;
        // 指定Item布局的配置对象
        const formItemLayout = {
            labelCol: {
                xs: {span: 12},
                sm: {span: 6},
            },  // 左侧label的宽度
            wrapperCol: {
                xs: {span: 16},
                sm: {span: 10},
            }, // 右侧包裹的宽度
        }

        // 头部左侧标题
        const title = (
            <span>
                <LinkButton onClick={() => this.props.history.goBack()}>
                    <Icon type='arrow-left' style={{fontSize: 20}}/>
                </LinkButton>
                <span>{isUpdate ? '修改事件' : '添加事件'}</span>
            </span>
        )

        const extra = (
            <span>
                <Button
                    style={{marginRight: "16px"}}
                    type={"primary"}
                    onClick={() => this.exportIncident2csv(data)}
                    loading={this.state.isExporting}
                >
                    一键导出
                </Button>
            </span>
        )

        const {getFieldDecorator} = this.props.form

        return (
            <Card title={title} extra={isUpdate ? extra : null}>
                <Form
                    {...formItemLayout}
                >
                    <Row gutter={[16, 16]}>
                        <Col span={12}>
                            <Item label='走失者姓名'>

                                {
                                    getFieldDecorator('lost_name', {
                                        initialValue: data ? data.lost_name : incident.theLostName,
                                        rules: [
                                            {required: true, message: '必须输入走失者姓名'}
                                        ]
                                    })(<Input placeholder='请输入走失者姓名'/>)
                                }
                            </Item>
                        </Col>
                        <Col span={12}>
                            <Item label='报失者姓名'>
                                {
                                    getFieldDecorator('reporter_name', {
                                        initialValue: data ? data.reporter_name : incident.reporterName,
                                        rules: [
                                            {required: true, message: '必须输入报失者姓名'}
                                        ]
                                    })(<Input placeholder='请输入报失者姓名'/>)
                                }
                            </Item>
                        </Col>
                    </Row>
                    <Row gutter={[16, 16]}>
                        <Col span={12}>
                            <Item label="走失者性别">
                                {
                                    getFieldDecorator('lost_gender', {
                                        initialValue: data ? data.lost_gender: incident.theLostGender,
                                        rules: [
                                            {required: true, message: '必须输入走失者性别'}
                                        ]
                                    })(<Radio.Group
                                        onChange={(e)=>{this.incident['theLostGender']=e.target.value}}
                                        name='theLostGender'>
                                        <Radio value={1}>男</Radio>
                                        <Radio value={0}>女</Radio>
                                    </Radio.Group>)
                                }
                            </Item>
                        </Col>
                        <Col span={12}>
                            <Item label="报失者性别">
                                {
                                    getFieldDecorator('reporter_gender', {
                                        initialValue: data ? data.reporter_gender : incident.reporterGender,
                                        rules: [
                                            {required: true, message: '必须输入报失者性别'}
                                        ]
                                    })(<Radio.Group
                                        onChange={(e)=>{this.incident['reporterGender']=e.target.value}}
                                        name='reporterGender'>
                                        <Radio value={1}>男</Radio>
                                        <Radio value={0}>女</Radio>
                                    </Radio.Group>)
                                }
                            </Item>
                        </Col>
                    </Row>
                    <Row gutter={[16, 16]}>
                        <Col span={12}>
                            <Item label="走失者年龄">

                                {
                                    getFieldDecorator('lost_age', {
                                        initialValue: data ? data.lost_age : incident.theLostAge,
                                        rules: [
                                            {required: true, message: '必须输入走失者年龄'},
                                            {validator: validateAge}
                                        ]
                                    })(<Input type='number' placeholder='请输入走失者年龄'/>)
                                }
                            </Item>
                        </Col>
                        <Col span={12}>
                            <Item label='报失者联系电话'>

                                {
                                    getFieldDecorator('reporter_phone', {
                                        initialValue: data ? data.reporter_phone : incident.reporterPhoneNumber,
                                        rules: [
                                            {required: true, message: '必须输入报失者联系电话'}
                                        ]
                                    })(<Input placeholder='请输入报失者联系电话'/>)
                                }
                            </Item>
                        </Col>
                    </Row>
                    <Row gutter={[16, 16]}>
                        <Col span={12}>
                            <Item label="走失时间">
                                {
                                    getFieldDecorator('lost_time', {
                                        // 在DatePicker中使用getFieldDecorator需要设置initialValue，而不能用defaulValue
                                        initialValue: null,
                                        rules: [
                                            {required: true, message: '必须输入走失时间'},
                                        ]
                                    })(<DatePicker
                                        locale={Locale}
                                        placeholder="请输入走失时间"
                                        format={format}
                                        showTime={{format: formatTime}}
                                    />)
                                }
                            </Item>
                        </Col>
                        <Col span={12}>
                            <Item label='报失者家庭住址'>
                                {
                                    getFieldDecorator('reporter_address', {
                                        initialValue: data ? data.reporter_address : incident.reporterLocation,
                                    })(<Input placeholder='请输入报失者家庭住址'/>)
                                }
                            </Item>
                        </Col>
                    </Row>
                    <Row gutter={[16, 16]}>
                        <Col span={12}>
                            <Item label="走失地点">
                                {
                                    getFieldDecorator('lost_place', {
                                        initialValue: data ? data.lost_place : incident.lostLocation,
                                        rules: [
                                            {required: true, message: '必须输入走失地点'},
                                        ]
                                    })(<Input placeholder='请输入走失地点'/>)
                                }
                            </Item>
                        </Col>
                        <Col span={12}>
                            <Item label='报失者与走失者关系'>

                                {
                                    getFieldDecorator('relation', {
                                        initialValue: data ? data.relation : incident.relationship,
                                    })(<Input placeholder='请输入报失者与走失者关系'/>)
                                }
                            </Item>
                        </Col>
                    </Row>
                    <Row gutter={[16, 16]}>
                        <Col span={12}>
                            <Item label="走失者身份证号">

                                {
                                    getFieldDecorator('lost_idcard_number', {
                                        initialValue: data ? data.lost_idcard_number : incident.theLostIDNumber,
                                        rules: [
                                            {validator: validateIDNumber}
                                        ]
                                    })(<Input placeholder='请输入走失者身份证号'/>)
                                }
                            </Item>
                        </Col>
                        <Col span={12}>
                            <Item label='报失者微信'>
                                {
                                    getFieldDecorator('reporter_wechat', {
                                        initialValue: data ? data.reporter_wechat : incident.reporterWeChat,
                                    })(<Input placeholder='请输入报失者微信'/>)
                                }
                            </Item>
                        </Col>
                    </Row>
                    <Row gutter={[16, 16]}>
                        <Col span={12}>
                            <Item label="走失者照片">
                                {
                                    getFieldDecorator('lost_photo', {
                                        initialValue: incident.theLostPicture,
                                        // TO DO
                                        // rules: [
                                        //     {required: true, message: '必须上传走失者照片'},
                                        // ]
                                    })(<Index ref={this.pictureWall} imgs={theLostPictures}/>)
                                }
                            </Item>
                        </Col>
                        <Col span={12}>
                            <Item label="报失者身份证照片">
                                <Index ref={this.pictureWall} imgs={reporterIDPictures}/>
                            </Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12}>
                            <Item label="走失者特征">
                                {
                                    getFieldDecorator('lost_appearance', {
                                        initialValue: data ? data.lost_appearance : incident.theLostFeatures,
                                    })(<TextArea placeholder="请输入走失者体态外貌等特征" autoSize={{minRows: 2, maxRows: 6}}/>)
                                }

                            </Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={8} offset={10}>
                            <Item>
                                <Button type='primary' onClick={this.submit}>提交</Button>
                            </Item>
                        </Col>
                    </Row>
                </Form>
            </Card>
        )
    }
}

export default Form.create()(IncidentAddUpdate)


/*
1. 子组件调用父组件的方法: 将父组件的方法以函数属性的形式传递给子组件, 子组件就可以调用
2. 父组件调用子组件的方法: 在父组件中通过ref得到子组件标签对象(也就是组件对象), 调用其方法
 */

/*
使用ref
1. 创建ref容器: thi.pictureWall = React.createRef()
2. 将ref容器交给需要获取的标签元素: <PictureWall ref={this.pictureWall} />
3. 通过ref容器读取标签元素: this.pictureWall.current
 */
