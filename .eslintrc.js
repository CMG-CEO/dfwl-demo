/*
 * @Author: KokoTa
 * @Date: 2020-12-21 09:33:23
 * @LastEditTime: 2020-12-21 13:39:08
 * @LastEditors: KokoTa
 * @Description:
 * @FilePath: /future-bms/.eslintrc.js
 */
module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ["plugin:vue/essential", "@vue/standard"],
  parserOptions: {
    parser: "babel-eslint"
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    "space-before-function-paren": 0,
    "quotes": "off",
    "semi": "off",
    "comma-dangle": "off",
    "generator-star-spacing": "off",
    "no-tabs": "off",
    "no-unused-vars": "off",
    "no-console": "off",
    "no-irregular-whitespace": "off",
    "no-debugger": "off"
  }
};
