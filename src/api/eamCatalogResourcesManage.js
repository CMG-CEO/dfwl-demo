/*
 * @Author: KokoTa
 * @Date: 2021-01-13 15:26:49
 * @LastEditTime: 2021-01-14 09:56:03
 * @LastEditors: KokoTa
 * @Description:
 * @FilePath: /future-bms/src/api/eamCatalogResourcesManage.js
 */
import request from "@/util/request";

// 获取素材列表
export function getEamCatalogResourcesList(params) {
  return request({
    url: "/basic/EamCatalogResources/list",
    method: "get",
    params
  });
}

// 素材详情
export function getEamCatalogResources(params) {
  const { eamCatalogResourcesId } = params;
  return request({
    url: `/basic/EamCatalogResources/${eamCatalogResourcesId}`,
    method: "get"
  });
}

// 添加素材
export function addEamCatalogResources(data) {
  const { catalogId, file, name, thumbnailurl, length } = data;

  const headers = { "Content-Type": "multipart/form-data" };
  const formData = new FormData();
  formData.append("catalogId", catalogId);
  formData.append("file", file);
  formData.append("name", name);
  console.log('1234')
  console.log(file)
  if (!thumbnailurl) {
  } else {
    formData.append("thumbnailurl", thumbnailurl);
    formData.append("length", length);
  }
  return request({
    headers,
    url: "/basic/EamCatalogResources/",
    method: "post",
    data: formData,
    // onUploadProgress: function (e) {
    //   let complete = parseInt((e.loaded / e.total) * 100);
    //   console.log(complete)
    // }
  });
}

// 删除素材
export function delEamCatalogResources(params) {
  return request({
    url: "/basic/EamCatalogResources/",
    method: "delete",
    params
  });
}

// 单文件上传接口
export function uploadFile(data) {
  const { file } = data;
  const headers = { "Content-Type": "multipart/form-data" };
  const formData = new FormData();
  formData.append("file", file);
  return request({
    headers,
    url: "/basic/EamCatalogResources/upload",
    method: "post",
    data: formData
  });
}
