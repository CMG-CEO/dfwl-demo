/*
 * @Author: KokoTa
 * @Date: 2021-01-04 13:33:09
 * @LastEditTime: 2021-01-04 13:36:06
 * @LastEditors: KokoTa
 * @Description:
 * @FilePath: /future-bms/src/api/knowledgeManage.js
 */

import request from '@/util/request'

// 获取知识点列表
export function getKnowledgeList (params) {
  return request({
    url: '/basic/knowledges/list',
    method: 'get',
    params
  })
}

// 知识点详情
export function getKnowledge (params) {
  const { knowledgeId } = params
  return request({
    url: `/basic/knowledges/${knowledgeId}`,
    method: 'get'
  })
}

// 添加知识点
export function addKnowledge (data) {
  return request({
    url: '/basic/knowledges/',
    method: 'post',
    data
  })
}

// 编辑知识点
export function saveKnowledge (data) {
  return request({
    url: '/basic/knowledges/',
    method: 'patch',
    data
  })
}

// 删除知识点
export function delKnowledge (params) {
  return request({
    url: '/basic/knowledges/',
    method: 'delete',
    params
  })
}

// 启用禁用知识点
export function activeKnowledge (data) {
  return request({
    url: '/basic/knowledges/active',
    method: 'patch',
    data
  })
}
