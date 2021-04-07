import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {
    Form,
    Input
} from 'antd'
import TextArea from "antd/es/input/TextArea";

const Item = Form.Item

/**
 * 添加退出任务的form组件
 */
class AddForm extends Component {

    static propTypes = {
        setForm: PropTypes.func.isRequired, // 用来传递form对象的函数
    }

    componentWillMount () {
        this.props.setForm(this.props.form)
    }

    render() {
        const { getFieldDecorator } = this.props.form
        // 指定Item布局的配置对象
        const formItemLayout = {
            labelCol: { span: 4 },  // 左侧label的宽度
            wrapperCol: { span: 15 }, // 右侧包裹的宽度
        }

        return (
            <Form>
                <Item label='队员id' {...formItemLayout}>
                    {
                        getFieldDecorator('memberId', {
                            initialValue: '',
                            rules: [
                                {required: true, message: '队员id必须输入'}
                            ]
                        })(
                            <Input placeholder='请输入队员id'/>
                        )
                    }
                </Item>
                <Item label='退出理由' {...formItemLayout}>
                    {
                        getFieldDecorator('reason', {
                            initialValue: '',
                            rules: [
                                {required: true, message: '退出理由必须输入'}
                            ]
                        })(
                            <TextArea minLength={2} maxLength={6} placeholder='请输入退出理由'/>
                        )
                    }
                </Item>
            </Form>
        )
    }
}

export default Form.create()(AddForm)
