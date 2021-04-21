import React, {Component} from 'react';
import {List, Button, Modal,} from 'antd';
import ItemList from '../../../../components/item-list';
import {clue_data} from "../../../../utils/mockUtils.new";

import './clue.less';
import {formateDate} from "../../../../utils/dateUtils";

class Clue extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchTypes: [
                {
                    value: 'theMemberName',
                    title: '按队员姓名搜索',
                },
                {
                    value: 'lostLocation',
                    title: '按走失地点搜索',
                },
            ]
        }
    }

    renderClueItem = (item) => {
        return <CLueItem item={item}/>
    }

    render() {
        const {searchTypes} = this.state;
        return (
            <ItemList
                title={"最新线索"}
                data={clue_data.items}
                renderItem={this.renderClueItem}
                addNewItem={this.props.addNewItem}
                searchTypes={searchTypes}
            />
        );
    }
}

class CLueItem extends Component{
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
        }
    }

    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    handleOk = (e) => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };

    handleCancel = (e) => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };

    render(){
        const {item} = this.props;
        return(
            <List.Item>
                <List.Item.Meta
                    title={(
                        <div>
                            <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                                <div style={{margin: "auto"}}>{item.member_name}</div>
                                <Button style={{margin: "auto"}} onClick={this.showModal}>查看详情</Button>
                            </div>
                            <Modal
                                title={item.member_name}
                                visible={this.state.visible}
                                onOk={this.handleOk}
                                onCancel={this.handleCancel}
                                cancelText={"通知家属"}
                            >
                                <p>线索：{item.text}</p>
                                <p>图片：{item.photo}</p>
                                <p>发布时间：{formateDate(item.post_timestamp)}</p>
                                <p>发布地点：{item.post_location}</p>
                            </Modal>
                        </div>
                    )}
                    description={item.text}
                />
            </List.Item>
        )
    }
}

export default Clue;
