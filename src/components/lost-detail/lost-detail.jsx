import React, {Component} from 'react';
import LostData from '../../assets/mock/lost.json';
import PlaceHolderImage from '../../assets/images/logo.png';
import {Carousel, Steps, Descriptions, Layout, Divider} from 'antd';
import './lost-detail.less'

const { Step } = Steps;
const { Sider, Content, Footer} = Layout;
class LostDetail extends Component {

    onChange = (a, b, c) => {
        console.log(a, b, c);
    }

    render() {
        const data = this.props.data || LostData[0]
        const lostTimestamp = new Date().getTime(); // 模仿数据中的timestamp
        const lostTime = data.lostTime || new Date(lostTimestamp);

        return (
            <Layout className="detailContainer" onClick={() => this.props.history.push('/home/command', {data})}>
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
                        <Descriptions.Item label="走失时间">{`${lostTime.getFullYear()}-${lostTime.getMonth() + 1}-${lostTime.getDate()} ${lostTime.getHours()}:${lostTime.getMinutes()}`}</Descriptions.Item>
                        <Descriptions.Item label="走失地点">{data.lost_location}</Descriptions.Item>
                        <Descriptions.Item label="其他信息" className="extraInfo">{data.extraInfo || "其他信息其他信息其他信息其他信息其他信息其他信息其他信息其他信息其他信息其他信息其他信息其他信息其他信息其他信息其他信息其他信息其他信息其他信息其他信息其他信息其他信息其他信息其他信息其他信息其他信息其他信息其他信息其他信息其他信息其他信息其他信息其他信息其他信息其他信息其他信息其他信息其他信息其他信息其他信息其他信息其他信息其他信息其他信息其他信息其他信息其他信息其他信息其他信息其他信息"}</Descriptions.Item>
                    </Descriptions>
                </Content>
                <Footer className="footerContainer">
                    <Steps current={2} size={"small"} labelPlacement={"vertical"}>
                        <Step status="finish" title={"发起"}/>
                        <Step status="finish" title={"征集"}/>
                        <Step status="process" title={"搜寻"}/>
                        <Step status="wait" title={"完成"}/>
                    </Steps>
                </Footer>
            </Layout>


        );
    }
}

export default LostDetail;
{/*<div className="detailContainer">*/}
{/*<section className="topContainer">*/}


{/*</section>*/}
{/*<section className="bottomContainer">*/}
{/*    <div className="stepsContainer">*/}
{/*        <Steps progressDot current={1} size="small">*/}
{/*            <Step title="Finished" description="This is a description." />*/}
{/*            <Step title="In Progress" description="This is a description." />*/}
{/*            <Step title="Waiting" description="This is a description." />*/}
{/*            <Step title="Waiting" description="This is a description." />*/}
{/*        </Steps>*/}
{/*    </div>*/}
{/*</section>*/}
{/*</div>*/}
