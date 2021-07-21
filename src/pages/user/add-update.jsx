import React, {PureComponent} from 'react'
import {Button, Card, Col, Form, Icon, Input, message, Modal, Radio, Row, Select} from 'antd'

import Index from '../../components/pictures-wall'
import LinkButton from '../../components/link-button'

import moment from "moment";
import 'moment/locale/zh-cn';
import {format} from "../../utils/dateUtils";
import {validateAge} from "../../utils/validateUtils";
import {reqAddIncident, reqAddMember, reqRoles, reqUpdateIncident, reqUpdateMember} from "../../api";
import {connect} from "react-redux";
import {getRoles, logout} from "../../redux/actions";
import PictureWall from "../../components/pictures-wall";
// import './add-update.less';

moment.locale('zh-cn');

const {Item} = Form;
const Option = Select.Option;

function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}

/**
 * User的添加和更新的子路由组件
 */
class UserAddUpdate extends PureComponent {

    state = {
        isShowSubmit:false,
        uploading: false,
    }

    constructor(props) {
        super(props)

        // 创建用来保存ref标识的标签对象的容器
        this.pictureWallRef = React.createRef()
        this.IDPictureWallRef = React.createRef()
    }

    async componentDidMount() {
        // 取出携带的state
        // 保存是否是更新的标识
        const isUpdate = this.props.location.state && this.props.location.state.isUpdate;
        this.setState(() => ({
            isUpdate : isUpdate
        }))


        // 如果是更新，保存事件、默认日期与时间
        if (isUpdate) {
            const data  = this.props.location.state.user || {};
            this.setState(() => ({
                data: data,
            }))
        }

        await this.props.getRoles();
    }

    /**
     * 设置证件照照片
     */
    setMemberPhoto = (memberPhotoNames) => {
        console.log(memberPhotoNames);
        this.setState((prevState) => ({
            user: {...prevState.data, member_photo: memberPhotoNames},
        }), function() {
            console.log(this.state.data);
            this.props.form.setFieldsValue({"member_photo": memberPhotoNames});
        })
    }

    /**
     * 设置身份证照片
     */
    setMemberIdcardPhoto = (memberIdcardPhotoNames) => {
        console.log(memberIdcardPhotoNames);
        this.setState((prevState) => ({
            user: {...prevState.data, member_idcard_photo: memberIdcardPhotoNames},
        }), function() {
            console.log(this.state.data);
            this.props.form.setFieldsValue({"member_idcard_photo": memberIdcardPhotoNames});
        })
    }

    /**
     * 新增/修改队员信息
     */
    addUpdateUser = () =>{
        return new Promise(async (resolve, reject) => {
            const {isUpdate, data} = this.state;

            const user = data;
            let result;

            console.log("new user",user);

            // 如果是更新, 需要添加id
            if (isUpdate) {
                user.member_id = data.member_id;
                // 2. 调用接口请求函数去添加/更新
                result = await reqUpdateMember(user);
            } else {
                result = await reqAddMember(user);
            }

            // 3. 根据结果提示
            if (result) {
                message.success(`${isUpdate ? '更新' : '添加'}队员信息成功!`)
                this.props.history.goBack()
            } else {
                message.error(`${isUpdate ? '更新' : '添加'}队员信息失败!`)
            }
            this.setState({
                isShowSubmit:false,
            })
            resolve("success");
        })
    }

    /**
     * 确认框
     */
    confirm() {
        Modal.confirm({
            title: "请确认是否要提交信息？",
            okText: '确认',
            cancelText: '取消',
            onOk:this.addUpdateUser,
        });
    }


    /**
     * 表单提交
     */
    submit = () => {
        // 先上传图片
        this.pictureWallRef.handleUpload();
        console.log(this.pictureWallRef);
        this.IDPictureWallRef.handleUpload();
        console.log(this.IDPictureWallRef);
        this.props.form.validateFields(async (error, values) => {
            console.log(error);
            if (!error) {
                this.confirm();
                this.setState({
                    data:{...this.state.data,...values}
                })
            }
            else{
                message.error('请输入所有必要信息！');
            }
        })
    }

