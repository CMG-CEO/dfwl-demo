/*
 * @Author: KokoTa
 * @Date: 2020-12-30 08:58:34
 * @LastEditTime: 2020-12-30 08:58:45
 * @LastEditors: KokoTa
 * @Description:
 * @FilePath: /future-bms/src/util/auth.js
 */
import Cookies from 'js-cookie'

const TokenKey = 'system_token'
const UserKey = 'user_info'

/**
 * Token 信息
 */

export function getToken () {
  return Cookies.get(TokenKey)
}

export function setToken (token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken () {
  return Cookies.remove(TokenKey)
}

/**
 * 用户信息
 */

export function getUserInfo () {
  return (
    localStorage.getItem(UserKey) && JSON.parse(localStorage.getItem(UserKey))
  )
}

export function setUserInfo (userInfo) {
  return localStorage.setItem(UserKey, JSON.stringify(userInfo))
}

export function removeUserInfo () {
  return localStorage.removeItem(UserKey)
}

// 获取当前 公社 名称
export function setCommuneName(name) {
  return localStorage.setItem('communeName', name)
}

export function getCommuneName() {
  return localStorage.getItem('communeName')
}
// 获取当前 用户头像
export function setProfilePicture(val) {
  return localStorage.setItem('profilePicture', val)
}

export function getProfilePicture() {
  return localStorage.getItem('profilePicture')
}
// 获取当前 用户名称
export function setNickName(val) {
  return localStorage.setItem('nickName', val)
}

export function getNickName() {
  return localStorage.getItem('nickName')
}
// 获取当前 用户权限
export function setPermissions(val) {
  return localStorage.setItem('permissions', JSON.stringify(val))
}

export function getPermissions() {
  return localStorage.getItem('permissions')
}
// 获取当前 公社id
export function setCommuneId(val) {
  return localStorage.setItem('accountId', val)
}

export function getCommuneId() {
  return localStorage.getItem('accountId')
}
// 获取当前 用户id
export function setUserId(val) {
  return localStorage.setItem('userId', val)
}

export function getUserId() {
  return localStorage.getItem('userId')
}