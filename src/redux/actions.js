/*
包含n个action creator函数的模块
同步action: 对象 {type: 'xxx', data: 数据值}
异步action: 函数  dispatch => {}
 */
import {
  SET_HEAD_TITLE,
  RECEIVE_USER,
  SHOW_ERROR_MSG,
  RESET_USER,
  RECEIVE_INCIDENT,
  RECEIVE_ROLE_NAMES, RECEIVE_ROLES
} from './action-types'
import {reqIncidents, reqLogin, reqLogout, reqRoles} from '../api'
import storageUtils from "../utils/storageUtils";

/*
设置头部标题的同步action
 */
export const setHeadTitle = (headTitle) => ({type: SET_HEAD_TITLE, data: headTitle})

/*
接收用户的同步action
 */
export const receiveUser = (user) => ({type: RECEIVE_USER, user})

/*
显示错误信息同步action
 */
export const showErrorMsg = (errorMsg) => ({type: SHOW_ERROR_MSG, errorMsg})

/*
退出登陆的同步action
 */
export const logout = () =>  {
  const result = reqLogout();
  // 删除local中的user
  storageUtils.removeUser()
  // 返回action对象
  return {type: RESET_USER}
}

/*
获取事件列表的同步action
 */
export const receiveIncidents = (incidents) => ({type: RECEIVE_INCIDENT, incidents})


/*
登陆的异步action
 */
export const login = (username, password) => {
  return async (dispatch) => {
    // 1. 执行异步ajax请求
    const result = await reqLogin(username, password)  // {status: 0, data: userStats} {status: 1, msg: 'xxx'}
    // 2.1. 如果成功, 分发成功的同步action
    console.log("login",result);
    if(result.status === 0) {
      const user = {
        token: result.token,
        is_manager: result.is_manager,
        username: result.member_phone,
        member_id:result.member_id,
        member_name:result.member_name,
        member_photo:result.member_photo,
        role_id:result.role_id,
      }
      // 保存local中
      storageUtils.saveUser(user)
      // 分发接收用户的同步action
      dispatch(receiveUser(user))
      return {status: 1};
    } else { // 2.2. 如果失败, 分发失败的同步action
      const msg = result.msg
      // message.error(msg)
      dispatch(showErrorMsg(msg))
    }
    return {status: 0};
  }
}

/*
获取事件列表的异步action
 */
export const getIncidents = () => {
  return async (dispatch) => {
    const response = await reqIncidents();
    if(response.status === 0){
      dispatch(receiveIncidents(response.incidents));
    } else{
      const msg = response.msg;
      dispatch(showErrorMsg(msg));
    }
  }
}


/**
 * 获取角色列表的同步action
 */
export const receiveRoles = (roles) => ({type: RECEIVE_ROLES, roles})

export const receiveRoleNames = (roleNames) => ({type: RECEIVE_ROLE_NAMES, roleNames})

/**
 * 获取所有角色列表
 */
export  const getRoles = () =>{
  return async (dispatch) =>{
    const response = await reqRoles();
    const roles = response.result;
    const roleNames = roles.reduce((pre, role) => {
      pre[role.role_id] = role.role_name
      return pre
    }, {})
    if(response.status === 0){
      console.log(response.result);
      dispatch(receiveRoles(roles));
      dispatch(receiveRoleNames(roleNames));
    }else{
      const msg = response.msg;
      dispatch(showErrorMsg(msg));
    }
  }
}


export const getClues = () => {

}
