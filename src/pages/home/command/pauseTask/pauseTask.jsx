import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {
    Form,
    Input, message
} from 'antd'
import TextArea from "antd/es/input/TextArea";
import PictureWall from "../../../../components/pictures-wall";

const Item = Form.Item

/**
 * 添加退出任务的form组件
 */
class PauseTask extends Component {

    static propTypes = {
        setForm: PropTypes.func.isRequired, // 用来传递form对象的函数
    }

    state={
        pauseReason:"",
        signaturePhoto:"",
    }

    componentDidMount () {
        this.props.setForm(this.props.form);
        this.props.setPictureWall(this.pictureWall);
    }


    render() {
        const { getFieldDecorator } = this.props.form
        // 指定Item布局的配置对象
        const formItemLayout = {
            labelCol: { span: 6 },  // 左侧label的宽度
            wrapperCol: { span: 16 }, // 右侧包裹的宽度
        }

        const {signaturePhoto} = this.state;

        return (
            <Form>
                <Item label='暂缓原因' {...formItemLayout}>
                    {
                        getFieldDecorator('reason', {
                            rules: [
                                {required: true, message: '必须输入暂缓原因'}
                            ]
                        })(
                            <TextArea autosize={{minRows:2,maxRows:6}} placeholder='请输入暂缓原因' />
                        )
                    }
                </Item>
                <Item label='负责人签名照片' {...formItemLayout}>
                    {
                        getFieldDecorator('signaturePhoto', {
                            // todo
                            // rules: [
                            //     {required: true, message: '必须添加负责人签名照片'}
                            // ]
                        })(<PictureWall
                                ref={(node) => this.pictureWall = node}
                                imgs={signaturePhoto}
                            />)
                    }
                </Item>
            </Form>
        )
    }
}

export default Form.create()(PauseTask)
