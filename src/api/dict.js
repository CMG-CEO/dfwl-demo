/*
 * @Author: KokoTa
 * @Date: 2021-01-06 10:31:19
 * @LastEditTime: 2021-01-06 10:32:05
 * @LastEditors: KokoTa
 * @Description:
 * @FilePath: /future-bms/src/api/dict.js
 */
import request from '@/util/request'

// 字典列表
export function getDictList (params) {
  return request({
    url: '/basic/dict/list',
    method: 'get',
    params
  })
}
