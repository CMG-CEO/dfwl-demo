/*
 * @Author: KokoTa
 * @Date: 2020-12-22 13:33:55
 * @LastEditTime: 2020-12-22 14:11:36
 * @LastEditors: KokoTa
 * @Description:
 * @FilePath: /future-bms/src/store/modules/user.js
 */
import { getCommuneName, getProfilePicture, getNickName, getPermissions} from '@/util/auth'
const state = {
  userInfo: {},
  userRoutes: [],
  currentUserProfile: {},
  isLogin: false,
  isSDKReady: false, // TIM SDK 是否 ready
  userID: 0,
  userSig: "",
  sdkAppID: 0,
  password: "",
  communeName: getCommuneName(),
  profilePicture: getProfilePicture(),
  nickName: getNickName(),
  permissions: JSON.parse(getPermissions())
};

const mutations = {
  SET_USER_INFO(state, userInfo) {
    state.userInfo = userInfo;
  },
  SET_USER_ROUTES(state, routes) {
    state.userRoutes = routes;
  },
  updateCurrentUserProfile(state, userProfile) {
    state.currentUserProfile = userProfile;
  },
  toggleIsLogin(state, isLogin) {
    state.isLogin = typeof isLogin === "undefined" ? !state.isLogin : isLogin;
  },
  toggleIsSDKReady(state, isSDKReady) {
    state.isSDKReady =
      typeof isSDKReady === "undefined" ? !state.isSDKReady : isSDKReady;
  },
  reset(state) {
    Object.assign(state, {
      currentUserProfile: {},
      isLogin: false,
      isSDKReady: false // TIM SDK 是否 ready
    });
  },
  GET_USER_INFO(state, payload) {
    console.log(payload);
    state.userID = payload.userID;
    state.userSig = payload.userSig;
    state.sdkAppID = payload.sdkAppID;
    state.password = payload.password;
  }
};

const actions = {
  setUserInfo({ commit }, userInfo) {
    commit("SET_USER_INFO", userInfo);
  },
  setUserRoutes({ commit }, routes) {
    commit("SET_USER_ROUTES", routes);
  },
  logout(context) {
    // 若有当前会话，在退出登录时已读上报
    if (context.rootState.conversation.currentConversation.conversationID) {
      tim.setMessageRead({
        conversationID:
          context.rootState.conversation.currentConversation.conversationID
      });
    }
    tim.logout().then(() => {
      context.commit("toggleIsLogin");
      context.commit("stopComputeCurrent");
      context.commit("reset");
    });
  }
};

export default {
  // namespaced: true,
  state,
  mutations,
  actions
};
