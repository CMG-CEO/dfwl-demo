/*
 * @Author: KokoTa
 * @Date: 2020-12-22 13:37:08
 * @LastEditTime: 2020-12-22 13:58:55
 * @LastEditors: KokoTa
 * @Description:
 * @FilePath: /future-bms/src/store/getters.js
 */
const getters = {
  userRoutes: state => state.user.userRoutes,
  hidden(state) {
    // eslint-disable-next-line no-unused-vars
    const temp = state.current;
    if (typeof document.hasFocus !== "function") {
      return document.hidden;
    }
    return !document.hasFocus();
  }
};

export default getters;
