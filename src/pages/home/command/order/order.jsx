import React, {Component} from 'react';
import {List} from 'antd';
import ItemList from '../../../../components/item-list';
import {reqOrdersByTaskId} from "../../../../api";

class Order extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchTypes: [
                {
                    value: 'thePostTime',
                    title: '按发布时间搜索',
                },
            ],
            order_loading: false,
            orders: [],
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

    getOrders = async (task_id) => {
        this.setState(()=> ({
            order_loading: true,
        }))
        const response = await reqOrdersByTaskId(task_id);
        if(response.status === 0){
            this.setState(() => ({
                orders: response.result,
            }))
        }
        this.setState(()=> ({
            order_loading: false,
        }))
    }

    componentDidMount() {
        const task_id = this.props.mission_id;
        this.getOrders(task_id);
    }

    render() {
        const {history} = this.props;
        const {searchTypes, orders, order_loading} = this.state;
        return (
            <ItemList
                title={"最新指令"}
                loading={order_loading}
                data={orders}
                renderItem={this.renderClueItem}
                addNewItem={this.props.addNewItem}
                searchTypes={searchTypes}
            />
        );
    }
}

export default Order;
