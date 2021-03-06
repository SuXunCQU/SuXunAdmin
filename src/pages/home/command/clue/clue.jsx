import React, {Component} from 'react';
import {List, Button, Modal,} from 'antd';
import ItemList from '../../../../components/item-list';
import cluePhoto from './clue.jpg';

import './clue.less';
import {formateDate} from "../../../../utils/dateUtils";
import {reqCluesByTaskId, reqMemberByTaskId} from "../../../../api";

const photoUrls = [
    "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fdimg07.c-ctrip.com%2Fimages%2Ffd%2Ftg%2Fg4%2FM09%2F52%2F45%2FCggYHFZuPyKAHIlUAANmzEr5Zg8292_R_1024_10000_Q90.jpg&refer=http%3A%2F%2Fdimg07.c-ctrip.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1621622832&t=3ea730c531098c112aacf588e58f3d31",
    "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.pconline.com.cn%2Fimages%2Fupload%2Fupc%2Ftx%2Fitbbs%2F1402%2F02%2Fc13%2F30986746_1391341006743_mthumb.jpg&refer=http%3A%2F%2Fimg.pconline.com.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1621622897&t=fd1c00e695a7d2c36e1f3c0859242ead",
    "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg1.fang.com%2Falbum%2F2013_06%2F27%2F1372296238080_000.jpg&refer=http%3A%2F%2Fimg1.fang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1621622945&t=8f829d07f14f0a554eccba478d0bfe42",
    "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=512167730,196035005&fm=15&gp=0.jpg",
    "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimage11.m1905.cn%2Fuploadfile%2F2016%2F0719%2F20160719093531112158.jpg&refer=http%3A%2F%2Fimage11.m1905.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1621623058&t=78c29e22e2fda87981a22e16abae2a9e",
    "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1664740751,2546932349&fm=26&gp=0.jpg",
    "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fs11.sinaimg.cn%2Fmiddle%2F48d276bbta7c6d0ce087a%26690&refer=http%3A%2F%2Fs11.sinaimg.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1621623107&t=67502c67881a4da8ad60adae364e8c79",
]
class Clue extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchTypes: [
                {
                    value: 'theMemberName',
                    title: '?????????????????????',
                },
                {
                    value: 'lostLocation',
                    title: '?????????????????????',
                },
            ],
            clue_loading: false,
            clues: [],
        }
    }

    renderClueItem = (item) => {
        return <CLueItem item={item}/>
    }

    getClues = async (task_id) => {
        this.setState(() => ({
            clue_loading: true,
        }))

        const response = await reqCluesByTaskId(task_id);
        if(response.status ===  0){
            this.setState(() => ({
                clues: response.result,
            }))
        }
        this.setState(() => ({
            clue_loading: false,
        }))
    }

    componentDidMount() {
        const task_id = this.props.mission_id;
        this.getClues(task_id);
    }

    render() {
        const {searchTypes,clues, clue_loading} = this.state;
        return (
            <ItemList
                title={"????????????"}
                loading={clue_loading}
                data={clues}
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
        this.setState({
            visible: false,
        });
    };

    render(){
        const {item} = this.props;
        item.post_location = item.text.substring(0, item.text.indexOf("???"));
        return(
            <List.Item>
                <List.Item.Meta
                    title={(
                        <div>
                            <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                                <div style={{margin: "auto"}}>{item.member_name}</div>
                                <Button style={{margin: "auto"}} onClick={this.showModal}>????????????</Button>
                            </div>
                            <Modal
                                title={item.member_name}
                                visible={this.state.visible}
                                onOk={this.handleOk}
                                onCancel={() => {
                                    return new Promise((resolve, reject) => {
                                        setTimeout(() => {
                                            Modal.success({
                                                content: "????????????",
                                                okText: "??????",
                                            });
                                            resolve("success");
                                        }, 1000)
                                    })}
                                }
                                cancelText={"????????????"}
                            >
                                <p>?????????{item.text}</p>
                                <p>?????????<img src={cluePhoto} /></p>
                                <p>???????????????{formateDate(item.time)}</p>
                                <p>???????????????{item.post_location}</p>
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
