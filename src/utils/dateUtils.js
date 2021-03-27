/*
包含n个日期时间处理的工具函数模块
*/

/*
  格式化日期
*/
export function formateDate(time) {
    if (!time) return ''
    let date = new Date(time)
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
        + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()
}


/**
 * 格式化日期和时间格式
 */
export const formatDate = 'YYYY-MM-DD';
export const formatTime = 'HH:mm';
export const format = 'YYYY-MM-DD HH:mm';
