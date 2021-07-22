import axios from "axios";
import {message} from 'antd';
import Store from "../redux/store"

const BASE_URI = "http://124.71.226.163"

const instance = axios.create({
    baseURL: BASE_URI,
});

const state = Store.getState();

// 添加请求拦截器
instance.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response.data;
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});

export default {
    get: instance.get,
    post: instance.post,
    put: instance.put,
    patch:instance.patch,
    delete:instance.delete,
    privateGet: (url, data = {}, options = {}) => {
        const state = Store.getState();
        const token = state.user.token;
        const headers = options.headers || {};
        const promise = new Promise((resolve) => {
            instance.get(url, {
                ...options,
                params: data,
                headers: {
                    "Authorization": `Token ${token}`,
                    ...headers,
                },
            }).then((res) => {
                resolve(res);
            }).catch((error) => {
                resolve({status: -1, error: error.response});
            })
        })
        return promise;
    },
    privateDelete: (url, options = {}) => {
        const state = Store.getState();
        const token = state.user.token;
        const headers = options.headers || {};
        console.log('url',url);
        const promise = new Promise((resolve) => {
            instance.delete(url, {
                ...options,
                headers: {
                    "Authorization": `Token ${token}`,
                    ...headers,
                },
            }).then((res) => {
                resolve(res);
            }).catch((error) => {
                resolve({status: 0, data: error.response});
            })
        })
        return promise;
    },
    // post 自动带上token
     privatePost: async (url, data = {}, options = {}) => {
        const state = Store.getState();
        const token = state.user.token;
        const headers = options.headers || {};
        const promise = new Promise((resolve)=>{
            resolve(
                instance.post(url, data, {
                    ...options,
                    headers: {
                        "Authorization": `Token ${token}`,
                        ...headers,
                    }
                })
            )
        }).catch((error) => {
            message.error("请求出错了：" + error.message);
        });
        console.log(promise);
        return promise;
    },
    privatePut: (url, data = {}, options = {}) => {
        const state = Store.getState();
        const token = state.user.token;
        const headers = options.headers || {};
        const promise = new Promise((resolve) => {
            instance.put(url, data,{
                ...options,
                headers: {
                    "Authorization": `Token ${token}`,
                    ...headers,
                },
            }).then((res) => {
                resolve(res);
            }).catch((error) => {
                resolve({status: 0, data: error.response.data});
            })
        })
        return promise;
    },
    privatePatch: async (url, data = {}, options = {}) => {
        const state = Store.getState();
        const token = state.user.token;
        const headers = options.headers || {};
        console.log("data",data);
        const promise = new Promise((resolve)=>{
            resolve(
                instance.patch(url, data, {
                    ...options,
                    headers: {
                        "Authorization": `Token ${token}`,
                        ...headers,
                    }
                })
            )
        }).catch((error) => {
            message.error("请求出错了：" + error.message);
        });
        console.log(promise);
        return promise;
    },
};
