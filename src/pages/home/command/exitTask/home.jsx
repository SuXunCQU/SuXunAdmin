import React, {Component} from 'react'
import {Button, Card, Icon, Modal, Table} from 'antd'
import LinkButton from "../../../../components/link-button/index"
// import {reqDeleteUser, reqUsers, reqAddOrUpdateUser} from "../../api/index";
import AddForm from './add-form'
import SearchBar from "../../../../components/search-bar";

/**
 * ExitTask的默认路由组件
 */
export default class User extends Component {

    state = {
        total: 0, // 退出任务申请总数量
        exitTasks: [
            {
                id: 1,
                taskId: 2,
                userName: "张三",
                userGender: 1,
                userAge: 65,
                userPhone: "2020-11-15 14:00",   // 根据上传的时间确定
                userHomeLocation: "重庆市沙坪坝区大学城熙街",
                reason: "没时间",
                status: 1,
            },
            {
                id: 2,
                taskId: 2,
                userName: "张三",
                userGender: 1,
                userAge: 65,
                userPhone: "2020-11-15 14:00",   // 根据上传的时间确定
                userHomeLocation: "重庆市沙坪坝区大学城熙街",
                reason: "没时间",
                status: 1,
            },
            {
                id: 3,
                taskId: 2,
                userName: "张三",
                userGender: 1,
                userAge: 65,
                userPhone: "2020-11-15 14:00",   // 根据上传的时间确定
                userHomeLocation: "重庆市沙坪坝区大学城熙街",
                reason: "没时间",
                status: 1,
            },
            {
                id: 4,
                taskId: 2,
                userName: "张三",
                userGender: 1,
                userAge: 65,
                userPhone: "2020-11-15 14:00",   // 根据上传的时间确定
                userHomeLocation: "重庆市沙坪坝区大学城熙街",
                reason: "没时间",
                status: 0,
            },
            {
                id: 5,
                taskId: 2,
                userName: "张三",
                userGender: 1,
                userAge: 65,
                userPhone: "2020-11-15 14:00",   // 根据上传的时间确定
                userHomeLocation: "重庆市沙坪坝区大学城熙街",
                reason: "没时间",
                status: 1,
            },
            {
                id: 6,
                taskId: 2,
                userName: "张三",
                userGender: 1,
                userAge: 65,
                userPhone: "2020-11-15 14:00",   // 根据上传的时间确定
                userHomeLocation: "重庆市沙坪坝区大学城熙街",
                reason: "没时间",
                status: 1,
            },
            {
                id: 7,
                taskId: 2,
                userName: "张三",
                userGender: 1,
                userAge: 65,
                userPhone: "2020-11-15 14:00",   // 根据上传的时间确定
                userHomeLocation: "重庆市沙坪坝区大学城熙街",
                reason: "没时间",
                status: 0,
            },
            {
                id: 8,
                taskId: 2,
                userName: "张三",
                userGender: 1,
                userAge: 65,
                userPhone: "2020-11-15 14:00",   // 根据上传的时间确定
                userHomeLocation: "重庆市沙坪坝区大学城熙街",
                reason: "没时间",
                status: 0,
            },
            {
                id: 9,
                taskId: 2,
                userName: "张三",
                userGender: 1,
                userAge: 65,
                userPhone: "2020-11-15 14:00",   // 根据上传的时间确定
                userHomeLocation: "重庆市沙坪坝区大学城熙街",
                reason: "没时间",
                status: 0,
            },
        ], // 退出任务申请的数组
        loading: false, // 是否正在加载中
        searchTypes: [
            {
                value: 'theLostName',
                title: '按姓名搜索',
            },
            {
                value: 'lostLocation',
                title: '按家庭住址搜索',
            },
            {
                value: 'reporterName',
                title: '按电话搜索',
            },
        ],
        isShow: false, // 是否展示添加弹出框
    }

    updateStatus=(id,newStatus)=>{
        console.log('更新状态');
    }

    /**
     * 初始化table的列的数组
     */
    initColumns = () => {
        this.columns = [
            {
                width: 50,
                title: '编号',
                dataIndex: 'id',
            },
            {
                width: 50,
                title: '姓名',
                dataIndex: 'userName',
            },
            {
                width: 50,
                title: '性别',
                dataIndex: 'userGender',
                render: (userGender) => userGender === 1 ? '男' : '女'  // 当前指定了对应的属性, 传入的是对应的属性值
            },
            {
                width: 50,
                title: '年龄',
                dataIndex: 'userAge',
            },
            {
                width: 80,
                title: '电话',
                dataIndex: 'userPhone',
            },
            {
                width: 150,
                title: '家庭住址',
                dataIndex: 'userHomeLocation',
            },
            {
                width: 200,
                title: '申请理由',
                dataIndex: 'reason',
            },
            {
                width: 80,
                title: '状态',
                // dataIndex: 'status',
                render: (exitTask) => {
                    const {status, id} = exitTask
                    const newStatus = 1;
                    return (
                        <span>
                              <span>
                                  {status === 1 ? '已通过' :
                                      <Button
                                          type='primary'
                                          onClick={() => this.updateStatus(id,newStatus)}
                                      >批准</Button>
                                  }
                              </span>
                        </span>
                    )
                }
            },
            {
                width: 60,
                title: '操作',
                render: (exitTask) => {
                    return (
                        <span>
                            <LinkButton onClick={() => this.showUpdate(exitTask)}>修改</LinkButton>
                            <LinkButton onClick={() => this.deleteExitTask(exitTask)}>删除</LinkButton>
                        </span>
                    )
                }
            },
        ];
    }