    render() {

        const {isUpdate, data, isShowSubmit} = this.state;
        console.log("isUpdate user",isUpdate);

        console.log("user",data);

        const {roleNames} = this.props;
        console.log("roleNames",roleNames);

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

        const {getFieldDecorator,getFieldsError } = this.props.form

        return (
            <Card title={title}>
                <Form
                    {...formItemLayout}
                >
                    <Row gutter={[16, 16]}>
                        <Col span={12}>
                            <Item label='姓名'>

                                {
                                    getFieldDecorator('member_name', {
                                        initialValue: data ? data.member_name: null,
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
                                    getFieldDecorator('member_phone', {
                                        initialValue: data ? data.member_phone : null,
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
                                    getFieldDecorator('member_gender', {
                                        initialValue: data ? data.member_gender : null,
                                        rules: [
                                            {required: true, message: '必须输入队员性别'}
                                        ]
                                    })(<Radio.Group
                                        // defaultValue={data ? data.member_gender : null}
                                        onChange={(e) => {
                                            this.setState({
                                                data: {
                                                    ...data,
                                                    member_gender : e.target.value,
                                                }
                                            })

                                        }} name='member_gender'>
                                        <Radio value={1}>男</Radio>
                                        <Radio value={0}>女</Radio>
                                    </Radio.Group>)
                                }
                            </Item>
                        </Col>
                        <Col span={12}>
                            <Item label='队员微信'>

                                {
                                    getFieldDecorator('member_wechat', {
                                        initialValue: data ? data.member_wechat : null,
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
                                    getFieldDecorator('member_age', {
                                        initialValue: data ? data.member_age : null,
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
                                    getFieldDecorator('member_idcard_number', {
                                        initialValue: data ? data.member_idcard_number : null,
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
                                    getFieldDecorator('member_address', {
                                        initialValue: data ? data.member_address : null,
                                        rules: [
                                            {required: true, message: '必须输入队员家庭住址'},
                                        ]
                                    })(<Input placeholder='请输入队员家庭住址'/>)
                                }
                            </Item>
                        </Col>
                        <Col span={12}>
                            <Item label='角色'>
                                {
                                    getFieldDecorator('role_id', {
                                        initialValue: data ? (roleNames?roleNames[data.role_id]:null) : null,
                                        rules: [
                                            {required: true, message: '必须输入队员角色'}
                                        ]
                                    })(
                                        <Select>
                                            {
                                                roleNames? Object.keys(roleNames).map(role_id => <Option key={role_id} value={role_id}>{roleNames[role_id]}</Option>):<Option value={'undefined'}>未知</Option>
                                            }
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
                                    getFieldDecorator('member_strength', {
                                        initialValue: "",
                                    })(<Input placeholder='请输入队员特长'/>)
                                }
                            </Item>
                        </Col>
                        <Col span={12}>
                            <Item label='是否出勤'>
                                {
                                    getFieldDecorator('is_work', {
                                        initialValue: 0,
                                    })(<Input
                                        className='status'
                                        value={data && data.is_work === 1 ? '正在出勤' : '未出勤'}
                                        disabled='false'
                                    />)
                                }
                            </Item>
                        </Col>
                    </Row>
                    <Row gutter={[16, 16]}>
                        <Col span={12}>
                            <Item label='队员救援装备'>
                                {
                                    getFieldDecorator('member_equipment', {
                                        initialValue: data ? data.member_equipment : null,
                                    })(<Input placeholder='请输入队员救援装备'/>)
                                }
                            </Item>
                        </Col>
                        <Col span={12}>
                            <Item label='常用交通方式'>
                                {
                                    getFieldDecorator('member_transportType', {
                                        initialValue: data ? data.member_transportType : null,
                                        rules: [
                                            {required: true, message: "必须输出常用交通方式"}
                                        ]
                                    })(<Input placeholder='请输入队员常用交通方式'/>)
                                }
                            </Item>
                        </Col>
                    </Row>
                    <Row gutter={[16, 16]}>
                        <Col span={12}>
                            <Item label="证件照">
                                {
                                    getFieldDecorator('member_photo', {
                                        initialValue: data ? data.member_photo : null,
                                        rules: [
                                            {required: true, message: '必须上传队员照片'},
                                        ]
                                    })(<PictureWall
                                        ref={(node) => this.pictureWallRef = node}
                                        imgs={data ? data.member_photo : null}
                                        setLostPhoto={this.setMemberPhoto}
                                    />)
                                }
                            </Item>
                        </Col>
                        <Col span={12}>
                            <Item label='身份证照片'>

                                {
                                    getFieldDecorator('member_idcard_photo', {
                                        initialValue: isUpdate ? data.member_idcard_photo : null,
                                        rules: [
                                            {required: true, message: '必须上传队员身份证件照片'},
                                        ]
                                    })(<PictureWall
                                        ref={(node) => this.IDPictureWallRef = node}
                                        imgs={data ? data.member_idcard_photo : null}
                                        setLostPhoto={this.setMemberIdcardPhoto}
                                    />)
                                }
                            </Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={8} offset={10}>
                            <Item>
                                <Button
                                    type='primary'
                                    onClick={this.submit}
                                    loading={this.state.uploading}
                                    disabled={hasErrors(getFieldsError())}
                                >提交</Button>
                            </Item>
                        </Col>
                    </Row>
                </Form>
            </Card>
        )
    }
}

const mapStateToProps = (state) => ({
    user: state.user,
    roleNames:state.role.roleNames,
});

const mapDispatchToProps = {
    getRoles,
}

export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(UserAddUpdate))