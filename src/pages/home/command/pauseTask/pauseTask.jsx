import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {
    Form,
    Input
} from 'antd'
import TextArea from "antd/es/input/TextArea";
import Index from "../../../../components/pictures-wall";

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
        signaturePicture:"",
    }

    componentWillMount () {
        this.props.setForm(this.props.form)
    }

    render() {
        const { getFieldDecorator } = this.props.form
        // 指定Item布局的配置对象
        const formItemLayout = {
            labelCol: { span: 6 },  // 左侧label的宽度
            wrapperCol: { span: 16 }, // 右侧包裹的宽度
        }

        const {pauseReason,signaturePicture}=this.state;

        return (
            <Form>
                <Item label='暂缓原因' {...formItemLayout}>
                    {
                        getFieldDecorator('pauseReason', {
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
                        getFieldDecorator('signaturePicture', {
                            rules: [
                                {required: true, message: '必须添加负责人签名照片'}
                            ]
                        })(
                            <Index ref={this.pictureWall} imgs={signaturePicture}/>
                        )
                    }
                </Item>
            </Form>
        )
    }
}

export default Form.create()(PauseTask)
