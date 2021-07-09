/*
 * @Author: KokoTa
 * @Date: 2021-01-21 14:05:48
 * @LastEditTime: 2021-01-21 15:08:45
 * @LastEditors: KokoTa
 * @Description:
 * @FilePath: /future-bms/src/api/platformUserManage.js
 */
import request from "@/util/request";

// 获取平台用户列表
export function getPlatformUserList(params) {
  return request({
    url: "/platform/admins",
    method: "get",
    params
  });
}

// 平台用户详情
export function getPlatformUser(params) {
  const { userId } = params;
  return request({
    url: `/platform/admins/${userId}`,
    method: "get"
  });
}

// 添加平台用户
export function addPlatformUser(data) {
  return request({
    url: "/platform/admins",
    method: "post",
    data
  });
}

// 编辑平台用户
export function savePlatformUser(data) {
  const { id } = data;
  return request({
    url: `/platform/admins/${id}`,
    method: "put",
    data
  });
}

// 启用平台用户
export function enablePlatformUser(params) {
  const { id } = params;
  return request({
    url: `/platform/admins/${id}/enable`,
    method: "patch",
    params
  });
}

// 禁用平台用户
export function disablePlatformUser(params) {
  const { id } = params;
  return request({
    url: `/platform/admins/${id}/disable`,
    method: "patch",
    params
  });
}

// 重制平台用户密码
export function resetPlatformUser(params) {
  const { id } = params;
  return request({
    url: `/platform/admins/${id}/reset-password`,
    method: "patch",
    params
  });
}
