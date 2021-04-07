import React, {Component} from 'react'
import {Button, Card, Icon, Modal, Table} from 'antd'

import {PAGE_SIZE} from '../../../utils/constants'
import SearchBar from "../../../components/search-bar";
import AddForm from "./add-form";
import LinkButton from "../../../components/link-button";

/**
 * ExitTask的默认路由组件
 */
export default class ExitTaskHome extends Component {

    state = {
        total: 0, // 商品的总数量
        exitTasks: [
            {
                id: 1,
                taskId:2,
                userName: "张三",
                userGender: 1,
                userAge: 65,
                userPhone: "2020-11-15 14:00",   // 根据上传的时间确定
                userHomeLocation: "重庆市沙坪坝区大学城熙街",
                reason: "",
                status: 0,
            },
            {
                id: 2,
                taskId:2,
                userName: "张三",
                userGender: 1,
                userAge: 65,
                userPhone: "2020-11-15 14:00",   // 根据上传的时间确定
                userHomeLocation: "重庆市沙坪坝区大学城熙街",
                reason: "",
                status: 0,
            },
            {
                id: 3,
                taskId:2,
                userName: "张三",
                userGender: 1,
                userAge: 65,
                userPhone: "2020-11-15 14:00",   // 根据上传的时间确定
                userHomeLocation: "重庆市沙坪坝区大学城熙街",
                reason: "",
                status: 0,
            },
            {
                id: 4,
                taskId:2,
                userName: "张三",
                userGender: 1,
                userAge: 65,
                userPhone: "2020-11-15 14:00",   // 根据上传的时间确定
                userHomeLocation: "重庆市沙坪坝区大学城熙街",
                reason: "",
                status: 0,
            },
            {
                id: 5,
                taskId:2,
                userName: "张三",
                userGender: 1,
                userAge: 65,
                userPhone: "2020-11-15 14:00",   // 根据上传的时间确定
                userHomeLocation: "重庆市沙坪坝区大学城熙街",
                reason: "",
                status: 0,
            },
            {
                id: 6,
                taskId:2,
                userName: "张三",
                userGender: 1,
                userAge: 65,
                userPhone: "2020-11-15 14:00",   // 根据上传的时间确定
                userHomeLocation: "重庆市沙坪坝区大学城熙街",
                reason: "",
                status: 0,
            },
            {
                id: 7,
                taskId:2,
                userName: "张三",
                userGender: 1,
                userAge: 65,
                userPhone: "2020-11-15 14:00",   // 根据上传的时间确定
                userHomeLocation: "重庆市沙坪坝区大学城熙街",
                reason: "",
                status: 0,
            },
            {
                id: 8,
                taskId:2,
                userName: "张三",
                userGender: 1,
                userAge: 65,
                userPhone: "2020-11-15 14:00",   // 根据上传的时间确定
                userHomeLocation: "重庆市沙坪坝区大学城熙街",
                reason: "",
                status: 0,
            },
            {
                id: 9,
                taskId:2,
                userName: "张三",
                userGender: 1,
                userAge: 65,
                userPhone: "2020-11-15 14:00",   // 根据上传的时间确定
                userHomeLocation: "重庆市沙坪坝区大学城熙街",
                reason: "",
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
                dataIndex: 'theLostName',
            },
            {
                width: 50,
                title: '性别',
                dataIndex: 'theLostGender',
                render: (userGender) => userGender === 1 ? '男' : '女'  // 当前指定了对应的属性, 传入的是对应的属性值
            },
            {
                width: 50,
                title: '年龄',
                dataIndex: 'theLostAge',
            },
            {
                width: 80,
                title: '电话',
                dataIndex: 'lostTime',
            },
            {
                width: 200,
                title: '家庭住址',
                dataIndex: 'lostLocation',
            },
            {
                width: 50,
                title: '申请理由',
                dataIndex: 'reporterName',
            },
            {
                width: 100,
                title: '状态',
                // dataIndex: 'status',
                render: (product) => {
                    const {status, _id} = product
                    const newStatus = status===1 ? 2 : 1
                    return (
                        <span>
              <Button
                  type='primary'
                  onClick={() => this.updateStatus(_id, newStatus)}
              >
                {status===1 ? '批准' : ''}
              </Button>
              <span>{status===1 ? '已通过' : '待审批'}</span>
            </span>
                    )
                }
            },
            {
                width: 60,
                title: '操作',
                render: (incident) => {
                    return (
                        <span>
                            <LinkButton onClick={() => this.deleteExitTask(incident)}>删除</LinkButton>
                        </span>
                    )
                }
            },
        ];
    }


    /**
     * TO DO
     * 删除
     */
    deleteExitTask = () => {
        alert('是否删除');
        // console.log('')
    }

    /**
     * 改变页码并获取数据
     */
    setPageNum = (pageNum) => {
        this.pageNum = pageNum // 保存pageNum, 让其它方法可以看到
        console.log('pageNum', pageNum);
        this.getExitTasks(this.searchType, this.searchName);
    }


    /**
     * 获取数据
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
            //     result = await reqSearchExitTasks({pageNum, pageSize: PAGE_SIZE, searchName, searchType})
            // } else { // 一般分页请求
            //     result = await reqExitTasks(pageNum, PAGE_SIZE)
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

    addExitTask=()=> {
        console.log('addExitTask');
        // // 进行表单验证, 只能通过了才向下处理
        // this.form.validateFields(async (error, values) => {
        //     if (!error) {
        //
        //         // 隐藏确认框
        //         this.setState({
        //             isShowAdd: false
        //         })
        //
        //         // 收集输入数据
        //         const {roleName} = values
        //         this.form.resetFields()
        //
        //         // 请求添加
        //         const result = await reqAddRole(roleName)
        //         // 根据结果提示/更新列表显示
        //         if (result.status===0) {
        //             message.success('添加角色成功')
        //             // this.getRoles()
        //             // 新产生的角色
        //             const role = result.data
        //             // 更新roles状态
        //             /*const roles = this.state.roles
        //             roles.push(role)
        //             this.setState({
        //               roles
        //             })*/
        //
        //             // 更新roles状态: 基于原本状态数据更新
        //             this.setState(state => ({
        //                 roles: [...state.roles, role]
        //             }))
        //
        //         } else {
        //             message.success('添加角色失败')
        //         }
        // }
    }


    componentWillMount() {
        this.initColumns()
    }


    // TO DO
    componentDidMount() {
        // this.setPageNum(1);
        this.pageNum = 1;
    }

    render() {

        // 取出状态数据
        const {incidents, total, loading, searchTypes} = this.state

        const title = (
            <SearchBar searchTypes={searchTypes} getData={this.getExitTasks}/>
        )

        const extra = (
            <Button type='primary' >
                <Icon type='plus' onClick={this.addExitTask} />
                添加退出任务申请
            </Button>
        )

        return (
            <Card title={title} extra={extra}>
                <Table
                    bordered
                    rowKey='id'
                    loading={loading}
                    dataSource={incidents}
                    columns={this.columns}
                    pagination={{
                        // current:this.pageNum,
                        total,
                        defaultPageSize: PAGE_SIZE,
                        showQuickJumper: true,
                        onChange: this.setPageNum,
                    }}
                />
                <Modal
                    title="添加退出任务申请"
                    onOk={this.addExitTask}
                    onCancel={() => {
                        this.form.resetFields()
                    }}
                >
                    <AddForm
                        setForm={(form) => this.form = form}
                    />
                </Modal>
            </Card>

        )
    }
}
