/*
 * @Author: KokoTa
 * @Date: 2020-12-21 09:33:23
 * @LastEditTime: 2021-02-05 11:39:37
 * @LastEditors: KokoTa
 * @Description:
 * @FilePath: /future-bms/src/router/index.js
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import store from '@/store'
import routerInfo from './routerInfo'
import { setPageTitle } from '@/util'
import { getToken } from '@/util/auth'

Vue.use(VueRouter)

const routes = [...routerInfo.constantRouter]
store.dispatch('setUserRoutes', routes)

const router = new VueRouter({
  routes
})

// TODO 大专栏、专栏、会员卡UI（进行中）
// TODO 大专栏、专栏、会员卡接口对接（进行中）
// TODO 帐套管理逻辑完整对接（进行中）
// TODO 系统管理、角色管理、权限管理、组织机构UI（暂时不做）
// TODO 平台用户管理逻辑完整对接（接口未完成）
// TODO 登录时公社选择（接口未完成）
// TODO 用户登录及信息存储（接口未完成）
// TODO 路由鉴权逻辑、按钮级别鉴权逻辑（逻辑未知）
router.beforeEach(async (to, from, next) => {
  NProgress.start()
  // 改变页面标题
  document.title = setPageTitle(to.name)

  // 路由白名单
  const whiteList = ['/login', '/404']
  const hasToken = getToken()
  // 是否在白名单？是的话直接进入
  if (whiteList.indexOf(to.path) !== -1) return next()
  // 是否登录？未登录则跳转至登录页
  if (!hasToken) return next(`/login?redirect=${to.path}`)

  return next()
})

router.afterEach(async () => {
  NProgress.done()
})

export default router
