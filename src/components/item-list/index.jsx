import React, {Component} from 'react';
import {List, Button} from 'antd';
import NavigationBar from "../navigation-bar";
import {clue_data} from "../../utils/mockUtils";

class ItemList extends Component {
    render() {
        const {title} = this.props;
        return (
            <div>
                <List
                    header={
                        <NavigationBar
                            title={title}
                            leftButton={<Button type="primary" shape="circle" icon="plus"/>}
                            rightButton={<Button type="primary" shape="circle" icon="search"/>}
                        />
                    }
                    bordered
                >

                </List>
            </div>
        );
    }
}

export default ItemList;
