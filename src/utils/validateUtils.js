/**
 * 验证年龄
 */
export function validateAge(rule, value, callback){
    console.log(value, typeof value)
    if (value * 1 > 0) {
        callback() // 验证通过
    } else {
        callback('年龄必须大于0') // 验证没通过
    }
}

/**
 * 验证身份证号
 */
export function validateIDNumber(rule, value, callback){
    console.log("验证身份证号", value);
    callback()
}
