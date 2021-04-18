import React, {Component} from 'react';
import {Button, Input, Select} from "antd";

const Option = Select.Option;

/**
 * props:
 * searchTypes 搜索类型 [ { value, title } ]
 * searchName 搜索关键字 @string
 * getData 执行搜索的函数
 */

class SearchBar extends Component {

    state = {
        searchType: "",
        searchName: "",
    }

    componentDidMount() {
        this.setState({
            searchType: this.props.searchTypes[0].value,
        })
    }

    render() {
        const {searchType, searchName} = this.state;
        const searchTypes = this.props.searchTypes;

        return (
            <div style={{width: "auto", height: "auto", display: "flex", justifyContent: "flex-start", alignItems: "center"}}>
                <Select
                    value={searchType}
                    style={{width: 160}}
                    onChange={value => this.setState({searchType: value})}
                >
                    {
                        searchTypes.map((searchType,index) => <Option key={index} value={searchType.value}>{searchType.title}</Option>)
                    }
                </Select>
                <Input
                    placeholder='关键字'
                    style={{width: 160, margin: '0 15px'}}
                    value={searchName}
                    onChange={event => this.setState({searchName: event.target.value})}
                />
                <Button type='primary' onClick={this.props.getData(searchType,searchName)}>搜索</Button>
            </div>
        );
    }
}

export default SearchBar;
