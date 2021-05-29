import React, {Component} from 'react'
import {Card, List, Select,} from 'antd'
import SearchBar from "../../components/search-bar";
import ItemDetail from "../../components/lost-detail";
import {incident_data, task_data} from "../../utils/mockUtils.new";

import './home.less'
import {connect} from "react-redux";
import {getIncidents} from "../../redux/actions";
import {Redirect} from "react-router-dom";
import {reqIncidents, reqTaskMoreInfos} from "../../api";

const Option = Select.Option;
class Home extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isVisited: true,
            total: 0, // 商品的总数量
            tasks: [],
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

    getData =  (searchType,searchName) => {
        return async () => {
            let response = {};
            this.setState(() => ({
                loading: true,
            }))
            if(searchName){
                // TODO 搜索功能
            } else {
                response = await reqTaskMoreInfos();
            }
            if(response.status === 0){
                const result = response.result;
                console.log(result);
                this.setState({loading: false}) // 隐藏loading
                if (result) {
                    // 取出分页数据, 更新状态, 显示分页列表
                    this.setState({
                        total: result.length,
                        tasks: result
                    })
                }
            }

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

    componentDidMount() {
        this.getData()();
    }

    render() {
        const {loading, searchTypes, searchName, tasks} = this.state

        return (
            <div className='home'>
                <header className='header'>
                    <h1>正在进行{tasks.length}项救援行动</h1>
                </header>
                <SearchBar searchTypes={searchTypes} searchName={searchName} getData={this.getData}/>
                <hr className='divider'/>
                <List
                    className='task-list'
                    loading={loading}
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
                    dataSource={tasks}
                    renderItem={item => {
                        return (
                            <List.Item onClick={this.showDetails(item.id)}>
                                <ItemDetail
                                    history={this.props.history}
                                    data={item}
                                    status={item.status}
                                    mission_id={item.task_id}
                                />
                            </List.Item>
                        )
                    }}
                />
            </div>

        )
    }
}

const mapStateToProps = (state) => ({
    incidents: state.incident.incidents,
    user: state.user
});
const mapDispatchToProps = (dispatch) => {
    return {
        getIncidents: () => dispatch(getIncidents)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
