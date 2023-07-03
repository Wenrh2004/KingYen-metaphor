import { baseUrl } from "./env";
import axios from "axios";

const service = axios.create({
    baseURL:baseUrl,
    timeout:3000
})

// 请求拦截
service.interceptors.request.use(
    // 请求前动作
    config => {
        return config;
    },
    // 请求错误回复
    error => {
        console.log(error);
        return Promise.reject();
    }
)

// 响应拦截
service.interceptors.response.use(
    // 响应数据动作
    response => {
        if (response.status === 200) {
            return response.data;
        } else {
            Promise.reject();
        }
    },
    // 响应错误处理
    error => {
        console.log(error);
        return Promise.reject();
    }
);

export default service;