import React, {Component} from 'react'
import {Button} from 'antd'
import ReactEcharts from 'echarts-for-react'
import {DatePicker} from "antd/es";

/**
 * 任务完成情况统计的路由组件
 * 堆叠柱状图
 */
const N = 6;

export default class FinishNumber extends Component {

    state = {}

    update = () => {
        console.log('update data')
    }

    /*
    返回柱状图的配置对象
     */
    getOption = () => {
        let start = 4;
        let timeSpan = Array.from({length: N}, (value, index) => index + start + '月');
        let taskData = {
            'inProcess': [320, 302, 301, 334, 390, 330],
            'delay': [120, 132, 101, 134, 90, 230],
            'accomplish': [220, 182, 191, 234, 290, 330],
        }
        const option = {
            title: {
                // text: `近${N}个月任务完成情况统计`,
                top: 0,
                text: `任务完成数量统计`,
                left: 'center',
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {            // Use axis to trigger tooltip
                    type: 'shadow'        // 'shadow' as default; can also be 'line' or 'shadow'
                }
            },
            legend: {
                data: ['进行中', '暂缓', '已完成'],
                top:30,
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: {
                type: 'value'
            },
            yAxis: {
                type: 'category',
                data: timeSpan,
            },
            series: [
                {
                    name: '进行中',
                    type: 'bar',
                    stack: 'total',
                    label: {
                        show:true,
                    },
                    emphasis: {
                        focus: 'series'
                    },
                    data: taskData['inProcess'],
                },
                {
                    name: '暂缓',
                    type: 'bar',
                    stack: 'total',
                    label: {
                        show:true,
                    },
                    emphasis: {
                        focus: 'series'
                    },
                    data: taskData['delay'],
                },
                {
                    name: '已完成',
                    type: 'bar',
                    stack: 'total',
                    label: {
                        show:true,
                    },
                    emphasis: {
                        focus: 'series'
                    },
                    data: taskData['accomplish'],
                },
            ]
        };
        return option;
    }

    render() {
        const {sales, stores} = this.state
        const title = (
            <Button type='primary' onClick={this.update}>更新</Button>

        )
        const extra = (
            <DatePicker/>
        )
        return (
            <ReactEcharts option={this.getOption()}/>
        )
    }
}
