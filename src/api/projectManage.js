/*
 * @Author: KokoTa
 * @Date: 2020-12-30 11:43:08
 * @LastEditTime: 2020-12-31 09:15:36
 * @LastEditors: KokoTa
 * @Description:
 * @FilePath: /future-bms/src/api/projectManage.js
 */
import request from '@/util/request'

// 获取项目树
export function getProjectTree (params) {
  return request({
    url: '/basic/projects/tree',
    method: 'get',
    params
  })
}

// 项目详情
export function getProject (params) {
  const { projectId } = params
  return request({
    url: `/basic/projects/${projectId}`,
    method: 'get'
  })
}

// 添加项目
export function addProject (data) {
  return request({
    url: '/basic/projects/',
    method: 'post',
    data
  })
}

// 编辑项目
export function saveProject (data) {
  return request({
    url: '/basic/projects/',
    method: 'patch',
    data
  })
}

// 删除项目
export function delProject (params) {
  return request({
    url: '/basic/projects/',
    method: 'delete',
    params
  })
}
