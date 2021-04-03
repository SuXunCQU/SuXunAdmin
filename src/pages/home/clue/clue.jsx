import React, {Component} from 'react';
import {List, Button, Modal,} from 'antd';
import ItemList from '../../../components/item-list';
import {clue_data} from "../../../utils/mockUtils";

import './clue.less';

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
        const {history} = this.props;
        const {searchTypes} = this.state;
        return (
            <ItemList
                title={"最新线索"}
                data={clue_data.items}
                renderItem={this.renderClueItem}
                addNewItem={() => history.push('/home/addClue')}
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
    };

    render(){
        const {item} = this.props;
        return(
            <List.Item
                extra={
                    <div>
                        <Button style={{marginBottom: "12px"}} onClick={this.showModal}>查看详情</Button>
                        <Modal
                            title="线索"
                            visible={this.state.visible}
                            onOk={this.handleOk}
                            onCancel={this.handleCancel}
                            cancelText={"通知家属"}
                        >
                            <p>线索：{item.text}</p>
                            <p>图片：{item.photo}</p>
                            <p>发布时间：{item.post_time}</p>
                            <p>发布地点：{item.post_location}</p>
                        </Modal>
                    </div>
                }
            >
                <List.Item.Meta
                    title={"标题"}
                    description={item.text}
                />
            </List.Item>
        )
    }
}

export default Clue;
