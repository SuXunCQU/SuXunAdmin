import React from 'react';
import {Input, Button} from "antd";
import Highlighter from 'react-highlight-words';
import {SearchOutlined} from "@ant-design/icons";

export default function getColumnSearchProps(dataIndex, dataName) {
    console.log(this);
    return ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div style={{ padding: 8 }}>
                <Input
                    ref={(node) => {
                        this.inputRef = node;
                    }}
                    placeholder={`按 ${dataName} 查找`}
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{ marginBottom: 8, display: 'block' }}
                />
                <div style={{margin: "16px"}}>
                    <Button
                        type="primary"
                        onClick={() => handleSearch.call(this, selectedKeys, confirm, dataIndex)}
                        icon={"SearchOutlined"}
                        size="small"
                        style={{ width: 90 }}
                    >
                        查找
                    </Button>
                    <Button onClick={() => handleReset.call(this, clearFilters)} size="small" style={{ width: 90 }}>
                        重置
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({ closeDropdown: false });
                            this.setState({
                                searchText: selectedKeys[0],
                                searchedColumn: dataIndex,
                            });
                        }}
                    >
                        过滤
                    </Button>
                </div>
            </div>
        ),
        filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
        onFilter: (value, record) => {
            console.log("onFilter: \n value: ", value, "\n record: ", record);
            return (
                record[dataIndex]
                    ? record[dataIndex].toString().toLowerCase() === value.toLowerCase()
                    : ''
            )
        },
        onFilterDropdownVisibleChange: visible => {
            if (visible) {
                setTimeout(() => this.inputRef.select(), 100);
            }
        },
        render: text =>
            this.state.searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                    searchWords={[this.state.searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });
}

function handleSearch (selectedKeys, confirm, dataIndex) {
    confirm();
    this.setState({
        searchText: selectedKeys[0],
        searchedColumn: dataIndex,
    });
}

function handleReset (clearFilters){
    clearFilters();
    this.setState({ searchText: '' });
};
