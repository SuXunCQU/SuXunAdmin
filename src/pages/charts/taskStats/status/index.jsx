import React, {Component} from 'react'
import {Button, Card} from "antd";
import ReactEcharts from "echarts-for-react";

/**
 * 队员状态统计的路由组件
 * 饼图
 */
export default class Status extends Component {

    state = {
        sales: [5, 20, 36, 10, 10, 20], // 销量的数组
        stores: [6, 10, 25, 20, 15, 10], // 库存的数组
    }

    update = () => {
        this.setState(state => ({
            sales: state.sales.map(sale => sale + 1),
            stores: state.stores.reduce((pre, store) => {
                pre.push(store - 1)
                return pre
            }, []),
        }))
    }

    /*
    返回柱状图的配置对象
     */
    getOption = () => {
        let statusData = [1048, 735]
        const option = {
            title: {
                text: '当前队员出勤情况统计',
                left: 'center'
            },
            tooltip: {
                trigger: 'item'
            },
            legend: {
                orient: 'vertical',
                left: 'left',
            },
            series: [
                {
                    name: '出勤状态',
                    type: 'pie',
                    radius: '50%',
                    data: [
                        {value: statusData[0], name: '正在出勤'},
                        {value: statusData[1], name: '未出勤'},
                    ],
                    itemStyle: {
                        normal: {
                            label: {
                                show: true,
                                formatter: '{b} : {c} ({d}%)'
                            },
                            labelLine: {show: true}
                        },
                        emphasis: {
                            label: {
                                show: true,
                                formatter: "{b}\n{c} ({d}%)",
                                position: 'center',
                                textStyle: {
                                    fontSize: '30',
                                    fontWeight: 'bold'
                                }
                            }
                        }
                    }
                }
            ],
        };
        return option;
    }

    render() {
        const title = (
            <Button type='primary' onClick={this.update}>更新</Button>
        )

        return (
                <ReactEcharts option={this.getOption()}/>
        )
    }
}
