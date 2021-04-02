/*
要求: 能根据接口文档定义接口请求
包含应用中所有接口请求函数的模块
每个函数的返回值都是promise

基本要求: 能根据接口文档定义接口请求函数
 */
import jsonp from 'jsonp'
import {message} from 'antd'
import ajax from './ajax'

// const BASE = 'http://localhost:5000'
const BASE = 'http://120.55.193.14:5000'
// 登陆
/*
export function reqLogin(username, password) {
  return ajax('/login', {username, password}, 'POST')
}*/
export const reqLogin = (username, password) => ajax(BASE + '/login', {username, password}, 'POST')

// 获取一级/二级分类的列表
export const reqCategorys = (parentId) => ajax(BASE + '/manage/category/list', {parentId})

// 添加分类
export const reqAddCategory = (categoryName, parentId) => ajax(BASE + '/manage/category/add', {categoryName, parentId}, 'POST')

// 更新分类
export const reqUpdateCategory = ({categoryId, categoryName}) => ajax(BASE + '/manage/category/update', {categoryId, categoryName}, 'POST')

// 获取一个分类
export const reqCategory = (categoryId) => ajax(BASE + '/manage/category/info', {categoryId})

// 获取事件分页列表
export const reqIncidents = (pageNum, pageSize) => ajax(BASE + '/manage/taskStats/list', {pageNum, pageSize})

// 更新商品的状态(上架/下架)
export const reqUpdateStatus = (incidentId, status) => ajax(BASE + '/manage/taskStats/updateStatus', {incidentId, status}, 'POST')

// 获取任务分页列表
export const reqTasks = (pageNum, pageSize) => ajax(BASE + '/manage/taskStats/list', {pageNum, pageSize})



/*
搜索商品分页列表 (根据商品名称/商品描述)
searchType: 搜索的类型, incidentName/incidentDesc
 */
export const reqSearchIncidents = ({pageNum, pageSize, searchName, searchType}) => ajax(BASE + '/manage/taskStats/search', {
  pageNum,
  pageSize,
  [searchType]: searchName,
})

/*
搜索商品分页列表 (根据商品名称/商品描述)
searchType: 搜索的类型, incidentName/incidentDesc
 */
export const reqSearchTasks = ({pageNum, pageSize, searchName, searchType}) => ajax(BASE + '/manage/taskStats/search', {
  pageNum,
  pageSize,
  [searchType]: searchName,
})

// 搜索商品分页列表 (根据商品描述)
/*export const reqSearchIncidents2 = ({pageNum, pageSize, searchName}) => ajax(BASE + '/manage/taskStats/search', {
  pageNum,
  pageSize,
  incidentDesc: searchName,
})*/

// 删除指定名称的图片
export const reqDeleteImg = (name) => ajax(BASE + '/manage/img/delete', {name}, 'POST')

// 添加/修改商品
export const reqAddOrUpdateIncident = (incident) => ajax(BASE + '/manage/taskStats/' + ( incident._id?'update':'add'), incident, 'POST')
// 修改商品
// export const reqUpdateIncident = (taskStats) => ajax(BASE + '/manage/taskStats/update', taskStats, 'POST')

// 添加/修改商品
export const reqAddOrUpdateTask = (task) => ajax(BASE + '/manage/taskStats/' + ( task._id?'update':'add'), task, 'POST')


// 获取所有角色的列表
export const reqRoles = () => ajax(BASE + '/manage/role/list')
// 添加角色
export const reqAddRole = (roleName) => ajax(BASE + '/manage/role/add', {roleName}, 'POST')
// 添加角色
export const reqUpdateRole = (role) => ajax(BASE + '/manage/role/update', role, 'POST')


// 获取所有用户的列表
export const reqUsers = () => ajax(BASE + '/manage/userStats/list')
// 删除指定用户
export const reqDeleteUser = (userId) => ajax(BASE + '/manage/userStats/delete', {userId}, 'POST')
// 添加/更新用户
export const reqAddOrUpdateUser = (user) => ajax(BASE + '/manage/userStats/'+(user._id ? 'update' : 'add'), user, 'POST')

/*
json请求的接口请求函数
 */
export const reqWeather = (city) => {

  return new Promise((resolve, reject) => {
    const url = `http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`
    // 发送jsonp请求
    jsonp(url, {}, (err, data) => {
      console.log('jsonp()', err, data)
      // 如果成功了
      if (!err && data.status==='success') {
        // 取出需要的数据
        const {dayPictureUrl, weather} = data.results[0].weather_data[0]
        resolve({dayPictureUrl, weather})
      } else {
        // 如果失败了
        message.error('获取天气信息失败!')
      }

    })
  })
}
// reqWeather('北京')
/*
jsonp解决ajax跨域的原理
  1). jsonp只能解决GET类型的ajax请求跨域问题
  2). jsonp请求不是ajax请求, 而是一般的get请求
  3). 基本原理
   浏览器端:
      动态生成<script>来请求后台接口(src就是接口的url)
      定义好用于接收响应数据的函数(fn), 并将函数名通过请求参数提交给后台(如: callback=fn)
   服务器端:
      接收到请求处理产生结果数据后, 返回一个函数调用的js代码, 并将结果数据作为实参传入函数调用
   浏览器端:
      收到响应自动执行函数调用的js代码, 也就执行了提前定义好的回调函数, 并得到了需要的结果数据
 */
