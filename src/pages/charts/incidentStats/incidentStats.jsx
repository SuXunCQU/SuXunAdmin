import React, {Component} from 'react';
import {Card, Cascader} from "antd";
import CityData from "../../../assets/res/cityData.json"

import "./incidentStats.less";
import LostTime from "./lostTime";
import LostDay from "./lostDay";
import LostArea from "./lostArea";
import LostPlace from "./lostPlace";
import LostAge from "./lostAge";


const N = 6;

class IncidentStats extends Component {

    state = {
    };

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

    // renderChart() {
    //     const {selectedTab} = this.state;
    //     switch (selectedTab) {
    //         case THE_LOST_AGE: {
    //             return (<TheLostAge/>);
    //         }
    //         case LOST_LOCATION: {
    //             return (<LostLocation/>);
    //         }
    //         case FINISH_TASK: {
    //             return (<FinishTask/>);
    //         }
    //         default: {
    //             return (<div>没有该项统计数据</div>);
    //         }
    //     }
    // }

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
                        <span className='chart-left'>
                            <LostDay/>
                        </span>
                        <span className='chart-right'>
                            <LostTime/>
                        </span>
                    </span>
                <span className='center-container'>
                    <span className='chart-center'>
                        <LostArea/>
                    </span>
                </span>
                <span className='bottom-container'>
                    <span className='chart-left'>
                        <LostPlace/>
                    </span>
                    <span className='chart-right'>
                        <LostAge/>
                    </span>
                </span>
            </Card>
        );
    }
}

export default IncidentStats;
