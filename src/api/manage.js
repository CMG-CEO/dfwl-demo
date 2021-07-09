import Vue from "vue";
import request from "@/util/request";
const api = {
  user: "/api/user",
  role: "/api/role",
  service: "/api/service",
  permission: "/api/permission",
  permissionNoPager: "/api/permission/no-pager"
};

export default api;

// post
export function postAction(url, parameter) {
  return request({
    url: url,
    method: "post",
    data: parameter
  });
}

// post method= {post | put}
export function httpAction(url, parameter, method) {
  return request({
    url: url,
    method: method,
    data: parameter
  });
}

//put
export function putAction(url, parameter) {
  return request({
    url: url,
    method: "put",
    data: parameter
  });
}

//get
export function getAction(url, parameter) {
  return request({
    url: url,
    method: "get",
    params: parameter
  });
}
// deleteAction 放在请求体内
export function deleteAction(url, parameter) {
  return request({
    url: url,
    method: "delete",
    data: parameter
  });
}
// deleteAction 放在地址上
export function deleteURLAction(url, parameter) {
  return request({
    url: url,
    method: "delete",
    params: parameter
  });
}

export function getUserList(parameter) {
  return request({
    url: api.user,
    method: "get",
    params: parameter
  });
}

export function getRoleList(parameter) {
  return request({
    url: api.role,
    method: "get",
    params: parameter
  });
}

export function getServiceList(parameter) {
  return request({
    url: api.service,
    method: "get",
    params: parameter
  });
}
