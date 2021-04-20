import React, {Component} from 'react'
import {Card, List, Select,} from 'antd'
import SearchBar from "../../components/search-bar";
import ItemDetail from "../../components/lost-detail";
import {incident_data, task_data} from "../../utils/mockUtils.new";

import './home.less'

const Option = Select.Option;
export default class Home extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isVisited: true,
            total: 0, // 商品的总数量
            tasksInProgress: [
                {
                    id: 1,
                    taskName: "正在进行的任务1",
                    theLostName: "张三",
                },
                {
                    id: 2,
                    taskName: "正在进行的任务2",
                    theLostName: "李四",
                },
                {
                    id: 3,
                    taskName: "正在进行的任务3",
                    theLostName: "王五",
                },
                {
                    id: 4,
                    taskName: "正在进行的任务4",
                    theLostName: "张三",
                },
                {
                    id: 5,
                    taskName: "正在进行的任务5",
                    theLostName: "李四",
                },
                {
                    id: 6,
                    taskName: "正在进行的任务6",
                    theLostName: "王五",
                },
                {
                    id: 7,
                    taskName: "正在进行的任务7",
                    theLostName: "张三",
                },
                {
                    id: 8,
                    taskName: "正在进行的任务8",
                    theLostName: "李四",
                },
                {
                    id: 9,
                    taskName: "正在进行的任务9",
                    theLostName: "王五",
                }
            ], // 正在进行任务的数组
            loading: false, // 是否正在加载中
            searchName: '', // 搜索的关键字
            searchTypes: [
                {
                    value: "theLostName",
                    title: "按走失者姓名搜索"
                },
                {
                    value: "reporterName",
                    title: "按报失者姓名搜索"
                },
                {
                    value: "reporterTelephoneNumber",
                    title: "按报失者电话搜索"
                },
                {
                    value: "taskName",
                    title: "按任务名称搜索"
                },
                {
                    value: "taskLevel",
                    title: "按任务级别搜索"
                },
            ]
        }
    }


    showDetails = (taskId) => {
        return () => {
            console.log("showDetails taskId", taskId)
        }
    }

    handleChange = (isVisited) => {
        return () => this.setState({isVisited})
    }

    getData = (searchType,searchName) => {
        return () => {
            console.log("searchName", searchName);
            console.log("searchType", searchType);
        }
    }

    searchStatus = (lost_id) => {
        const items = task_data.items;
        for (let x in items){
            if(items[x].lost_id === lost_id)
                return items[x].status;
        }
        return 0;
    }

    render() {
        const {isVisited, tasksInProgress, searchTypes, searchName} = this.state
        console.log("searchName", searchName);

        return (
            <div className='home'>
                <header className='header'>
                    <h1>正在进行{tasksInProgress.length}项救援行动</h1>
                </header>
                <SearchBar searchTypes={searchTypes} searchName={searchName} getData={this.getData}/>
                <hr className='divider'/>
                <List
                    className='task-list'
                    grid={{
                        gutter: 16,
                        xs: 1,
                        sm: 1,
                        md: 1,
                        lg: 1,
                        xl: 2,
                        xxl: 2,
                        column: 2,
                    }}
                    dataSource={incident_data.items}
                    renderItem={item => {
                        const incident_id = item.incident_id;
                        const missions = task_data.items;
                        let status = 0, mission_id = -1;
                        for (let x in missions){
                            if(missions[x].incident_id === incident_id){
                                status = missions[x].status;
                                mission_id = missions[x].task_id;
                            }
                        }
                        return (
                            <List.Item onClick={this.showDetails(item.id)}>
                                <ItemDetail
                                    history={this.props.history}
                                    data={item}
                                    status={status}
                                    mission_id={mission_id}
                                />
                            </List.Item>
                        )
                    }}
                />
            </div>

        )
    }
}
