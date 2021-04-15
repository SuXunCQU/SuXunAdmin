import React, {Component} from 'react'
import {Button, Card} from 'antd'
import ReactEcharts from 'echarts-for-react'
import {DatePicker} from "antd/es";

// import '../incidentStats.less';


/**
 * 走失者年龄统计的路由组件
 * 强调最大值的柱状图
 */
const N = 6;
export default class LostDay extends Component {

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
     * 时间区间变化
     */
    rangeChange = (e) => {
        console.log(e.target.value);
    }

    /**
     * 返回配置对象
     */
    getOption = () => {
        let start = 4;
        let timeSpan = Array.from({length: N}, (value, index) => index + start + '月');
        const option = {
            title: {
                top: 10,
                left: 'center',
                text: '每月走失事件数量统计'
            },
            xAxis: {
                type: 'category',
                data: timeSpan
            },
            yAxis: {
                type: 'value'
            },
            series: [{
                data: [120, {
                    value: 200,
                    itemStyle: {
                        color: '#a90000'
                    }
                }, 150, 80, 70, 110],
                type: 'bar',
                itemStyle: {
                    color: '#3AA1FF'
                }
            }]
        }
        return option;
    }

    render() {
        const title = (
            <Button type='primary' onClick={this.update}>更新</Button>
        )
        const extra = (
            // <RangePicker
            //     showTime={{format: 'HH:mm'}}
            //     format="YYYY-MM"
            //     placeholder={['开始时间', '结束时间']}
            //     onOk={this.rangeChange}
            //     onChange={this.onChange}
            //     locale={Locale}
            // />
            <DatePicker/>
        )

        return (
            // <Card title={title} extra={extra} className='chart' style={{flexGrow: 1}}>
                <ReactEcharts option={this.getOption()}/>
            // </Card>
        )
    }
}

