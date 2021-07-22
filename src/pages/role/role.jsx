import React, {Component} from 'react'
import {
    Card,
    Button,
    Table,
    Modal,
    message
} from 'antd'
import {connect} from 'react-redux'

import {PAGE_SIZE} from "../../utils/constants"
import {reqRoles, reqAddRole, reqUpdateRole, reqDeleteRole} from '../../api'
import AddForm from './add-form'
import AuthForm from './auth-form'
import {format, formateDate} from '../../utils/dateUtils'
import {getRoles, logout, receiveRoles} from '../../redux/actions'
import storageUtils from "../../utils/storageUtils";

import moment from "moment";
import 'moment/locale/zh-cn';
import Store from "../../redux/store";

moment.locale('zh-cn');

// const this.state = Store.getState();

/**
 * 角色路由
 */
class Role extends Component {

    state = {
        role: {}, // 选中的role
        isShowAdd: false, // 是否显示添加界面
        isShowAuth: false, // 是否显示设置权限界面
        isShowDelete: false,  // 是否显示删除界面
        loading:true,  // 是否显示loading
    }

    constructor(props) {
        super(props)

        this.auth = React.createRef()
    }

    initColumn = () => {
        this.columns = [
            {
                title: '角色名称',
                dataIndex: 'role_name'
            },
            {
                title: '创建时间',
                dataIndex: 'role_create_time',
                render: formateDate
            },
            {
                title: '授权时间',
                dataIndex: 'authorize_time',
                render: formateDate,
            },
            {
                title: '授权人',
                dataIndex: 'member_name'
            },
        ]
    }

    onRow = (role) => {
        return {
            onClick: event => { // 点击行
                console.log('row onClick()', role)
                // alert('点击行')
                this.setState({
                    role
                })
                // console.log("role",role);
                // console.log("state.role",this.state.role);
            },
        }
    }

    /**
     * 添加角色
     */
    addRole = () => {
        // 进行表单验证, 只能通过了才向下处理
        this.form.validateFields(async (error, values) => {
            if (!error) {

                // 隐藏确认框
                this.setState({
                    isShowAdd: false
                })

                // 收集输入数据
                const {roleName} = values
                this.form.resetFields()

                // 请求添加
                const data = {
                    'role_name':roleName,
                }
                const result = await reqAddRole(data);
                // 根据结果提示/更新列表显示
                console.log('addRoleResult',result);
                if (result) {
                    message.success('添加角色成功')
                    // 新产生的角色
                    const role = result

                    // 更新roles状态: 基于原本状态数据更新
                    this.props.receiveRoles({...this.props.roles,role})

                } else {
                    message.error('添加角色失败')
                }

            }
        })


    }

    /**
     * 更新角色
     */
    updateRole = async () => {

        // 隐藏确认框
        this.setState({
            isShowAuth: false
        })

        const role = this.state.role
        // 得到最新的menus
        const menus = this.auth.current.getMenus()

        role.role_authority = menus.toString();  // 数组转为','连接的字符串
        role.member_id =this.props.user.member_id;
        role.member_name =this.props.user.member_name;
        console.log(role);

        // 如果当前更新的是自己角色的权限, 提示错误信息
        console.log("user",this.props.user);
        if(role.role_id ==this.props.user.role_id){
            message.error("不能设置当前用户角色权限");
        }else{
            // 请求更新
            const result = await reqUpdateRole(role)
            console.log(result);
            if (result.status === 0) {
                message.success('设置角色权限成功');
                role.authorize_time = formateDate(Date.now());
                this.props.receiveRoles({...this.props.roles,role})
            }else{
                message.error('设置角色权限失败');
            }
        }
    }

    async componentDidMount() {
        await this.props.getRoles();
        console.log(this.props);
        this.initColumn();
        if(this.props.roles){
            this.setState({
                loading:false,
            })
        }
    }

    /**
     * 删除角色
     */
    deleteRole = async ()=>{
        // 隐藏确认框
        this.setState({
            isShowDelete: false
        })

        console.log(this);
        const role = this.state.role;

        // 如果删除的是自己角色, 提示错误信息
        console.log("user",this.props.user);
        if(role.role_id ==this.props.user.role_id){
            message.error("不能删除当前用户角色权限");
            return ;
        }

        const result = await reqDeleteRole(role.role_id);
        // 根据结果提示/更新列表显示
        if (result.status === 0 || result.details == "Not found.") {
            message.error('删除角色失败');
        } else {
            message.success('删除角色成功')
            // 更新roles状态: 基于原本状态数据更新
            let newRoles = this.props.roles;
            for( let i = 0; i < newRoles.length; i++){
                if ( newRoles[i].role_id === role.role_id) {
                    newRoles.splice(i, 1);
                    console.log("delete role_id:", role.role_id);
                }
            }
            this.props.receiveRoles(newRoles);
        }
    }

    render() {

        const {role, isShowAdd, isShowAuth, isShowDelete, loading} = this.state;

        const {roles} = this.props;
        console.log("render",this.props);
        console.log("roles",roles);

        const title = (
            <span>
              <Button type='primary' onClick={() => this.setState({isShowAdd: true})}>创建角色</Button> &nbsp;&nbsp;
                <Button type='primary' disabled={!role.role_id}
                              onClick={() => this.setState({isShowAuth: true})}>设置角色权限</Button>
            </span>
        )

        const extra = (
            <span>
                <Button type='primary' disabled={!role.role_id} onClick={() => this.setState({isShowDelete: true})}>删除角色</Button>
            </span>
        )

        return (
            <Card title={title} extra={extra}>
                <Table
                    bordered
                    rowKey='role_id'
                    dataSource={roles}
                    loading={loading}
                    columns={this.columns}
                    pagination={{defaultPageSize: PAGE_SIZE}}
                    rowSelection={{
                        type: 'radio',
                        selectedRowKeys: [role.role_id],
                        onSelect: (role) => { // 选择某个radio时回调
                            this.setState({
                                role
                            })
                        }

                    }}
                    onRow={this.onRow}
                />

                <Modal
                    title="添加角色"
                    visible={isShowAdd}
                    onOk={this.addRole}
                    onCancel={() => {
                        this.setState({isShowAdd: false})
                        this.form.resetFields()
                    }}
                >
                    <AddForm
                        setForm={(form) => this.form = form}
                    />
                </Modal>

                <Modal
                    title="设置角色权限"
                    visible={isShowAuth}
                    onOk={this.updateRole}
                    onCancel={() => {
                        this.setState({isShowAuth: false})
                    }}
                >
                    <AuthForm ref={this.auth} role={role}/>
                </Modal>

                <Modal
                    title="是否确认删除角色"
                    visible={isShowDelete}
                    onOk={this.deleteRole}
                    onCancel={() => {
                        this.setState({isShowDelete: false})
                    }}
                >
                <span>角色：{role.role_name}{role.member_name?"，授权人："+role.member_name:"，未授权"}</span>
                </Modal>
            </Card>
        )
    }
}

const mapStateToProps = (state) => ({
    user: state.user,
    roles:state.role.roles,
});

const mapDispatchToProps = (dispatch) => ({
    getRoles:()=>dispatch(getRoles()),  // 注意此处一定要写getRoles()
    receiveRoles: (roles) => dispatch(receiveRoles(roles))
})

export default connect(mapStateToProps, mapDispatchToProps)(Role)
