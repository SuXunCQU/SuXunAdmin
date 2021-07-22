import React, {Component} from 'react'
import {Button, Card, Form, Icon, message, Modal, Table} from 'antd'
import LinkButton from "../../components/link-button/index"
import {reqDeleteMember, reqMember, reqMembers, reqRoles} from "../../api/index";
import SearchBar from "../../components/search-bar";
import {PAGE_SIZE} from "../../utils/constants";
import getColumnSearchProps from "../../utils/getColumnSearchProps";
import {role_data} from "../../utils/mockUtils.new";
import {getRoles} from "../../redux/actions";
import {connect} from "react-redux";

/**
 * 用户路由
 */
class UserHome extends Component {

    state = {
        // roles: [
        //     "管理员",
        //     "普通队员",
        //     "临时管理员",
        // ], // 所有角色列表
        roles: [], // 所有角色列表
        isShow: false, // 是否显示确认框
        loading: true,
        // searchType: "name",
        // 默认搜索字段
        searchTypes: [
            {
                value: 'name',
                title: '按姓名搜索',
            },
            {
                value: 'homeLocationName',
                title: '按家庭住址搜索',
            },
            {
                value: 'role',
                title: '按角色搜索',
            },
            {
                value: 'phoneNumber',
                title: '按联系电话搜索',
            },
            {
                value: 'status',
                title: '按是否出勤搜索',
            },
        ],
    }

    /**
     * 初始化Table的列元素
     */
    initColumns = () => {
        this.columns = [
            {
                title: '编号',
                dataIndex: 'member_id',
                sorter: (a, b) => {
                    return a.member_id - b.member_id;
                },
                ...getColumnSearchProps.call(this,'member_id', "编号"),
            },
            {
                title: '姓名',
                dataIndex: 'member_name',
                ...getColumnSearchProps.call(this,'member_name', "姓名"),
            },
            {
                title: '性别',
                dataIndex: 'member_gender',
                ...getColumnSearchProps.call(this,'member_gender', "性别"),
                render: (gender) => gender === 1 ? '男' : '女',
                onFilter: (value, record) => {
                    const member_gender = record["member_gender"] ? '男' : '女';
                    return record["member_gender"] !== undefined ? member_gender === value : ""
                }
            },

            {
                title: '年龄',
                dataIndex: 'member_age',
                ...getColumnSearchProps.call(this,'member_age', "年龄"),
            },
            {
                title: '联系电话',
                dataIndex: 'member_phone',
                ...getColumnSearchProps.call(this,'member_phone', "联系电话"),
            },
            {
                title: '家庭住址',
                dataIndex: 'member_address',
                ...getColumnSearchProps.call(this,'member_address', "家庭住址"),
            },
            {
                title: '所属角色',
                dataIndex: 'role_id',
                ...getColumnSearchProps.call(this,'role_id', "所属角色"),
                render: (role_id) => this.props.roleNames[role_id], // 避免重复遍历角色列表（一次性找到所有队员角色）
                onFilter: (value, record) => {
                    console.log("roleNames",this.props.roleNames);
                    const role_name =  this.props.roleNames[record["role_id"]];
                    return record["role_id"] !== undefined ? role_name === value : ""
                }
            },
            {
                title: '是否出勤',
                dataIndex: 'is_work',
                ...getColumnSearchProps.call(this,'is_work', "是否出勤"),
                render: (is_work) => is_work ? '正在出勤' : '未出勤',
                onFilter: (value, record) => {
                    const is_work = record["is_work"] ? '正在出勤' : '未出勤';
                    return record["is_work"] !== undefined ? is_work === value : ""
                }
            },
            {
                title: '操作',
                render: (user) => (
                    <span>
                        <LinkButton
                            onClick={() => this.props.history.push('/user/addUpdate', {user, isUpdate: true})}>详情</LinkButton>
                        <LinkButton onClick={() => this.deleteUser(user)}>删除</LinkButton>
                    </span>
                )
            },
        ]
    }


    /**
     * 删除指定用户
     */
    deleteUser = (user) => {
        Modal.confirm({
            title: `确认删除${user.member_name}吗?`,
            onOk: async () => {
                const result = await reqDeleteMember(user.member_id);
                console.log("delete use",result);
                if (result.status === 0) {
                    message.success('删除用户成功!')
                    this.getUsers();
                }else{
                    message.success('删除用户失败!')
                }
            }
        })
    }

    getUsers = async () => {
            this.setState({loading: true}) // 显示loading
            let result = {};
            result = await reqMembers();
            if (result) {
                this.setState({
                    users: result,
                    loading:false,
                })
            }
    }

    async componentDidMount() {
        await this.props.getRoles();
        this.initColumns();
        this.getUsers();
    }


    render() {

        const {users, loading} = this.state
        const user = this.user || {}

        // const title = (
        //     // <SearchBar searchTypes={searchTypes} getData={this.getMembers}/>
        // )

        const extra =
            <Button type='primary' onClick={() => this.props.history.push('/user/addUpdate')}>
                <Icon type='plus'/>
                添加队员
            </Button>

        return (
            <Card title={"队员信息表"} extra={extra}>
                <Table
                    bordered
                    rowKey='id'
                    dataSource={users}
                    loading={loading}
                    columns={this.columns}
                    pagination={{defaultPageSize: PAGE_SIZE}}
                />
            </Card>
        )
    }
}

const mapStateToProps = (state) => ({
    user: state.user,
    roles:state.role.roles,
    roleNames:state.role.roleNames,
});

const mapDispatchToProps = {
    getRoles,
}

export default connect(mapStateToProps, mapDispatchToProps)(UserHome)
