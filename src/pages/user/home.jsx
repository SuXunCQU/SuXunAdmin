import React, {Component} from 'react'
import {Button, Card, Icon, message, Table} from 'antd'
import LinkButton from "../../components/link-button/index"
import {reqAddOrUpdateUser} from "../../api/index";
import SearchBar from "../../components/search-bar";
import {PAGE_SIZE} from "../../utils/constants";

/*
用户路由
 */
export default class UserHome extends Component {

    state = {
        users: [
            {
                id: 1,
                name: "张三",
                gender: 0,
                age: 24,
                phoneNumber: 13548657878,
                homeLocationName: "重庆市沙坪坝区大学城南路55号",
                roleId: 1,
                status: 1,
                WeChat: 'adasada',
                IDNumber: '435456646746565',
            },
            {
                id: 2,
                name: "李四",
                gender: 0,
                age: 25,
                phoneNumber: 13548657870,
                homeLocationName: "重庆市沙坪坝区大学城南路55号",
                roleId: 1,
                status: 0,
                WeChat: 'adasada',
                IDNumber: '435456646746565',
            },
            {
                id: 3,
                name: "王五",
                gender: 1,
                age: 23,
                phoneNumber: 13548657890,
                homeLocationName: "重庆市沙坪坝区大学城南路55号",
                roleId: 1,
                status: 0,
                WeChat: 'adasada',
                IDNumber: '435456646746565',
            }, {
                id: 1,
                name: "张三",
                gender: 0,
                age: 24,
                phoneNumber: 13548657878,
                homeLocationName: "重庆市沙坪坝区大学城南路55号",
                roleId: 1,
                status: 0,
                WeChat: 'adasada',
                IDNumber: '435456646746565',
            },
            {
                id: 2,
                name: "李四",
                gender: 0,
                age: 25,
                phoneNumber: 13548657870,
                homeLocationName: "重庆市沙坪坝区大学城南路55号",
                roleId: 1,
                status: 1,
                WeChat: 'adasada',
                IDNumber: '435456646746565',
            },
            {
                id: 3,
                name: "王五",
                gender: 1,
                age: 23,
                phoneNumber: 13548657890,
                homeLocationName: "重庆市沙坪坝区大学城南路55号",
                roleId: 1,
                status: 0,
                WeChat: 'adasada',
                IDNumber: '435456646746565',
            }, {
                id: 1,
                name: "张三",
                gender: 0,
                age: 24,
                phoneNumber: 13548657878,
                homeLocationName: "重庆市沙坪坝区大学城南路55号",
                roleId: 1,
                status: 1,
                WeChat: 'adasada',
                IDNumber: '435456646746565',
            },
            {
                id: 2,
                name: "李四",
                gender: 0,
                age: 25,
                phoneNumber: 13548657870,
                homeLocationName: "重庆市沙坪坝区大学城南路55号",
                roleId: 1,
                status: 1,
                WeChat: 'adasada',
                IDNumber: '435456646746565',
            },
            {
                id: 3,
                name: "王五",
                gender: 1,
                age: 23,
                phoneNumber: 13548657890,
                homeLocationName: "重庆市沙坪坝区大学城南路55号",
                roleId: 1,
                status: 0,
                WeChat: 'adasada',
                IDNumber: '435456646746565',
            },
            {
                id: 1,
                name: "张三",
                gender: 0,
                age: 24,
                phoneNumber: 13548657878,
                homeLocationName: "重庆市沙坪坝区大学城南路55号",
                roleId: 1,
                status: 0,
                WeChat: 'adasada',
                IDNumber: '435456646746565',
            },
            {
                id: 2,
                name: "李四",
                gender: 0,
                age: 25,
                phoneNumber: 13548657870,
                homeLocationName: "重庆市沙坪坝区大学城南路55号",
                roleId: 1,
                status: 1,
                WeChat: 'adasada',
                IDNumber: '435456646746565',
            },
            {
                id: 3,
                name: "王五",
                gender: 1,
                age: 23,
                phoneNumber: 13548657890,
                homeLocationName: "重庆市沙坪坝区大学城南路55号",
                roleId: 1,
                status: 0,
                WeChat: 'adasada',
                IDNumber: '435456646746565',
            }, {
                id: 1,
                name: "张三",
                gender: 0,
                age: 24,
                phoneNumber: 13548657878,
                homeLocationName: "重庆市沙坪坝区大学城南路55号",
                roleId: 1,
                status: 1,
                WeChat: 'adasada',
                IDNumber: '435456646746565',
            },
            {
                id: 2,
                name: "李四",
                gender: 0,
                age: 25,
                phoneNumber: 13548657870,
                homeLocationName: "重庆市沙坪坝区大学城南路55号",
                roleId: 1,
                status: 1,
                WeChat: 'adasada',
                IDNumber: '435456646746565',
            },
            {
                id: 3,
                name: "王五",
                gender: 1,
                age: 23,
                phoneNumber: 13548657890,
                homeLocationName: "重庆市沙坪坝区大学城南路55号",
                roleId: 1,
                status: 0,
                WeChat: 'adasada',
                IDNumber: '435456646746565',
            },
        ], // 所有用户列表
        // role:
        // auth_name: "navigator"
        // auth_time: 1616559388731
        // create_time: 1608076800000
        // menus: Array(6)
        // 0: "/home"
        // 1: "/products"
        // 2: "/category"
        // 3: "/task"
        // 4: "/user"
        // 5: "/role"
        // length: 6
        // __proto__: Array(0)
        // name: "navigator"
        // __v: 0
        // _id: "5fd976a0cc325b1aceb361d9"
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
                dataIndex: 'id',
            },
            {
                title: '姓名',
                dataIndex: 'name'
            },
            {
                title: '性别',
                dataIndex: 'gender',
                render: (gender) => gender === 1 ? '男' : '女'
            },

