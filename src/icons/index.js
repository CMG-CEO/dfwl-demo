/*
 * @Author: KokoTa
 * @Date: 2020-12-29 16:36:23
 * @LastEditTime: 2020-12-29 16:36:32
 * @LastEditors: KokoTa
 * @Description:
 * @FilePath: /future-bms/src/icon/index.js
 */
import Vue from 'vue'
import SvgIcon from '@/components/SvgIcon'// svg component

// register globally
Vue.component('svg-icon', SvgIcon)

const req = require.context('./svg', false, /\.svg$/)
const requireAll = requireContext => requireContext.keys().map(requireContext)
requireAll(req)
