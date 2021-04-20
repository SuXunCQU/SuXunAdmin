import React, {Component} from 'react';
import {Card, Cascader} from "antd";
import CityData from "../../../assets/res/cityData.json";
import FinishNumber from "./finishNumber";
import FinishDuration from "./finishDuration";
import Status from "./status";
import ParticipateNumber from "./participateNumber";

import "./taskStats.less";

const N = 6;

class TaskStats extends Component {

    state = {};

    /**
     * 获取数据
     */
    getData = () => {
        console.log('getData');
    }

    /**
     * 改变所选区域
     */
    changeArea = (e) => {
        console.log(e.target.value);
    }


    onChange = (value, selectedOptions) => {
        console.log(value, selectedOptions);
    }

    filter = (inputValue, path) => {
        return path.some(option => option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1);
    }


    render() {
        const {area} = this.state;
        const title = (
            <span>
                <Cascader
                    options={CityData}
                    onChange={this.onChange}
                    placeholder="请选择统计区域"
                    showSearch={this.filter}
                    defaultValue={['重庆市', '重庆市']}
                />
            </span>
        )

        // const extra = (
        //     <Button type='primary' onClick={this.getData}>
        //         更新
        //     </Button>
        // )

        return (
            <Card title={title}>
                <span className='top-container'>
                        <span className='chart-left' style={{width: '45%'}}>
                            <FinishNumber/>
                        </span>
                        <span className='chart-right' style={{width: '45%'}}>
                           <FinishDuration/>
                        </span>
                    </span>
                <span className='bottom-container'>
                    <span className='chart-left' style={{width: '45%'}}>
                        <ParticipateNumber/>
                    </span>
                    <span className='chart-right' style={{width: '45%'}}>
                        <Status/>
                    </span>
                </span>
            </Card>
        );
    }
}

export default TaskStats;
