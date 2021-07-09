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
        <el-form-item label="角色名称">
          <el-input
            v-model="queryParam.name"
            placeholder="输入角色名称"
            clearable
          ></el-input>
        </el-form-item>
        <!-- <el-form-item label="状态">
          <el-select
            v-model="queryParam.shelfStatus"
            placeholder="选择状态"
            clearable
            filterable
          >
            <el-option
              v-for="item in shelfStatusList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item> -->
        <el-form-item>
          <el-button
            type="primary"
            :disabled="isShow.urlQuery"
            @click="searchQuery"
            >查询</el-button
          >
          <el-button
            type="primary"
            :disabled="isShow.urlQuery"
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
          type="primary"
          :disabled="isShow.urlCreate"
          size="small"
          @click="handleAdd"
          >新增</el-button
        >
      </div>
      <!-- 表格 -->
      <el-table class="table" :data="dataSource">
        <el-table-column
          label="序号"
          type="index"
          width="50"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="code"
          label="角色编码"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="name"
          label="角色名称"
          align="center"
        ></el-table-column>
        <!-- <el-table-column
          prop="effectiveDate"
          label="创建时间"
          align="center"
        ></el-table-column> -->

        <el-table-column label="操作" width="200" align="center">
          <template slot-scope="scope">
            <el-button
              type="text"
              :disabled="isShow.urlUpdate"
              @click="handleEdit(scope.row)"
              >编辑</el-button
            >
            <el-button
              type="text"
              :disabled="isShow.urlDelete"
              @click="deleteRole(scope.row)"
              >删除</el-button
            >
            <el-button type="text" @click="reView(scope.row)">查看</el-button>
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
import Pagination from "@/components/Pagination";
import Edit from "./dialog/Edit";
import { dfwlListMixin } from "@/mixin/dfwlListMixin";
import { requestList } from "@/util";
import { roleList, deleteRole } from "@/api/role";
import jurisdiction from "@/components/Jurisdiction";

export default {
  name: "roleManage",
  components: { Edit, jurisdiction, Pagination },
  mixins: [dfwlListMixin],
  data() {
    return {
      tableData: [],
      isCreate: true,
      currentSelect: {},
      view: false,
      isShow: {},
      queryParam: {
        name: ""
      },
      url: {
        list: `/system/roles`,
        methods: "get",
        delete: "/system/roles/"
      }
    };
  },
  methods: {
    deleteRole({ id }) {
      this.$confirm("确定删除吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        // await deleteRole({ roleId: id });
        // this.$message.success("删除成功");
        // this.getList();
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
    // modify(item) {
    //   this.isCreate = false;
    //   this.view = false;
    //   this.currentSelect = item;
    //   this.$refs.Edit.showFlag = true;
    // },

    // 获取权限功能
    getJurisdiction(val) {
      this.isShow = val;
    }
  },
  mounted() {
    // this.getList();
  }
};
</script>

<style></style>
