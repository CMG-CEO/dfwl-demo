<template>
  <div class="wrap">
    <!-- 搜索区域 -->
    <section class="panel">
      <el-form ref="form" :model="searchData" :inline="true">
        <el-form-item label="权限">
          <el-input
            v-model="searchData.name"
            placeholder="输入权限名称"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-select
            v-model="searchData.shelfStatus"
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
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">查询</el-button>
          <el-button type="primary" @click="resetSearch">重置</el-button>
        </el-form-item>
      </el-form>
    </section>
    <!-- 表格区域 -->
    <section class="panel">
      <!-- 表格操作 -->
      <div class="table-operation">
        <el-button type="primary" size="small" @click="create">新增</el-button>
      </div>
      <!-- 表格 -->
      <el-table
        class="table"
        :data="tableData"
        border
        @row-click="getCurrentSelect"
      >
        <el-table-column
          type="index"
          width="50"
          label="顺序"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="code"
          label="权限编码"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="name"
          label="权限名称"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="name"
          label="状态"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="effectiveDate"
          label="创建时间"
          align="center"
        ></el-table-column>

        <el-table-column label="操作" width="200" align="center">
          <template slot-scope="scope">
            <el-button type="text" @click="modify(scope.row)">编辑</el-button>
            <el-button type="text" @click="deleteRole(scope.row)"
              >删除</el-button
            >
            <el-button type="text" @click="reView(scope.row)">查看</el-button>
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
      :view="view"
    ></Edit>
  </div>
</template>

<script>
import PaginationMixin from "@/mixin/pagination";
import Edit from "./dialog/Edit";
import { deleteRole } from "@/api/role";
export default {
  components: { Edit },
  mixins: [PaginationMixin],
  data() {
    return {
      tableData: [1,2,3,4,3,2,2,3],
      isCreate: true,
      currentSelect: {},
      view: false
    };
  },
  methods: {
    create() {
      this.isCreate = true;
      this.$refs.Edit.showFlag = true;
    },
    deleteRole({ id }) {
      console.log(id);
      this.$confirm("确定删除吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          await deleteRole({ roleId: id });
          this.$message.success("删除成功");
          this.getList();
        })
        .catch(() => {});
    },
    reView(item) {
      this.isCreate = false;
      this.view = true;
      this.currentSelect = item;
      console.log(this.currentSelect);
      this.$refs.Edit.showFlag = true;
    },
    modify(item) {
      this.isCreate = false;
      this.currentSelect = item;
      console.log(this.currentSelect);
      this.$refs.Edit.showFlag = true;
    },
  }
}
</script>

<style>
</style>
