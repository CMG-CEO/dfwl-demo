import request from "@/util/request";

export function getProjectTree(params) {
  return request({
    url: `/basic/goodsMember/list`,
    method: "get",
    params
  });
}
export function querySelect(params) {
  return request({
    url: `/basic/dict/${params.dictCodes}`,
    method: "get"
    // params
  });
}
export function getTestList(params) {
  return request({
    url: `/qwm/qwmquestion/listPage`,
    method: "get",
    params
  });
}

export function dataKnowledgeSelect(params) {
  return request({
    url: `/basic/knowledges/getKnowledgeLevel/${params.level}`,
    method: "get",
    params
  });
}
export function addTest(data) {
  return request({
    url: `/qwm/qwmquestion/`,
    method: "post",
    data
  });
}
export function saveTest(data) {
  return request({
    url: `/qwm/qwmquestion/`,
    method: "patch",
    data
  });
}

export function editTest(params) {
  return request({
    url: `/qwm/qwmquestion/${params.questionId}`,
    method: "get"
  });
}

export function deleteTest(params) {
  return request({
    url: "/qwm/qwmquestion/",
    method: "delete",
    params
  });
}

export function reviewTest(data) {
  return request({
    url: `/qwm/qwmquestion/check`,
    method: "post",
    data
  });
}
export function voidTest(data) {
  return request({
    url: `/qwm/qwmquestion/cancel`,
    method: "post",
    data
  });
}
