/*
 * @Author: KokoTa
 * @Date: 2021-01-05 09:45:17
 * @LastEditTime: 2021-01-05 10:35:02
 * @LastEditors: KokoTa
 * @Description:
 * @FilePath: /future-bms/src/api/commodityAttributes.js
 */
import request from '@/util/request'

// 获取商品属性列表
export function getGoodAttrList (params) {
  return request({
    url: '/basic/goodAttrs/list',
    method: 'get',
    params
  })
}

// 商品属性详情
export function getGoodAttr (params) {
  const { goodsAttrId } = params
  return request({
    url: `/basic/goodAttrs/${goodsAttrId}`,
    method: 'get'
  })
}

// 添加商品属性
export function addGoodAttr (data) {
  return request({
    url: '/basic/goodAttrs/',
    method: 'post',
    data
  })
}

// 编辑商品属性
export function saveGoodAttr (data) {
  return request({
    url: '/basic/goodAttrs/',
    method: 'patch',
    data
  })
}

// 删除商品属性
export function delGoodAttr (params) {
  return request({
    url: '/basic/goodAttrs/',
    method: 'delete',
    params
  })
}
