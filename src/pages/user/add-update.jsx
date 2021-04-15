import React, {PureComponent} from 'react'
import {Button, Card, Col, Form, Icon, Input, message, Radio, Row, Select} from 'antd'

import Index from '../../components/pictures-wall'
import LinkButton from '../../components/link-button'
import {reqAddOrUpdateUser} from '../../api'


import moment from "moment";
import 'moment/locale/zh-cn';
import {format} from "../../utils/dateUtils";
import {validateAge} from "../../utils/validateUtils";
// import './add-update.less';

moment.locale('zh-cn');

const {Item} = Form;
const Option = Select.Option;

/*
User的添加和更新的子路由组件
 */
class UserAddUpdate extends PureComponent {

    state = {}

    constructor(props) {
        super(props)

        // 创建用来保存ref标识的标签对象的容器
        this.pictureWall = React.createRef()
        this.IDPictureWall = React.createRef()
    }

    componentWillMount() {
        // 取出携带的state
        // 保存是否是更新的标识
        this.isUpdate = !!this.props.location.state;

        // 如果是更新，保存事件、默认日期与时间
        if (this.isUpdate) {
            const user = this.props.location.state.user || {};
            this.user = user;
        } else {
            this.user = {};
            // 初始化时间选择框
            this.user.lostTime = moment(moment().format(format), format);
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

                // 1. 收集数据, 并封装成user对象
                const picture = this.pictureWall.current.getImgs() || [];
                const IDPictures = this.IDPictureWall.current.getImgs() || [];

                const user = {...values, picture, IDPictures};

                // 如果是更新, 需要添加id
                if (this.isUpdate) {
                    user.id = this.user.id
                }

                // TO DO
                // 2. 调用接口请求函数去添加/更新
                const result = await reqAddOrUpdateUser(user)

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

        const {isUpdate, user} = this
        // TO DO
        const {roles} = this.props
        // const {theLostPictures, reporterIDPictures} = taskStats

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
                <span>{isUpdate ? '修改队员信息' : '添加队员'}</span>
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
                            <Item label='姓名'>

                                {
                                    getFieldDecorator('name', {
                                        initialValue: user.name,
                                        rules: [
                                            {required: true, message: '必须输入队员姓名'}
                                        ]
                                    })(<Input placeholder='请输入队员姓名'/>)
                                }
                            </Item>
                        </Col>
                        <Col span={12}>
                            <Item label="联系电话">
                                {
                                    getFieldDecorator('phoneNumber', {
                                        initialValue: user.phoneNumber,
                                        rules: [
                                            {required: true, message: '必须输入队员联系电话'},
                                        ]
                                    })(<Input placeholder='请输入队员联系电话'/>)
                                }
                            </Item>
                        </Col>
                    </Row>
                    <Row gutter={[16, 16]}>
                        <Col span={12}>
                            <Item label="性别">
                                {
                                    getFieldDecorator('gender', {
                                        initialValue: user.gender,
                                        rules: [
                                            {required: true, message: '必须输入队员性别'}
                                        ]
                                    })(<Radio.Group
                                        onChange={(e) => {
                                            this.user['gender'] = e.target.value
                                        }} g
                                        name='gender'>
                                        <Radio value={1}>男</Radio>
                                        <Radio value={0}>女</Radio>
                                    </Radio.Group>)
                                }
                            </Item>
                        </Col>
                        <Col span={12}>
                            <Item label='队员微信'>

                                {
                                    getFieldDecorator('WeChat', {
                                        initialValue: user.WeChat,
                                        rules: [
                                            {required: true, message: '必须输入队员微信'}
                                        ]
                                    })(<Input placeholder='请输入队员微信'/>)
                                }
                            </Item>
                        </Col>
                    </Row>
                    <Row gutter={[16, 16]}>
                        <Col span={12}>
                            <Item label="年龄">
                                {
                                    getFieldDecorator('age', {
                                        initialValue: user.age,
                                        rules: [
                                            {required: true, message: '必须输入队员年龄'},
                                            {validator: validateAge}
                                        ]
                                    })(<Input type='number' placeholder='请输入队员年龄'/>)
                                }
                            </Item>
                        </Col>
                        <Col span={12}>
                            <Item label="身份证号">
                                {
                                    getFieldDecorator('IDNumber', {
                                        initialValue: user.IDNumber,
                                        rules: [
                                            {required: true, message: '必须输入队员身份证号'}
                                        ]
                                    })(<Input placeholder='请输入队员身份证号'/>)
                                }
                            </Item>
                        </Col>
                    </Row>
                    <Row gutter={[16, 16]}>
                        <Col span={12}>
                            <Item label='家庭住址'>
                                {
                                    getFieldDecorator('homeLocationName', {
                                        initialValue: user.homeLocationName,
                                        rules: [
                                            {required: true, message: '必须输入队员年龄'},
                                        ]
                                    })(<Input placeholder='请输入队员家庭住址'/>)
                                }
                            </Item>
                        </Col>
                        <Col span={12}>
                            <Item label='角色'>
                                {
                                    getFieldDecorator('roleId', {
                                        initialValue: user.roleId,  // TO DO
                                        rules: [
                                            {required: true, message: '必须输入队员角色'}
                                        ]
                                    })(
                                        <Select>
                                            {/*TO DO*/}
                                            {/*{*/}
                                            {/*    roles.map(role => <Option key={role.id} value={role.id}>{role.name}</Option>)*/}
                                            {/*}*/}
                                            <Option value={'normalUser'}>普通队员</Option>
                                            <Option value={'admin'}>管理员</Option>
                                        </Select>
                                    )
                                }
                            </Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12}>
                            <Item label='特长'>
                                {
                                    getFieldDecorator('specialty', {
                                        initialValue: user.specialty,
                                    })(<Input placeholder='请输入队员特长'/>)
                                }
                            </Item>
                        </Col>
                        <Col span={12}>
                            <Item label='是否出勤'>
                                <Input className='status' value={user.status == 1 ? '正在出勤' : '未出勤'} disabled/>
                            </Item>
                        </Col>
                    </Row>
                    <Row gutter={[16, 16]}>
                        <Col span={12}>
                            <Item label='队员救援装备'>
                                {
                                    getFieldDecorator('equipment', {
                                        initialValue: user.equipment,
                                    })(<Input placeholder='请输入队员救援装备'/>)
                                }
                            </Item>
                        </Col>
                        <Col span={12}>
                            <Item label='常用交通方式'>
                                {
                                    getFieldDecorator('transportType', {
                                        initialValue: user.transportType,
                                    })(<Input placeholder='请输入队员常用交通方式'/>)
                                }
                            </Item>
                        </Col>
                    </Row>
                    <Row gutter={[16, 16]}>
                        <Col span={12}>
                            <Item label="证件照">
                                {
                                    getFieldDecorator('picture', {
                                        initialValue: user.picture,
                                        rules: [
                                            {required: true, message: '必须上传队员照片'},
                                        ]
                                    })(<Index ref={this.pictureWall} imgs={user.picture}/>)
                                }
                            </Item>
                        </Col>
                        <Col span={12}>
                            <Item label='身份证照片'>

                                {
                                    getFieldDecorator('IDPictures', {
                                        initialValue: user.IDPictures,
                                        rules: [
                                            {required: true, message: '必须上传队员身份证件照片'},
                                        ]
                                    })(<Index ref={this.IDPictureWall} imgs={user.IDPictures}/>)
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

export default Form.create()(UserAddUpdate)
