<!--
 * @Author: KokoTa
 * @Date: 2020-12-22 09:42:51
 * @LastEditTime: 2021-01-21 13:58:31
 * @LastEditors: KokoTa
 * @Description: 平台管理 - 账套管理
 * @FilePath: /future-bms/src/views/platformManage/accountManage/index.vue
-->
<template>
  <div class="wrap">
    <!-- 搜索区域 -->
    <section class="panel">
      <el-form ref="form" :model="queryParam" :inline="true">
        <el-form-item label="用户姓名">
          <el-input
            v-model="queryParam.userName"
            placeholder="输入用户姓名"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="用户类型">
          <el-select
            v-model="queryParam.userType"
            placeholder="选择用户类型"
            clearable
            filterable
          >
            <el-option
              v-for="(item, index) in shelfStatusList"
              :key="item.itemCode + index"
              :label="item.itemName"
              :value="item.itemCode"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态">
          <el-select
            v-model="queryParam.status"
            placeholder="选择状态"
            clearable
            filterable
          >
            <el-option
              v-for="(item, index) in userType"
              :key="index"
              :label="item.label"
              :value="item.value"
            ></el-option>
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
          >新增用户</el-button
        >
      </div>
      <!-- 表格 -->
      <el-table class="table" :data="dataSource" border>
        <el-table-column
          label="序号"
          type="index"
          width="50"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="loginId"
          label="登录账号"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="wechat"
          label="微信号"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="userName"
          label="用户姓名"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="nickName"
          label="昵称"
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
        <!-- <el-table-column
          prop="bm"
          label="部门"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="js"
          label="角色"
          align="center"
        ></el-table-column> -->
        <el-table-column prop="status" label="用户状态" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.status == 'ENABLED'">启用</span>
            <span v-else>禁用</span>
          </template>
        </el-table-column>
        <el-table-column
          width="160"
          prop="createTime"
          label="创建时间"
          align="center"
        ></el-table-column>
        <el-table-column label="操作" width="200" align="center">
          <template slot-scope="scope">
            <el-button
              type="text"
              :disabled="isShow.urlUpdate"
              @click="handleEdit(scope.row)"
              >修改</el-button
            >
            <el-button
              type="text"
              :disabled="isShow.urlDelete"
              @click="deleteRole(scope.row)"
              >删除</el-button
            >
            <el-button
              v-if="scope.row.status == 'ENABLED'"
              type="text"
              @click="toggle(scope.row)"
              >禁用</el-button
            >
            <el-button v-else type="text" @click="toggle(scope.row)"
              >启用</el-button
            >
            <el-button type="text" @click="resetPassword(scope.row)"
              >重置密码
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <Pagination :ipagination="ipagination" @pagination="handlePag" />
    </section>
    <!-- 新建或编辑 -->
    <Edit ref="modalForm" @reload="loadData(1)"></Edit>
    <resetPassword
      :currentSelect="currentSelect"
      ref="resetPassword"
    ></resetPassword>
    <!-- 获取权限功能 -->
    <jurisdiction @getJurisdiction="getJurisdiction"></jurisdiction>
  </div>
</template>

<script>
import { querySelect } from "@/api/testManagement";
import { userType } from "@/util/option";
import { dfwlListMixin } from "@/mixin/dfwlListMixin";
import Edit from "./dialog/Edit.vue";

import { requestList } from "@/util";
import { userList, activeUser } from "@/api/user";
import { deleteRole } from "@/api/user";
import resetPassword from "./dialog/resetPassword";
import jurisdiction from "@/components/Jurisdiction";
import Pagination from "@/components/Pagination";

export default {
  name: "userManageSys",
  components: { Edit, resetPassword, jurisdiction, Pagination },
  mixins: [dfwlListMixin],
  data() {
    return {
      userType,
      tableData: [],
      isCreate: true,
      currentSelect: {},
      view: false,
      shelfStatusList: [],
      statusList: [
        { value: 0, label: "禁用" },
        { value: 1, label: "启用" }
      ],
      isShow: {},
      queryParam: {
        userName: "",
        userType: "",
        status: ""
      },
      url: {
        list: `/platform/users`,
        methods: "get",
        delete: "/platform/users/"
      },
      timeout: ""
    };
  },
  methods: {
    async toggle(row) {
     
      const { knowledgeId, isActive } = row;

      await activeUser(row);
      // 后端接口问题，做一个延时解决
      this.timeout = setTimeout(() => {
        this.$message.success("操作成功");
        this.loadData(1);
      }, 150);
    },
    deleteRole({ id }) {
      this.$confirm("确定删除吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.url.delete += `${id}`;
        this.handleDelete();
      });
    },
    create() {
      this.isCreate = true;
      this.$refs.Edit.showFlag = true;
    },
    reView(item) {
      this.isCreate = false;
      this.view = true;
      this.currentSelect = item;
      this.$refs.Edit.showFlag = true;
    },
    resetPassword(item) {
      this.currentSelect = item;
      this.$refs.resetPassword.showFlag = true;
    },
    // async getList(params = this.searchData) {
    //   const data = await requestList(userList, params, this.page);
    //   this.tableData = data.content;
    //   this.page = data.page;
    // },
    async querySelect() {
      const { data } = await querySelect({ dictCodes: "user_type" });
      this.shelfStatusList = data.user_type;
    },
    // 获取权限功能
    getJurisdiction(val) {
      this.isShow = val;
    }
  },
  mounted() {
    // this.getList();
    this.querySelect();
  },
  destroyed() {
    clearTimeout(this.timeout);
  }
};
</script>

<style></style>
