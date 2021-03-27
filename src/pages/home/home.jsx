import React, {Component} from 'react'
import {Card, List, Select,} from 'antd'
import SearchBar from "../../components/search-bar";
import './home.less'

const Option = Select.Option;

export default class Home extends Component {

    state = {
        isVisited: true,
        total: 0, // 商品的总数量
        tasksInProgress: [
            {
                id: 1,
                taskName: "正在进行的任务1",
                theLostName: "张三",
            },
            {
                id: 2,
                taskName: "正在进行的任务2",
                theLostName: "李四",
            },
            {
                id: 3,
                taskName: "正在进行的任务3",
                theLostName: "王五",
            },
            {
                id: 4,
                taskName: "正在进行的任务4",
                theLostName: "张三",
            },
            {
                id: 5,
                taskName: "正在进行的任务5",
                theLostName: "李四",
            },
            {
                id: 6,
                taskName: "正在进行的任务6",
                theLostName: "王五",
            },
            {
                id: 7,
                taskName: "正在进行的任务7",
                theLostName: "张三",
            },
            {
                id: 8,
                taskName: "正在进行的任务8",
                theLostName: "李四",
            },
            {
                id: 9,
                taskName: "正在进行的任务9",
                theLostName: "王五",
            }
        ], // 正在进行任务的数组
        loading: false, // 是否正在加载中
        searchName: '', // 搜索的关键字
        // searchType: 'theLostName', 根据哪个字段搜索
        searchTypes: [
            {
                value: "theLostName",
                title: "按走失者姓名搜索"
            },
            {
                value: "reporterName",
                title: "按报失者姓名搜索"
            },
            {
                value: "reporterTelephoneNumber",
                title: "按报失者电话搜索"
            },
            {
                value: "taskName",
                title: "按任务名称搜索"
            },
            {
                value: "taskLevel",
                title: "按任务级别搜索"
            },
        ]
    }

    // /*
    // 初始化table的列的数组
    //  */
    // initColumns = () => {
    //     this.columns = [
    //         {
    //             title: '商品名称',
    //             dataIndex: 'name',
    //         },
    //         {
    //             title: '商品描述',
    //             dataIndex: 'desc',
    //         },
    //         {
    //             title: '价格',
    //             dataIndex: 'price',
    //             render: (price) => '¥' + price  // 当前指定了对应的属性, 传入的是对应的属性值
    //         },
    //         {
    //             width: 100,
    //             title: '状态',
    //             // dataIndex: 'status',
    //             render: (product) => {
    //                 const {status, _id} = product
    //                 const newStatus = status === 1 ? 2 : 1
    //                 return (
    //                     <span>
    //           <Button
    //               type='primary'
    //               onClick={() => this.updateStatus(_id, newStatus)}
    //           >
    //             {status === 1 ? '下架' : '上架'}
    //           </Button>
    //           <span>{status === 1 ? '在售' : '已下架'}</span>
    //         </span>
    //                 )
    //             }
    //         },
    //         {
    //             width: 100,
    //             title: '操作',
    //             render: (product) => {
    //                 return (
    //                     <span>
    //           {/*将product对象使用state传递给目标路由组件*/}
    //                         <LinkButton onClick={() => this.showDetail(product)}>详情</LinkButton>
    //           <LinkButton onClick={() => this.showUpdate(product)}>修改</LinkButton>
    //         </span>
    //                 )
    //             }
    //         },
    //     ];
    // }
    //
    // /*
    // 显示商品详情界面
    //  */
    // showDetail = (procut) => {
    //     // 缓存product对象 ==> 给detail组件使用
    //     memoryUtils.product = procut
    //     this.props.history.push('/incident/detail')
    // }
    //
    // /*
    // 显示修改商品界面
    //  */
    // showUpdate = (procut) => {
    //     // 缓存product对象 ==> 给detail组件使用
    //     memoryUtils.product = procut
    //     this.props.history.push('/incident/addupdate')
    // }
    //
    // /*
    // 获取指定页码的列表数据显示
    //  */
    // getProducts = async (pageNum) => {
    //     this.pageNum = pageNum // 保存pageNum, 让其它方法可以看到
    //     this.setState({loading: true}) // 显示loading
    //
    //     const {searchName, searchType} = this.state
    //     // 如果搜索关键字有值, 说明我们要做搜索分页
    //     let result
    //     if (searchName) {
    //         result = await reqSearchProducts({pageNum, pageSize: PAGE_SIZE, searchName, searchType})
    //     } else { // 一般分页请求
    //         result = await reqProducts(pageNum, PAGE_SIZE)
    //     }
    //
    //     this.setState({loading: false}) // 隐藏loading
    //     if (result.status === 0) {
    //         // 取出分页数据, 更新状态, 显示分页列表
    //         const {total, list} = result.data
    //         this.setState({
    //             total,
    //             products: list
    //         })
    //     }
    // }
    //
    // /*
    // 更新指定商品的状态
    //  */
    // updateStatus = async (productId, status) => {
    //     const result = await reqUpdateStatus(productId, status)
    //     if (result.status === 0) {
    //         message.success('更新商品成功')
    //         this.getProducts(this.pageNum)
    //     }
    // }
    //
    // componentWillMount() {
    //     this.initColumns()
    // }
    //
    // componentDidMount() {
    //     this.getProducts(1)
    // }

    showDetails = (taskId) => {
        return () => {
            console.log("showDetails taskId", taskId)
        }
    }

    handleChange = (isVisited) => {
        return () => this.setState({isVisited})
    }

    getData = (searchType,searchName) => {
        return () => {
            console.log("searchName", searchName);
            console.log("searchType", searchType);
        }
    }

    render() {
        const {isVisited, tasksInProgress, searchTypes, searchName} = this.state
        console.log("searchName", searchName);


        return (
            <div className='home'>
                <header className='header'>
                    <h1>正在进行{tasksInProgress.length}项救援行动</h1>
                </header>
                <SearchBar searchTypes={searchTypes} searchName={searchName} getData={this.getData}/>
                <hr className='divider'/>
                <List
                    className='task-list'
                    grid={{
                        gutter: 16,
                        xs: 1,
                        sm: 2,
                        md: 4,
                        lg: 4,
                        xl: 6,
                        xxl: 6,
                    }}
                    dataSource={tasksInProgress}
                    renderItem={item => (
                        <List.Item onClick={this.showDetails(item.id)}>
                            <Card title={item.taskName}>{item.theLostName}</Card>
                        </List.Item>
                    )}
                />
            </div>

        )
    }
}
