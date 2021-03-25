import React, {PureComponent} from 'react'
import {Button, Card, Col, DatePicker, Form, Icon, Input, LocaleProvider, message, Radio, Row, TimePicker} from 'antd'

import PicturesWall from './pictures-wall'
import LinkButton from '../../components/link-button'
import {reqAddOrUpdateIncident, reqCategorys} from '../../api'
import memoryUtils from "../../utils/memoryUtils";
import Locale from 'antd/lib/locale-provider/zh_CN';

import 'moment/locale/zh-cn';
import './add-update.less'

const {Item} = Form
const format = 'HH:mm';

/*
Incident的添加和更新的子路由组件
 */
class IncidentAddUpdate extends PureComponent {

    state = {
        id: "",
        theLostName: "",
        theLostGender: "",
        theLostAge: "",
        theLostIDNumber: "",
        lostTime: "",
        lostLocation: "",
        theLostPictures: "",
        reporterName: "",
        reporterGender: "",
        reporterIDNumber: "",
        reporterIDPicture: "",
        relationship: "",
        reporterLocation: "",
        reporterPhoneNumber: "",
        reporterWeChat: "",
    }

    constructor(props) {
        super(props)

        // 创建用来保存ref标识的标签对象的容器
        this.pictureWall = React.createRef()
        this.editor = React.createRef()
    }

    initOptions = async (categorys) => {
        // 根据categorys生成options数组
        const options = categorys.map(c => ({
            value: c._id,
            label: c.name,
            isLeaf: false, // 不是叶子
        }))

        // 如果是一个二级分类商品的更新
        const {isUpdate, incident} = this
        const {pCategoryId} = incident
        if (isUpdate && pCategoryId !== '0') {
            // 获取对应的二级分类列表
            const subCategorys = await this.getCategorys(pCategoryId)
            // 生成二级下拉列表的options
            const childOptions = subCategorys.map(c => ({
                value: c._id,
                label: c.name,
                isLeaf: true
            }))

            // 找到当前商品对应的一级option对象
            const targetOption = options.find(option => option.value === pCategoryId)

            // 关联对应的一级option上
            targetOption.children = childOptions
        }


        // 更新options状态
        this.setState({
            options
        })
    }

    /*
    异步获取一级/二级分类列表, 并显示
    async函数的返回值是一个新的promise对象, promise的结果和值由async的结果来决定
     */
    getCategorys = async (parentId) => {
        const result = await reqCategorys(parentId)   // {status: 0, data: categorys}
        if (result.status === 0) {
            const categorys = result.data
            // 如果是一级分类列表
            if (parentId === '0') {
                this.initOptions(categorys)
            } else { // 二级列表
                return categorys  // 返回二级列表 ==> 当前async函数返回的promsie就会成功且value为categorys
            }
        }
    }


    /*
    验证价年龄的自定义验证函数
     */
    validateAge = (rule, value, callback) => {
        console.log(value, typeof value)
        if (value * 1 > 0) {
            callback() // 验证通过
        } else {
            callback('年龄必须大于0') // 验证没通过
        }
    }

    /**
     * 选择性别
     */
    changeGender = (e) => {
        // console.log(e);
        const {name, value} = e.target
        this.setState({
            [name]: value,
        })
        // console.log(this.state.theLostGender)
    };

    /*
    用加载下一级列表的回调函数
     */
    loadData = async selectedOptions => {
        // 得到选择的option对象
        const targetOption = selectedOptions[0]
        // 显示loading
        targetOption.loading = true

        // 根据选中的分类, 请求获取二级分类列表
        const subCategorys = await this.getCategorys(targetOption.value)
        // 隐藏loading
        targetOption.loading = false
        // 二级分类数组有数据
        if (subCategorys && subCategorys.length > 0) {
            // 生成一个二级列表的options
            const childOptions = subCategorys.map(c => ({
                value: c._id,
                label: c.name,
                isLeaf: true
            }))
            // 关联到当前option上
            targetOption.children = childOptions
        } else { // 当前选中的分类没有二级分类
            targetOption.isLeaf = true
        }

        // 更新options状态
        this.setState({
            options: [...this.state.options],
        })
    }

