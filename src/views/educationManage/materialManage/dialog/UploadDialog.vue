<!--
 * @Author: KokoTa
 * @Date: 2021-01-06 10:03:41
 * @LastEditTime: 2021-01-19 10:16:22
 * @LastEditors: KokoTa
 * @Description:
 * @FilePath: /future-bms/src/views/educationManage/materialManage/dialog/Upload.vue
-->

<template>
  <el-dialog
    style="poisition: relative"
    title="上传"
    width="375px"
    :visible.sync="showFlag"
    @open="open"
  >
    <el-form ref="form" :model="form" label-width="80px" :rules="rules">
      <el-form-item label="分类名称" prop="catalogId">
        <el-select
          v-model="form.catalogId"
          placeholder="选择分类名称"
          clearable
          filterable
        >
          <el-option
            v-for="(item, index) in catalogList"
            :key="index"
            :label="item.catalogName"
            :value="item.catalogId"
            >{{ item.catalogName }}</el-option
          >
        </el-select>
      </el-form-item>
      <el-form-item label="名称" prop="name">
        <el-input v-model="form.name" maxlength=20 placeholder="请输入名称"></el-input>
      </el-form-item>
      <el-form-item label="文件" prop="file">
        <Upload
          ref="upload"
          @uploaded="uploaded"
          :type="1"
          :uploadType="2"
        ></Upload>
      </el-form-item>
      <div class="getSpeedVal" v-if="ShowSpeed">
        <el-progress
          color="#FFCC42"
          type="circle"
          :percentage="percentage"
        ></el-progress>
      </div>
    </el-form>
    <span slot="footer">
      <el-button type="default" size="small" @click="showFlag = false"
        >取消</el-button
      >
      <el-button type="primary" size="small" @click="submit">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import request from "@/util/request";
import Upload from "@/components/Upload";
import { getCatalogOption } from "@/util/option";
import { createRequiredRules } from "@/util";
import { addEamCatalogResources } from "@/api/eamCatalogResourcesManage";
import axios from "axios";
export default {
  components: { Upload },
  props: {
    resourceType: {
      // 资源类型
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      showFlag: false,
      form: {},
      catalogList: [],
      rules: createRequiredRules(
        ["catalogId", "file", "name"],
        ["分类", "素材", "名称"]
      ),
      percentage: 0,
      ShowSpeed: false,
    };
  },
  computed: {
    title() {
      return this.isCreate ? "新建" : "编辑";
    },
  },
  methods: {
    uploaded(val) {
      console.log(val);
      this.form.name = val.file.name.substring(
        0,
        val.file.name.lastIndexOf(".")
      );
      this.form.file = val.file;
      if (typeof val.thumbnailurl == "undefined") {
        this.form = {
          ...this.form,
        };
      } else {
        this.form.length = val.length;
        this.form.thumbnailurl = val.thumbnailurl;
        this.form = {
          ...this.form,
        };
      }
    },
    async submit() {
      this.$refs.form.validate(async (valid) => {
        this.ShowSpeed = true;
        if (valid) {
          console.log(this.form);
          const { catalogId, file, name, thumbnailurl, length } = this.form;

          const headers = { "Content-Type": "multipart/form-data" };
          const formData = new FormData();
          formData.append("catalogId", catalogId);
          formData.append("file", file);
          formData.append("name", name);
          console.log(thumbnailurl);
          if (!thumbnailurl) {
          } else {
            formData.append("thumbnailurl", thumbnailurl);
            formData.append("length", length);
          }

          // axios
          //   .post("/api2/basic/EamCatalogResources/", formData, {
          //     headers: headers
          //   })
          //   .then(function(response) {
          //     console.log(response);
          //   })
          //   .catch(function(error) {
          //     console.log(error);
          //   });
          this.addEamCatalogResourcesData({ ...this.form });
        }
      });
    },
    addEamCatalogResourcesData(data) {
      const { catalogId, file, name, thumbnailurl, length } = data;

      const headers = { "Content-Type": "multipart/form-data" };
      const formData = new FormData();
      formData.append("catalogId", catalogId);
      formData.append("file", file);
      formData.append("name", name);
      console.log("1234");
      console.log(file);
      if (!thumbnailurl) {
      } else {
        formData.append("thumbnailurl", thumbnailurl);
        formData.append("length", length);
      }
      let that = this;
      request({
        headers,
        url: "/basic/EamCatalogResources/",
        method: "post",
        data: formData,
        onUploadProgress: function (e) {
          that.percentage = parseInt((e.loaded / e.total) * 100);
          console.log(that.percentage);
          that.ShowSpeed = true;
          if (that.percentage >= 100) {
            setTimeout(() => {
              that.$message.success("上传：成功");
              that.ShowSpeed = false;
              that.percentage = 0;
            }, 500);
          }
          console.log(e);
        },
      }).then(function (res) {
        console.log(res);
        if (res.status == 200) {
          that.showFlag = false;
          that.$emit("reload");
        }
      });
    },
    async open() {
      this.form = {};
      this.$refs.form && this.$refs.form.resetFields();
      this.$refs.upload && this.$refs.upload.reset();
      const list = await getCatalogOption(this.resourceType, 1000);
      this.catalogList = list;
    },
  },
};
</script>

<style lang="scss">
.getSpeedVal {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  position: absolute;
  left: 0;
  top: 0;
  .el-progress {
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left: -50px;
    margin-top: -50px;
    .el-progress__text {
      color: #ffffff;
    }
  }
}
</style>
