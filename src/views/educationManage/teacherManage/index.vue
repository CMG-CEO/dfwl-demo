<!--
 * @Author: KokoTa
 * @Date: 2021-01-13 09:04:41
 * @LastEditTime: 2021-01-20 16:49:31
 * @LastEditors: KokoTa
 * @Description:
 * @FilePath: /future-bms/src/views/educationManage/teacherManage/index.vue
-->

<template>
  <div class="wrap">
    <!-- 搜索区域 -->
    <section class="panel">
      <el-form ref="form" :model="searchData" :inline="true">
        <el-form-item label="登录账号">
          <el-input
            v-model="searchData.loginId"
            placeholder="输入登录账号"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="昵称">
          <el-input
            v-model="searchData.nickName"
            placeholder="输入昵称"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-select
            v-model="searchData.status"
            placeholder="请选择状态"
            clearable
          >
            <el-option
              v-for="item in baseStatus"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :disabled="isShow.urlQuery" @click="search"
            >查询</el-button
          >
          <el-button
            type="primary"
            :disabled="isShow.urlQuery"
            @click="resetSearch"
            >重置</el-button
          >
        </el-form-item>
      </el-form>
    </section>
    <!-- 表格区域 -->
    <section class="panel">
      <!-- 表格 -->
      <el-table
        class="table"
        :data="tableData"
        border
        @row-click="getCurrentSelect"
      >
        <el-table-column type="index" width="50"></el-table-column>
        <el-table-column prop="loginId" label="登录账号"></el-table-column>
        <el-table-column prop="nickName" label="昵称"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            {{ scope.row.status | statusFilter }}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200">
          <template>
            <el-button type="text" :disabled="isShow.urlUpdate" @click="modify"
              >编辑</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <Pagination
        :page-no="page.pageNo"
        :page-size="page.pageSize"
        :total-count="page.totalCount"
        @currentChange="currentPageChange"
        @sizeChange="currentSizeChange"
      />
    </section>
    <!-- 新建或编辑 -->
    <Edit
      ref="Edit"
      :isCreate="isCreate"
      :currentSelect="currentSelect"
      @reload="getList()"
    ></Edit>
    <!-- 获取权限功能 -->
    <jurisdiction @getJurisdiction="getJurisdiction"></jurisdiction>
  </div>
</template>

<script>
import { userType } from "@/util/option";
import PaginationMixin from "@/mixin/pagination";
import Edit from "@/views/educationManage/teacherManage/dialog/Edit";
import { requestList } from "@/util";
import { formatActive } from "@/util/format";
import { getTeacherList } from "@/api/teacherManage";
import jurisdiction from "@/components/Jurisdiction";
export default {
  components: { Edit, jurisdiction },
  mixins: [PaginationMixin],
  data() {
    return {
      userType,
      baseStatus: [{ label: "启用", value: "ENABLED" }, { label: "禁用", value: "DISABLED" }],
      tableData: [],
      isCreate: true,
      isShow: {},
    };
  },
  filters: {
    statusFilter(val) {
      if (val === "ENABLED") {
        return "启用";
      } else if (val == "DISABLED") {
        return "禁用";
      }
    },
  },
  methods: {
    detail() {
      this.$refs.Add.showFlag = true;
    },
    create() {
      this.isCreate = true;
      this.$refs.Edit.showFlag = true;
    },
    modify() {
      this.isCreate = false;
      this.$refs.Edit.showFlag = true;
    },

    async getList(params = this.searchData) {
      const data = await requestList(getTeacherList, params, this.page);
      this.tableData = data.content.map((item) => {
        item.statusName = formatActive(item.status);
        return item;
      });
      this.page = data.page;
    },
    // 获取权限功能
    getJurisdiction(val) {
      this.isShow = val;
    },
  },
  mounted() {
    this.getList();
  },
};
</script>

<style>
</style>
