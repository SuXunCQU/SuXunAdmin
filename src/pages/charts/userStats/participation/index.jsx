import React, {Component} from 'react'
import {Button, Card} from 'antd'
import ReactEcharts from 'echarts-for-react'
import {DatePicker} from "antd/es";

/**
 * 队员参与情况统计的路由组件
 * 折线图
 */
const N = 6;
export default class Participation extends Component {

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
        let start = 5;
        let timeSpan = Array.from({length: N}, (value, index) => index + start + '月');
        let participationData = [150, 230, 224, 218, 135, 147, 260];
        const option = {
            title: {
                text: `近${N}个月参与救援队员数量统计`,
            },
            xAxis: {
                type: 'category',
                data: timeSpan,
            },
            yAxis: {
                type: 'value'
            },
            series: [{
                data: participationData,
                type: 'line'
            }]
        };
        return option;
    }

    render() {
        const title = (
            <Button type='primary' onClick={this.update}>更新</Button>
        )
        const extra = (
            <DatePicker/>
        )

        return (
            <Card title={title} extra={extra}>
                <ReactEcharts option={this.getOption()}/>
            </Card>
        )
    }
}
