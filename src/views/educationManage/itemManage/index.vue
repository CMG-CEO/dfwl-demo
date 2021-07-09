<template>
  <div class="wrap">
    <div class="panel education-normal-content">
      <!-- 搜索和上传操作 -->
      <div class="table-operation">
        <el-input
          class="w-180"
          v-model="searchData.materialsName"
          placeholder="请输入物品名称"
          clearable
        ></el-input>
        <el-button
          type="primary"
          size="small"
          :disabled="isShow.urlQuery"
          @click="search"
          >搜索</el-button
        >
        <el-button
          type="primary"
          size="small"
          :disabled="isShow.urlCreate"
          @click="create"
          >新增</el-button
        >
      </div>
      <div class="table-content">
        <!-- 分类列表 -->
        <div class="left">
          <div class="left-header">
            <span class="title">物品分类</span>
            <i class="el-icon-circle-plus-outline plus" @click="typeAdd"></i>
          </div>
          <div class="left-search">
            <el-input
              class="input"
              v-model="typeKeyword"
              placeholder="请输入分类名称"
              clearable
            ></el-input>
            <el-button
              type="primary"
              size="small"
              :disabled="isShow.urlQuery"
              @click="typeSearch"
              >搜索</el-button
            >
          </div>
          <div class="list">
            <div
              class="list-item"
              :class="
                currentType.catalogId === item.catalogId
                  ? 'list-item-active'
                  : ''
              "
              v-for="(item, index) in typeList"
              :key="index"
              @click="typeClick(item)"
            >
              <div>{{ item.catalogName }}</div>
              <div v-if="item.catalogId">
                <i
                  class="el-icon-remove-outline remove"
                  @click="typeDel(item)"
                ></i>
                <i class="el-icon-edit plus" @click="typeModify(item)"></i>
              </div>
            </div>
          </div>
        </div>
        <!-- 表格 -->
        <div class="right">
          <el-table
            class="table"
            :data="tableData"
            height="500"
            border
            @row-click="getCurrentSelect"
          >
            <el-table-column label="物品名称" width="300">
              <template slot-scope="scope">
                <div class="image-wrap">
                  <el-image
                    class="image-content"
                    :src="scope.row.materialsUrl"
                    :preview-src-list="[scope.row.materialsUrl]"
                  ></el-image>
                  <div class="image-info">
                    <div>名称：{{ scope.row.materialsName }}</div>
                  </div>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="quantity" label="库存"></el-table-column>
            <el-table-column prop="remark" label="备注"></el-table-column>
            <el-table-column label="操作" width="200">
              <template slot-scope="scope">
                <el-button
                  type="text"
                  :disabled="isShow.urlUpdate"
                  @click="modify(2, scope.row)"
                  >编辑</el-button
                >
                <el-button type="text" @click="modify(3)">购入</el-button>
                <el-button type="text" @click="modify(4)">领用</el-button>
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
        </div>
      </div>
    </div>
    <!-- 新增分类 -->
    <EditType
      ref="editType"
      :isCreate="isTypeCreate"
      :currentSelect="currentSelect"
      @reload="getTypeList()"
    ></EditType>
    <!-- 项操作 -->
    <Edit
      ref="Edit"
      :type="itemOperationType"
      :currentSelect="currentSelect"
      @reload="getList()"
    ></Edit>
    <!-- 获取权限功能 -->
    <jurisdiction @getJurisdiction="getJurisdiction"></jurisdiction>
  </div>
</template>

<script>
import PaginationMixin from "@/mixin/pagination";
import EditType from "@/views/educationManage/itemManage/dialog/EditType";
import Edit from "@/views/educationManage/itemManage/dialog/Edit";
import {
  delCatalog,
  delMaterial,
  getCatalogList,
  getMaterialList
} from "@/api/itemManage";
import { requestList } from "@/util";
import jurisdiction from "@/components/Jurisdiction";
export default {
  components: { EditType, Edit, jurisdiction },
  mixins: [PaginationMixin],
  data() {
    return {
      typeList: [],
      tableData: [],
      typeKeyword: "",
      currentType: { catalogId: 0 },
      isTypeCreate: false,
      itemOperationType: 1,
      isShow: {}
    };
  },
  methods: {
    /**
     * 分类操作
     */
    typeSearch() {
      this.getTypeList();
    },
    typeAdd() {
      this.currentSelect = {};
      this.$refs.editType.showFlag = true;
      this.isTypeCreate = true;
    },
    typeModify(data) {
      this.currentSelect = data;
      this.$refs.editType.showFlag = true;
      this.isTypeCreate = false;
    },
    typeDel(data) {
      this.$confirm("确定删除吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          const { catalogId } = data;
          await delCatalog({ catalogId });
          this.$message.success("删除成功");
          this.getTypeList();
        })
        .catch(() => {});
    },
    typeClick(type) {
      this.currentType = { ...type };
      if (type.catalogId) this.searchData.catalogId = type.catalogId;
      else delete this.searchData.catalogId;
      this.getList();
    },

    /**
     * 项操作
     */
    create() {
      this.itemOperationType = 1;
      this.$refs.Edit.showFlag = true;
    },
    modify(type, data) {
      this.itemOperationType = type;
      this.$refs.Edit.showFlag = true;
      // Lee
      this.$refs.Edit.show(type, data);
    },
    del() {
      this.$confirm("确定删除吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          const { materialsId } = this.currentSelect;
          await delMaterial({ materialsId });
          this.$message.success("删除成功");
          this.getList();
        })
        .catch(() => {});
    },

    /**
     * 请求函数
     */
    async getList(params = this.searchData) {
      const data = await requestList(getMaterialList, params, this.page);
      this.tableData = data.content;
      this.page = data.page;
    },
    async getTypeList() {
      const data = await getCatalogList({
        catalogName: this.typeKeyword,
        resourceType: 100,
        page: 1,
        size: 1000
      });
      this.typeList = data.data.content;
      this.typeList.unshift({
        catalogId: 0,
        catalogName: "全部"
      });
    },
    // 获取权限功能
    getJurisdiction(val) {
      this.isShow = val;
    }
  },
  mounted() {
    this.getTypeList();
    this.getList();
  }
};
</script>

<style lang="scss" scoped>
.panel {
  padding-bottom: 10px;
}
</style>
