import React, {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import {Menu, Icon, Modal} from 'antd'
import {connect} from 'react-redux'
import {Steps, Hints} from 'intro.js-react'

import logo from '../../assets/images/logo.png'
import menuList from '../../config/menuConfig'
import './index.less'
import 'intro.js/introjs.css'
import {setHeadTitle} from '../../redux/actions'


const SubMenu = Menu.SubMenu;

/*
左侧导航的组件
 */
class LeftNav extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // 导出状态
            isIncidentExporting: false,
            isClueExporting: false,
            isResultExporting: false,
            isExporting: false,
            // 引导界面参数 start
            stepsEnabled: true,
            initialStep: 0,
            steps: [
                {
                    element: ".home-bar",
                    title: "首页",
                    intro: "切换到此界面可以看到各项救援事件的概览，可以进一步互动操作。",
                    position: "right",
                },
                {
                    element: ".incident-bar",
                    title: "事件管理",
                    intro: "切换到此界面可以浏览所有走失事件信息，可以进行增删改查等操作。",
                    position: "right",
                },
                {
                    element: ".user-bar",
                    title: "队员管理",
                    intro: "切换到此界面可以浏览所有队员信息，可以进行增删改查等操作。",
                    position: "right",
                },
                {
                    element: ".task-bar",
                    title: "任务管理",
                    intro: "切换到此界面可以浏览所有已经建立的救援行动信息，可以进行增删改查等操作。",
                    position: "right",
                },
                {
                    element: ".charts-bar",
                    title: "数据统计",
                    intro: "此界面展示了该救援系统数据的可视化图表。",
                    position: "right",
                },
                {
                    element: ".faceCompare-bar",
                    title: "人脸比对",
                    intro: "此界面可以进行人脸比对，同时可以切换比对引擎。",
                    position: "right",
                },
                {
                    element: ".startStandard-bar",
                    title: "启动标准",
                    intro: "此界面可以进行救援启动标准的设置。",
                    position: "right",
                },
                {
                    element: ".role-bar",
                    title: "角色管理",
                    intro: "切换到此界面可以进行角色权限管理，可以为各工作人员分配账户及设置权限。",
                    position: "right",
                },

            ],
            hintsEnabled: true,
            hints: [
                {
                    element: ".home-bar",
                    hint: "Hello hint",
                    hintPosition: "middle-right"
                }
            ],
            // 引导界面参数 end
        }
    }

    /*
    判断当前登陆用户对item是否有权限
     */
    hasAuth = (item) => {
        // todo 测试用，记得删
        return true;

        const {key, isPublic} = item

        const menus = [];
        const username = this.props.user.username
        /*
        1. 如果当前用户是admin
        2. 如果当前item是公开的
        3. 当前用户有此item的权限: key有没有menus中
         */
        if (username === '17815252259' || isPublic || menus.indexOf(key) !== -1) {
            return true
        } else if (item.children) { // 4. 如果当前用户有此item的某个子item的权限
            return !!item.children.find(child => menus.indexOf(child.key) !== -1)
        }

        return false
    }

    /*
    根据menu的数据数组生成对应的标签数组
    使用map() + 递归调用
    */
    getMenuNodes_map = (menuList) => {
        return menuList.map(item => {
            if (!item.children) {
                return (
                    <Menu.Item key={item.key}>
                        <Link to={item.key}>
                            <Icon type={item.icon}/>
                            <span>{item.title}</span>
                        </Link>
                    </Menu.Item>
                )
            } else {
                return (
                    <SubMenu
                        key={item.key}
                        title={
                            <span>
              <Icon type={item.icon}/>
              <span>{item.title}</span>
            </span>
                        }
                    >
                        {this.getMenuNodes(item.children)}
                    </SubMenu>
                )
            }

        })
    }

    /*
    根据menu的数据数组生成对应的标签数组
    使用reduce() + 递归调用
    */
    getMenuNodes = (menuList) => {
        // 得到当前请求的路由路径
        const path = this.props.location.pathname

        return menuList.reduce((pre, item) => {

            // 如果当前用户有item对应的权限, 才需要显示对应的菜单项
            if (this.hasAuth(item)) {


                // 向pre添加<Menu.Item>
                if (!item.children) {
                    // 判断item是否是当前对应的item
                    if (item.key === path || path.indexOf(item.key) === 0) {
                        // 更新redux中的headerTitle状态
                        this.props.setHeadTitle(item.title)
                    }

                    pre.push((
                        <Menu.Item key={item.key} className={`${item.key.substr(1)}-bar`}>
                            <Link to={item.key} onClick={() => this.props.setHeadTitle(item.title)}>
                                <Icon type={item.icon}/>
                                <span>{item.title}</span>
                            </Link>
                        </Menu.Item>
                    ))
                } else {
                    // 查找一个与当前请求路径匹配的子Item
                    const cItem = item.children.find(cItem => path.indexOf(cItem.key) === 0)
                    // 如果存在, 说明当前item的子列表需要打开
                    if (cItem) {
                        this.openKey = item.key
                    }


                    // 向pre添加<SubMenu>
                    pre.push((
                        <SubMenu
                            key={item.key}
                            className={`${item.key.substr(1)}-bar`}
                            title={
                                <span>
                                  <Icon type={item.icon}/>
                                  <span>{item.title}</span>
                                </span>
                            }
                        >
                            {this.getMenuNodes(item.children)}
                        </SubMenu>
                    ))
                }
            }

            return pre
        }, [])
    }

    /*
    在第一次render()之前执行一次
    为第一个render()准备数据(必须同步的)
     */
    componentWillMount() {
        this.menuNodes = this.getMenuNodes(menuList)
    }

    render() {
        // debugger
        // 得到当前请求的路由路径
        let path = this.props.location.pathname
        console.log("path: ", path);

        // 得到需要打开菜单项的key
        const openKey = this.openKey
        const {stepsEnabled, initialStep, steps, hintsEnabled, hints} = this.state;

        return (
            <div className="left-nav">
                {stepsEnabled ? (
                    <Steps
                        enabled={stepsEnabled}
                        steps={steps}
                        initialStep={initialStep}
                        onBeforeExit={this.onBeforeExit}
                        onExit={this.onExit}
                        options={{
                            tooltipClass: "customTooltip",
                            showProgress: true,
                            showBullets: false,
                            prevLabel: "上一步",
                            nextLabel: "下一步",
                            doneLabel: "结束",
                        }}
                    />) : null}

                {/*<Hints enabled={hintsEnabled} hints={hints} />*/}

                <Link to='/' className="left-nav-header">
                    <img src={logo} alt="logo"/>
                    <h1>速寻系统后台</h1>
                </Link>

                <Menu
                    mode="inline"
                    theme="dark"
                    selectedKeys={[path]}
                    defaultOpenKeys={[openKey]}
                >

                    {
                        this.menuNodes
                    }

                </Menu>
            </div>
        )
    }

    onBeforeExit = () => {
    }

    onExit = () => {
        this.setState(() => ({stepsEnabled: false}));
    };
}

/*
withRouter高阶组件:
包装非路由组件, 返回一个新的组件
新的组件向非路由组件传递3个属性: history/location/match
 */
export default connect(
    state => ({user: state.user}),
    {setHeadTitle}
)(withRouter(LeftNav))
