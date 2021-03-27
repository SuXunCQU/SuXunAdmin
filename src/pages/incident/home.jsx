import React, {Component} from 'react'
import {Button, Card, Icon, Table} from 'antd'

import LinkButton from '../../components/link-button'
import {PAGE_SIZE} from '../../utils/constants'
import SearchBar from "../../components/search-bar";

/*
Incident的默认子路由组件
 */
export default class IncidentHome extends Component {

    state = {
        total: 0, // 商品的总数量
        incidents: [
            {
                id: 1,
                theLostName: "张三",
                theLostGender: 1,
                theLostAge: 65,
                lostTime: "2020-11-15 14:00",   // 根据上传的时间确定
                lostLocation: "重庆市沙坪坝区大学城熙街",
                theLostIDNumber: "",
                theLostPictures: "",
                theLostFeatures: "",
                reporterName: "李四",
                reporterGender: 1,
                reporterPhoneNumber: "17175758989",
                reporterIDNumber: "",
                reporterIDPictures: "",
                relationship: "",
                reporterLocation: "",
                reporterWeChat: "",
            },
            {
                id: 2,
                theLostName: "张三",
                theLostGender: 1,
                theLostAge: 65,
                lostTime: "2020-11-15 14:00",   // 根据上传的时间确定
                lostLocation: "重庆市沙坪坝区大学城熙街",
                theLostIDNumber: "",
                theLostPictures: "",
                theLostFeatures: "",
                reporterName: "李四",
                reporterGender: 1,
                reporterPhoneNumber: "17175758989",
                reporterIDNumber: "",
                reporterIDPictures: "",
                relationship: "",
                reporterLocation: "",
                reporterWeChat: "",
            },
            {
                id: 3,
                theLostName: "张三",
                theLostGender: 1,
                theLostAge: 65,
                lostTime: "2020-11-15 14:00",   // 根据上传的时间确定
                lostLocation: "重庆市沙坪坝区大学城熙街",
                theLostIDNumber: "",
                theLostPictures: "",
                theLostFeatures: "",
                reporterName: "李四",
                reporterGender: 1,
                reporterPhoneNumber: "17175758989",
                reporterIDNumber: "",
                reporterIDPictures: "",
                relationship: "",
                reporterLocation: "",
                reporterWeChat: "",
            },
            {
                id: 4,
                theLostName: "张三",
                theLostGender: 1,
                theLostAge: 65,
                lostTime: "2020-11-15 14:00",   // 根据上传的时间确定
                lostLocation: "重庆市沙坪坝区大学城熙街",
                theLostIDNumber: "",
                theLostPictures: "",
                theLostFeatures: "",
                reporterName: "李四",
                reporterGender: 1,
                reporterPhoneNumber: "17175758989",
                reporterIDNumber: "",
                reporterIDPictures: "",
                relationship: "",
                reporterLocation: "",
                reporterWeChat: "",
            },
            {
                id: 5,
                theLostName: "张三",
                theLostGender: 1,
                theLostAge: 65,
                lostTime: "2020-11-15 14:00",   // 根据上传的时间确定
                lostLocation: "重庆市沙坪坝区大学城熙街",
                theLostIDNumber: "",
                theLostPictures: "",
                theLostFeatures: "",
                reporterName: "李四",
                reporterGender: 1,
                reporterPhoneNumber: "17175758989",
                reporterIDNumber: "",
                reporterIDPictures: "",
                relationship: "",
                reporterLocation: "",
                reporterWeChat: "",
            },
            {
                id: 6,
                theLostName: "张三",
                theLostGender: 1,
                theLostAge: 65,
                lostTime: "2020-11-15 14:00",   // 根据上传的时间确定
                lostLocation: "重庆市沙坪坝区大学城熙街",
                theLostIDNumber: "",
                theLostPictures: "",
                theLostFeatures: "",
                reporterName: "李四",
                reporterGender: 1,
                reporterPhoneNumber: "17175758989",
                reporterIDNumber: "",
                reporterIDPictures: "",
                relationship: "",
                reporterLocation: "",
                reporterWeChat: "",
            },
            {
                id: 7,
                theLostName: "张三",
                theLostGender: 1,
                theLostAge: 65,
                lostTime: "2020-11-15 14:00",   // 根据上传的时间确定
                lostLocation: "重庆市沙坪坝区大学城熙街",
                theLostIDNumber: "",
                theLostPictures: "",
                theLostFeatures: "",
                reporterName: "李四",
                reporterGender: 1,
                reporterPhoneNumber: "17175758989",
                reporterIDNumber: "",
                reporterIDPictures: "",
                relationship: "",
                reporterLocation: "",
                reporterWeChat: "",
            },
            {
                id: 8,
                theLostName: "张三",
                theLostGender: 1,
                theLostAge: 65,
                lostTime: "2020-11-15 14:00",   // 根据上传的时间确定
                lostLocation: "重庆市沙坪坝区大学城熙街",
                theLostIDNumber: "",
                theLostPictures: "",
                theLostFeatures: "",
                reporterName: "李四",
                reporterGender: 1,
                reporterPhoneNumber: "17175758989",
                reporterIDNumber: "",
                reporterIDPictures: "",
                relationship: "",
                reporterLocation: "",
                reporterWeChat: "",
            },
            {
                id: 9,
                theLostName: "张三",
                theLostGender: 1,
                theLostAge: 65,
                lostTime: "2020-11-15 14:00",   // 根据上传的时间确定
                lostLocation: "重庆市沙坪坝区大学城熙街",
                theLostIDNumber: "",
                theLostPictures: "",
                theLostFeatures: "",
                reporterName: "李四",
                reporterGender: 1,
                reporterPhoneNumber: "17175758989",
                reporterIDNumber: "",
                reporterIDPictures: "",
                relationship: "",
                reporterLocation: "",
                reporterWeChat: "",
            },
            {
                id: 10,
                theLostName: "张三",
                theLostGender: 1,
                theLostAge: 65,
                lostTime: "2020-11-15 14:00",   // 根据上传的时间确定
                lostLocation: "重庆市沙坪坝区大学城熙街",
                theLostIDNumber: "",
                theLostPictures: "",
                theLostFeatures: "",
                reporterName: "李四",
                reporterGender: 1,
                reporterPhoneNumber: "17175758989",
                reporterIDNumber: "",
                reporterIDPictures: "",
                relationship: "",
                reporterLocation: "",
                reporterWeChat: "",
            },
            {
                id: 11,
                theLostName: "张三",
                theLostGender: 1,
                theLostAge: 65,
                lostTime: "2020-11-15 14:00",   // 根据上传的时间确定
                lostLocation: "重庆市沙坪坝区大学城熙街",
                theLostIDNumber: "",
                theLostPictures: "",
                theLostFeatures: "",
                reporterName: "李四",
                reporterGender: 1,
                reporterPhoneNumber: "17175758989",
                reporterIDNumber: "",
                reporterIDPictures: "",
                relationship: "",
                reporterLocation: "",
                reporterWeChat: "",
            },
            {
                id: 12,
                theLostName: "张三",
                theLostGender: 1,
                theLostAge: 65,
                lostTime: "2020-11-15 14:00",   // 根据上传的时间确定
                lostLocation: "重庆市沙坪坝区大学城熙街",
                theLostIDNumber: "",
                theLostPictures: "",
                theLostFeatures: "",
                reporterName: "李四",
                reporterGender: 1,
                reporterPhoneNumber: "17175758989",
                reporterIDNumber: "",
                reporterIDPictures: "",
                relationship: "",
                reporterLocation: "",
                reporterWeChat: "",
            },
        ], // 走失事件的数组
        loading: false, // 是否正在加载中
        searchTypes: [
            {
                value: 'theLostName',
                title: '按走失者姓名搜索',
            },
            {
                value: 'lostLocation',
                title: '按走失地点搜索',
            },
            {
                value: 'reporterName',
                title: '按报失者姓名搜索',
            },
            {
                value: 'reporterPhoneNumber',
                title: '按报失者电话搜索',
            },
        ]
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
                width: 50,
                title: '走失者年龄',
                dataIndex: 'theLostAge',
            },
            {
                width: 80,
                title: '走失时间',
                dataIndex: 'lostTime',
            },
            {
                width: 200,
                title: '走失地点',
                dataIndex: 'lostLocation',
            },
            {
                width: 50,
                title: '报失者姓名',
                dataIndex: 'reporterName',
            },
            {
                width: 50,
                title: '报失者性别',
                dataIndex: 'reporterGender',
                render: (gender) => gender === 1 ? '男' : '女'  // 当前指定了对应的属性, 传入的是对应的属性值
            },
            {
                width: 80,
                title: '报失者电话',
                dataIndex: 'reporterPhoneNumber',
            },
            {
                width: 60,
                title: '操作',
                render: (incident) => {
                    return (
                        <span>
                            {/*将incident对象使用state传递给目标路由组件*/}
                            <LinkButton
                                onClick={() => this.props.history.push('/incident/addUpdate', {incident})}>详情</LinkButton>
                            <LinkButton onClick={() => this.deleteIncident(incident)}>删除</LinkButton>
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
    deleteIncident = () => {
        alert('是否删除');
        // console.log('')
    }

    /**
     * 改变页码并获取数据
     */
    setPageNum = (pageNum) => {
        this.pageNum = pageNum // 保存pageNum, 让其它方法可以看到
        console.log('pageNum', pageNum);
        this.getIncidents(this.searchType, this.searchName);
    }


    /**
     * 获取数据
     */
    getIncidents = (searchType, searchName) => {
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


    // TO DO
    componentDidMount() {
        // this.setPageNum(1);
        this.pageNum = 1;
    }

    render() {

        // 取出状态数据
        const {incidents, total, loading, searchTypes} = this.state

        const title = (
            <SearchBar searchTypes={searchTypes} getData={this.getIncidents}/>
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
                        // current:this.pageNum,
                        total,
                        defaultPageSize: PAGE_SIZE,
                        showQuickJumper: true,
                        onChange: this.setPageNum,
                    }}
                />
            </Card>
        )
    }
}
