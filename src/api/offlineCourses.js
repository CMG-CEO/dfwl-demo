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
// export function getGoodsVideoList (params) {
//   return request({
//     url: '/basic/goodsVideo/list',
//     method: 'get',
//     params
//   })
// }

// 线下课程详情
export function getOfflineDetails (params) {
  const { goodsId } = params
  return request({
    url: `/basic/goodsOffline/${goodsId}`,
    method: 'get'
  })
}
// 获取线下课程列表
export function getOfflineList (params) {
  return request({
    url: '/basic/goodsOffline/list',
    method: 'get',
    params
  })
}
// 添加
export function addOfflineCourses (data) {
  return request({
    url: '/basic/goodsOffline/',
    method: 'post',
    data
  })
}
// 编辑
export function saveOfflineCourses (data) {
  return request({
    url: '/basic/goodsOffline/',
    method: 'patch',
    data
  })
}

// 删除商品
export function delGoods (params) {
  return request({
    url: '/basic/goods/',
    method: 'delete',
    params
  })
}

// 上/下架商品
export function changeGoodsStatus (data) {
  return request({
    url: '/basic/goods/status',
    method: 'patch',
    data
  })
}


// 编辑商品视频详情
// export function saveGoodsVideo (data) {
//   return request({
//     url: '/basic/goodsVideo/',
//     method: 'patch',
//     data
//   })
// }


// 排序视频商品附件
// export function sortGoodsVideoAttach (data) {
//   return request({
//     url: '/basic/goodsVideo/goodsAttach',
//     method: 'patch',
//     data
//   })
// }

// 删除视频商品附件
// export function delGoodsVideoAttach (params) {
//   return request({
//     url: '/basic/goodsVideo/goodsAttach',
//     method: 'delete',
//     params
//   })
// }
