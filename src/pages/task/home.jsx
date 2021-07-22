import React, {Component} from 'react'
import {Button, Card, Icon, Input, Select, Table, message, Modal} from 'antd'

import LinkButton from '../../components/link-button'
import {reqDeleteMember, reqDeleteTask, reqTaskMoreInfos, reqTaskMoreInfosByTaskId, reqTasks} from '../../api'
import {PAGE_SIZE} from '../../utils/constants'
import memoryUtils from "../../utils/memoryUtils";
import {formateDate} from "../../utils/dateUtils";
import {task_data, incident_data} from "../../utils/mockUtils.new";
import getColumnSearchProps from "../../utils/getColumnSearchProps";

const Option = Select.Option

/*
Task的默认子路由组件
 */
export default class TaskHome extends Component {
    constructor(props) {
        super(props);
    }

    state = {
        loading: false, // 是否正在加载中
        searchName: '', // 搜索的关键字
        searchType: 'taskName', // 根据哪个字段搜索
        statuses:["进行中","暂缓","已完成"] // 任务状态
    }


    /**
     * 初始化table的列的数组
     */
    initColumns = () => {
        this.columns = [
            {
                width: 50,
                title: '编号',
                dataIndex: 'task_id',
                sorter: (a, b) => {
                    return a.task_id - b.task_id;
                },
                ...getColumnSearchProps.call(this,'task_id', "编号"),
            },
            {
                width: 90,
                title: '任务名称',
                dataIndex: 'task_name',
                ...getColumnSearchProps.call(this,'task_name', "任务名称"),
            },
            {
                width: 50,
                title: '任务级别',
                dataIndex: 'task_level',
                sorter: (a, b) => {
                    return a.task_level - b.task_level;
                },
                ...getColumnSearchProps.call(this,'task_level', "任务级别"),
            },
            {
                width: 60,
                title: '走失者姓名',
                dataIndex: 'lostinfo.lost_name',
                ...getColumnSearchProps.call(this,'lost_name', "走失者姓名"),
            },
            {
                width: 60,
                title: '走失者性别',
                dataIndex: 'lostinfo.lost_gender',
                ...getColumnSearchProps.call(this,'lost_gender', "走失者性别'"),
                render: (gender) => gender === 1 ? '男' : '女',  // 当前指定了对应的属性, 传入的是对应的属性值
                onFilter: (value, record) => {
                    const lost_gender = record["lostinfo.lost_age"] ? '男' : '女';
                    return record["lostinfo.lost_age"] !== undefined ? lost_gender === value : ""
                }
            },
            {
                width: 60,
                title: '走失者年龄',
                dataIndex: 'lostinfo.lost_age',
                sorter: (a, b) => {
                    return a.lostinfo.lost_age - b.lostinfo.lost_age;
                },
                ...getColumnSearchProps.call(this,'lostinfo.lost_age', "走失者年龄"),
            },
            {
                width: 150,
                title: '走失地点',
                dataIndex: 'lostinfo.lost_place',
                ...getColumnSearchProps.call(this,'lostinfo.lost_age', "走失地点"),
            },
            {
                width: 80,
                title: '启动时间',
                dataIndex: 'start_time',
                sorter: (a, b) => {
                    return new Date(a.start_timestamp).getTime() - new Date(b.start_timestamp).getTime();
                },
                ...getColumnSearchProps.call(this,'start_time', "启动时间"),
                render: (start_time) => formateDate(start_time)
            },
            {
                width: 80,
                title: '结束时间',
                dataIndex: 'end_time',
                sorter: (a, b) => {
                    return new Date(a.end_timestamp).getTime() - new Date(b.end_timestamp).getTime();
                },
                ...getColumnSearchProps.call(this,'end_timestamp', "结束时间"),
                render: (end_time) => formateDate(end_time)
            },
            {
                width: 50,
                title: '任务状态',
                dataIndex: 'status',
                ...getColumnSearchProps.call(this,'status', "任务状态"),
                render: (status) => this.state.statuses[status - 1],
                onFilter: (value, record) => {
                    const status =  this.state.statuses[record["status"] - 1];
                    return record["status"] !== undefined ? status === value : ""
                }
            },
            {
                width: 60,
                title: '操作',
                render: (task) => {
                    return (
                        <span>
                            {/*将task对象使用state传递给目标路由组件*/}
                            <LinkButton onClick={() => this.showUpdate(task)}>详情</LinkButton>
                            <LinkButton onClick={() => this.deleteTask(task)}>删除</LinkButton>
                        </span>
                    )
                }
            },
        ];
    }

