import React, {Component} from 'react';
import {Button, Card, Icon, InputNumber, List, message, Modal} from "antd";
import {numToChn} from "../../utils/chnNum";

import "./startStandard.less"
import {reqAddMember, reqStartStandard, reqUpdateMember, reqUpdateStartStandard} from "../../api";

const Item = List.Item;

class StartStandard extends Component {

    state = {
        levels: [],  // 任务级别列表
    }

    /**
     * 获取启动标准
     */
    getStandards = async ()=>{
        const response = await reqStartStandard();
        console.log("standard response",response);
        if(response){
            this.setState({
                levels: response,
            })
        }else{
            message.error("获取任务级别失败，请检查网络连接！");
        }

    }

    /**
     * 改变单个level
     * @param value
     * @param level
     * @param key
     */
    changeLevels = (value,level,key) =>{
        level[key] = value;
        const {levels} = this.state;
        levels[level.level_id-1] = level;
        this.setState({
            levels,
        })
    }

    updateStandard = ()=>{
        return new Promise(async (resolve, reject) => {
            const {levels} = this.state;
            console.log("update levels",levels);
            const response = await reqUpdateStartStandard(levels);

            if (response) {
                message.success('更新行动启动标准成功！')
            } else {
                message.error('更新行动启动标准失败！')
            }
            resolve("success");
        })
    }

    async componentDidMount() {
        await this.getStandards();
    }

    /**
     * 确认框
     */
    confirm = ()=> {
        Modal.confirm({
            title: "请确认是否要修改行动启动标准？",
            okText: '确认',
            cancelText: '取消',
            onOk:this.updateStandard,
        });
    }

    renderItem = (level) => {
        if(level.min_age){
            return (
                <div className='itemContainer'>
                    <span className='label'>{numToChn[level.level_id]}级</span>
                    <span className='block'>
                    <InputNumber defaultValue={level.min_ltime} onChange={(value)=>this.changeLevels(value,level,"min_ltime")} className='item' min={0}/>
                    <Icon type="minus" className='item'/>
                    <InputNumber defaultValue={level.max_ltime} onChange={(value)=>this.changeLevels(value,level,"max_ltime")} className='item' min={0}/>
                    小时
                </span>
                    <span className='block'>
                    <InputNumber defaultValue={level.min_age} onChange={(value)=>this.changeLevels(value,level,"min_age")} className='item' min={0}/>
                    <Icon type="minus" className='item'/>
                    <InputNumber defaultValue={level.max_age} onChange={(value)=>this.changeLevels(value,level,"max_age")} className='item' min={0}/>
                    岁
                </span>
                </div>
            )
        }
        return <></>;
    }

    addItem = () => {
        const {levels} = this.state;
        if (levels.length >= 16) return;
        let level = {
            level_id: levels.length + 1,
            min_ltime: 0,
            max_ltime: 0,
            min_age: 0,
            max_age: 0,
        }
        this.setState({
            levels: [...levels,level],
        })
    }

    reduceItem=()=>{
        const {levels} = this.state;
        if (levels.length <= 1) return;
        levels.pop();
        this.setState({
            levels,
        })
    }

    render() {
        const {levels} = this.state;

        const title = (
            <Button type='primary' onClick={this.confirm}>
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
            <Card title={title} className={"startStandardContainer"}>
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
