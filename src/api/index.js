/*
要求: 能根据接口文档定义接口请求
包含应用中所有接口请求函数的模块
每个函数的返回值都是promise

基本要求: 能根据接口文档定义接口请求函数
 */
import jsonp from 'jsonp'
import {message} from 'antd'
import ajax from './ajax';
import request from './request';
import {task_data} from "../utils/mockUtils.new";

// 本地服务器域名
const BASE = "http://38621w81b8.wicp.vip";

// 云端服务器域名
// const BASE = "http://124.71.226.163";

// 登陆
export const reqLogin = (username, password) => ajax(BASE + '/auth_token/signin/', {username, password}, 'POST')
// 登出
export const reqLogout = () => ajax(BASE + '/auth_token/signout/');
// 检查token有效性
export const checkTokenValidation = () => request.privateGet(BASE + '/lost/');

// 获取incident列表数据
export const reqIncidents = () => request.privateGet(BASE + '/lost/');
// 新建走失者
export const reqAddIncident = (data) => request.privatePost(BASE + '/lost/', data)
// 更新走失者
export const reqUpdateIncident = (data) => request.privatePut(BASE + `/lost/${data.incident_id}`, data)

// 获取task和incident详细关联信息
export const reqTaskMoreInfos = () => request.privateGet(BASE + '/task/moreinfolist/')
// 获取task列表数据
export const reqTasks = () => ajax(BASE + '/task/');

// 获取队员总列表
export const reqMember = () => request.privateGet(BASE + '/member/');
// 获取一个任务的队员列表
export const reqMemberByTaskId = (task_id) => request.privatePost(BASE + '/member-task/query_by_key/', {task_id}, 'POST')

// 通过task_id 获取线索列表
export const reqCluesByTaskId = (task_id) => request.privatePost(BASE + '/clue/query_by_key/', {task_id}, 'POST')

// 通过task_id 获取指令列表
export const reqOrdersByTaskId = (task_id) => request.privatePost(BASE + '/instruction/query_by_key/', {task_id}, 'POST')

// 获取所有角色的列表
export const reqRoles = () => request.privateGet(BASE + '/role')
// 添加角色
export const reqAddRole = (roleName) => request.privatePost(BASE + '/role/add', {roleName}, 'POST')
// 添加角色
export const reqUpdateRole = (role) => request.privatePost(BASE + '/role/update', role, 'POST')

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
