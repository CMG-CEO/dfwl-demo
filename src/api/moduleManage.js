/*
 * @Author: KokoTa
 * @Date: 2020-12-31 17:53:20
 * @LastEditTime: 2020-12-31 17:55:55
 * @LastEditors: KokoTa
 * @Description:
 * @FilePath: /future-bms/src/api/moduleManage.js
 */
import request from '@/util/request'

// 获取模块列表
export function getModuleList (params) {
  return request({
    url: '/basic/modules/list',
    method: 'get',
    params
  })
}

// 模块详情
export function getModule (params) {
  const { moduleId } = params
  return request({
    url: `/basic/modules/${moduleId}`,
    method: 'get'
  })
}

// 添加模块
export function addModule (data) {
  return request({
    url: '/basic/modules/',
    method: 'post',
    data
  })
}

// 编辑模块
export function saveModule (data) {
  return request({
    url: '/basic/modules/',
    method: 'patch',
    data
  })
}

// 删除模块
export function delModule (params) {
  return request({
    url: '/basic/modules/',
    method: 'delete',
    params
  })
}
