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
class AddForm extends Component {

    static propTypes = {
        setForm: PropTypes.func.isRequired, // 用来传递form对象的函数
    }

    state={
        certificatePicture: "",
        groupPicture:"",
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

        const {certificatePicture,groupPicture}=this.state;

        return (
            <Form>
                <Item label='确认函照片' {...formItemLayout}>
                    {
                        getFieldDecorator('certificatePicture', {
                            rules: [
                                {required: true, message: '必须添加家属确认函照片'}
                            ]
                        })(
                            <Index ref={this.pictureWall} imgs={certificatePicture}/>
                        )
                    }
                </Item>
                <Item label='三方合照' {...formItemLayout}>
                    {
                        getFieldDecorator('groupPicture', {
                            rules: [
                                {required: true, message: '必须添加走失者、家属、队员三方合照'}
                            ]
                        })(
                            <Index ref={this.pictureWall} imgs={groupPicture}/>
                        )
                    }
                </Item>
            </Form>
        )
    }
}

export default Form.create()(AddForm)
