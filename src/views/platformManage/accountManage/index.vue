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
        <el-form-item label="账套编码">
          <el-input
            v-model="queryParam.accountCode"
            placeholder="输入账套编码"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="账套名称">
          <el-input
            v-model="queryParam.accountName"
            placeholder="输入账套名称"
            clearable
          ></el-input>
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
          >新增账套</el-button
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
          prop="accountCode"
          label="账套编码"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="accountName"
          label="账套名称"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="effectiveDate"
          label="账套有效时间起"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="expiryDate"
          label="账套有效时间止"
          align="center"
        ></el-table-column>
        <el-table-column prop="isClose" label="账套状态" align="center">
          <template slot-scope="scope">
            {{ scope.row.isClose ? "关闭" : "启用" }}
          </template>
        </el-table-column>
        <el-table-column
          prop="remark"
          label="备注"
          align="center"
        ></el-table-column>
        <el-table-column label="操作" width="200" align="center">
          <template slot-scope="scope">
            <el-button
              type="text"
              :disabled="isShow.urlUpdate"
              @click="handleEdit(scope.row)"
              >编辑</el-button
            >
            <el-button
              v-if="scope.row.isClose"
              type="text"
              @click="toggle(scope.row)"
              >启用</el-button
            >
            <el-button v-else type="text" @click="toggle(scope.row)"
              >禁用</el-button
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
import { dfwlListMixin } from "@/mixin/dfwlListMixin";
import Edit from "@/views/platformManage/accountManage/dialog/Edit";

import Pagination from "@/components/Pagination";
import { disableAccount, enableAccount } from "@/api/accountManage";
import jurisdiction from "@/components/Jurisdiction";

export default {
  name: "accountManage",
  components: { Edit, jurisdiction, Pagination },
  mixins: [dfwlListMixin],
  data() {
    return {
      tableData: [],
      isCreate: true,
      currentSelect: {},
      isShow: {},
      url: {
        list: "/system/accounts",
        methods: "get"
      },
      queryParam: {
        accountCode: "",
        accountName: ""
      }
    };
  },
  methods: {
    create() {
      this.isCreate = true;
      this.$refs.Edit.showFlag = true;
    },
    modify(item) {
      this.isCreate = false;
      this.currentSelect = item;
      this.$refs.Edit.showFlag = true;
    },
    async toggle(row) {
      const { accountId } = row;
      if (row.isClose === true) {
        await enableAccount({ accountId });
      } else {
        await disableAccount({ accountId });
      }
      this.$message.success("操作成功");
      this.loadData(1);
    },
    // 获取权限功能
    getJurisdiction(val) {
      this.isShow = val;
    }
  }
};
</script>

<style></style>
