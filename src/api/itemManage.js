/*
 * @Author: KokoTa
 * @Date: 2021-01-08 14:18:30
 * @LastEditTime: 2021-01-11 15:30:49
 * @LastEditors: KokoTa
 * @Description:
 * @FilePath: /future-bms/src/api/itemManage.js
 */
import request from '@/util/request'

// 获取分类列表
export function getCatalogList(params = { page: 1, size: 1000 }) {
  return request({
    url: '/basic/catalogs/list',
    method: 'get',
    params
  })
}

// 分类详情
export function getCatalog(params) {
  const { catalogId } = params
  return request({
    url: `/basic/catalogs/${catalogId}`,
    method: 'get'
  })
}

// 添加分类
export function addCatalog(data) {
  return request({
    url: '/basic/catalogs/',
    method: 'post',
    data
  })
}

// 编辑分类
export function saveCatalog(data) {
  return request({
    url: '/basic/catalogs/',
    method: 'patch',
    data
  })
}

// 删除分类
export function delCatalog(params) {
  return request({
    url: '/basic/catalogs/',
    method: 'delete',
    params
  })
}

// ****************************************************************

// 获取物品列表
export function getMaterialList(params) {
  return request({
    url: '/basic/materials/list',
    method: 'get',
    params
  })
}

// 物品详情
export function getMaterial(params) {
  const { materialsId } = params
  return request({
    url: `/basic/materials/${materialsId}`,
    method: 'get'
  })
}
// 获取文件详情列表
export function getGsmGoodsFileById(params) {
  return request({
    url: `/basic/gsmGoodsFile/getGsmGoodsFileById/${params}`,
    method: 'get'
  })
}
// 获取试卷详情列表
export function getGsmGoodsExamById(params) {
  return request({
    url: `/basic/gsmGoodsExam/getGsmGoodsExamById/${params}`,
    method: 'get'
  })
}

// 批量新增 文件
export function addsGsmGoodsFileList(data) {
  return request({
    url: `/basic/gsmGoodsFile/addsGsmGoodsFile/`,
    method: 'post',
    data
  })
}
// 获取添加试卷列表
export function getcourseSpecListPage(data) {
  return request({
    url: `/qwm/qwmExam/getcourseSpecListPage/`,
    method: 'post',
    data
  })
}
// 批量新增试卷
export function addsGsmGoodsExam(data) {
  return request({
    url: `/basic/gsmGoodsExam/addsGsmGoodsExam`,
    method: 'patch',
    data
  })
}
// 修改试卷（设置）
export function gsmGoodsExam(data) {
  return request({
    url: `/basic/gsmGoodsExam`,
    method: 'put',
    data
  })
}
// 删除试卷
export function delgsmGoodsExam(params) {
  return request({
    url: `/basic/gsmGoodsExam/?goodsExamId=${params}`,
    method: 'delete',
  })
}
// 删除文件
export function delgsmGoodsFile(params) {
  return request({
    url: `/basic/gsmGoodsFile/?goodsFileId=${params}`,
    method: 'delete',
  })
}

// 添加物品
export function addMaterial(data) {
  return request({
    url: '/basic/materials/',
    method: 'post',
    data
  })
}

// 编辑物品
export function saveMaterial(data) {
  return request({
    url: '/basic/materials/',
    method: 'patch',
    data
  })
}

// 删除物品
export function delMaterial(params) {
  return request({
    url: '/basic/materials/',
    method: 'delete',
    params
  })
}

// 领用物品
export function consumeMaterial(data) {
  return request({
    url: '/basic/materials/consume',
    method: 'patch',
    data
  })
}

// 购入物品
export function purchaseMaterial(data) {
  return request({
    url: '/basic/materials/purchase',
    method: 'patch',
    data
  })
}
