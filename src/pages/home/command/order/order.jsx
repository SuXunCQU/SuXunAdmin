import React, {Component} from 'react';
import {List} from 'antd';
import ItemList from '../../../../components/item-list';
import {order_data} from "../../../../utils/mockUtils.new";

class Order extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchTypes: [
                {
                    value: 'thePostTime',
                    title: '按发布时间搜索',
                },
            ]
        }
    }

    renderClueItem = (item) => {
        return <List.Item>
            <List.Item.Meta
                title={item.member_name}
                description={item.text}
            />
        </List.Item>
    }

    render() {
        const {history} = this.props;
        const {searchTypes} = this.state;
        return (
            <ItemList
                title={"最新指令"}
                data={order_data.items}
                renderItem={this.renderClueItem}
                addNewItem={this.props.addNewItem}
                searchTypes={searchTypes}
            />
        );
    }
}

export default Order;
