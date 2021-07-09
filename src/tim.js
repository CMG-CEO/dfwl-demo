import TIM from "tim-js-sdk";
import TIMUploadPlugin from "tim-upload-plugin";

// 初始化 SDK 实例

const tim = TIM.create({
  SDKAppID: 1400491625
});

window.setLogLevel = tim.setLogLevel;

// 无日志级别
tim.setLogLevel(4);

// 注册 cos
tim.registerPlugin({ "tim-upload-plugin": TIMUploadPlugin });
export default tim;
