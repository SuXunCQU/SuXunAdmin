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
export const BASE = "http://38621w81b8.wicp.vip";


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
export const reqUpdateIncident = (data) => request.privatePut(BASE + `/lost/${data.incident_id}/`, data)


// 获取exitTask列表数据
export const reqExitTasks = () => request.privateGet(BASE + '/exit_task/');
// 新建退出任务申请
export const reqAddExitTask = (data) => request.privatePost(BASE + '/exit_task/', data)
// 更新退出任务申请
export const reqUpdateExitTask = (data) => request.privatePatch(BASE + `/exit_task/${data.apply_id}/`, data)
// 删除退出任务申请
export const reqDeleteExitTask= (apply_id) => request.privateDelete(BASE + `/exit_task/${apply_id}/`, {type:'DELETE'})

// 获取finishTask列表数据
export const reqFinishTasks = () => request.privateGet(BASE + '/finish_task/')
// 新建任务完成申请
export const reqAddFinishTask = (data) => request.privatePost(BASE + '/finish_task/', data)
// 更新任务完成申请
export const reqUpdateFinishTask = (data) => request.privatePatch(BASE + `/finish_task/${data.finish_id}/`, data)
// 删除任务完成申请
export const reqDeleteFinishTask= (finish_id) => request.privateDelete(BASE + `/finish_task/${finish_id}/`, {type:'DELETE'})
// 通过task_id检索
export const reqFinishTasksByTaskId = (task_id) => request.privatePost(BASE + '/finish_task/query_by_task_id/',{task_id},'POST')
// 获取完成的任务完成申请信息
export const reqReadFinishTask = (finish_id) => request.privateGet(BASE + `/finish_task/${finish_id}/`)
// 审核通过任务完成申请
export const reqPassFinishTask = (finish_id) => request.privatePost(BASE + '/finish_task/finish_judge/',{is_agree:1,id:finish_id},'POST')
// 审核不通过任务完成申请
export const reqNoPassFinishTask = (finish_id) => request.privatePatch(BASE + `/finish_task/${finish_id}/`,{status:1},'POST')


// 暂缓任务
export const reqAddPauseTask = (data) => request.privatePost(BASE + '/pause_task/', data)

// 获取user列表数据
export const reqMembers = () => request.privateGet(BASE + '/member/');
// 新建队员
export const reqAddMember = (data) => request.privatePost(BASE + '/member/', data)
// 更新队员
export const reqUpdateMember = (data) => request.privatePut(BASE + `/member/${data.member_id}/`, data)
// 删除队员
export const reqDeleteMember = (member_id) => request.privateDelete(BASE + `/role/${member_id}/`, {type:'DELETE'})


// 获取一个任务的队员列表
export const reqMemberByTaskId = (task_id) => request.privatePost(BASE + '/member_task/query_by_taskid/', {task_id}, 'POST')

// 获取task列表数据
export const reqTasks = () => request.privateGet(BASE + '/task/');
// 获取task和incident详细关联信息
export const reqTaskMoreInfos = () => request.privateGet(BASE + '/task/more_info_list/')
// 获取task详情所有信息
export const reqTaskMoreInfosByTaskId = (task_id) => request.privatePost(BASE + '/task/more_info_by_task_id/',{task_id})
// 删除任务
export const reqDeleteTask = (task_id) => request.privateDelete(BASE + `/task/${task_id}/`, {type:'DELETE'})

// 通过task_id 获取线索列表
export const reqCluesByTaskId = (task_id) => request.privatePost(BASE + '/clue/query_by_key/', {task_id}, 'POST')
// 添加线索
export const reqAddClue = (data) => request.privatePost(BASE + '/clue/', data, 'POST');;


// 通过task_id 获取指令列表
export const reqOrdersByTaskId = (task_id) => request.privatePost(BASE + '/instruction/query_by_key/', {task_id}, 'POST')
// 添加指令
export const reqAddInstruction = (data) => request.privatePost(BASE + '/instruction/', data, 'POST');;

// 获取所有角色的列表
export const reqRoles = () => request.privateGet(BASE + '/role/')
// 添加角色
export const reqAddRole = (data) => request.privatePost(BASE + '/role/', data, {type:'POST'})
// 修改角色
export const reqUpdateRole = (role) => request.privatePatch(BASE + `/role/${role.role_id}/`, role, {type:'PATCH'})
// 获取角色权限
export const reqReadRole = (role_id) => request.privateGet(BASE+ `/role/${role_id}/`)
// 删除角色
export const reqDeleteRole = (role_id) => request.privateDelete(BASE + `/role/${role_id}/`, {type:'DELETE'})

// 获取任务启动标准
export const reqStartStandard = () => request.privateGet(BASE + '/start_stand/')
// 更新任务启动标准
export const reqUpdateStartStandard = (data) => request.privatePost(BASE + '/start_stand/update_standards/',{new_standards:data})


// 添加图片
export const reqUploadImg = (name, file, create_time) => request.privatePost(BASE + '/upload/', {name, file, create_time}, 'POST')
// 删除图片
export const reqDeleteImg = (image_name) => request.privatePost(BASE + '/image_read/delete_graph/', {image_name}, 'POST')