            {
                title: '年龄',
                dataIndex: 'age'
            },
            {
                title: '联系电话',
                dataIndex: 'phoneNumber',
            },
            {
                title: '家庭住址',
                dataIndex: 'homeLocationName',
            },
            {
                title: '所属角色',
                dataIndex: 'roleId',
                // render: (roleId) => this.roleNames[roleId], // 避免重复遍历角色列表（一次性找到所有队员角色）
                render: (roleId) => this.state.roles[roleId]
            },
            {
                title: '是否出勤',
                dataIndex: 'status',
                render: (status) => status === 1 ? '正在出勤' : '未出勤'
            },
            {
                title: '操作',
                render: (user) => (
                    <span>
                        <LinkButton
                            onClick={() => this.props.history.push('/user/addUpdate', {user})}>详情</LinkButton>
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

    /*
    添加/更新用户
     */
    addOrUpdateUser = async () => {

        this.setState({isShow: false})

        // 1. 收集输入数据
        const user = this.form.getFieldsValue()
        this.form.resetFields()
        // 如果是更新, 需要给user指定id属性
        if (this.user) {
            user.id = this.user.id
        }

        // 2. 提交添加的请求
        const result = await reqAddOrUpdateUser(user)
        // 3. 更新列表显示
        if (result.status === 0) {
            message.success(`${this.user ? '修改' : '添加'}用户成功`)
            this.getUsers()
        }
    }

    getUsers = (searchType, searchName) => {
        return async () => {
            // TO DO
            // 加入搜索
            // this.pageNum = pageNum // 保存pageNum, 让其它方法可以看到
            // this.setState({loading: true}) // 显示loading
            //
            // const {searchName, searchType} = this.state
            // // 如果搜索关键字有值, 说明我们要做搜索分页
            // let result
            // if (searchName) {
            //     result = await reqSearchProducts({pageNum, pageSize: PAGE_SIZE, searchName, searchType})
            // } else { // 一般分页请求
            //     result = await reqProducts(pageNum, PAGE_SIZE)
            // }
            // const result = await reqUsers()
            // if (result.status === 0) {
            //     const {users, roles} = result.data
            //     this.initRoleNames(roles)
            //     this.setState({
            //         users,
            //         roles
            //     })
            // }
            this.searchType = searchType; // 保存searchType, 让其他方法可以看到
            this.searchName = searchName; // 保存searchName, 让其他方法可以看到
            console.log(searchType, searchName);
        }
    }

    componentWillMount() {
        this.initColumns()
    }

    componentDidMount() {
        // this.getUsers();
        this.initRoleNames(this.state.roles);
    }


    render() {

        const {users, roles, isShow, searchTypes} = this.state
        const user = this.user || {}

        const title = (
            <SearchBar searchTypes={searchTypes} getData={this.getUsers}/>
        )

        const extra =
            <Button type='primary' onClick={() => this.props.history.push('/user/addUpdate')}>
                <Icon type='plus'/>
                添加队员
            </Button>

        return (
            <Card title={title} extra={extra}>
                <Table
                    bordered
                    rowKey='id'
                    dataSource={users}
                    columns={this.columns}
                    pagination={{defaultPageSize: PAGE_SIZE}}
                />

                {/*<Modal*/}
                {/*    title={user.id ? '修改用户' : '添加用户'}*/}
                {/*    visible={isShow}*/}
                {/*    onOk={this.addOrUpdateUser}*/}
                {/*    onCancel={() => {*/}
                {/*        this.form.resetFields()*/}
                {/*        this.setState({isShow: false})*/}
                {/*    }}*/}
                {/*>*/}
                {/*    <UserForm*/}
                {/*        setForm={form => this.form = form}*/}
                {/*        roles={roles}*/}
                {/*        user={user}*/}
                {/*    />*/}
                {/*</Modal>*/}

            </Card>
        )
    }
}
