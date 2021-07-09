<!--
 * @Author: KokoTa
 * @Date: 2021-01-13 10:35:16
 * @LastEditTime: 2021-01-19 10:13:49
 * @LastEditors: KokoTa
 * @Description:
 * @FilePath: /future-bms/src/components/Upload/index.vue
-->
<template>
  <el-upload
    :class="type === 2 ? 'avatar- ' : ''"
    action="#"
    :show-file-list="false"
    :http-request="handleUpload"
    :disabled="disabled"
  >
    <div v-if="type === 1">
      <span>{{ url }}</span>
      <el-button>上传</el-button>
    </div>
    <div v-if="type === 2">
      <img v-if="url" :src="url" class="avatar" />
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </div>
  </el-upload>
</template>

<script>
import { uploadFile } from "@/api/eamCatalogResourcesManage";
import { changeSeconds } from "./common";
export default {
  props: {
    type: {
      // 上传类型，1 上传后显示链接，2 上传后显示图片
      type: Number,
      default: 2
    },
    disabled: {
      type: Boolean,
      default: false
    },
    uploadType: {
      // 上传方式，1 独立上传接口上传后返回地址，2 外部接口直接上传文件，直接返回 file 文件
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      url: "",
      thumbImg: "",
      length: "" //视频时长
    };
  },
  methods: {
    loadVideo(file) {
      return new Promise(function(resolve, reject) {
        const videoElem = document.createElement("video");
        const dataUrl = URL.createObjectURL(file);
        // 当前帧的数据是可用的
        videoElem.onloadeddata = function() {
          resolve(videoElem);
        };
        videoElem.onerror = function() {
          reject("video 后台加载失败");
        };
        // 设置 auto 预加载数据， 否则会出现截图为黑色图片的情况
        videoElem.setAttribute("preload", "auto");
        videoElem.src = dataUrl;
      });
    },
    getImage(blob, duration, file) {
      let _this = this;
      //1:获取file对象
      var reader = new FileReader();
      //2:解析对象，转成baae64对象的url
      reader.addEventListener(
        "load",
        function(e) {
          // console.log(e.target.result);

          // _this.thumbImg = _this.Base64toFile(e.target.result, _this.url);
          let picName =
            _this.url.substring(0, _this.url.lastIndexOf(".")) + ".png";
          _this.$emit("uploaded", {
            file: file,
            thumbnailurl: _this.Base64toFile(e.target.result, picName),

            length: duration
          });
        },
        false
      );
      if (blob) {
        //在load中返回一个base64编码
        reader.readAsDataURL(blob);
      }
    },
    Base64toFile(dataurl, filename) {
      //将base64转换为文件
      var arr = dataurl.split(","),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new File([u8arr], filename, { type: mime });
    },
    async handleUpload(params) {
      var _this = this;
      if (this.uploadType === 1) {
        console.log("上传1：", params);
        const { file } = params;
        this.$message.info("上传中，请稍后...");
        const res = await uploadFile({ file });
        this.$message.success("文件上传成功！");
        this.url = res.data.url;
        this.$emit("uploaded", this.url);
      }
      if (this.uploadType === 2) {
        const { file } = params;
          // file.type == "image/png" || 
          // file.type == "image/jpeg" || 
          // file.type == "application/pdf" || 
          // file.type == "application/msword" || 
          // file.type == "text/plain"
        if (file.type != "video/mp4") {
          _this.$emit("uploaded", {
            file: file
          });
        } else {
          var fileurl = URL.createObjectURL(file);

          var audioElement = new Audio(fileurl);
          var duration;
          // var length;
          audioElement.addEventListener("loadedmetadata", function(_event) {
            duration = audioElement.duration;
            // console.log("duration");
            // _this.length = changeSeconds(duration);
            // console.log(changeSeconds(duration)); //单位：秒
            _this.loadVideo(file).then(videoElem => {
              const canvasElem = document.createElement("canvas");
              const { videoWidth, videoHeight } = videoElem;
              canvasElem.width = videoWidth;
              canvasElem.height = videoHeight;
              canvasElem
                .getContext("2d")
                .drawImage(videoElem, 0, 0, videoWidth, videoHeight);
              // 导出成blob文件
              canvasElem.toBlob(blob => {
                _this.getImage(blob, changeSeconds(duration), file);

                // 获取文件 blob、file对象都可读取
              }, "image/png");
            });
          });
        }

        this.url = file.name;
      }
    },

    reset() {
      this.url = "";
    }
  }
};
</script>

<style></style>
