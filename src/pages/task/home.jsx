import React, {Component} from 'react'
import {Button, Card, Icon, Input, message, Select, Table} from 'antd'

import LinkButton from '../../components/link-button'
import {reqTasks, reqSearchTasks, reqUpdateStatus} from '../../api'
import {PAGE_SIZE} from '../../utils/constants'
import memoryUtils from "../../utils/memoryUtils";

const Option = Select.Option

/*
Task的默认子路由组件
 */
export default class TaskHome extends Component {

    state = {
        total: 0, // 商品的总数量
        incidents: [
            {
                id: 1,
                taskName: "寻找65岁老人张三",
                taskLevel: 1,
                startTime: "2020-11-15 14:00",
                endTime: "2020-11-15 23:00",
            },
            {
                id: 2,
                taskName: "寻找65岁老人张三",
                taskLevel: 1,
                startTime: "2020-11-15 14:00",
                endTime: "2020-11-15 23:00",
            },
            {
                id: 3,
                taskName: "寻找65岁老人张三",
                taskLevel: 1,
                startTime: "2020-11-15 14:00",
                endTime: "2020-11-15 23:00",
            },
            {
                id: 4,
                taskName: "寻找65岁老人张三",
                taskLevel: 1,
                startTime: "2020-11-15 14:00",
                endTime: "2020-11-15 23:00",
            },
            {
                id: 5,
                taskName: "寻找65岁老人张三",
                taskLevel: 1,
                startTime: "2020-11-15 14:00",
                endTime: "2020-11-15 23:00",
            },
            {
                id: 6,
                taskName: "寻找65岁老人张三",
                taskLevel: 1,
                startTime: "2020-11-15 14:00",
                endTime: "2020-11-15 23:00",
            },
            {
                id: 7,
                taskName: "寻找65岁老人张三",
                taskLevel: 1,
                startTime: "2020-11-15 14:00",
                endTime: "2020-11-15 23:00",
            },
            {
                id: 8,
                taskName: "寻找65岁老人张三",
                taskLevel: 1,
                startTime: "2020-11-15 14:00",
                endTime: "2020-11-15 23:00",
            },
            {
                id: 9,
                taskName: "寻找65岁老人张三",
                taskLevel: 1,
                startTime: "2020-11-15 14:00",
                endTime: "2020-11-15 23:00",
            },
            {
                id: 10,
                taskName: "寻找65岁老人张三",
                taskLevel: 1,
                startTime: "2020-11-15 14:00",
                endTime: "2020-11-15 23:00",
            },
            {
                id: 11,
                taskName: "寻找65岁老人张三",
                taskLevel: 1,
                startTime: "2020-11-15 14:00",
                endTime: "2020-11-15 23:00",
            },
            {
                id: 12,
                taskName: "寻找65岁老人张三",
                taskLevel: 1,
                startTime: "2020-11-15 14:00",
                endTime: "2020-11-15 23:00",
            },
        ], // 走失事件的数组
        loading: false, // 是否正在加载中
        searchName: '', // 搜索的关键字
        searchType: 'taskName', // 根据哪个字段搜索
    }

    /*
    初始化table的列的数组
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
                title: '任务名称',
                dataIndex: 'taskName',
            },
            {
                width: 50,
                title: '任务级别',
                dataIndex: 'taskLevel',
            },
            {
                width: 100,
                title: '启动时间',
                dataIndex: 'startTime',
            },
            {
                width: 100,
                title: '结束时间',
                dataIndex: 'endTime',
            },
            {
                width: 60,
                title: '操作',
                render: (task) => {
                    return (
                        <span>
              {/*将task对象使用state传递给目标路由组件*/}
                            <LinkButton onClick={() => this.showUpdate(task)}>修改</LinkButton>
                            <LinkButton onClick={() => this.showUpdate(task)}>删除</LinkButton>
                        </span>
                    )
                }
            },
        ];
    }

    /*
    显示商品详情界面
     */
    showDetail = (procut) => {
        // 缓存task对象 ==> 给detail组件使用
        memoryUtils.task = procut
        this.props.history.push('/incident/detail')
    }

    /*
    显示修改商品界面
     */
    showUpdate = (procut) => {
        // 缓存task对象 ==> 给detail组件使用
        memoryUtils.task = procut
        this.props.history.push('/incident/addupdate')
    }

    /*
    获取指定页码的列表数据显示
     */
    getTasks = async (pageNum) => {
        this.pageNum = pageNum // 保存pageNum, 让其它方法可以看到
        this.setState({loading: true}) // 显示loading

        const {searchName, searchType} = this.state
        // 如果搜索关键字有值, 说明我们要做搜索分页
        let result
        if (searchName) {
            result = await reqSearchTasks({pageNum, pageSize: PAGE_SIZE, searchName, searchType})
        } else { // 一般分页请求
            result = await reqTasks(pageNum, PAGE_SIZE)
        }

        this.setState({loading: false}) // 隐藏loading
        if (result.status === 0) {
            // 取出分页数据, 更新状态, 显示分页列表
            const {total, list} = result.data
            this.setState({
                total,
                tasks: list
            })
        }
    }

    /*
    更新指定商品的状态
     */
    updateStatus = async (taskId, status) => {
        const result = await reqUpdateStatus(taskId, status)
        if (result.status === 0) {
            message.success('更新商品成功')
            this.getTasks(this.pageNum)
        }
    }

    componentWillMount() {
        this.initColumns()
    }

    // componentDidMount() {
    //     this.getTasks(1)
    // }

    render() {

        // 取出状态数据
        const {incidents, total, loading, searchType, searchName} = this.state


        const title = (
            <span>
                <Select
                    value={searchType}
                    style={{width: 160}}
                    onChange={value => this.setState({searchType: value})}
                >
                    <Option value='taskName'>按任务名称搜索</Option>
                    <Option value='taskLevel'>按任务级别搜索</Option>
                </Select>
                <Input
                    placeholder='关键字'
                    style={{width: 160, margin: '0 15px'}}
                    value={searchName}
                    onChange={event => this.setState({searchName: event.target.value})}
                />
                <Button type='primary' onClick={() => this.getTasks(1)}>搜索</Button>
            </span>
        )

        const extra = (
            <Button type='primary' onClick={() => this.props.history.push('/incident/addupdate')}>
                <Icon type='plus'/>
                添加任务
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
                        current: this.pageNum,
                        // total,  显示设置的最大页数
                        defaultPageSize: PAGE_SIZE,
                        showQuickJumper: true,
                        // onChange: this.getTasks
                    }}
                />
            </Card>
        )
    }
}
