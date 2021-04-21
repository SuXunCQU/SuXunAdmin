import React, {Component} from 'react';
import {Button, Row, Col, List} from 'antd';
import ItemDetail from '../../components/lost-detail'
import {incident_data, task_data} from "../../utils/mockUtils.new";

import './not-found.less'

/*
前台404页面
 */
export default class NotFound extends Component {

  goHome = () => {
    this.props.history.replace('/add')
  }

  render() {
      const data = incident_data.items;
      const item = data[Math.floor(Math.random() * data.length)];
      return (
          <Row className='not-found'>
              <Col span={8} className='left' />
              <Col span={12} className='right'>
                  <span style={{display: "flex", justifyContent:"space-between", alignItems: "center"}}>
                      <h1>404</h1>
                      <Button type='primary' onClick={this.goHome}>
                          回到首页
                      </Button>
                  </span>
              <h2>抱歉，你访问的页面不存在</h2>
              <h2>下面为公益寻人启事，如果有相关信息请联系家属！</h2>
                <div className={"item-container"}>
                    <ItemDetail
                        history={this.props.history}
                        data={item}
                    />
                </div>

            </Col>
          </Row>
      )
  }
}
