<!--
 * @Author: KokoTa
 * @Date: 2020-12-23 14:58:35
 * @LastEditTime: 2021-01-21 15:39:10
 * @LastEditors: KokoTa
 * @Description:
 * @FilePath: /future-bms/src/views/platformManage/accountManage/dialog/Edit.vue
-->
<template>
  <el-dialog title="重置密码" :visible.sync="showFlag" @open="open">
    <el-form ref="form" :model="form" label-width="80px" :rules="rules">
      <el-form-item label="旧密码" prop="currentPassword">
        <el-input v-model="form.currentPassword"></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="newPassword">
        <el-input v-model="form.newPassword"></el-input>
      </el-form-item>
      <el-form-item label="确定密码" prop="newPassword2">
        <el-input v-model="form.newPassword2"></el-input>
      </el-form-item>
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
import { ResourceType } from "@/util/constant";

import { createRequiredRules } from "@/util";

import { roleList } from "@/api/role";
import { requestList } from "@/util";
import {
  addAccount,
  saveAccount,
  getAccountId,
  resetPassword
} from "@/api/user";

export default {
  components: {},

  props: {
    userType: {},

    currentSelect: {
      // 传入的数据
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      showFlag: false,

      form: {},

      resourceType: ResourceType.IMAGE,
      rules: createRequiredRules(
        ["currentPassword", "newPassword", "newPassword2"],
        ["旧密码", "新密码", "确定密码"]
      )
    };
  },
  mounted() {
    this.validType();
  },
  computed: {},
  watch: {},
  methods: {
    validType() {
      var checkPassword = (rule, value, callback) => {
        if (value !== this.$store.state.user.password) {
          callback(new Error("密码错误"));
        } else {
          callback();
        }
      };
      var checkPassword2 = (rule, value, callback) => {
        if (value === "") {
          callback(new Error("请再次输入密码"));
        } else if (value !== this.form.newPassword) {
          callback(new Error("两次输入密码不一致!"));
        } else {
          callback();
        }
      };
      this.rules.newPassword2.push({
        validator: checkPassword2,
        trigger: "blur"
      });
      this.rules.currentPassword.push({
        validator: checkPassword,
        trigger: "blur"
      });
    },
    async submit() {
      this.$refs.form.validate(async valid => {
        if (valid) {
          delete this.form.newPassword2;
          // const [effectiveDate, expiryDate] = this.form.range;
          await resetPassword({ ...this.form });
          this.showFlag = false;
        }
      });
    },

    async open() {
      this.form = {};
      this.$refs.form && this.$refs.form.resetFields();
      this.$refs.selectMaterial && (this.$refs.selectMaterial.form = {});
    }
  }
};
</script>

<style scoped>
.el-input,
.el-select {
  width: 300px;
}
.el-textarea {
  width: 55%;
}
</style>