    submit = () => {
        // 进行表单验证, 如果通过了, 才发送请求
        this.props.form.validateFields(async (error, values) => {
            console.log(values)
            if (!error) {

                // 1. 收集数据, 并封装成incident对象
                const {name, desc, price, categoryIds} = values
                let pCategoryId, categoryId
                if (categoryIds.length === 1) {
                    pCategoryId = '0'
                    categoryId = categoryIds[0]
                } else {
                    pCategoryId = categoryIds[0]
                    categoryId = categoryIds[1]
                }
                const imgs = this.pictureWall.current.getImgs()
                const detail = this.editor.current.getDetail()

                const incident = {name, desc, price, imgs, detail, pCategoryId, categoryId}

                // 如果是更新, 需要添加_id
                if (this.isUpdate) {
                    incident._id = this.incident._id
                }

                // 2. 调用接口请求函数去添加/更新
                const result = await reqAddOrUpdateIncident(incident)

                // 3. 根据结果提示
                if (result.status === 0) {
                    message.success(`${this.isUpdate ? '更新' : '添加'}商品成功!`)
                    this.props.history.goBack()
                } else {
                    message.error(`${this.isUpdate ? '更新' : '添加'}商品失败!`)
                }
            }
        })
    }

    componentDidMount() {
        // this.getCategorys('0')
    }

    componentWillMount() {
        // 取出携带的state
        const incident = memoryUtils.incident  // 如果是添加没值, 否则有值
        // 保存是否是更新的标识
        this.isUpdate = !!incident._id
        // 保存事件(如果没有, 保存是{})
        this.incident = incident || {}
    }

    /*
    在卸载之前清除保存的数据
    */
    componentWillUnmount() {
        memoryUtils.incident = {}
    }

