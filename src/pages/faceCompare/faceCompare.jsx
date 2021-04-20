import React, {Component} from 'react';
import {Layout, Select, Button, Modal} from 'antd';
import BaiduAi from "./description/BaiduAI";
import Index from "../../components/pictures-wall";
import SearchBar from "../../components/search-bar";
import {incident_data} from "../../utils/mockUtils.new";
import AliAI from "./description/AliAI";
import MegviiFace from "./description/MegviiFace";
import FaceNet from "./description/FaceNet";
import DeepId from "./description/DeepID";

const {Header, Content, Footer} = Layout;
class FaceCompare extends Component {
    constructor(props) {
        super(props);
        this.state = {
            algorithmType: "百度AI",
            searchTypes: [
                {
                    value: 'theLostName',
                    title: '按走失者姓名搜索',
                },
                {
                    value: 'lostLocation',
                    title: '按走失地点搜索',
                },
                {
                    value: 'reporterName',
                    title: '按报失者姓名搜索',
                },
                {
                    value: 'reporterPhoneNumber',
                    title: '按报失者电话搜索',
                },
            ]
        };
        this.pictureWall = React.createRef();
        this.incidents = incident_data.items;
    }

    renderContent = (type) => {
        console.log(type);
        switch(type){
            case "百度AI":
                return <BaiduAi />
            case "阿里AI":
                return <AliAI />
            case "旷视科技":
                return <MegviiFace />
            case "FaceNet":
                return <FaceNet />
            case "DeepID":
                return <DeepId />
            default:
                return <div>信息获取失败</div>
        }
    }


    render() {
        const {algorithmType, searchTypes} = this.state;
        return (
            <div>
                <Layout>
                    <Header>
                        <Layout style={{backgroundColor: "#001529", flexDirection: "row", height: "100%"}}>
                            <Select
                                defaultValue={algorithmType}
                                style={{width: 200, height: "auto", margin: "auto", marginLeft: "0", }}
                                onChange={this.selectOnChange}
                            >
                                <Select.Option value={"百度AI"}>百度AI</Select.Option>
                                <Select.Option value={"阿里AI"}>阿里AI</Select.Option>
                                <Select.Option value={"旷视科技"}>旷视科技</Select.Option>
                                <Select.Option value={"FaceNet"}>FaceNet</Select.Option>
                                <Select.Option value={"DeepID"}>DeepID</Select.Option>
                            </Select>
                            <SearchBar searchTypes={searchTypes} getData={this.getIncident} style={{width: "400px"}}/>
                        </Layout>
                    </Header>
                    <Content style={{backgroundColor: "#fff", padding: "32px"}}>
                        <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                            疑似走失者照片：<span style={{margin: "0 32px"}}><Index ref={this.pictureWall} /></span>
                            <Button type={"primary"} onClick={this.onSubmit}>提交</Button>
                        </div>
                        <div style={{backgroundColor: "#e8e8e8", marginTop: "32px", padding: "32px"}}>{this.renderContent(algorithmType)}</div>
                    </Content>
                </Layout>
            </div>
        );
    }

    onSubmit = () => {
        return (
            Modal.confirm({
                content: "请确认是否要提交照片？",
                cancelText: "取消",
                okText: "提交",
                onOk: () => {
                    return new Promise((resolve, reject) => {
                        setTimeout(() => {
                            Modal.success({
                                content: "提交成功",
                                okText: "确定",
                            });
                            resolve("success");
                        }, 1000)
                    })
                }
            })
        )
    }

    selectOnChange = (value) => {
        this.setState({
            algorithmType: value,
        })
    }

    getIncident = (searchType, searchName) => {
        const size = this.incidents.length;
        let item = {};
        console.log(searchName);
        console.log(searchType);
        switch (searchType){
            case "theLostName":
                for(let i = 0; i < size; i++){
                    if(this.incidents[i].lost_name === searchName)
                        item = this.incidents[i];
                }
                break;
            case "lostLocation":
                for(let i = 0; i < size; i++){
                    if(this.incidents[i].location.indexOf(searchName) !== -1)
                        item = this.incidents[i];
                }
                break;
            case "reporterName":
                for(let i = 0; i < size; i++){
                    if(this.incidents[i].reporter_name === searchName)
                        item = this.incidents[i];
                }
                break;
            case "reporterPhoneNumber":
                for(let i = 0; i < size; i++){
                    if(this.incidents[i].reporter_phone === searchName)
                        item = this.incidents[i];
                }
                break;
            default:
                item = {};
        }
        // console.log(item);
        // this.setState({
        //     "incident": item,
        // })
    }
}

export default FaceCompare;
