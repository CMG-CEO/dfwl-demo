/*
 * @Author: KokoTa
 * @Date: 2021-02-02 09:07:35
 * @LastEditTime: 2021-02-03 15:02:46
 * @LastEditors: KokoTa
 * @Description:
 * @FilePath: /future-bms/src/api/commodityManage.js
 */
import request from '@/util/request'

// 获取商品列表
export function getGoodsList (params) {
  return request({
    url: '/basic/goods/list',
    method: 'get',
    params
  })
}

// 商品详情
export function getGoods (params) {
  const { goodsId } = params
  return request({
    url: `/basic/goods/${goodsId}`,
    method: 'get'
  })
}

// 添加商品详情
export function addGoods (data) {
  // 01-视频、02-商品、03-会员卡、04-专栏、05-大专栏
  data.goodsType = '02'
  return request({
    url: '/basic/goods/',
    method: 'post',
    data
  })
}


// 编辑商品详情
export function saveGoods (data) {
  return request({
    url: '/basic/goods/',
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

// 查询不同种类的商品列表
export function getListGoods (params) {
  return request({
    url: '/basic/goods/listGoods',
    method: 'get',
    params
  })
}

// 获取商品课程列表
export function getTimetableList (params) {
  return request({
    url: '/basic/goods/timetables',
    method: 'get',
    params
  })
}

// 保存商品课程列表
export function saveTimetableList (data) {
  return request({
    url: '/basic/goods/timetables',
    method: 'patch',
    data
  })
}

// 导入商品课程列表
export function addTimetableList (data) {
  const headers = { 'Content-Type': 'multipart/form-data' }
  const formData = new FormData()
  formData.append('goodsId', data.goodsId)
  formData.append('file', data.file)
  return request({
    headers,
    url: '/basic/goods/timetable',
    method: 'post',
    data: formData
  })
}
