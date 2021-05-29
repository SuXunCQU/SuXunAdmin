import React, {Component} from 'react';
import {List, Button, Layout, Popover} from 'antd';
import NavigationBar from "../navigation-bar";
import SearchBar from "../search-bar";

const {Sider} = Layout;
class ItemList extends Component {
    /**
     * 获取数据
     */
    getIncidents = (searchType, searchName) => {
        return async () => {
            // const pageNum = 1;
            this.searchType = searchType; // 保存searchType, 让其他方法可以看到
            this.searchName = searchName; // 保存searchName, 让其他方法可以看到
            const pageNum = this.pageNum;
            console.log('pageNum', pageNum);
            this.setState({loading: true}) // 显示loading

            // 如果搜索关键字有值, 说明我们要做搜索分页
            let result = {
                status: 0,
                data: {
                    total: 0,
                    list: [],
                }
            }
            // // TO DO
            // if (searchName) {
            //     result = await reqSearchIncidents({pageNum, pageSize: PAGE_SIZE, searchName, searchType})
            // } else { // 一般分页请求
            //     result = await reqIncidents(pageNum, PAGE_SIZE)
            // }

            this.setState({loading: false}) // 隐藏loading
            if (result.status === 0) {
                // 取出分页数据, 更新状态, 显示分页列表
                const {total, list} = result.data
                this.setState({
                    total,
                    incidents: list
                })
            }
            console.log(searchType, searchName);
        }
    }

    render() {
        const {title, renderItem, data, addNewItem, searchTypes, loading} = this.props;
        const searchBox = (
            <div>
                <SearchBar searchTypes={searchTypes} getData={this.getIncidents}/>
            </div>
        )
        return (
            <div style={{position: "relative", display: "flex", flexDirection: "column"}}>
                <Sider>
                    <List
                        header={
                            <NavigationBar
                                className={"nav-header"}
                                title={title}
                                leftButton={<Button type="primary" shape="circle" icon="plus" onClick={addNewItem}/>}
                                rightButton={
                                    <Popover content={searchBox}>
                                        <Button type="primary" shape="circle" icon="search"/>
                                    </Popover>
                                }
                            />
                        }
                        loading={loading}
                        bordered
                        itemLayout={"vertical"}
                        dataSource={data}
                        renderItem={renderItem}
                    >
                    </List>
                </Sider>
            </div>
        );
    }
}

export default ItemList;
