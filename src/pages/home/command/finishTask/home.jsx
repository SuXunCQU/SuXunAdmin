import React, {Component} from 'react'
import {Button, Card, Icon, Modal, Table} from 'antd'

import LinkButton from '../../../../components/link-button'
import {PAGE_SIZE} from '../../../../utils/constants'
import SearchBar from "../../../../components/search-bar";
import AddForm from "./add-form";

/**
 * 退出任务的默认子路由组件
 */
export default class FinishTaskHome extends Component {

    state = {
        total: 0, // 商品的总数量
        finishTasks: [
            {
                id: 1,
                memberId: 2,
                memberName: "张三",
                memberGender: 1,
                memberAge: 25,
                memberPhone: '156224655233',
                time: '2021-3-12 15:12',
                status: 0,
            },
            {
                id: 2,
                memberId: 2,
                memberName: "张三",
                memberGender: 1,
                memberAge: 25,
                memberPhone: '156224655233',
                time: '2021-3-12 15:12',
                status: 0,
            },
            {
                id: 3,
                memberId: 2,
                memberName: "张三",
                memberGender: 1,
                memberAge: 25,
                memberPhone: '156224655233',
                time: '2021-3-12 15:12',
                status: 0,
            },
            {
                id: 4,
                memberId: 2,
                memberName: "张三",
                memberGender: 1,
                memberAge: 25,
                memberPhone: '156224655233',
                time: '2021-3-12 15:12',
                status: 0,
            },
            {
                id: 5,
                memberId: 2,
                memberName: "张三",
                memberGender: 1,
                memberAge: 25,
                memberPhone: '156224655233',
                time: '2021-3-12 15:12',
                status: 0,
            },
            {
                id: 6,
                memberId: 2,
                memberName: "张三",
                memberGender: 1,
                memberAge: 25,
                memberPhone: '156224655233',
                time: '2021-3-12 15:12',
                status: 1,
            },
            {
                id: 7,
                memberId: 2,
                memberName: "张三",
                memberGender: 1,
                memberAge: 25,
                memberPhone: '156224655233',
                time: '2021-3-12 15:12',
                status: 0,
            },
            {
                id: 8,
                memberId: 2,
                memberName: "张三",
                memberGender: 1,
                memberAge: 25,
                memberPhone: '156224655233',
                time: '2021-3-12 15:12',
                status: 2,
            },
            {
                id: 9,
                memberId: 2,
                memberName: "张三",
                memberGender: 1,
                memberAge: 25,
                memberPhone: '156224655233',
                time: '2021-3-12 15:12',
                status: 2,
            },
            {
                id: 10,
                memberId: 2,
                memberName: "张三",
                memberGender: 1,
                memberAge: 25,
                memberPhone: '156224655233',
                time: '2021-3-12 15:12',
                status: 1,
            },
            {
                id: 11,
                memberId: 2,
                memberName: "张三",
                memberGender: 1,
                memberAge: 25,
                memberPhone: '156224655233',
                time: '2021-3-12 15:12',
                status: 0,
            },
            {
                id: 12,
                memberId: 2,
                memberName: "张三",
                memberGender: 1,
                memberAge: 25,
                memberPhone: '156224655233',
                time: '2021-3-12 15:12',
                status: 0,
            },
        ], // 走失事件的数组
        loading: false, // 是否正在加载中
        searchTypes: [
            {
                value: 'theLostName',
                title: '按队员姓名搜索',
            },
            {
                value: 'lostLocation',
                title: '按队员电话搜索',
            },
        ],
        isShow: false, // 是否显示添加申请界面
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
                title: '队员姓名',
                dataIndex: 'memberName',
            },
            {
                width: 50,
                title: '队员性别',
                dataIndex: 'memberGender',
                render: (userGender) => userGender === 1 ? '男' : '女'  // 当前指定了对应的属性, 传入的是对应的属性值
            },
            {
                width: 50,
                title: '队员年龄',
                dataIndex: 'memberAge',
            },
            {
                width: 80,
                title: '队员电话',
                dataIndex: 'memberPhone',
            },
            {
                width: 80,
                title: '申请时间',
                dataIndex: 'time',
            },
            {
                width: 80,
                title: '状态',
                dataIndex: 'status',
                render: (status) => {
                    return (
                        <span>
                                  {status === 0 ? '未审批' : status === 1 ? '未通过' : '已通过'}
                              </span>
                    )
                }
            },
            {
                width: 60,
                title: '操作',
                render: (finishTask) => {
                    return (
                        <span>
                            <LinkButton
                                onClick={() => this.props.history.push('/home/command/finishNumber/approve', {finishTask})}>审核</LinkButton>
                            <LinkButton onClick={() => this.deleteFinishTask(finishTask)}>删除</LinkButton>
                        </span>
                    )
                }
            },
        ];
    }

    /**
     * 显示添加界面
     */
    showAdd = () => {
        this.user = null // 去除前面保存的user
        this.setState({isShow: true})
        console.log(this.state.isShow);
    }


    /**
     * TO DO
     * 删除
     */
    deleteFinishTask = () => {
        alert('是否删除');
        // console.log('')
    }

    /**
     * 改变页码并获取数据
     */
    setPageNum = (pageNum) => {
        this.pageNum = pageNum // 保存pageNum, 让其它方法可以看到
        console.log('pageNum', pageNum);
        this.getFinishTasks(this.searchType, this.searchName);
    }


    /**
     * 获取数据
     */
    getFinishTasks = (searchType, searchName) => {
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
            //     result = await reqSearchFinishTasks({pageNum, pageSize: PAGE_SIZE, searchName, searchType})
            // } else { // 一般分页请求
            //     result = await reqFinishTasks(pageNum, PAGE_SIZE)
            // }

            this.setState({loading: false}) // 隐藏loading
            if (result.status === 0) {
                // 取出分页数据, 更新状态, 显示分页列表
                const {total, list} = result.data
                this.setState({
                    total,
                    finishTasks: list
                })
            }
            console.log(searchType, searchName);
        }
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
        const {finishTasks, total, loading, searchTypes, isShow} = this.state

        const returnPre = (
            <span>
                <LinkButton onClick={() => this.props.history.goBack()}>
                    <Icon type='arrow-left' style={{fontSize: 20}}/>
                </LinkButton>
                <span>任务完成审批</span>
            </span>
        )

        const title = (
            <SearchBar searchTypes={searchTypes} getData={this.getFinishTasks}/>
        )

        const extra = (
            <Button type='primary' onClick={this.showAdd}>
                <Icon type='plus'/>
                添加任务完成申请
            </Button>
        )


        return (
            <Card title={returnPre}>
                <Card title={title} extra={extra}>
                    <Table
                        bordered
                        rowKey='id'
                        loading={loading}
                        dataSource={finishTasks}
                        columns={this.columns}
                        pagination={{
                            // current:this.pageNum,
                            total,
                            defaultPageSize: PAGE_SIZE,
                            showQuickJumper: true,
                            onChange: this.setPageNum,
                        }}
                    />
                </Card>
                <Modal
                    // title={user._id ? '修改用户' : '添加用户'}
                    title='添加任务完成申请'
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
