import request from "@/util/request";

// 获取栏目设置列表
export function getColumnsList(params) {
  return request({
    url: "/basic/cdmAppColumns/listPage",
    method: "get",
    params
  });
}

// 栏目设置详情
export function getColumn(params) {
  const { appColumnsId } = params;
  return request({
    url: `/basic/cdmAppColumns/${appColumnsId}`,
    method: "get"
  });
}

// 保存编辑栏目设置
export function saveColumns(data) {
  return request({
    url: "/basic/cdmAppColumns/",
    method: "patch",
    data
  });
}
// 新增栏目设置
export function addColumns(data) {
  return request({
    url: "/basic/cdmAppColumns/",
    method: "post",
    data
  });
}
// 删除栏目设置
export function delColumns(params) {
  return request({
    url: "/basic/cdmAppColumns/",
    method: "delete",
    params
  });
}