    render() {

        const {isUpdate, incident} = this
        const {pCategoryId, categoryId, imgs, detail} = incident
        // 用来接收级联分类ID的数组
        const categoryIds = []
        if (isUpdate) {
            // 商品是一个一级分类的商品
            if (pCategoryId === '0') {
                categoryIds.push(categoryId)
            } else {
                // 商品是一个二级分类的商品
                categoryIds.push(pCategoryId)
                categoryIds.push(categoryId)
            }
        }

        // 指定Item布局的配置对象
        const formItemLayout = {
            labelCol: {
                xs: { span: 12 },
                sm: { span: 6 },
            },  // 左侧label的宽度
            wrapperCol: {
                xs: { span: 16 },
                sm: { span: 10 },
            }, // 右侧包裹的宽度
        }

        // 头部左侧标题
        const title = (
            <span>
        <LinkButton onClick={() => this.props.history.goBack()}>
          <Icon type='arrow-left' style={{fontSize: 20}}/>
        </LinkButton>
        <span>{isUpdate ? '修改事件' : '添加事件'}</span>
      </span>
        )

        const {getFieldDecorator} = this.props.form

        return (
            <Card title={title}>
                <Form
                    {...formItemLayout}
                >
                    <Row gutter={[16, 16]}>
                        <Col span={12}>
                            <Item label='走失者姓名'>

                                {
                                    getFieldDecorator('theLostName', {
                                        initialValue: incident.theLostName,
                                        rules: [
                                            {required: true, message: '必须输入走失者姓名'}
                                        ]
                                    })(<Input placeholder='请输入走失者姓名'/>)
                                }
                            </Item>
                        </Col>
                        <Col span={12}>
                            <Item label='报失者姓名'>

                                {
                                    getFieldDecorator('reporterName', {
                                        initialValue: incident.reporterName,
                                        rules: [
                                            {required: true, message: '必须输入报失者姓名'}
                                        ]
                                    })(<Input placeholder='请输入报失者姓名'/>)
                                }
                            </Item>
                        </Col>
                    </Row>
                    <Row gutter={[16, 16]}>
                        <Col span={12}>
                            <Item label="走失者性别">
                                {
                                    getFieldDecorator('theLostGender', {
                                        initialValue: incident.theLostGender,
                                        rules: [
                                            {required: true, message: '必须输入走失者性别'}
                                        ]
                                    })(<Radio.Group
                                        onChange={this.changeGender}
                                        name='theLostGender'
                                        value={this.state.theLostGender}>
                                        <Radio value={1}>男</Radio>
                                        <Radio value={0}>女</Radio>
                                    </Radio.Group>)
                                }
                            </Item>
                        </Col>
                        <Col span={12}>
                            <Item label="报失者性别">
                                {
                                    getFieldDecorator('reporterGender', {
                                        initialValue: incident.reporterGender,
                                        rules: [
                                            {required: true, message: '必须输入报失者性别'}
                                        ]
                                    })(<Radio.Group
                                        onChange={this.changeGender}
                                        name='reporterGender'
                                        value={this.state.reporterGender}>
                                        <Radio value={1}>男</Radio>
                                        <Radio value={0}>女</Radio>
                                    </Radio.Group>)
                                }
                            </Item>
                        </Col>
                    </Row>
                    <Row gutter={[16, 16]}>
                        <Col span={12}>
                            <Item label="走失者年龄">

                                {
                                    getFieldDecorator('theLostAge', {
                                        initialValue: incident.theLostAge,
                                        rules: [
                                            {required: true, message: '必须输入走失者年龄'},
                                            {validator: this.validateAge}
                                        ]
                                    })(<Input type='number' placeholder='请输入走失者年龄'/>)
                                }
                            </Item>
                        </Col>
                        <Col span={12}>
                            <Item label='报失者联系电话'>

                                {
                                    getFieldDecorator('reporterPhoneNumber', {
                                        initialValue: incident.reporterPhoneNumber,
                                        rules: [
                                            {required: true, message: '必须输入报失者联系电话'}
                                        ]
                                    })(<Input placeholder='请输入报失者联系电话'/>)
                                }
                            </Item>
                        </Col>
                    </Row>
                    <Row gutter={[16, 16]}>
                        <Col span={12}>
                            <Item label="走失者时间">

                                {
                                    getFieldDecorator('lostTime', {
                                        initialValue: incident.lostTime,
                                        rules: [
                                            {required: true, message: '必须输入走失时间'},
                                        ]
                                    })(<span>
                                        <DatePicker locale={Locale} onChange={this.onChange} style={{marginRight: 10}}/>
                                        <TimePicker locale={Locale} format={format}/>
                                    </span>)
                                }
                            </Item>
                        </Col>
                        <Col span={12}>
                            <Item label='报失者家庭住址'>
                                {
                                    getFieldDecorator('reporterLocation', {
                                        initialValue: incident.reporterLocation,
                                    })(<Input placeholder='请输入报失者家庭住址'/>)
                                }
                            </Item>
                        </Col>
                    </Row>
                    <Row gutter={[16, 16]}>
                        <Col span={12}>
                            <Item label="走失地点">
                                {
                                    getFieldDecorator('lostLocation', {
                                        initialValue: incident.lostLocation,
                                        rules: [
                                            {required: true, message: '必须输入走失地点'},
                                        ]
                                    })(<Input placeholder='请输入走失地点'/>)
                                }
                            </Item>
                        </Col>
                        <Col span={12}>
                            <Item label='报失者与走失者关系'>

                                {
                                    getFieldDecorator('relationship', {
                                        initialValue: incident.relationship,
                                    })(<Input placeholder='请输入报失者与走失者关系'/>)
                                }
                            </Item>
                        </Col>
                    </Row>
                    <Row gutter={[16, 16]}>
                        <Col span={12}>
                            <Item label="走失者身份证号">

                                {
                                    getFieldDecorator('theLostAge', {
                                        initialValue: incident.theLostAge,
                                        rules: [
                                            {validator: this.validateIDNumber}
                                        ]
                                    })(<Input placeholder='请输入走失者身份证号'/>)
                                }
                            </Item>
                        </Col>
                        <Col span={12}>
                            <Item label='报失者微信'>
                                {
                                    getFieldDecorator('reporterWeChat', {
                                        initialValue: incident.reporterWeChat,
                                    })(<Input placeholder='请输入报失者微信'/>)
                                }
                            </Item>
                        </Col>
                    </Row>
                    <Row gutter={[16, 16]}>
                        <Col span={12}>
                            <Item label="走失者照片">
                                {
                                    getFieldDecorator('reporterWeChat', {
                                        initialValue: incident.reporterWeChat,
                                        rules: [
                                            {required: true, message: '必须上传走失者照片'},
                                        ]
                                    })(<PicturesWall ref={this.pictureWall} imgs={imgs}/>)
                                }
                            </Item>
                        </Col>
                        <Col span={12}>
                            <Item label="报失者身份证照片">
                                <PicturesWall ref={this.pictureWall} imgs={imgs}/>
                            </Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={8} offset={10}>
                            <Item>
                                <Button type='primary' onClick={this.submit}>提交</Button>
                            </Item>
                        </Col>
                    </Row>
                </Form>
            </Card>
        )
    }
}

export default Form.create()(IncidentAddUpdate)


/*
1. 子组件调用父组件的方法: 将父组件的方法以函数属性的形式传递给子组件, 子组件就可以调用
2. 父组件调用子组件的方法: 在父组件中通过ref得到子组件标签对象(也就是组件对象), 调用其方法
 */

/*
使用ref
1. 创建ref容器: thi.pictureWall = React.createRef()
2. 将ref容器交给需要获取的标签元素: <PictureWall ref={this.pictureWall} />
3. 通过ref容器读取标签元素: this.pictureWall.current
 */
