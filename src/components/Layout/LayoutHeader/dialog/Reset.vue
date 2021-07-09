<!--
 * @Author: KokoTa
 * @Date: 2020-12-30 10:59:02
 * @LastEditTime: 2020-12-30 13:56:25
 * @LastEditors: KokoTa
 * @Description:
 * @FilePath: /future-bms/src/components/Layout/LayoutHeader/dialog/Reset.vue
-->
<template>
  <el-dialog
    title="重置密码"
    width="375px"
    :visible.sync="showFlag"
    :before-close="beforeClose"
  >
    <el-form ref="form" :model="form" :rules="rules">
      <el-form-item label="旧密码" label-width="80px" prop="currentPassword">
        <el-input
          v-model="form.currentPassword"
          placeholder="旧密码"
          type="password"
        />
      </el-form-item>
      <el-form-item label="新密码" label-width="80px" prop="newPassword">
        <el-input
          v-model="form.newPassword"
          placeholder="新密码"
          type="password"
        />
      </el-form-item>
      <el-form-item label="确认密码" label-width="80px" prop="confirmPassword">
        <el-input
          v-model="form.confirmPassword"
          placeholder="确认密码"
          type="password"
        />
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
import { resetPassword } from "@/api/user";

export default {
  data() {
    return {
      showFlag: false,
      form: {},
      rules: {
        currentPassword: [
          { required: true, message: "旧密码不可为空", trigger: "blur" },
        ],
        confirmPassword: [
          { required: true, message: "确认密码不可为空", trigger: "blur" },
        ],
        newPassword: [
          { required: true, message: "新密码不可为空", trigger: "blur" },
          { validator: this.passwordValidator, trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    passwordValidator(rule, value, callback) {
      if (value === this.form.currentPassword) {
        callback(new Error("新旧密码不应该相同"));
      } else {
        callback();
      }
    },
    beforeClose(done) {
      this.$refs.form.resetFields();
      done();
    },
    submit() {
      if (this.form.newPassword == this.form.confirmPassword) {
        this.$refs.form.validate(async (valid) => {
          if (valid) {
            await resetPassword(this.form);
            this.$message.success("重置成功");
            this.showFlag = false;
          }
        });
      } else {
        this.$message.error("密码不一致");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
