/*
 * @Author: KokoTa
 * @Date: 2021-01-08 13:34:09
 * @LastEditTime: 2021-02-05 11:03:02
 * @LastEditors: KokoTa
 * @Description:
 * @FilePath: /future-bms/src/api/commodityGroup.js
 */
import request from '@/util/request'

// 获取商品分组列表
export function getGoodsGroupList (params) {
  return request({
    url: '/basic/goodsGroups/list',
    method: 'get',
    params
  })
}

// 商品分组详情
export function getGoodsGroup (params) {
  const { goodsGroupId } = params
  return request({
    url: `/basic/goodsGroups/${goodsGroupId}`,
    method: 'get'
  })
}

// 添加商品分组
export function addGoodsGroup (data) {
  return request({
    url: '/basic/goodsGroups/',
    method: 'post',
    data
  })
}

// 编辑商品分组
export function saveGoodsGroup (data) {
  return request({
    url: '/basic/goodsGroups/',
    method: 'patch',
    data
  })
}

// 删除商品分组
export function delGoodsGroup (params) {
  return request({
    url: '/basic/goodsGroups/',
    method: 'delete',
    params
  })
}

// 添加商品分组商品
export function addGoodsGroupGoods (data) {
  return request({
    url: '/basic/goodsGroups/goods/',
    method: 'patch',
    data
  })
}

// 删除商品分组商品
export function delGoodsGroupGoods (params) {
  return request({
    url: '/basic/goodsGroups/goods/',
    method: 'delete',
    params
  })
}

// 查询商品分组商品列表
export function getGoodsGroupGoods (params) {
  return request({
    url: '/basic/goodsGroups/listGoods',
    method: 'get',
    params
  })
}
