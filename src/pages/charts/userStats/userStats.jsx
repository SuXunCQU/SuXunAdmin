import React, {Component} from 'react';
import {Card, Radio} from "antd";
import Participation from "./participation";
import Status from "./status";


class TaskStats extends Component {

    state = {
        selectedTab: 'participation',
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
            case 'participation': {
                return (<Participation/>);
            }
            case 'status': {
                return (<Status/>);
            }
            default: {
                return (<div>没有该项统计数据</div>);
            }
        }
    }

    render() {
        const title = (
            <Radio.Group onChange={this.onChange} value={this.state.selectedTab}>
                <Radio value='participation'>参与救援队员数量统计</Radio>
                <Radio value='status'>队员出勤情况统计</Radio>
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
