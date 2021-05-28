import React, {Component} from 'react';
import {Button, Card, Icon, InputNumber, List} from "antd";
import {numToChn} from "../../utils/chnNum";

import "./startStandard.less"

const Item = List.Item;

class StartStandard extends Component {

    state = {
        levels: [
            {
                level: 1,
                time: [0, 24],
                age: [70, 150],
            },
            {
                level: 2,
                time: [24, 36],
                age: [60, 70],
            },
            {
                level: 3,
                time: [36, 48],
                age: [50, 60],
            },
            {
                level: 4,
                time: [48, 60],
                age: [45, 50],
            },
            {
                level: 5,
                time: [60, 72],
                age: [45, 50],
            },
        ]
    }

    renderItem = (standard) => {
        console.log('renderItem', standard);
        return (
            <div className='itemContainer'>
                <span className='label'>{numToChn[standard.level]}级</span>
                <span className='block'>
                    <InputNumber defaultValue={standard.time[0]} onChange={this.onChange} className='item'/>
                    <Icon type="minus" className='item'/>
                    <InputNumber defaultValue={standard.time[1]} onChange={this.onChange} className='item'/>
                    小时
                </span>
                <span className='block'>
                    <InputNumber defaultValue={standard.age[0]} onChange={this.onChange} className='item'/>
                    <Icon type="minus" className='item'/>
                    <InputNumber defaultValue={standard.age[1]} onChange={this.onChange} className='item'/>
                    岁
                </span>
            </div>
        )
    }

    addItem = () => {
        const {levels} = this.state;
        if (levels.length >= 16) return;
        let standard = {
            level: levels.length + 1,
            time: [0, 0],
            age: [0, 0],
        }
        levels.push(standard);
        this.setState({
            levels: levels
        })
    }

    reduceItem=()=>{
        const {levels} = this.state;
        if (levels.length <= 1) return;
        levels.pop();
        this.setState({
            levels: levels
        })
    }

    render() {

        const {levels} = this.state;

        const title = (
            <Button type='primary' onClick={this.getData}>
                更新
            </Button>
        )

        const header = (
            <div className='list-header'>
                <div className='list-header-holder'></div>
                <div className='list-header-tap'>走失时间</div>
                <div className='list-header-tap'>走失者年龄</div>
            </div>
        )

        const loadMore = (
            <div className='add-button'>
                <Button type='primary' onClick={this.addItem}>
                    <Icon type='plus'/>
                    添加新的任务级别
                </Button>
                <Button type='danger' onClick={this.reduceItem}>
                    <Icon type='minus'/>
                    删除一个任务级别
                </Button>
            </div>

        )
        return (
            <Card title={title}>
                <List
                    itemLayout="horizontal"
                    dataSource={levels}
                    header={header}
                    loadMore={loadMore}
                    renderItem={item => this.renderItem(item)}
                    style={{justifyContent: 'center'}}
                    bordered={true}
                />
                <div>温馨提示：当走失时间和走失年龄级别不一致时，默认取两者中级别高者为任务级别。</div>
            </Card>
        );
    }
}

export default StartStandard;
