import React, {Component} from 'react'
import {Button, Card, Icon, message, Modal, Table} from 'antd'

import LinkButton from '../../../../components/link-button'
import {PAGE_SIZE} from '../../../../utils/constants'
import SearchBar from "../../../../components/search-bar";
import AddForm from "./add-form";
import {
    reqAddFinishTask,
    reqDeleteFinishTask,
    reqFinishTaskByTaskId,
    reqFinishTasks, reqFinishTasksByTaskId,
    reqUpdateFinishTask
} from "../../../../api";
import getColumnSearchProps from "../../../../utils/getColumnSearchProps";
import {getRoles, receiveRoles} from "../../../../redux/actions";
import {connect} from "react-redux";

/**
 * 退出任务的默认子路由组件
 */
class FinishTaskHome extends Component {


    certificatePictureWall = null;
    groupPictureWall = null;

    state = {
        total: 0, // 商品的总数量
        finishTasks: [], // 任务完成申请的数组
        loading: false, // 是否正在加载中
        isShowAdd: false, // 是否显示添加申请界面
        task_id: null,
    }

    constructor(props) {
        super(props);
        this.state = {
            task_id: props.location.state.mission_id,
        };
    }

    /**
     * 初始化table的列的数组
     */
    initColumns = () => {
        this.columns = [
            {
                width: 50,
                title: '申请编号',
                dataIndex: 'finish_id',
                ...getColumnSearchProps.call(this,'finish_id', "申请编号"),
            },
            {
                width: 50,
                title: '队员编号',
                dataIndex: 'member_info.member_id',
                ...getColumnSearchProps.call(this,'member_info.member_id', "队员编号"),
            },
            {
                width: 50,
                title: '队员姓名',
                dataIndex: 'member_info.member_name',
                ...getColumnSearchProps.call(this,'member_info.member_name', "队员姓名"),
            },
            {
                width: 50,
                title: '队员性别',
                dataIndex: 'member_info.member_gender',
                ...getColumnSearchProps.call(this,'member_info.member_gender', "队员性别"),
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
                ...getColumnSearchProps.call(this,'member_info.member_age', "队员年龄"),
            },
            {
                width: 80,
                title: '队员电话',
                dataIndex: 'member_info.member_phone',
                ...getColumnSearchProps.call(this, 'member_info.member_phone', "队员电话"),
            },
            {
                width: 50,
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
                                onClick={() => this.props.history.push('/home/command/finishTask/approve', {finish_id:finishTask.finish_id})}>审核</LinkButton>
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
        this.setState({isShowAdd: true})
    }

    setCertificatePictureWall = (ref) => this.certificatePictureWall = ref;

    setGroupPictureWall = (ref) => this.groupPictureWall = ref;


    /**
     * 添加退出任务申请
     */
    addFinishTask = () => {
        // 进行表单验证, 只能通过了才向下处理
        this.form.validateFields(async (error, values) => {
            if (!error) {
                this.certificatePictureWall.handleUpload();
                this.groupPictureWall.handleUpload();

                console.log("values",values);

                // 隐藏确认框
                this.setState({
                    isShowAdd: false
                })

                const data = {};
                data.location = values.location;
                data.groupPhoto = this.groupPictureWall.state.fileList.map((file) => file.name).join(",");;
                data.certificatePhoto= this.certificatePictureWall.state.fileList.map((file) => file.name).join(",");;
                data.task_id = this.state.task_id;
                this.form.resetFields();

                const result = await reqAddFinishTask(data);
                // 根据结果提示/更新列表显示
                console.log('addFinishTaskResult',result);
                if (result) {
                    message.success('添加任务完成申请成功')
                    await this.getFinishTasks();
                } else {
                    message.error('添加任务完成申请失败')
                }

            }
        })


    }


    /**
     * 删除指定任务完成申请
     */
    deleteFinishTask = (finishTask) => {
        Modal.confirm({
            title: `确认删除 ${finishTask.member_info.member_name} 的任务完成申请吗?`,
            onOk: async () => {
                const result = await reqDeleteFinishTask(finishTask.apply_id);
                console.log("delete use",result);
                if (result.status === 0 || result.details == "Not found.") {
                    message.error('删除任务完成申请失败');
                } else {
                    message.success('删除任务完成申请成功!')
                    await this.getFinishTasks();
                }
            }
        })
    }

    getFinishTasks = async () => {

        const {task_id} = this.state;

        this.setState({loading: true}) // 显示loading

        const response = await reqFinishTasksByTaskId(task_id);

        console.log("finishTasks home response",response);

        this.setState({loading: false}) // 隐藏loading
        if (response && response.status == 0) {
            const finishTasks= response.result;
            console.log("task home",finishTasks);
            this.setState({
                finishTasks,
            })
        }else{
            message.error("获取退出任务申请数据失败！请检查网络连接！");
        }
    }

    async componentDidMount() {
        this.initColumns();
        await this.getFinishTasks();
    }


    render() {

        // 取出状态数据
        const {finishTasks, total, loading, isShowAdd} = this.state

        const returnPre = (
            <span>
                <LinkButton onClick={() => this.props.history.goBack()}>
                    <Icon type='arrow-left' style={{fontSize: 20}}/>
                </LinkButton>
                <span>任务完成审批</span>
            </span>
        )

        const extra = (
            <Button type='primary' onClick={this.showAdd}>
                <Icon type='plus'/>
                添加任务完成申请
            </Button>
        )


        return (
            <Card title={returnPre}>
                <Card title={'任务完成申请审批'} extra={extra}>
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
                    title='添加任务完成申请'
                    visible={isShowAdd}
                    okText='确认'
                    cancelText='取消'
                    onOk={this.addFinishTask}
                    onCancel={() => {
                        this.form.resetFields()
                        this.setState({isShowAdd: false})
                    }}
                >
                    <AddForm
                        setCertificatePictureWall = {this.setCertificatePictureWall}
                        setGroupPictureWall={this.setGroupPictureWall}
                        setForm={form => this.form = form}
                    />
                </Modal>
            </Card>
        )
    }
}

const mapStateToProps = (state) => ({
    user: state.user,
});


export default connect(mapStateToProps)(FinishTaskHome)
