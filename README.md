# SuXunAdmin

**速寻智能救援系统**后台管理指挥网页。

# 环境依赖

**必要依赖如下（需手动下载）：**

```json
node v14.17.3
npm v6.14.13
```

在项目根文件夹目录打开命令行窗口，执行以下命令安装其他必要依赖包。

```shell
npm install
# 如果出现报错，执行下面的指令即可
npm audit fix
```

其他必要依赖包及版本可见  **package.json** ，具体如下：

```json
{
  "name": "suxunadmin",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "@ant-design/icons": "^4.6.2",
    "@antv/data-set": "^0.10.2",
    "antd": "^3.26.19",
    "axios": "^0.21.1",
    "babel-plugin-import": "^1.11.0",
    "bizcharts": "^3.5.2",
    "customize-cra": "^0.2.12",
    "draft-js": "^0.11.7",
    "draftjs-to-html": "^0.8.4",
    "echart": "^0.1.3",
    "echarts": "^4.2.1",
    "echarts-china-cities-js": "^0.1.1",
    "echarts-for-react": "^2.0.15-beta.0",
    "echarts-wordcloud": "^2.0.0",
    "html-to-draftjs": "1.4.0",
    "http-proxy-middleware": "^1.1.0",
    "intro.js": "^3.4.0",
    "intro.js-react": "^0.3.0",
    "jsonp": "^0.2.1",
    "less": "^3.9.0",
    "less-loader": "^5.0.0",
    "mockjs": "^1.1.0",
    "moment": "^2.29.1",
    "prop-types": "^15.7.2",
    "react": "^16.8.6",
    "react-amap": "^1.2.8",
    "react-app-rewired": "^2.1.3",
    "react-dom": "^16.8.6",
    "react-draft-wysiwyg": "^1.14.7",
    "react-highlight-words": "^0.17.0",
    "react-infinite-scroller": "^1.2.4",
    "react-redux": "^7.0.3",
    "react-router-dom": "^5.2.0",
    "react-scripts": "3.0.1",
    "react-wordcloud": "^1.2.7",
    "redux": "^4.0.1",
    "redux-devtools-extension": "^2.13.8",
    "redux-thunk": "^2.3.0",
    "store": "^2.0.12",
    "xlsx": "^0.17.0"
  },
  "scripts": {
    "start": "react-app-rewired start",
    "build": "react-app-rewired build",
    "test": "react-app-rewired test",
    "eject": "react-scripts eject"
  },
  "eslintConfig": {
    "extends": "react-app"
  },
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  }
}
```

# 运行

在项目根文件夹目录打开命令行窗口，执行以下命令即可启动项目

```shell
npm start
```

# 文件结构

```
SuXunAdmin
├── build -- 项目打包发布的文件目录
├── public -- 网站的必要资源目录
└── src -- 项目主要的代码文件目录
	├── api --前端调用后端接口的组件目录
    ├── assets -- 静态资源目录
    ├── components -- 封装的功能组件目录
    	├── header -- 顶部导航提示栏组件
    	├── item-list -- 列表item显示组件
    	├── left-nav -- 左侧导航栏组件
    	├── link-button -- 带跳转链接的按钮组件
    	├── lost-detail -- 走失者信息显示组件
    	├── map -- 地图组件
    	├──navigation-bar -- 子页面导航栏组件
    	├── picture-wall -- 照片墙组件
    	└── search-bar -- 表格信息搜索组件
    ├── config -- 配置文件目录（菜单栏设置）
    ├── pages -- 页面组件目录
    	├── charts -- 数据分析页面
    	├── faceCompare -- 人脸比对页面
    	├── home -- 首页
    		├── command -- 行动指挥界面
    			├── clue -- 线索组件
    			├── exitTask -- 退出任务审批组件
    			├── finishTask -- 任务完成审批组件
    			├── order -- 指令组件
    			├── pauseTask -- 提请暂缓任务组件
    			├── command.jsx -- 行动指挥页面的路由组件
    			├── home -- 行动指挥主界面
    			└── home.less -- 行动指挥主界面的样式文件
    	├── incident -- 事件管理页面
    	├── login -- 登录页面
    	├── navigator -- 全局路由导航栏组件
    	├── not found -- 专属404界面
    	├── role -- 角色管理界面
    	├── startStandard -- 启动标准界面
    	├── task -- 任务管理界面
    	└── user -- 队员管理界面
    ├── redux -- 基于redux的全局状态管理目录
    └── utils -- 工具包目录
```

