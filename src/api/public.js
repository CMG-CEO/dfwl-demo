/*
 * @Author: KokoTa
 * @Date: 2021-01-29 10:56:58
 * @LastEditTime: 2021-01-29 11:39:09
 * @LastEditors: KokoTa
 * @Description: 一些公共的 API
 * @FilePath: /future-bms/src/api/public.js
 */
import request from '@/util/request'

// 获取公社列表
export function getCommuneList (params) {
  return request({
    url: '/browse/accounts',
    method: 'get',
    params
  })
}
