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
            placeholder="请选择页面"
            clearable
            filterable
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
          <el-button type="primary" :disabled="isShow.urlQuery" @click="search">查询</el-button>
          <el-button type="primary" :disabled="isShow.urlQuery" @click="resetSearch">重置</el-button>
        </el-form-item>
      </el-form>
    </section>
    <!-- 表格区域 -->
    <section class="panel">
      <!-- 表格操作 -->
      <div class="table-operation">
        <el-button type="primary" size="small" :disabled="isShow.urlCreate" @click="create">设置</el-button>
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
        <el-table-column prop="columnsTypeName" label="栏目类型"></el-table-column>
        <el-table-column prop="columnsName" label="栏目名称"></el-table-column>
        <el-table-column prop="columnsValue" label="栏目值"></el-table-column>
        <el-table-column
          prop="objectTypeName"
          label="栏目对象名称"
        ></el-table-column>
        <el-table-column prop="indexNo" label="顺序"></el-table-column>
        <el-table-column
          prop="objectName"
          label="关联对象名称"
        ></el-table-column>
        <el-table-column
          prop="objectTypeNameDetail"
          label="关联对象类型"
        ></el-table-column>
        <el-table-column
          prop="createTimeFormat"
          label="关联时间"
        ></el-table-column>
        <el-table-column label="操作" width="200">
          <template slot-scope="scope">
            <el-button type="text" :disabled="isShow.urlDelete" @click="del(scope.row)">删除</el-button>
            <el-button type="text" :disabled="isShow.urlUpdate" @click="modify(scope.row)">编辑</el-button>
            <el-button type="text" @click="getIndexNo(scope.row)" size="small">顺序</el-button>
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
      :editappColumnsId="editappColumnsId"
      :appTypeId="appTypeId"
      :appPageId="appPageId"
      :appColumnsId="appColumnsId"
      @reload="getList()"
    ></Edit>
    <el-dialog
      title="顺序"
      :visible.sync="dialogVisible"
      width="30%"
      append-to-body
    >
      <el-input v-model="getInputInfo" placeholder="请输入顺序"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="getInputInfoClick">确 定</el-button>
      </span>
    </el-dialog>
     <!-- 获取权限功能 -->
    <jurisdiction @getJurisdiction="getJurisdiction"></jurisdiction>
  </div>
</template>

<script>
import PaginationMixin from "@/mixin/pagination";
import Edit from "@/views/frontDeskManagement/columnInfoManage/dialog/Edit";
import { requestList } from "@/util";
import { seveColumnsIndexNo, delColumnsDetail, getColumnsInfoList } from "@/api/columnInfoManage";
import { querySelect } from "@/api/testManagement";
import jurisdiction from "@/components/Jurisdiction";
import { formatTableTime } from "@/util/format";
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
      editappColumnsId: "",
      getInputInfo: "",
      getIndexNoObj: {},
      dialogVisible: false,
      isShow: {},
      appTypeId: '',
      appPageId: '',
      appColumnsId: '',
    };
  },
  methods: {
    create() {
      this.isCreate = true;
      this.$refs.Edit.showFlag = true;
    },
    // 编辑
    modify(val) {
      console.log(val)
      this.editappColumnsId = val.appColumnsId
      this.appTypeId = val.appType
      this.appPageId = val.appPage
      this.appColumnsId = val.columnsType
      this.isCreate = false;
      this.$refs.Edit.showFlag = true;
    },
    // 删除
    del(val) {
      this.$confirm("确定删除吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          await delColumnsDetail(val.columnsDetailId);
          this.$message.success("删除成功");
          this.getList();
        })
        .catch(() => {});
    },
    // 顺序
    getIndexNo(val) {
      this.dialogVisible = true;
      this.getIndexNoObj = val
    },
    async getInputInfoClick() {
      this.dialogVisible = false;
      this.getIndexNoObj.indexNo = this.getInputInfo;
      await seveColumnsIndexNo(this.getIndexNoObj)
      this.getInputInfo = ""
      this.getList()
    },
    async getList(params = this.searchData) {
      // const data = await requestList(getColumnsList, params, this.page);
      const data = await requestList(getColumnsInfoList, params, this.page);
      if (data) {
        this.tableData = data.data.map((item) => {
          item.createTimeFormat = formatTableTime(item.createTimeDetail);
          return item;
        });
        let pageData = {};
        pageData.pageNo = data.data.current;
        pageData.pageSize = data.data.size;
        pageData.totalCount = data.data.total;
        this.page = pageData;
      }
    },
    // 获取权限功能
    getJurisdiction(val) {
      this.isShow = val
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
    for (let j = 0; j < this.appPageList.length; j++) {
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