    // /*
    // 根据role的数组, 生成包含所有角色名的对象(属性名用角色id值)
    //  */
    // initRoleNames = (roles) => {
    //     const roleNames = roles.reduce((pre, role) => {
    //         pre[role._id] = role.name
    //         return pre
    //     }, {})
    //     // 保存
    //     this.roleNames = roleNames
    // }

    /*
    显示添加界面
     */
    showAdd = () => {
        this.user = null // 去除前面保存的user
        this.setState({isShow: true})
        console.log(this.state.isShow);
    }

    /*
    显示修改界面
     */
    showUpdate = (user) => {
        this.user = user // 保存user
        this.setState({
            isShow: true
        })
    }

    /*
    删除指定用户
     */
    deleteExitTask = (user) => {
        // Modal.confirm({
        //     title: `确认删除${user.username}吗?`,
        //     onOk: async () => {
        //         const result = await reqDeleteUser(user._id)
        //         if(result.status===0) {
        //             message.success('删除用户成功!')
        //             this.getUsers()
        //         }
        //     }
        // })
        console.log('删除退出任务申请');
    }

    /*
    添加/更新用户
     */
    addOrUpdateUser = async () => {

        this.setState({isShow: false})

        // 1. 收集输入数据
        const user = this.form.getFieldsValue()
        this.form.resetFields()
        // 如果是更新, 需要给user指定_id属性
        if (this.user) {
            user._id = this.user._id
        }

        // 2. 提交添加的请求
        // const result = await reqAddOrUpdateUser(user)
        // // 3. 更新列表显示
        // if(result.status===0) {
        //     message.success(`${this.user ? '修改' : '添加'}用户成功`)
        //     this.getUsers()
        // }
    }

    /**
     * 获取数据
     * @param searchType
     * @param searchName
     * @returns {(function(): Promise<void>)|*}
     */
    getExitTasks = (searchType, searchName) => {
        return async () => {
            // const pageNum = 1;
            this.searchType = searchType; // 保存searchType, 让其他方法可以看到
            this.searchName = searchName; // 保存searchName, 让其他方法可以看到
            const pageNum = this.pageNum;
            console.log('pageNum', pageNum);
            this.setState({loading: true}) // 显示loading

            // 如果搜索关键字有值, 说明我们要做搜索分页
            let result = {
                status: 0,
                data: {
                    total: 0,
                    list: [],
                }
            }
            // // TO DO
            // if (searchName) {
            //     result = await reqSearchIncidents({pageNum, pageSize: PAGE_SIZE, searchName, searchType})
            // } else { // 一般分页请求
            //     result = await reqIncidents(pageNum, PAGE_SIZE)
            // }

            this.setState({loading: false}) // 隐藏loading
            if (result.status === 0) {
                // 取出分页数据, 更新状态, 显示分页列表
                const {total, list} = result.data
                this.setState({
                    total,
                    incidents: list
                })
            }
            console.log(searchType, searchName);
        }
    }

    componentWillMount() {
        this.initColumns()
    }

    componentDidMount() {
        // this.getUsers()
    }


    render() {

        // 取出状态数据
        const {exitTasks, total, loading, searchTypes, isShow} = this.state

        console.log(isShow);
        const returnPre = (
            <span>
                <LinkButton onClick={() => this.props.history.goBack()}>
                    <Icon type='arrow-left' style={{fontSize: 20}}/>
                </LinkButton>
                <span>退出任务审批</span>
            </span>
        )

        const title = (
            <SearchBar searchTypes={searchTypes} getData={this.getExitTasks}/>
        )

        const extra = (
            <Button type='primary' onClick={this.showAdd}>
                <Icon type='plus' />
                添加任务退出申请
            </Button>
        )

        return (
            <Card title={returnPre}>
                <Card title={title} extra={extra}>
                    <Table
                        bordered
                        rowKey='id'
                        dataSource={exitTasks}
                        columns={this.columns}
                        pagination={{defaultPageSize: 2}}
                    />

                </Card>
                <Modal
                    // title={user._id ? '修改用户' : '添加用户'}
                    title={1 ? '修改用户' : '添加用户'}
                    visible={isShow}
                    onOk={this.addOrUpdateUser}
                    onCancel={() => {
                        this.form.resetFields()
                        this.setState({isShow: false})
                    }}
                >
                    <AddForm
                        setForm={form => this.form = form}
                        // roles={roles}
                        // user={user}
                    />
                </Modal>
            </Card>
        )
    }
}
