import React, {PureComponent} from 'react'
import {Button, Card, Col, DatePicker, Form, Icon, Input, message, Radio, Row} from 'antd'
import TextArea from "antd/es/input/TextArea";

import Index from '../../../components/picture-wall'
import LinkButton from '../../../components/link-button'
import {reqAddOrUpdateIncident} from '../../../api'
import Locale from 'antd/es/date-picker/locale/zh_CN';


import moment from "moment";
import 'moment/locale/zh-cn';
import {format, formatTime} from "../../../utils/dateUtils";
import {validateAge, validateIDNumber} from "../../../utils/validateUtils";

moment.locale('zh-cn');

const {Item} = Form

/*
指令添加和更新的子路由组件
 */
class AddOrder extends PureComponent {

    state = {
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
                //     lostLocation,
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
                values.lostTime = values['lostTime'].format(format);

                const incident = {...values, theLostPictures};

                // 如果是更新, 需要添加id
                if (this.isUpdate) {
                    incident.id = this.incident.id
                }

                // TO DO
                // 2. 调用接口请求函数去添加/更新
                const result = await reqAddOrUpdateIncident(incident)

                // 3. 根据结果提示
                if (result.status === 0) {
                    message.success(`${this.isUpdate ? '更新' : '添加'}事件成功!`)
                    this.props.history.goBack()
                } else {
                    message.error(`${this.isUpdate ? '更新' : '添加'}事件失败!`)
                }
            }
        })
    }

    render() {

        const {isUpdate, incident} = this
        const {theLostPictures, reporterIDPictures} = incident

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
                <span>{isUpdate ? '修改事件' : '添加指令'}</span>
            </span>
        )

        const {getFieldDecorator} = this.props.form

        return (
            <Card title={title}>
                <Form
                    {...formItemLayout}
                >
                    <Row gutter={[16, 16]}>
                        <Col span={12}>
                            <Item label='指令文本'>
                                {
                                    getFieldDecorator('clue_text', {
                                        initialValue: incident.theLostName,
                                        rules: [
                                            {required: true, message: '必须输入线索文本'}
                                        ]
                                    })(<Input placeholder='请输入线索文本'/>)
                                }
                            </Item>
                        </Col>
                    </Row>
                    <Row gutter={[16, 16]}>
                        <Col span={12}>
                            <Item label="指令发布时间">
                                {
                                    getFieldDecorator('post_time', {
                                        // 在DatePicker中使用getFieldDecorator需要设置initialValue，而不能用defaulValue
                                        initialValue: moment(incident.lostTime, format),
                                        rules: [
                                            {required: true, message: '必须输入时间'},
                                        ]
                                    })(<DatePicker
                                        locale={Locale}
                                        placeholder="请输入时间"
                                        format={format}
                                        showTime={{format: formatTime}}
                                    />)
                                }
                            </Item>
                        </Col>
                    </Row>
                    <Row gutter={[16, 16]}>
                        <Col span={12}>
                            <Item label="指令发布地点">
                                {
                                    getFieldDecorator('post_location', {
                                        initialValue: incident.lostLocation,
                                        rules: [
                                            {required: true, message: '必须输入地点'},
                                        ]
                                    })(<Input placeholder='请输入地点'/>)
                                }
                            </Item>
                        </Col>
                    </Row>
                    <Row gutter={[16, 16]}>
                        <Col span={12}>
                            <Item label="指令照片">
                                {
                                    getFieldDecorator('clue_photo', {
                                        initialValue: incident.theLostPicture,
                                        // TO DO
                                        // rules: [
                                        //     {required: true, message: '必须上传走失者照片'},
                                        // ]
                                    })(<Index ref={this.pictureWall} imgs={theLostPictures}/>)
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

export default Form.create()(AddOrder)


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
