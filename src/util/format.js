/*
 * @Author: KokoTa
 * @Date: 2020-12-31 11:10:17
 * @LastEditTime: 2021-02-05 16:20:59
 * @LastEditors: KokoTa
 * @Description:
 * @FilePath: /future-bms/src/util/format.js
 */
import dayjs from 'dayjs'

/**
 * 禁用启用格式化
 */
export function formatActive (type) {
  switch (+type) {
    case 0:
      return '禁用'
    case 1:
      return '启用'
    default:
      return '未知'
  }
}

/**
 * 科目模块格式化
 */
export function formatSubjectModule (type) {
  switch (+type) {
    case 1:
      return '科目'
    case 2:
      return '模块'
    default:
      return '未知'
  }
}

/**
 * 上下架格式化
 */
export function formatShelfStatus (type) {
  switch (+type) {
    case 1:
      return '待上架'
    case 2:
      return '上架'
    case 3:
      return '下架'
    default:
      return '未知'
  }
}

/**
 * 时间格式化
 */
export function formatTableTime (time) {
  return dayjs(time).format('YYYY-MM-DD HH:mm:ss')
}
