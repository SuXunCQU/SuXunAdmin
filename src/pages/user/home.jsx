import React, {Component} from 'react'
import {Button, Card, Icon, message, Table} from 'antd'
import LinkButton from "../../components/link-button/index"
import {reqMember} from "../../api/index";
import SearchBar from "../../components/search-bar";
import {PAGE_SIZE} from "../../utils/constants";
import getColumnSearchProps from "../../utils/getColumnSearchProps";

/*
用户路由
 */
export default class UserHome extends Component {

    state = {
        roles: [
            "管理员",
            "普通队员",
            "临时管理员",
        ], // 所有角色列表
        isShow: false, // 是否显示确认框
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
                // render: (roleId) => this.roleNames[roleId], // 避免重复遍历角色列表（一次性找到所有队员角色）
                ...getColumnSearchProps.call(this,'role_id', "所属角色"),
                render: (role_id) => this.state.roles[role_id - 1],
                onFilter: (value, record) => {
                    const role_id =  this.state.roles[record["role_id"] - 1];
                    return record["role_id"] !== undefined ? role_id === value : ""
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

    /*
    根据role的数组, 生成包含所有角色名的对象(属性名用角色id值)
     */
    initRoleNames = (roles) => {
        const roleNames = roles.reduce((pre, role) => {
            pre[role.id] = role.name
            return pre
        }, {})
        // 保存
        this.roleNames = roleNames
        console.log(roleNames)
    }


    /**
     * TO DO
     * 删除指定用户
     */
    deleteUser = (user) => {
        // Modal.confirm({
        //     title: `确认删除${user.username}吗?`,
        //     onOk: async () => {
        //         const result = await reqDeleteUser(user.id)
        //         if (result.status === 0) {
        //             message.success('删除用户成功!')
        //             this.getUsers()
        //         }
        //     }
        // })
        alert("确定删除队员吗？");
    }

    getMembers = (searchType, searchName) => {
        return async () => {
            // TODO
            // 加入搜索
            // this.pageNum = pageNum // 保存pageNum, 让其它方法可以看到
            this.setState({loading: true}) // 显示loading

            const {searchName, searchType} = this.state
            // 如果搜索关键字有值, 说明我们要做搜索分页
            let result = {};
            if (searchName) {
                // result = await reqSearchProducts({pageNum, pageSize: PAGE_SIZE, searchName, searchType})
            } else { // 一般分页请求
                result = await reqMember();
            }

            if (result) {
                this.setState({
                    users: result,
                })
            }
            this.searchType = searchType; // 保存searchType, 让其他方法可以看到
            this.searchName = searchName; // 保存searchName, 让其他方法可以看到
            console.log(searchType, searchName);
        }
    }

    componentDidMount() {
        this.initColumns();
        this.initRoleNames(this.state.roles);
        this.getMembers()();
    }


    render() {

        const {users, roles, isShow, searchTypes} = this.state
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
                    columns={this.columns}
                    pagination={{defaultPageSize: PAGE_SIZE}}
                />
            </Card>
        )
    }
}
