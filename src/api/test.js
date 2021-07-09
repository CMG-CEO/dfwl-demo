/*
 * @Author: KokoTa
 * @Date: 2020-12-23 13:40:42
 * @LastEditTime: 2020-12-23 14:00:40
 * @LastEditors: KokoTa
 * @Description:
 * @FilePath: /future-bms/src/api/test.js
 */
import request from '@/util/request'

// 200 的测试接口
export function testGood () {
  return request({
    url: '/good',
    method: 'get',
    params: {}
  })
}

// 500 的测试接口
export function testBad () {
  return request({
    url: '/bad',
    method: 'get',
    params: {}
  })
}
