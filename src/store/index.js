/*
 * @Author: KokoTa
 * @Date: 2020-12-21 09:33:23
 * @LastEditTime: 2020-12-22 14:10:47
 * @LastEditors: KokoTa
 * @Description:
 * @FilePath: /future-bms/src/store/index.js
 */
import Vue from "vue";
import Vuex from "vuex";
import getters from "./getters";
import { Message } from "element-ui";
import persistedState from "vuex-persistedstate";
import createVuexAlong from "vuex-along";
// 动态引入 modules 目录下的所有模块
const moduleFiles = require.context("./modules", true, /\.js$/);

const modules = {};
moduleFiles.keys().forEach(filePath => {
  const moduleName = filePath.replace(/^\.\/(.*)\.\w+$/, "$1");
  const value = moduleFiles(filePath);
  modules[moduleName] = value.default;
});

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    current: Date.now(), // 当前时间
    intervalID: 0,
    message: undefined,
    commune: "",
    nickName: '',
    profilePicture: ''
  },

  mutations: {
    saveCommune(state, commune) {
      state.commune = commune;
    },
    saveNickName(state, nickName) {
      state.nickName = nickName;
    },
    saveProfilePicture(state, profilePicture) {
      state.profilePicture = profilePicture;
    },
    startComputeCurrent(state) {
      state.intervalID = setInterval(() => {
        state.current = Date.now();
      }, 500);
    },
    stopComputeCurrent(state) {
      clearInterval(state.intervalID);
      state.intervalID = 0;
    },
    showMessage(state, options) {
      if (state.message) {
        state.message.close();
      }
      state.message = Message({
        message: options.message,
        type: options.type || "success",
        duration: options.duration || 2000,
        offset: 40
      });
    }
  },
  getters,
  modules
});