    /**
     * 删除任务
     */
    deleteTask = (task) => {
        Modal.confirm({
            title: `确认删除${task.task_name}吗?`,
            onOk: async () => {
                const result = await reqDeleteTask(task.task_id);
                console.log("delete use",result);
                if (result.status === 0 || result.data.details == "Not found.") {
                    message.error('删除任务失败');
                } else {
                    message.success('删除任务成功!')
                    await this.getTasks();
                }
            }
        })
    }

    /*
    显示修改任务界面
     */
    showUpdate = async (task) => {
        // const response = await reqTaskMoreInfosByTaskId(task.task_id);
        // if(response && response.status==0){
        //     const reslut = response.result;
        //     const data = reslut[0];
        //     console.log('task home data',data);
        //     const mission_id = task.task_id;
        //     const status = task.status;
        //     this.props.history.push('/home/command', {data, mission_id, status})
        // }else{
        //     message.error("获取任务信息失败，请检查网络连接！");
        // }
        // console.log("task detail enter response",response);

        console.log('task home task',task);
        const data = task;
        const mission_id = task.task_id;
        const status = task.status;
        this.props.history.push('/home/command', {data, mission_id, status})
    }


    /**
     * 获取指定页码的列表数据显示
     */
    getTasks = async () => {
        this.setState({loading: true}) // 显示loading

        const response = await reqTaskMoreInfos();

        console.log("task home response",response);

        this.setState({loading: false}) // 隐藏loading
        if (response && response.status == 0) {
            // 取出分页数据, 更新状态, 显示分页列表
            const tasks= response.result;
            console.log("task home",tasks);
            this.setState({
                tasks,
            })
        }else{
            message.error("获取任务列表失败，请检查网络连接！");
        }
    }

    /**
     * 更新退出任务申请的状态
     */
    updateStatus = async (id, newStatus) => {
        // const result = await reqUpdateStatus(taskId, status)
        // if (result.status === 0) {
        //     message.success('更新商品成功')
        //     this.getTasks(this.pageNum)
        // }
        // this.setState({
        //      status:1,
        //     })
        console.log('更新状态')
    }

    async componentDidMount() {
        this.initColumns()
        // const data = [];
        // for(let i = 0; i < task_data.items.length; i++){
        //     data.push({...task_data.items[i], ...incident_data.items[i]})
        // }
        // this.setState({
        //     data: data,
        // })
        await this.getTasks();
    }

    render() {
        // 取出状态数据
        const {loading, searchType, searchName, tasks} = this.state;

        // const title = (
        //     <span>
        //         <Select
        //             value={searchType}
        //             style={{width: 160}}
        //             onChange={value => this.setState({searchType: value})}
        //         >
        //             <Option value='taskName'>按任务名称搜索</Option>
        //             <Option value='taskLevel'>按任务级别搜索</Option>
        //             <Option value='taskLevel'>按走失者姓名搜索</Option>
        //             <Option value='taskLevel'>按走失地点搜索</Option>
        //         </Select>
        //         <Input
        //             placeholder='关键字'
        //             style={{width: 160, margin: '0 15px'}}
        //             value={searchName}
        //             onChange={event => this.setState({searchName: event.target.value})}
        //         />
        //         <Button type='primary' onClick={() => this.getTasks(1)}>搜索</Button>
        //     </span>
        // )

        const extra = (
            <Button type='primary' onClick={() => this.props.history.push('/incident/addUpdate')}>
                <Icon type='plus'/>
                添加任务
            </Button>
        )

        return (
            <Card title={"任务信息表"} extra={extra}>
                <Table
                    bordered
                    rowKey='task_id'
                    loading={loading}
                    dataSource={this.state.tasks}
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
