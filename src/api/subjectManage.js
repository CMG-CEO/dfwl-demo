/*
 * @Author: KokoTa
 * @Date: 2020-12-30 11:43:14
 * @LastEditTime: 2020-12-31 09:15:20
 * @LastEditors: KokoTa
 * @Description:
 * @FilePath: /future-bms/src/api/subjectManage.js
 */

import request from '@/util/request'

// 获取科目列表
export function getSubjectList (params) {
  return request({
    url: '/basic/subjects/list',
    method: 'get',
    params
  })
}

// 科目详情
export function getSubject (params) {
  const { subjectId } = params
  return request({
    url: `/basic/subjects/${subjectId}`,
    method: 'get'
  })
}

// 添加科目
export function addSubject (data) {
  return request({
    url: '/basic/subjects/',
    method: 'post',
    data
  })
}

// 编辑科目
export function saveSubject (data) {
  return request({
    url: '/basic/subjects/',
    method: 'patch',
    data
  })
}

// 删除科目
export function delSubject (params) {
  return request({
    url: '/basic/subjects/',
    method: 'delete',
    params
  })
}
