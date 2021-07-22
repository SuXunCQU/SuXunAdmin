import React, {Component} from 'react'
import {Button, Card, Icon, message, Modal, Table} from 'antd'
import LinkButton from "../../../../components/link-button/index"
// import {reqDeleteUser, reqUsers, reqAddOrUpdateUser} from "../../api/index";
import AddForm from './add-form'
import SearchBar from "../../../../components/search-bar";
import {
    reqAddExitTask,
    reqAddRole,
    reqDeleteExitTask,
    reqDeleteMember,
    reqExitTasks,
    reqMembers, reqTaskMoreInfos, reqUpdateExitTask
} from "../../../../api";
import getColumnSearchProps from "../../../../utils/getColumnSearchProps";

/**
 * ExitTask的默认路由组件
 */
export default class User extends Component {

    state = {
        total: 0, // 退出任务申请总数量
        exitTasks: [], // 退出任务申请的数组
        loading: false, // 是否正在加载中
        isShow: false, // 是否展示添加弹出框
    }

    /**
     * 初始化table的列的数组
     */
    initColumns = () => {
        this.columns = [
            {
                width: 50,
                title: '申请编号',
                dataIndex: 'apply_id',
                ...getColumnSearchProps.call(this,'apply_id', "申请编号"),
            },
            {
                width: 50,
                title: '队员编号',
                dataIndex: 'member_info.member_id',
                ...getColumnSearchProps.call(this,'member_info.member_id', "队员编号"),
            },
            {
                width: 50,
                title: '队员性别',
                dataIndex: 'member_info.member_gender',
                ...getColumnSearchProps.call(this,'member_info.member_gender', "队员编号"),
                render: (gender) => gender === 1 ? '男' : '女',
                onFilter: (value, record) => {
                    const member_gender = record["member_info.member_gender"] ? '男' : '女';
                    return record["member_info.member_gender"] !== undefined ? member_gender === value : ""
                }
            },
            {
                width: 50,
                title: '队员年龄',
                dataIndex: 'member_info.member_age',
                ...getColumnSearchProps.call(this,'member_info.member_age', "队员编号"),
            },
            {
                width: 80,
                title: '队员电话',
                dataIndex: 'member_info.member_phone',
                ...getColumnSearchProps.call(this,'member_info.member_phone', "队员电话"),
            },
            {
                width: 150,
                title: '队员家庭住址',
                dataIndex: 'member_info.member_address',
                ...getColumnSearchProps.call(this,'member_info.member_id', "队员家庭住址"),
            },
            {
                width: 200,
                title: '申请理由',
                dataIndex: 'reason',
                ...getColumnSearchProps.call(this,'reason', "申请理由"),
            },
            {
                width: 80,
                title: '状态',
                render: (exitTask) => {
                    const {apply_id,status} = exitTask
                    const newStatus = 1;
                    return (
                        <span>
                              <span>
                                  {status === 1 ? '已通过' :
                                      <Button
                                          type='primary'
                                          onClick={() => this.updateStatus(apply_id,newStatus)}
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
                            <LinkButton onClick={() => this.deleteExitTask(exitTask)}>删除</LinkButton>
                        </span>
                    )
                }
            },
        ];
    }

    /**
     * 修改申请状态
     * @param apply_id
     * @param newStatus
     */
    updateStatus= async (apply_id,newStatus)=>{
        const response = await reqUpdateExitTask({apply_id:apply_id,status:newStatus});
        console.log("updateStatus",response);
        if(response){
            message.success("批准退出任务申请成功！");
            await this.getExitTasks();
        }else{
            message.error("批准退出任务申请失败，请检查网络连接！");
        }
    }


    /**
     * 添加退出任务申请
     */
    addExitTask = () => {
        // 进行表单验证, 只能通过了才向下处理
        this.form.validateFields(async (error, values) => {
            if (!error) {

                console.log("values",values);

                // 隐藏确认框
                this.setState({
                    isShow: false
                })

                // 收集输入数据
                const {member_id,reason} = values;
                const {mission_id} = this.props.location.state;
                this.form.resetFields()

                // 请求添加
                const data = {
                    'member_id':member_id,
                    'task_id':mission_id,
                    'reason':reason,
                }
                const result = await reqAddExitTask(data);
                // 根据结果提示/更新列表显示
                console.log('addExitTaskResult',result);
                if (result) {
                    message.success('添加角色成功')
                    await this.getExitTasks();
                } else {
                    message.error('添加角色失败')
                }

            }
        })


    }


    /**
     * 删除指定退出任务申请
     */
    deleteExitTask = (exitTask) => {
        Modal.confirm({
            title: `确认删除 ${exitTask.member_info.member_name} 的退出任务申请吗?`,
            onOk: async () => {
                const result = await reqDeleteExitTask(exitTask.apply_id);
                console.log("delete use",result);
                if (result.status === 0 || result.details == "Not found.") {
                    message.error('删除任务失败');
                } else {
                    message.success('删除任务成功!')
                    await this.getExitTasks();
                }
            }
        })
    }

    getExitTasks = async () => {
        this.setState({loading: true}) // 显示loading

        const response = await reqExitTasks();

        console.log("exitTasks home response",response);

        this.setState({loading: false}) // 隐藏loading
        if (response && response.status == 0) {
            const exitTasks= response.result;
            console.log("task home",exitTasks);
            this.setState({
                exitTasks,
            })
        }else{
            message.error("获取退出任务申请数据失败！请检查网络连接！");
        }
    }

    async componentDidMount() {
        this.initColumns();
        await this.getExitTasks();
    }


    render() {

        // 取出状态数据
        const {exitTasks, total, loading, isShow} = this.state

        console.log(isShow);
        const returnPre = (
            <span>
                <LinkButton onClick={() => this.props.history.goBack()}>
                    <Icon type='arrow-left' style={{fontSize: 20}}/>
                </LinkButton>
                <span>退出任务审批</span>
            </span>
        )

        const extra = (
            <Button type='primary' onClick={() => this.setState({isShow: true})}>
                <Icon type='plus' />
                添加任务退出申请
            </Button>
        )

        return (
            <Card title={returnPre}>
                <Card title={'退出任务审批表'} extra={extra}>
                    <Table
                        bordered
                        rowKey='id'
                        dataSource={exitTasks}
                        columns={this.columns}
                        pagination={{defaultPageSize: 10}}
                    />

                </Card>
                <Modal
                    title={'添加退出任务申请'}
                    visible={isShow}
                    onOk={this.addExitTask}
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
