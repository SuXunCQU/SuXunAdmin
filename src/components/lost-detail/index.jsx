import React, {Component} from 'react';
import LostData from '../../assets/mock/lost.json';
import PlaceHolderImage from '../../assets/images/logo.png';
import {Carousel, Steps, Descriptions, Layout, Divider} from 'antd';
import './index.less'

const { Step } = Steps;
const { Sider, Content, Footer} = Layout;
class LostDetail extends Component {

    onChange = (a, b, c) => {
        console.log(a, b, c);
    }

    render() {
        const data = this.props.data || LostData[0]
        const {status, mission_id} = this.props;

        return (
            <Layout className="detailContainer" onClick={() => this.props.history.push('/home/command', {data, mission_id})}>
                <Layout className="headerContainer">
                    <Sider className="CarouselContainer" >
                        <Carousel afterChange={this.onChange} className="imageContainer">
                            <div>
                                <img src={PlaceHolderImage} />
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
                    </Sider>
                    <Content className="DigestContainer" >
                        <Descriptions bordered column={1}>
                            <Descriptions.Item label="姓名">{data.lost_name}</Descriptions.Item>
                            <Descriptions.Item label="性别">{data.lost_gender}</Descriptions.Item>
                            <Descriptions.Item label="年龄">{data.lost_age}</Descriptions.Item>
                        </Descriptions>
                    </Content>
                </Layout>
                <Content className="contentContainer">
                    <Descriptions bordered column={1} size={"small"}>
                        <Descriptions.Item label="走失时间">{data.lost_time}</Descriptions.Item>
                        <Descriptions.Item label="走失地点">{data.lost_location}</Descriptions.Item>
                        <Descriptions.Item label="其他信息" className="extraInfo">{data.lost_appearance || "其他信息其他信息其他信息其他信息其他信息其他信息其他信息其他信息其他信息其他信息其他信息其他信息其他信息其他信息其他信息其他信息其他信息其他信息其他信息其他信息其他信息其他信息其他信息其他信息其他信息其他信息其他信息其他信息其他信息其他信息其他信息其他信息其他信息其他信息其他信息其他信息其他信息其他信息其他信息其他信息其他信息其他信息其他信息其他信息其他信息其他信息其他信息其他信息其他信息"}</Descriptions.Item>
                    </Descriptions>
                </Content>
                <Footer className="footerContainer">
                    <Steps current={status} size={"small"} labelPlacement={"vertical"}>
                        <Step title={"启动"}/>
                        <Step title={"进行"}/>
                        <Step title={"完成/暂缓"}/>
                    </Steps>
                </Footer>
            </Layout>


        );
    }
}

export default LostDetail;
