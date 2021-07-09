<template>
  <div class="wrap">
    <!-- 搜索区域 -->
    <section class="panel">
      <el-form ref="form" :model="searchData" :inline="true">
        <el-form-item label="应用类型" prop="appType">
          <el-select
            v-model="searchData.appType"
            placeholder="请选择应用类型"
            width="100px"
            clearable
            filterable
            @change="getAppTypeValue(searchData.appType)"
          >
            <el-option
              v-for="(item, index) in appTypeList"
              :key="index"
              :label="item.appTypeName"
              :value="item.appType"
              >{{ item.appTypeName }}</el-option
            >
          </el-select>
        </el-form-item>
        <el-form-item label="页面" prop="appPage">
          <el-select
            v-model="searchData.appPage"
            placeholder="请选择页面"
            clearable
            filterable
            @change="getAppPageValue(searchData.appPage)"
          >
            <el-option
              v-for="(item, index) in appPageList"
              :key="index"
              :label="item.appPageName"
              :value="item.appPage"
              >{{ item.appPageName }}</el-option
            >
          </el-select>
        </el-form-item>
        <el-form-item label="栏目类型" prop="columnsType">
          <el-select
            v-model="searchData.columnsType"
            placeholder="请选择栏目类型"
            clearable
            filterable
            @change="getAppColumnsValue(searchData.columnsType)"
          >
            <el-option
              v-for="(item, index) in appColumnsList"
              :key="index"
              :label="item.columnsTypeName"
              :value="item.columnsType"
              >{{ item.columnsTypeName }}</el-option
            >
          </el-select>
        </el-form-item>
        <el-form-item label="栏目名称" prop="columnsName">
          <el-input
            v-model="searchData.columnsName"
            placeholder="请输入栏目名称"
            clearable
          ></el-input>
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
      <!-- 表格操作 -->
      <div class="table-operation">
        <el-button
          type="primary"
          :disabled="isShow.urlCreate"
          size="small"
          @click="create"
          >新增</el-button
        >
      </div>
      <!-- 表格 -->
      <el-table
        class="table"
        :data="tableData"
        border
        @row-click="getCurrentSelect"
      >
        <el-table-column type="index" width="50"></el-table-column>
        <el-table-column prop="appTypeName" label="应用类型"></el-table-column>
        <el-table-column prop="appPageName" label="页面"></el-table-column>
        <el-table-column
          prop="columnsTypeName"
          label="栏目类型"
        ></el-table-column>
        <el-table-column prop="columnsName" label="栏目名称"></el-table-column>
        <el-table-column prop="columnsValue" label="栏目值"></el-table-column>
        <el-table-column
          prop="objectTypeName"
          label="对象类型名称"
        ></el-table-column>
        <el-table-column prop="indexNo" label="顺序"></el-table-column>
        <el-table-column prop="isShow" label="是否显示">
          <template slot-scope="scope">
            {{scope.row.isShow | isShow}}
          </template>
        </el-table-column>
        <el-table-column prop="isDetail" label="包含对象明细">
          <template slot-scope="scope">
            {{scope.row.isDetail | isShow}}
          </template>
        </el-table-column>
        <el-table-column
          prop="recordNumber"
          label="显示记录数"
        ></el-table-column>
        <el-table-column prop="remark" label="备注"></el-table-column>
        <el-table-column label="操作" width="200">
          <template>
            <el-button type="text" :disabled="isShow.urlUpdate" @click="modify"
              >编辑</el-button
            >
            <el-button type="text" :disabled="isShow.urlDelete" @click="del"
              >删除</el-button
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
import PaginationMixin from "@/mixin/pagination";
import Edit from "@/views/frontDeskManagement/columnSetting/dialog/Edit";
import { requestList } from "@/util";
import { getColumnsList, delColumns } from "@/api/columnSetting";
import { querySelect } from "@/api/testManagement";
import jurisdiction from "@/components/Jurisdiction";
export default {
  components: { Edit, jurisdiction },
  mixins: [PaginationMixin],
  data() {
    return {
      form: {},
      tableData: [],
      appTypeList: [],
      appPageList: [],
      appColumnsList: [],
      isCreate: true,
      isShow: {},
    };
  },
  filters: {
    isShow(val) {
      if (val === "1") {
        return "是";
      } else {
        return "否";
      }
    },
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
    del() {
      this.$confirm("确定删除吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          const { appColumnsId } = this.currentSelect;
          await delColumns({ appColumnsId });
          this.$message.success("删除成功");
          this.getList();
        })
        .catch(() => {});
    },

    async getList(params = this.searchData) {
      console.log(params)
      params.appType == "" ? params.appTypeName = "" : ""
      params.appPage == "" ? params.appPageName = "" : ""
      params.columnsType == "" ? params.columnsTypeName = "" : ""
      const data = await requestList(getColumnsList, params, this.page);
      if (data) {
        this.tableData = data.data.records.map((item) => {
          return item;
        });
        let pageData = {};
        pageData.pageNo = data.data.current;
        pageData.pageSize = data.data.size;
        pageData.totalCount = data.data.total;
        this.page = pageData;
      }
    },
    // 应用类型值
    getAppTypeValue(val) {
      for (var i = 0; i < this.appTypeList.length; i++) {
        if (this.appTypeList[i].appType == val) {
          this.searchData.appTypeName = this.appTypeList[i].appTypeName;
        }
      }
    },
    // 应用页面
    getAppPageValue(val) {
      for (var i = 0; i < this.appPageList.length; i++) {
        if (this.appPageList[i].appPage == val) {
          this.searchData.appPageName = this.appPageList[i].appPageName;
        }
      }
    },
    // 栏目类型
    getAppColumnsValue(val) {
      for (var i = 0; i < this.appColumnsList.length; i++) {
        if (this.appColumnsList[i].columnsType == val) {
          this.searchData.columnsTypeName = this.appColumnsList[i].columnsTypeName;
        }
      }
    },
    // 获取权限功能
    getJurisdiction(val) {
      this.isShow = val;
    },
  },
  async mounted() {
    // 请求数据字典并按需展示
    let { data } = await querySelect({
      dictCodes: "app_type,app_page,cdm_app_columns_object_type,style_type,columns_type",
    });
    this.appTypeList = data.app_type;
    for (var i = 0; i < this.appTypeList.length; i++) {
      this.appTypeList[i].appType = this.appTypeList[i].itemCode;
      this.appTypeList[i].appTypeName = this.appTypeList[i].itemName;
    }
    this.appPageList = data.app_page;
    for (var j = 0; j < this.appPageList.length; j++) {
      this.appPageList[j].appPage = this.appPageList[j].itemCode;
      this.appPageList[j].appPageName = this.appPageList[j].itemName;
    }
    this.appColumnsList = data.columns_type;
    for (let j = 0; j < this.appColumnsList.length; j++) {
      this.appColumnsList[j].columnsType = this.appColumnsList[j].itemCode;
      this.appColumnsList[j].columnsTypeName = this.appColumnsList[j].itemName;
    }
    this.getList();
  },
};
</script>

<style>
</style>
