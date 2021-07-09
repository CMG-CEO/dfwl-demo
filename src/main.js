/*
 * @Author: KokoTa
 * @Date: 2020-12-21 09:33:23
 * @LastEditTime: 2021-01-22 11:14:04
 * @LastEditors: KokoTa
 * @Description:
 * @FilePath: /future-bms/src/main.js
 */
import Vue from "vue";
import App from "./App.vue";
import ElementUI from "element-ui";
import "./assets/theme/index.css";
import router from "./router";
import store from "./store";
import "./icons";
import Avatar from "./components2/avatar.vue";
/**
 * 富文本插件配置
 */
import VueQuillEditor from "vue-quill-editor";
import "quill/dist/quill.core.css"; // import styles
import "quill/dist/quill.snow.css"; // for snow theme
import "quill/dist/quill.bubble.css"; // for bubble theme
const toolbarOptions = [
  ["bold", "italic", "underline", "strike"], // 加粗 斜体 下划线 删除线 -----['bold', 'italic', 'underline', 'strike']
  ["blockquote", "code-block"], // 引用  代码块-----['blockquote', 'code-block']
  [{ header: 1 }, { header: 2 }], // 1、2 级标题-----[{ header: 1 }, { header: 2 }]
  [{ list: "ordered" }, { list: "bullet" }], // 有序、无序列表-----[{ list: 'ordered' }, { list: 'bullet' }]
  [{ script: "sub" }, { script: "super" }], // 上标/下标-----[{ script: 'sub' }, { script: 'super' }]
  [{ indent: "-1" }, { indent: "+1" }], // 缩进-----[{ indent: '-1' }, { indent: '+1' }]
  [{ direction: "rtl" }], // 文本方向-----[{'direction': 'rtl'}]
  [{ size: ["small", false, "large", "huge"] }], // 字体大小-----[{ size: ['small', false, 'large', 'huge'] }]
  [{ header: [1, 2, 3, 4, 5, 6, false] }], // 标题-----[{ header: [1, 2, 3, 4, 5, 6, false] }]
  [{ color: [] }, { background: [] }], // 字体颜色、字体背景颜色-----[{ color: [] }, { background: [] }]
  [{ font: [] }], // 字体种类-----[{ font: [] }]
  [{ align: [] }], // 对齐方式-----[{ align: [] }]
  ["clean"], // 清除文本格式-----['clean']
  ["image"] // 链接、图片、视频-----['link', 'image', 'video']
];
import { MessageBox, Row, Col, Button, Input, Loading, Dialog, Dropdown, DropdownMenu, DropdownItem, Checkbox, CheckboxGroup, Divider, Popover } from 'element-ui'
import LemonIMUI from "lemon-imui";
import "lemon-imui/dist/index.css";
import tim from "./tim";
import TIM from "tim-js-sdk";
import TWebLive from "tweblive";
import VueClipboard from "vue-clipboard2";
import "./assets/icon/iconfont.css";
import "./assets/icon/tim.css";
import "./assets/css/animate.css";

import trtcCalling from "./trtc-calling";
import TRTCCalling from "trtc-calling-js";

window.tim = tim;
window.TIM = TIM;
window.TRTCCalling = TRTCCalling;
window.trtcCalling = trtcCalling;
Vue.prototype.tim = tim;
Vue.prototype.TIM = TIM;
Vue.prototype.$bus = new Vue(); // event Bus 用于无关系组件间的通信。
Vue.prototype.TWebLive = TWebLive;
Vue.prototype.$store = store;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.trtcCalling = trtcCalling;
Vue.prototype.TRTCCalling = TRTCCalling;
Vue.use(LemonIMUI);
Vue.use(VueQuillEditor, {
  placeholder: "请输入文本...",
  theme: "snow",
  modules: {
    toolbar: {
      container: toolbarOptions
    }
  }
});
Vue.use(ElementUI);
Vue.config.productionTip = false;
Vue.component("avatar", Avatar);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
