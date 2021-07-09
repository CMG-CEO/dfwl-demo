<!--
 * @Author: KokoTa
 * @Date: 2020-12-22 09:43:15
 * @LastEditTime: 2021-01-21 15:37:42
 * @LastEditors: KokoTa
 * @Description: 平台管理 - 用户管理
 * @FilePath: /future-bms/src/views/platformManage/userManage/index.vue
-->
<template>
  <div class="wrap">
    <!-- 搜索区域 -->
    <section class="panel">
      <el-form ref="form" :model="queryParam" :inline="true">
        <el-form-item label="登录账号">
          <el-input
            v-model="queryParam.loginId"
            placeholder="输入登录账号"
            clearable
            @clear="searchQuery"
          ></el-input>
        </el-form-item>
        <el-form-item label="用户名">
          <el-input
            v-model="queryParam.userName"
            placeholder="输入用户名"
            clearable
            @clear="searchQuery"
          ></el-input>
        </el-form-item>
        <el-form-item label="用户状态">
          <el-select
            v-model="queryParam.status"
            placeholder="选择用户状态"
            clearable
            filterable
            @clear="searchQuery"
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
        <el-form-item>
          <el-button
            :disabled="isShow.urlQuery"
            type="primary"
            @click="searchQuery"
            >查询</el-button
          >
          <el-button
            :disabled="isShow.urlQuery"
            type="primary"
            @click="searchReset"
            >重置</el-button
          >
        </el-form-item>
      </el-form>
    </section>
    <!-- 表格区域 -->
    <section class="panel">
      <!-- 表格操作 -->
      <div class="table-operation">
        <el-button
          :disabled="isShow.urlCreate"
          type="primary"
          size="small"
          @click="handleAdd"
          >新增管理员用户</el-button
        >
      </div>
      <!-- 表格 -->
      <!-- @row-click="getCurrentSelect" -->
      <el-table class="table" :data="dataSource" border>
        <el-table-column
          label="序号"
          type="index"
          align="center"
          width="50"
        ></el-table-column>
        <el-table-column
          prop="loginId"
          label="登录账号"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="userName"
          label="用户名"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="mobile"
          label="联系电话"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="email"
          label="邮箱"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="userType"
          label="用户类型"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="accountId"
          label="管理账套"
          align="center"
        ></el-table-column>
        <el-table-column prop="status" label="用户状态" align="center">
          <template slot-scope="scope">
            {{ scope.row.status == "ENABLED" ? "启用" : "禁用" }}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200" align="center">
          <template slot-scope="scope">
            <el-button
              :disabled="isShow.urlUpdate"
              type="text"
              @click="handleEdit(scope.row)"
              >编辑</el-button
            >
            <el-button
              v-if="scope.row.status === 'DISABLED'"
              type="text"
              @click="toggle(scope.row)"
              >启用</el-button
            >
            <el-button v-else type="text" @click="toggle(scope.row)"
              >禁用</el-button
            >
            <el-button type="text" @click="resetPassword(scope.row)"
              >重置密码</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <Pagination :ipagination="ipagination" @pagination="handlePag" />
    </section>
    <!-- 新建或编辑 -->
    <Edit ref="modalForm" @reload="loadData(1)"></Edit>
    <!-- 获取权限功能 -->
    <jurisdiction @getJurisdiction="getJurisdiction"></jurisdiction>
  </div>
</template>

<script>
import { userType } from "@/util/option";
import { dfwlListMixin } from "@/mixin/dfwlListMixin";
import Edit from "./dialog/Edit.vue";

import {
  disablePlatformUser,
  enablePlatformUser,
  resetPlatformUser
} from "@/api/platformUserManage";
import jurisdiction from "@/components/Jurisdiction";
import Pagination from "@/components/Pagination";

export default {
  name: "userManage",
  components: { Edit, jurisdiction, Pagination },
  mixins: [dfwlListMixin],
  data() {
    return {
      userType,
      tableData: [],
      isCreate: true,
      isShow: {},
      url: {
        list: "/platform/admins",
        methods: "get"
      },
      queryParam: {
        loginId: "",
        userName: "",
        status: ""
      },
      timeout: ""
    };
  },
  methods: {
    create() {
      this.isCreate = true;
      this.$refs.Edit.showFlag = true;
    },
    modify() {
      this.isCreate = false;
      this.$refs.Edit.showFlag = true;
    },

    async toggle(row) {
      const { id } = row;
      if (row.status === "DISABLED") {
        await enablePlatformUser({ id });
      } else {
        await disablePlatformUser({ id });
      }
      this.timeout = setTimeout(() => {
        this.$message.success("操作成功");
        this.loadData(1);
      }, 150);
    },

    async resetPassword(row) {
      const { id } = row;
      await resetPlatformUser({ id });
      this.$message.success("密码重置成功");
    },

    // 获取权限功能
    getJurisdiction(val) {
      // this.isShow = val;
    }
  },
  destroyed() {
    clearTimeout(this.timeout);
  }
};
</script>

<style lang="scss" scoped>
.pagination-wrap {
  text-align: right;
  overflow: scroll;
  margin: 10px 0;
}
</style>
