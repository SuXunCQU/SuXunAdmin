import React, {Component} from 'react';
import {Card, Radio} from "antd";
import TheLostAge from "./theLostAge";
import FinishTask from "./finishTask";
import LostLocation from "./lostLocation";

class TaskStats extends Component {

    state = {
        selectedTab: 'theLostAge',
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
            case 'theLostAge': {
                return (<TheLostAge/>);
            }
            case 'lostLocation': {
                return (<LostLocation/>);
            }
            case 'finishTask': {
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
                <Radio value='theLostAge'>走失者年龄统计</Radio>
                <Radio value='lostLocation'>走失地点统计</Radio>
                <Radio value='finishTask'>任务完成情况统计</Radio>
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
