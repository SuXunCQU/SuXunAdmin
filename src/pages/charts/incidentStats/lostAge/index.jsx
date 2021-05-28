import React, {Component} from 'react'
import {Card, Button} from 'antd'
import ReactEcharts from 'echarts-for-react'
import RangePicker from "antd/es/date-picker/RangePicker";
import moment from "moment";
import {format, formatDate} from "../../../../utils/dateUtils";
import {DatePicker} from "antd/es";

/**
 * 走失者年龄统计的路由组件
 * 强调最大值的柱状图
 */
const N=6;
export default class LostAge extends Component {

    state = {
        sales: [5, 20, 36, 10, 10, 20], // 销量的数组
        stores: [6, 10, 25, 20, 15, 10], // 库存的数组
    }

    update = () => {
        this.setState(state => ({
            sales: state.sales.map(sale => sale + 1),
            stores: state.stores.reduce((pre, store) => {
                pre.push(store-1)
                return pre
            }, []),
        }))
    }

    /*
    返回柱状图的配置对象
     */
    getOption = () => {
        const option = {
            title: {
                text: `走失者年龄统计`,
                top: 10,
                left: 'center',
            },
            xAxis: {
                type: 'category',
                data: ['45-50岁', '51-60岁', '61-70岁', '70岁以上']
            },
            yAxis: {
                type: 'value'
            },
            series: [{
                data: [120, {
                    value: 200,
                    itemStyle: {
                        color: '#A90000'
                    }
                }, 150, 80],
                type: 'bar',
                itemStyle: {
                    color: '#3AA1FF'
                }
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
            // <Card title={title} extra={extra}>
                <ReactEcharts option={this.getOption()}/>
            // </Card>
        )
    }
}

