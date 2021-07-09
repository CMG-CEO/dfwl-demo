/*
 * @Author: KokoTa
 * @Date: 2021-01-05 11:05:12
 * @LastEditTime: 2021-01-05 11:08:24
 * @LastEditors: KokoTa
 * @Description:
 * @FilePath: /future-bms/src/api/role.js
 */
import request from "@/util/request";

export function roleList(params) {
  return request({
    url: `/system/roles`,
    method: "get",
    params
  });
}

export function privilegesRequest(params) {
  return request({
    url: `/system/account-privileges`,
    method: "get",
    params
  });
}
export function addAccount(data) {
  return request({
    url: `/system/roles`,
    method: "post",
    data
  });
}
export function saveAccount(data) {
  let { roleId } = data;
  return request({
    url: `/system/roles/${roleId}`,
    method: "put",
    data
  });
}

export function getAccountId(params) {
  let { roleId } = params;
  return request({
    url: `/system/roles/${roleId}`,
    method: "get"
  });
}

export function deleteRole(params) {
  let { roleId } = params;
  return request({
    url: `/system/roles/${roleId}`,
    method: "delete"
  });
}
