/*
 * @Author: KokoTa
 * @Date: 2021-01-20 10:39:21
 * @LastEditTime: 2021-01-20 11:03:30
 * @LastEditors: KokoTa
 * @Description:
 * @FilePath: /future-bms/src/api/teacherManage.js
 */
import request from '@/util/request'

// 获取师资列表
export function getTeacherList (params) {
  return request({
    url: '/basic/teachers/list',
    method: 'get',
    params
  })
}

// 师资详情
export function getTeacher (params) {
  const { teachersId } = params
  return request({
    url: `/basic/teachers/${teachersId}`,
    method: 'get'
  })
}

// 编辑师资
export function saveTeacher (data) {
  return request({
    url: '/basic/teachers/',
    method: 'patch',
    data
  })
}
