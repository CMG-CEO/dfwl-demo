/*
 * @Author: KokoTa
 * @Date: 2020-12-30 08:54:21
 * @LastEditTime: 2021-01-29 16:05:07
 * @LastEditors: KokoTa
 * @Description:
 * @FilePath: /future-bms/src/api/user.js
 */
import request from "@/util/request";

// 后台管理员-用户密码登录
export function login(data) {
  return request({
    url: "/login",
    method: "post",
    data
  });
}

// 平台管理员-用户密码登录
export function loginPlatform(data) {
  return request({
    url: "/login-platform",
    method: "post",
    data
  });
}
//IM获取userID
export function imGetUserid() {
  return request({
    url: "/im/user-sig",
    method: "get"
  });
}
// 用户登出
export function logout() {
  return request({
    url: "/logout",
    method: "delete"
  });
}

// 用户重置密码
export function resetPassword(data) {
  return request({
    url: "/profile/password",
    method: "patch",
    data
  });
}
// 获取用户权限
export function getPermissions(params) {
  return request({
    url: "/profile/menu-permissions",
    method: "get",
    params
  });
}
// 获取角色配置资源
export function getResources(params) {
  return request({
    url: "/system/account-menus",
    method: "get",
    params
  });
}

export function userList(params) {
  return request({
    url: `/platform/users`,
    method: "get",
    params
  });
}
export function addAccount(data) {
  console.log(data)
  return request({
    url: `/platform/users`,
    method: "post",
    data
  });
}
export function saveAccount(data) {
  let { userId } = data;
  return request({
    url: `/platform/users/${userId}`,
    method: "put",
    data
  });
}

export function getAccountId(params) {
  let { userId } = params;
  return request({
    url: `/platform/users/${userId}`,
    method: "get"
  });
}

export function activeUser(data) {
  let url =
    data.status == "ENABLED"
      ? `/platform/users/${data.id}/disable`
      : `/platform/users/${data.id}/enable`;
  return request({
    url: url,
    method: "patch"
  });
}
export function deleteRole(params) {
  let { roleId } = params;
  return request({
    url: `/platform/users/${roleId}`,
    method: "delete"
  });
}
