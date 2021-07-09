/*
 * @Author: KokoTa
 * @Date: 2021-01-19 13:42:27
 * @LastEditTime: 2021-01-19 14:32:57
 * @LastEditors: KokoTa
 * @Description:
 * @FilePath: /future-bms/src/api/studentManage.js
 */
import request from '@/util/request'

// 获取学员列表
export function getStudentList (params) {
  return request({
    url: '/basic/students/list',
    method: 'get',
    params
  })
}

// 学员详情
export function getStudent (params) {
  const { studentsId } = params
  return request({
    url: `/basic/students/${studentsId}`,
    method: 'get'
  })
}

// 添加学员
export function addStudent (data) {
  return request({
    url: '/basic/students/',
    method: 'post',
    data
  })
}

// 编辑学员
export function saveStudent (data) {
  return request({
    url: '/basic/students/',
    method: 'patch',
    data
  })
}

// 删除学员
export function delStudent (params) {
  return request({
    url: '/basic/students/',
    method: 'delete',
    params
  })
}

// 学员上岸
export function ashoreStudent (data) {
  return request({
    url: '/basic/students/',
    method: 'patch',
    data
  })
}
