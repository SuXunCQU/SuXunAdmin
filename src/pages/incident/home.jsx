import React, {Component} from 'react'
import {Button, Card, Icon, Input, message, Select, Table} from 'antd'

import LinkButton from '../../components/link-button'
import {reqIncidents, reqSearchIncidents, reqUpdateStatus} from '../../api'
import {PAGE_SIZE} from '../../utils/constants'
import memoryUtils from "../../utils/memoryUtils";

const Option = Select.Option

/*
Incident的默认子路由组件
 */
export default class IncidentHome extends Component {

    state = {
        total: 12, // 商品的总数量
        incidents: [
            {
                id: 1,
                theLostName: "张三",
                theLostGender: 1,
                theLostAge: 65,
                lostTime: "2020-11-15 14:00",   // 根据上传的时间确定
                lostLocation: "重庆市沙坪坝区大学城熙街",
            },
            {
                id: 2,
                theLostName: "张三",
                theLostGender: 1,
                theLostAge: 65,
                lostTime: "2020-11-15 14:00",   // 根据上传的时间确定
                lostLocation: "重庆市沙坪坝区大学城熙街",
            },
            {
                id: 3,
                theLostName: "张三",
                theLostGender: 1,
                theLostAge: 65,
                lostTime: "2020-11-15 14:00",   // 根据上传的时间确定
                lostLocation: "重庆市沙坪坝区大学城熙街",
            },
            {
                id: 4,
                theLostName: "张三",
                theLostGender: 1,
                theLostAge: 65,
                lostTime: "2020-11-15 14:00",   // 根据上传的时间确定
                lostLocation: "重庆市沙坪坝区大学城熙街",
            },
            {
                id: 5,
                theLostName: "张三",
                theLostGender: 1,
                theLostAge: 65,
                lostTime: "2020-11-15 14:00",   // 根据上传的时间确定
                lostLocation: "重庆市沙坪坝区大学城熙街",
            },
            {
                id: 6,
                theLostName: "张三",
                theLostGender: 1,
                theLostAge: 65,
                lostTime: "2020-11-15 14:00",   // 根据上传的时间确定
                lostLocation: "重庆市沙坪坝区大学城熙街",
            },
            {
                id: 7,
                theLostName: "张三",
                theLostGender: 1,
                theLostAge: 65,
                lostTime: "2020-11-15 14:00",   // 根据上传的时间确定
                lostLocation: "重庆市沙坪坝区大学城熙街",
            },
            {
                id: 8,
                theLostName: "张三",
                theLostGender: 1,
                theLostAge: 65,
                lostTime: "2020-11-15 14:00",   // 根据上传的时间确定
                lostLocation: "重庆市沙坪坝区大学城熙街",
            },
            {
                id: 9,
                theLostName: "张三",
                theLostGender: 1,
                theLostAge: 65,
                lostTime: "2020-11-15 14:00",   // 根据上传的时间确定
                lostLocation: "重庆市沙坪坝区大学城熙街",
            },
            {
                id: 10,
                theLostName: "张三",
                theLostGender: 1,
                theLostAge: 65,
                lostTime: "2020-11-15 14:00",   // 根据上传的时间确定
                lostLocation: "重庆市沙坪坝区大学城熙街",
            },
            {
                id: 11,
                theLostName: "张三",
                theLostGender: 1,
                theLostAge: 65,
                lostTime: "2020-11-15 14:00",   // 根据上传的时间确定
                lostLocation: "重庆市沙坪坝区大学城熙街",
            },
            {
                id: 12,
                theLostName: "张三",
                theLostGender: 1,
                theLostAge: 65,
                lostTime: "2020-11-15 14:00",   // 根据上传的时间确定
                lostLocation: "重庆市沙坪坝区大学城熙街",
            },
        ], // 走失事件的数组
        loading: false, // 是否正在加载中
        searchName: '', // 搜索的关键字
        searchType: 'theLostName', // 根据哪个字段搜索
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
                title: '走失者姓名',
                dataIndex: 'theLostName',
            },
            {
                width: 50,
                title: '走失者性别',
                dataIndex: 'theLostGender',
                render: (gender) => gender === 1 ? '男' : '女'  // 当前指定了对应的属性, 传入的是对应的属性值
            },
            {
                width: 100,
                title: '走失时间',
                dataIndex: 'lostTime',
            },
            {
                width: 200,
                title: '走失地点',
                dataIndex: 'lostLocation',
            },
            {
                width: 60,
                title: '操作',
                render: (incident) => {
                    return (
                        <span>
                            {/*将incident对象使用state传递给目标路由组件*/}
                            <LinkButton onClick={() => this.showDetail(incident)}>详情</LinkButton>
                            <LinkButton onClick={() => this.showUpdate(incident)}>删除</LinkButton>
                        </span>
                    )
                }
            },
        ];
    }

    /*
    显示商品详情界面
     */
    showDetail = (incident) => {
        // 缓存incident对象 ==> 给detail组件使用
        memoryUtils.incident = incident
        this.props.history.push('/incident/detail')
    }

    /*
    显示修改商品界面
     */
    showUpdate = (incident) => {
        // 缓存incident对象 ==> 给detail组件使用
        memoryUtils.incident = incident
        this.props.history.push('/incident/addupdate')
    }

    /*
    获取指定页码的列表数据显示
     */
    getIncidents = async (pageNum) => {
        this.pageNum = pageNum // 保存pageNum, 让其它方法可以看到
        this.setState({loading: true}) // 显示loading

        const {searchName, searchType} = this.state
        // 如果搜索关键字有值, 说明我们要做搜索分页
        let result
        if (searchName) {
            result = await reqSearchIncidents({pageNum, pageSize: PAGE_SIZE, searchName, searchType})
        } else { // 一般分页请求
            result = await reqIncidents(pageNum, PAGE_SIZE)
        }

        this.setState({loading: false}) // 隐藏loading
        if (result.status === 0) {
            // 取出分页数据, 更新状态, 显示分页列表
            const {total, list} = result.data
            this.setState({
                total,
                incidents: list
            })
        }
    }

    /*
    更新指定商品的状态
     */
    updateStatus = async (incidentId, status) => {
        const result = await reqUpdateStatus(incidentId, status)
        if (result.status === 0) {
            message.success('更新商品成功')
            this.getIncidents(this.pageNum)
        }
    }

    componentWillMount() {
        this.initColumns()
    }

    // componentDidMount() {
    //     this.getIncidents(1)
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
                    <Option value='theLostName'>按走失者姓名搜索</Option>
                    <Option value='lostLocation'>按走失地点搜索</Option>
                    <Option value='reporterName'>按报失者姓名搜索</Option>
                    <Option value='reporterTelephoneNumber'>按报失者电话搜索</Option>
                </Select>
                <Input
                    placeholder='关键字'
                    style={{width: 160, margin: '0 15px'}}
                    value={searchName}
                    onChange={event => this.setState({searchName: event.target.value})}
                />
                <Button type='primary' onClick={() => this.getIncidents(1)}>搜索</Button>
            </span>
        )

        const extra = (
            <Button type='primary' onClick={() => this.props.history.push('/incident/addUpdate')}>
                <Icon type='plus'/>
                添加走失事件
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
                        total,
                        defaultPageSize: PAGE_SIZE,
                        showQuickJumper: true,
                        onChange: this.getIncidents
                    }}
                />
            </Card>
        )
    }
}
