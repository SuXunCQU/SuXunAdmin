import React, {Component} from 'react';
import {Card, Radio} from "antd";
import TheLostAge from "./theLostAge";
import FinishTask from "./finishTask";
import LostLocation from "./lostLocation";

// 常量
const THE_LOST_AGE=0;
const LOST_LOCATION=1;
const FINISH_TASK=2;
class TaskStats extends Component {

    state = {
        selectedTab: THE_LOST_AGE,
    };

    onChange = e => {
        console.log('radio checked', e.target.value);
        this.setState({
            selectedTab: e.target.value,
        });
    };

    renderChart() {
        const {selectedTab} = this.state;
        switch (selectedTab) {
            case THE_LOST_AGE: {
                return (<TheLostAge/>);
            }
            case LOST_LOCATION: {
                return (<LostLocation/>);
            }
            case FINISH_TASK: {
                return (<FinishTask/>);
            }
            default: {
                return (<div>没有该项统计数据</div>);
            }
        }
    }

    render() {
        const title = (
            <Radio.Group onChange={this.onChange} value={this.state.selectedTab}>
                <Radio value={THE_LOST_AGE}>走失者年龄统计</Radio>
                <Radio value={LOST_LOCATION}>走失地点统计</Radio>
                <Radio value={FINISH_TASK}>任务完成情况统计</Radio>
            </Radio.Group>
        )

        return (
            <div>
                <Card title={title}>
                    {
                        this.renderChart()
                    }
                </Card>
            </div>
        );
    }

}

export default TaskStats;
