/*
 * @Author: KokoTa
 * @Date: 2020-12-23 13:35:16
 * @LastEditTime: 2021-01-29 11:36:42
 * @LastEditors: KokoTa
 * @Description: 请求函数
 * @FilePath: /future-bms/src/util/request.js
 */
import axios from "axios";
import { Message } from "element-ui";
import { getToken, removeToken } from "@/util/auth";
import config from "@/config";

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 30000, // request timeout
  headers: {
    Authorization: `Basic ${config.webApiSecret}`
  }
});

service.interceptors.request.use(
  config => {
    const token = getToken();
    if (token) config.headers["x-jti"] = token;

    return config;
  },
  error => {
    console.log("error1", error);
    return Promise.reject(error);
  }
);

service.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    console.log("error2", error);

    // 401 错误处理
    const code = error.message.match(/\d+/) && error.message.match(/\d+/)[0];
    if (code === "401") {
      // removeToken();
      // location.reload();
    }

    // 其他错误处理
    const { message } = error.response.data;
    if (message) Message({ message, type: "error" });
    else Message({ message: error.message, type: "error" });

    return Promise.reject(error);
  }
);

export default service;
