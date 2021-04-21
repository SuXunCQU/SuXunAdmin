/*
包含n个日期时间处理的工具函数模块
*/

/*
  格式化日期
*/
export function formateDate(time) {
    if (!time) return ''
    let date = new Date(time);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate()
        + ' ' + (hours < 10 ? `0${hours}` : hours) + ':' + (minutes < 10 ? `0${minutes}` : minutes);
}


/**
 * 格式化日期和时间格式
 */
export const formatDate = 'YYYY-MM-DD';
export const formatTime = 'HH:mm';
export const format = 'YYYY-MM-DD HH:mm';
