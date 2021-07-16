import React, {Component} from 'react'
import {Button, Card, Icon, Table} from 'antd'

import LinkButton from '../../components/link-button'
import {PAGE_SIZE} from '../../utils/constants'
import SearchBar from "../../components/search-bar";
// import {incident_data} from "../../utils/mockUtils.new";
import {formateDate} from "../../utils/dateUtils";
import {reqIncidents} from "../../api";
import getColumnSearchProps from "../../utils/getColumnSearchProps";
/*
Incident的默认子路由组件
 */
export default class IncidentHome extends Component {

    constructor(props) {
        super(props);
        this.inputRef = React.createRef();
        this.state = {
            total: 0, // 商品的总数量
            incidents: [],
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
            ],
            searchText: '',
            searchedColumn: '',
        };
    }




    /**
     * 初始化table的列的数组
     */
    initColumns = () => {
        this.columns = [
            {
                width: 50,
                title: '编号',
                dataIndex: 'incident_id',
                sorter: this.sortById,
                ...getColumnSearchProps.call(this,'incident_id', "走失者编号"),

            },
            {
                width: 50,
                title: '走失者姓名',
                dataIndex: 'lost_name',
            },
            {
                width: 50,
                title: '走失者性别',
                dataIndex: 'lost_gender',
                render: (gender) => gender === 1 ? '男' : '女'  // 当前指定了对应的属性, 传入的是对应的属性值
            },
            {
                width: 50,
                title: '走失者年龄',
                dataIndex: 'lost_age',
            },
            {
                width: 80,
                title: '走失时间',
                dataIndex: 'lost_time',
                render: (lost_time) => formateDate(lost_time)
            },
            {
                width: 200,
                title: '走失地点',
                dataIndex: 'lost_place',
            },
            {
                width: 50,
                title: '报失者姓名',
                dataIndex: 'reporter_name',
            },
            {
                width: 50,
                title: '报失者性别',
                dataIndex: 'reporter_gender',
                render: (gender) => gender === 1 ? '男' : '女'  // 当前指定了对应的属性, 传入的是对应的属性值
            },
            {
                width: 80,
                title: '报失者电话',
                dataIndex: 'reporter_phone',
            },
            {
                width: 60,
                title: '操作',
                render: (data) => {
                    return (
                        <span>
                            {/*将incident对象使用state传递给目标路由组件*/}
                            <LinkButton
                                onClick={() => this.props.history.push('/incident/addUpdate', {incident: data})}>详情</LinkButton>
                            <LinkButton onClick={() => this.deleteIncident(data)}>删除</LinkButton>
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

    // 排序函数
    sortById = (a, b) => {
        return a.incident_id - b.incident_id;
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
            console.log(searchType, searchName);
            this.setState({loading: true}) // 显示loading

            // 如果搜索关键字有值, 说明我们要做搜索分页
            let result = {
                status: 0,
                data: {
                    total: 0,
                    list: [],
                }
            }

            if (searchName) {
                // result = await reqSearchIncidents({pageNum, pageSize: PAGE_SIZE, searchName, searchType})
            } else { // 一般分页请求
                result = await reqIncidents()
            }
            const total = result.length;
            console.log(result);
            this.setState({loading: false}) // 隐藏loading
            if (total) {
                // 取出分页数据, 更新状态, 显示分页列表
                this.setState({
                    total,
                    incidents: result.sort(this.sortById)
                })
            }
            console.log(searchType, searchName);
        }
    }

    // TODO
    componentDidMount() {
        // this.setPageNum(1);
        this.initColumns();
        this.pageNum = 1;
        this.getIncidents()();
    }

    render() {

        // 取出状态数据
        const {incidents, total, loading, searchTypes} = this.state;
        console.log(incidents);

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
                {/* 下方 pagination 的配置未进行 filter 时的适配 */}
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
