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

    componentWillMount () {
        this.props.setForm(this.props.form);

        // 创建用来保存ref标识的标签对象的容器
        this.pictureWallRef = React.createRef()
    }

    setSignaturePhoto = (signaturePhotoNames) => {
        console.log(signaturePhotoNames);
        this.setState((prevState) => ({
            data: {...prevState.data, signaturePhoto:signaturePhotoNames},
        }), function() {
            console.log(this.state.data);
            this.props.form.setFieldsValue({"signaturePhoto": signaturePhotoNames});
        })
    }



    submit = ()=>{
        // 先上传图片
        this.pictureWallRef.handleUpload();
        console.log(this.pictureWallRef);
        this.props.form.validateFields(async (error, values) => {
            console.log(error);
            console.log("pause task sub form",values);
            if (!error) {
                // this.confirm();
                // this.setState({
                //     data:{...this.state.data,...values}
                // })
            }
            else{
                message.error('请输入所有必要信息！');
            }
        })
    }

    render() {
        const { getFieldDecorator } = this.props.form
        // 指定Item布局的配置对象
        const formItemLayout = {
            labelCol: { span: 6 },  // 左侧label的宽度
            wrapperCol: { span: 16 }, // 右侧包裹的宽度
        }

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
                        getFieldDecorator('signaturePhoto', {
                            rules: [
                                {required: true, message: '必须添加负责人签名照片'}
                            ]
                        })(<PictureWall
                                ref={(node) => this.pictureWallRef = node}
                                setLostPhoto={this.setSignaturePhoto}
                            />)
                    }
                </Item>
            </Form>
        )
    }
}

export default Form.create()(PauseTask)
