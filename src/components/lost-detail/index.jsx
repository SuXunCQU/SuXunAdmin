import React, {Component} from 'react';
import LostData from '../../assets/mock/lost.json';
import PlaceHolderImage from '../../assets/images/logo.png';
import {Carousel, Steps, Descriptions, Layout, Divider, Button} from 'antd';
import './index.less'

const { Step } = Steps;
const { Sider, Content, Footer} = Layout;
class LostDetail extends Component {

    onChange = (a, b, c) => {
        // console.log(a, b, c);
    }

    render() {
        const data = this.props.data || LostData[0]
        const {status, mission_id} = this.props;
        const baseUrl = '/images/';
        return (
            <section className={"detailContainer"}>
                <div className="left-container">
                    <header>
                        <Steps current={status === 2 ? 3 : status} size={"small"} type={"navigation"}>
                            <Step title={"启动"}/>
                            <Step title={"进行"}/>
                            <Step title={"完成/暂缓"}/>
                        </Steps>
                    </header>
                    <section className="content-container">
                        <div className="top-content">
                            <Descriptions>
                                <Descriptions.Item label="姓名">{data.lost_name}</Descriptions.Item>
                                <Descriptions.Item label="性别">{data.lost_gender ? "男" : "女"}</Descriptions.Item>
                                <Descriptions.Item label="年龄">{data.lost_age}</Descriptions.Item>
                            </Descriptions>
                        </div>
                        <div className="time-content">
                            <Descriptions column={1}>
                                <Descriptions.Item label="走失时间">{data.lost_time}</Descriptions.Item>
                            </Descriptions>
                        </div>
                        <div className="location-content">
                            <Descriptions column={1}>
                                <Descriptions.Item label="走失地点">{data.lost_place}</Descriptions.Item>
                            </Descriptions>
                        </div>
                        <div className="bottom-content">
                            <Descriptions column={1}>
                                <Descriptions.Item label="其他信息" className="extraInfo">{data.lost_appearance || "其他信息其他信息其他信息其他信息其他信息其他信息其他信息其他信息其他信息其他信息其他信息其他信息其他信息其他信息其他信息其他信息其他信息其他信息其他信息其他信息其他信息其他信息其他信息其他信息其他信息其他信息其他信息其他信息其他信息其他信息其他信息其他信息其他信息其他信息其他信息其他信息其他信息其他信息其他信息其他信息其他信息其他信息其他信息其他信息其他信息其他信息其他信息其他信息其他信息"}</Descriptions.Item>
                            </Descriptions>
                        </div>
                    </section>
                </div>
                <div className="right-container">
                    <div className="image-container">
                        <Carousel afterChange={this.onChange} autoplay>
                            <div>
                                <img src={baseUrl + data.lost_photo}/>
                            </div>
                            <div>
                                <h3>2</h3>
                            </div>
                            <div>
                                <h3>3</h3>
                            </div>
                            <div>
                                <h3>4</h3>
                            </div>
                        </Carousel>
                    </div>
                    <div className="button-container">
                        <Button
                            type={"primary"}
                            className={"button"}
                            onClick={() => this.props.history.push('/home/command', {data, mission_id, status})}
                        >查看详情</Button>
                    </div>
                </div>
            </section>
        );
    }
}

export default LostDetail;
