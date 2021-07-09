/*
 * @Author: KokoTa
 * @Date: 2021-01-26 15:27:02
 * @LastEditTime: 2021-02-01 17:32:15
 * @LastEditors: KokoTa
 * @Description:
 * @FilePath: /future-bms/src/api/videoManage.js
 */
import request from '@/util/request'

// 获取商品视频列表
export function getGoodsVideoList (params) {
  return request({
    url: '/basic/goodsVideo/list',
    method: 'get',
    params
  })
}

// 商品视频详情
export function getGoodsVideo (params) {
  const { goodsId } = params
  return request({
    url: `/basic/goodsVideo/${goodsId}`,
    method: 'get'
  })
}

// 添加商品视频详情
export function addGoodsVideo (data) {
  // 01-视频、02-商品、03-会员卡、04-专栏、05-大专栏
  data.goodsType = '01'
  return request({
    url: '/basic/goodsVideo/',
    method: 'post',
    data
  })
}

// 编辑商品视频详情
export function saveGoodsVideo (data) {
  return request({
    url: '/basic/goodsVideo/',
    method: 'patch',
    data
  })
}

// 删除商品视频
export function delGoodsVideo (params) {
  return request({
    url: '/basic/goodsVideo/',
    method: 'delete',
    params
  })
}

// 上/下架视频商品
export function changeGoodsVideoStatus (data) {
  return request({
    url: '/basic/goodsVideo/status',
    method: 'patch',
    data
  })
}

// 添加视频商品附件
export function addGoodsVideoAttach (data) {
  return request({
    url: '/basic/goodsVideo/goodsAttach',
    method: 'post',
    data
  })
}

// 排序视频商品附件
export function sortGoodsVideoAttach (data) {
  return request({
    url: '/basic/goodsVideo/goodsAttach',
    method: 'patch',
    data
  })
}

// 删除视频商品附件
export function delGoodsVideoAttach (params) {
  return request({
    url: '/basic/goodsVideo/goodsAttach',
    method: 'delete',
    params
  })
}
