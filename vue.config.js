/*
 * @Author: KokoTa
 * @Date: 2020-12-21 14:48:34
 * @LastEditTime: 2020-12-29 17:01:47
 * @LastEditors: KokoTa
 * @Description:
 * @FilePath: /future-bms/vue.config.js
 */
const path = require("path");

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  lintOnSave: false,
  chainWebpack: config => {
    config.resolve.alias
      .set("@", resolve("src"))
      .set("tim", resolve("src/tim.js"));
    // 删除预加载
    config.plugins.delete("preload");
    config.plugins.delete("prefetch");
    // 压缩代码
    config.optimization.minimize(true);
    // 分割代码
    config.optimization.splitChunks({
      chunks: "all"
    });
  },
  devServer: {
    proxy: {
      "/api2": {
        //这里最好有一个 /
        target: "http://192.168.2.15:9181", // 后台接口域名
        ws: true, //如果要代理 websockets，配置这个参数
        secure: false, // 如果是https接口，需要配置这个参数
        changeOrigin: true, //是否跨域
        pathRewrite: {
          "^/api2": ""
        }
      }
    }
  },
  css: {
    extract: true,
    sourceMap: false,
    loaderOptions: {
      stylus: {
        "resolve url": true,
        // 自定义主题场景
        import: [path.resolve(__dirname, "./src/assets/css/base.styl")]
      },
      scss: {
        prependData: `
          @import "@/assets/variable.scss";
          @import "@/assets/global.scss";
          @import "@/assets/normalize.scss";
        `
      }
    },
   
  },
  chainWebpack(config) {
    // set svg-sprite-loader
    config.module
      .rule("svg")
      .exclude.add(resolve("src/icons"))
      .end();
    config.module
      .rule("icons")
      .test(/\.svg$/)
      .include.add(resolve("src/icons"))
      .end()
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({
        symbolId: "icon-[name]"
      })
      .end();
  }
};
