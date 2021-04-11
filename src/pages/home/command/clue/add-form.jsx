import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {
    Col,
    DatePicker,
    Form,
    Input
} from 'antd'
import TextArea from "antd/es/input/TextArea";
import Index from "../../../../components/pictures-wall";
import moment from "moment";
import {format, formatTime} from "../../../../utils/dateUtils";
import Locale from "antd/es/date-picker/locale/zh_CN";

const Item = Form.Item

/**
 * 添加退出任务的form组件
 */
class AddForm extends Component {

    static propTypes = {
        setForm: PropTypes.func.isRequired, // 用来传递form对象的函数
    }

    state={
        cluePicture:"",
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

        const {cluePictures}=this.state;

        return (
            <Form {...formItemLayout}>
                <Item label='线索内容：' >
                    {
                        getFieldDecorator('certificatePicture', {
                            rules: [
                                {required: true, message: '必须输入线索内容'}
                            ]
                        })(
                            <TextArea autosize={{minRows:2,maxRows:2}} placeholder='请输入线索内容' />
                        )
                    }
                </Item>
                <Item label="线索发现时间：">
                    {
                        getFieldDecorator('clueTime', {
                            // 在DatePicker中使用getFieldDecorator需要设置initialValue，而不能用defaulValue
                            initialValue: moment(moment(), format),
                            rules: [
                                {required: true, message: '必须输入时间'},
                            ]
                        })(<DatePicker
                            locale={Locale}
                            placeholder="请输入时间"
                            format={format}
                            showTime={{format: formatTime}}
                        />)
                    }
                </Item>
                <Item label="线索发现地点：">
                    {
                        getFieldDecorator('clueLocation', {
                            rules: [
                                {required: true, message: '必须输入地点'},
                            ]
                        })(<Input placeholder='请输入地点'/>)
                    }
                </Item>
                <Item label="线索照片：">
                    {
                        getFieldDecorator('cluePictures', {
                            // TO DO
                            // rules: [
                            //     {required: true, message: '必须上传走失者照片'},
                            // ]
                        })(<Index ref={this.pictureWall} imgs={cluePictures}/>)
                    }
                </Item>
            </Form>
        )
    }
}

export default Form.create()(AddForm)
