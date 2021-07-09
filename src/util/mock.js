/*
 * @Author: KokoTa
 * @Date: 2020-12-23 09:05:54
 * @LastEditTime: 2020-12-28 15:17:32
 * @LastEditors: KokoTa
 * @Description: 生成 mock 数据
 * @FilePath: /future-bms/src/util/mock.js
 */

import { randomString } from '.'

/**
 * @description: mock 表格数据
 * @param {*} number 数量
 * @return {*}
 */
export const mockTableData = (number = 10) => {
  return Array(number).fill().map(() => ({
    prop: randomString()
  }))
}

/**
 * @description: mock 树形数据
 * @param {*} level 嵌套层数
 * @param {*} number 每层数量
 * @return {*}
 */
export const mockTreeData = (level = 3, number = 2, data = []) => {
  for (let i = 0; i < number; i++) {
    data.push({
      id: Math.random().toString().slice(2),
      label: randomString(),
      children: [],
      level
    })
  }

  level -= 1

  if (level > 0) {
    for (let i = 0; i < data.length; i++) {
      mockTreeData(level, number, data[i].children)
    }
  }

  return data
}
