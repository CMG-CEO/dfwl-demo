/*
 * @Author: KokoTa
 * @Date: 2020-12-22 14:36:17
 * @LastEditTime: 2021-02-03 10:22:19
 * @LastEditors: KokoTa
 * @Description: 工具函数
 * @FilePath: /future-bms/src/util/index.js
 */
import config from "@/config";

/**
 * 获取页面标题
 */
export function setPageTitle(pageTitle) {
  const defaultTitle = config.pageDefaultTitle;
  if (pageTitle) {
    return `${pageTitle} - ${defaultTitle}`;
  }
  return defaultTitle;
}

/**
 * 生成随机字符串
 */
export function randomString() {
  return Math.random()
    .toString(36)
    .replace(/[^a-z]+/g, "")
    .substr(0, 5);
}

/**
 * 前缀判断
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path);
}

/**
 * 列表请求封装
 */
export async function requestList(requestFn, params, pageObj) {
  const { pageSize: size, pageNo: page } = pageObj;
  try {
    const res = (
      await requestFn({
        ...params,
        size,
        page
      })
    ).data;
    res.page = {
      pageNo: res.number + 1,
      pageSize: res.size,
      totalCount: res.totalElements
    };
    return res;
  } catch (error) {
    console.log(error);
    return null;
  }
}

/**
 * 检查上传的文件是否是多媒体文件
 */
export function checkIsVideoOrAudio(url) {
  return /\.mp4|\.mp3|\.avi|\.flv|\.mov|\.wmv|\.wmv|\.rmvb|\.rm|\.3gp|\.mpg|\.mkv/i.test(
    url
  );
}

/**
 * 检查上传的文件是否是图片
 */
export function checkIsImage(url) {
  return /\.jpg|\.png|\.gif|\.jpeg|\.webp|\.svg/.test(url);
}

/**
 * 检查上传文件是否是图片或者多媒体文件
 */
export function checkIsMedia(url) {
  return checkIsImage(url) || checkIsVideoOrAudio(url);
}

/**
 * 必填项校验规则生成
 */
export function createRequiredRules(words = [], labels = []) {
  const rules = {};
  words.forEach((word, index) => {
    const label = labels[index];
    rules[word] = [
      {
        required: true,
        message: label + "不能为空",
        trigger: "blur"
      }
    ];
  });
  return rules;
}

/**
 * 两个数组取并集
 */
export function unionArrays(arr1 = [], arr2 = [], equalName) {
  const arr = [...arr1];
  arr2.forEach(item2 => {
    const index = arr1.findIndex(
      item1 => item1[equalName] === item2[equalName]
    );
    if (index === -1) arr.push(item2);
  });
  return arr;
}
