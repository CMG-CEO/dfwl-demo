/*
 * @Author: KokoTa
 * @Date: 2021-01-19 11:16:37
 * @LastEditTime: 2021-01-22 08:33:09
 * @LastEditors: KokoTa
 * @Description:
 * @FilePath: /future-bms/src/api/accountManage.js
 */
import request from "@/util/request";

// 获取帐套列表
export function getAccountList(params) {
  return request({
    url: "/system/accounts",
    method: "get",
    params
  });
}

// 添加帐套
export function addAccount(data) {
  return request({
    url: "/system/accounts",
    method: "post",
    data
  });
}

// 编辑帐套
export function saveAccount(data) {
  const { accountId } = data;
  return request({
    url: `/system/accounts/${accountId}`,
    method: "put",
    data
  });
}
export function privilegesRequest() {
  return request({
    url: `/system/privileges`,
    method: "get"
  });
}
export function getAccountResources(params) {
  return request({
    url: "/system/all-menus",
    method: "get",
    params
  });
}
export function getAccountId(data) {
  const { accountId } = data;
  return request({
    url: `/system/accounts/${accountId}`,
    method: "get"
  });
}
// 帐套启用
export function enableAccount(data) {
  const { accountId } = data;
  return request({
    url: `/system/accounts/${accountId}/enable`,
    method: "patch",
    data
  });
}

// 帐套禁用
export function disableAccount(data) {
  const { accountId } = data;
  return request({
    url: `/system/accounts/${accountId}/disable`,
    method: "patch",
    data
  });
}
// 获取省份
export function getProvince(data) {
  return request({
    url: "/basic/cdmProvince/listAll",
    method: "get"
  });
}
