import React, {Component} from 'react'
import {Button, Card} from 'antd'
import ReactEcharts from 'echarts-for-react'
import {DatePicker} from "antd/es";


/**
 * 走失者年龄统计的路由组件
 * 折线图
 */
const N = 12;
export default class FinishDuration extends Component {

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

    /**
     * 返回折线图的配置对象
     */
    getOption = () => {
        let timeSpan = Array.from({length: N}, (value, index) => (index+1) + '小时');
        console.log(timeSpan);
        const option = {
            title: {
                top: 10,
                left: 'center',
                text: '任务完成时长统计',
            },
            xAxis: {
                type: 'category',
                data: timeSpan,
            },
            yAxis: {
                type: 'value'
            },
            series: [{
                data: [150, 230, 224, 218, 135, 147],
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
            // <Card title={title} extra={extra} className='chart'>
            <ReactEcharts option={this.getOption()}/>
            // </Card>
        )
    }
}

