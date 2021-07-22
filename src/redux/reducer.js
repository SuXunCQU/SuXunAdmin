/*
用来根据老的state和指定的action生成并返回新的state的函数
 */
import {combineReducers} from 'redux'

/*
用来管理头部标题的reducer函数
 */
import storageUtils from "../utils/storageUtils"
import {
  SET_HEAD_TITLE,
  RECEIVE_USER,
  SHOW_ERROR_MSG,
  RESET_USER, RECEIVE_INCIDENT, RECEIVE_ROLE_NAMES, RECEIVE_ROLES
} from './action-types'
import {func} from "prop-types";

const initHeadTitle = ''

function headTitle(state = initHeadTitle, action) {
  switch (action.type) {
    case SET_HEAD_TITLE:
      return action.data
    default:
      return state
  }
}

/*
用来管理当前登陆用户的reducer函数
 */
const initUser = storageUtils.getUser()

function user(state = initUser, action) {
  // storageUtils.removeUser();
  console.log("user")
  switch (action.type) {
    case RECEIVE_USER:
      return {
        ...state,
        ...action.user
      }
    case SHOW_ERROR_MSG:
      const errorMsg = action.errorMsg
      // state.errorMsg = errorMsg  // 不要直接修改原本状态数据
      return {...state, errorMsg}
    case RESET_USER:
      return {}
    default:
      return state
  }
}


function incident(state = {}, action){
  switch(action.type){
    case RECEIVE_INCIDENT:
      return {
        ...state,
        incidents: action.incidents,
      };
    default:
      return state;
  }
}

function  role(state={}, action){
  switch (action.type){
    case RECEIVE_ROLES:
      return {
        ...state,
        roles:action.roles,
      };
    case RECEIVE_ROLE_NAMES:
      return {
        ...state,
        roleNames:action.roleNames,
      }
    default:
      return state;
  }
}

/*
向外默认暴露的是合并产生的总的reducer函数
管理的总的state的结构:
  {
    headTitle: '首页',
    userStats: {}
  }
 */
export default combineReducers({
  headTitle,
  user,
  incident,
  role,
})
