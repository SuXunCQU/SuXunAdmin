import React, {Component} from 'react'
import {Button} from 'antd'
import ReactEcharts from 'echarts-for-react'
import {DatePicker} from "antd/es";

// 地图
// import 'echarts/map/js/province/chongqing'
// import "echarts/map/js/province/xianggang"
// import "echarts-china-cities-js/echarts-china-cities-js/index";
import "echarts-china-cities-js/echarts-china-cities-js/xianggang";


require.context('../../../../../node_modules/echarts-china-cities-js/echarts-china-cities-js', true, /\.js$/)


/**
 * 走失地点统计的路由组件
 * 地图+热力图+数值显示（参考人口密度图）
 */
const N = 6;
export default class LostLocation extends Component {

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

    randomValue() {
        return Math.random() * 1000;
    }

    /*
    返回柱状图的配置对象
     */
    getOption = () => {
        // registerMap('HK',geoJSONLoader);
        // console.log(modulesFiles);
        const option = {
            title: {
                text: '区域走失事件数量热力图',
            },
            tooltip: {
                trigger: 'item',
                formatter: '{b}<br/>{c} (p / km2)'
            },
            toolbox: {
                show: true,
                orient: 'vertical',
                left: 'right',
                top: 'center',
                feature: {
                    dataView: {readOnly: false},
                    restore: {},
                    saveAsImage: {}
                }
            },
            visualMap: {
                min: 800,
                max: 50000,
                text: ['High', 'Low'],
                realtime: false,
                calculable: true,
                inRange: {
                    color: ['lightskyblue', 'yellow', 'orangered']
                }
            },
            series: [
                {
                    name: '香港18区人口密度',
                    type: 'map',
                    mapType: '香港', // 自定义扩展图表类型
                    label: {
                        show: true
                    },
                    data: [
                        {name: '中西区', value: 20057.34},
                        {name: '湾仔区', value: 15477.48},
                        {name: '东区', value: 31686.1},
                        {name: '南区', value: 6992.6},
                        {name: '油尖旺', value: 44045.49},
                        {name: '深水埗', value: 40689.64},
                        {name: '九龙城', value: 37659.78},
                        {name: '黄大仙', value: 45180.97},
                        {name: '观塘区', value: 55204.26},
                        {name: '葵青区', value: 21900.9},
                        {name: '荃湾区', value: 4918.26},
                        {name: '屯门区', value: 5881.84},
                        {name: '元朗区', value: 4178.01},
                        {name: '北区', value: 2227.92},
                        {name: '大埔区', value: 2180.98},
                        {name: '沙田区', value: 9172.94},
                        {name: '西贡区', value: 3368},
                        {name: '离岛区', value: 806.98}
                    ],
                    // 自定义名称映射
                    nameMap: {
                        'Central and Western': '中西区',
                        'Eastern': '东区',
                        'Islands': '离岛',
                        'Kowloon City': '九龙城',
                        'Kwai Tsing': '葵青',
                        'Kwun Tong': '观塘',
                        'North': '北区',
                        'Sai Kung': '西贡',
                        'Sha Tin': '沙田',
                        'Sham Shui Po': '深水埗',
                        'Southern': '南区',
                        'Tai Po': '大埔',
                        'Tsuen Wan': '荃湾',
                        'Tuen Mun': '屯门',
                        'Wan Chai': '湾仔',
                        'Wong Tai Sin': '黄大仙',
                        'Yau Tsim Mong': '油尖旺',
                        'Yuen Long': '元朗'
                    }
                }
            ]
        }
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
