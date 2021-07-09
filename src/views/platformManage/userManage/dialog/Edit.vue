<!--
 * @Author: KokoTa
 * @Date: 2020-12-23 10:25:39
 * @LastEditTime: 2021-01-21 15:36:55
 * @LastEditors: KokoTa
 * @Description:
 * @FilePath: /future-bms/src/views/platformManage/userManage/dialog/Edit.vue
-->
<template>
  <el-dialog :title="title" width="375px" :visible.sync="showFlag">
    <el-form ref="form" :model="form" label-width="80px" :rules="rules">
      <el-form-item label="登录账号" prop="loginId">
        <el-input
          v-model="form.loginId"
          placeholder="请输入账号"
          clearable
          :disabled="!isCreate"
        ></el-input>
      </el-form-item>
      <el-form-item v-if="isCreate" label="密码" prop="password">
        <el-input
          v-model="form.password"
          placeholder="请输入密码"
          clearable
          :disabled="!isCreate"
        ></el-input>
      </el-form-item>
      <el-form-item label="用户名" prop="userName">
        <el-input
          v-model="form.userName"
          placeholder="请输入用户名"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="昵称" prop="nickName">
        <el-input
          v-model="form.nickName"
          placeholder="请输入昵称"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="头像" prop="profilePicture">
        <SelectMaterial
          ref="selectMaterial"
          :url="form.profilePicture"
          :resourceType="resourceType"
          @selected="handleSelect"
          :iShow="iShow"
        ></SelectMaterial>
      </el-form-item>
      <el-form-item label="联系电话" prop="mobile">
        <el-input
          v-model="form.mobile"
          placeholder="请输入联系电话"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input
          v-model="form.email"
          placeholder="请输入邮箱"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="用户状态" prop="status">
        <el-select
          v-model="form.status"
          placeholder="请选择用户状态"
          clearable
          filterable
        >
          <el-option
            v-for="(item, index) in userType"
            :key="index"
            :label="item.label"
            :value="item.value"
            >{{ item.label }}</el-option
          >
        </el-select>
      </el-form-item>
      <el-form-item label="管理账套" prop="accountId">
        <el-select
          v-model="form.accountId"
          placeholder="请选择账套"
          clearable
          filterable
          :disabled="!isCreate"
        >
          <el-option
            v-for="(item, index) in accountList"
            :key="item.accountId + item.accountName + index"
            :label="item.accountName"
            :value="item.accountId"
            >{{ item.accountName }}</el-option
          >
        </el-select>
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
import { getAccountOption, userType } from "@/util/option";
import { createRequiredRules } from "@/util";
import { addPlatformUser, savePlatformUser } from "@/api/platformUserManage";
import { ResourceType } from "@/util/constant";
import SelectMaterial from "@/components/SelectMaterial";
export default {
  name: "userManageDialog",
  components: { SelectMaterial },

  watch: {
    accountList(newVal, oldVal) {}
  },
  data() {
    return {
      title: "详情",
      showFlag: false,
      form: {},
      userType,
      accountList: [],
      resourceType: ResourceType.IMAGE,
      rules: createRequiredRules(
        [
          "loginId",
          "password",
          "userName",
          "nickName",
          "mobile",
          "email",
          "status",
          "accountId",
          "profilePicture"
        ],
        [
          "登录账号",
          "密码",
          "用户名",
          "昵称",
          "联系电话",
          "邮箱",
          "用户状态",
          "管理账套",
          "头像"
        ]
      ),
      iShow: false,
      isCreate: true
    };
  },
  mounted() {},
  methods: {
    add() {
      this.showFlag = true;
      this.isCreate = true;
      this.$refs.form && this.$refs.form.resetFields();
    },
    edit(record) {
      this.showFlag = true;
      this.isCreate = false;
      console.log(record);
      this.$nextTick(() => {
        record.status === "ENABLED"
          ? (record.status = "启用")
          : (record.status = "禁用");
        this.form = record;
      });
    },
    async submit() {
      console.log(this.form);
      if (this.form.password) {
        if (this.form.password.length < 6 || this.form.password.length > 20) {
          return this.$message.error("请输入长度为6~20位密码");
        }
      }
      this.$refs.form.validate(async valid => {
        if (valid) {
          if (this.isCreate) {
            await addPlatformUser({ ...this.form });
            this.$message.success("新增成功");
            this.showFlag = false;
            this.$emit("reload");
          } else {
            await savePlatformUser({ ...this.form });
            this.$message.success("保存成功");
            this.showFlag = false;
            this.$emit("reload");
          }
        }
      });
    },
    // 头像
    handleSelect(url) {
      this.iShow = true;
      this.form = { ...this.form, profilePicture: url };
    }
  }
};
</script>

<style></style>
