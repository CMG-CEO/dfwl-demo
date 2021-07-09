<!--
 * @Author: KokoTa
 * @Date: 2021-01-05 11:36:29
 * @LastEditTime: 2021-01-19 10:52:26
 * @LastEditors: KokoTa
 * @Description:
 * @FilePath: /future-bms/src/views/educationManage/materialManage/index.vue
-->
<template>
  <div class="wrap">
    <el-row class="panel">
      <!-- 分类类型 -->
      <el-radio-group v-model="type">
        <el-radio :label="1">图片</el-radio>
        <el-radio :label="2">视频</el-radio>
        <el-radio :label="3">音频</el-radio>
        <el-radio :label="4">文件资料</el-radio>
        <el-radio :label="5">其他</el-radio>
      </el-radio-group>
    </el-row>
    <div class="panel education-normal-content">
      <!-- 搜索和上传操作 -->
      <div class="table-operation">
        <el-input
          class="w-180"
          v-model="searchData.resourceName"
          :placeholder="'请输入' + typeName + '名称'"
          clearable
        ></el-input>
        <el-button type="primary" size="small" :disabled="isShow.urlQuery" @click="search">搜索</el-button>
        <el-button type="primary" size="small" @click="upload">上传</el-button>
      </div>
      <div class="table-content">
        <!-- 分类列表 -->
        <div class="left">
          <div class="left-header">
            <span class="title">{{ typeName }}分类</span>
            <i class="el-icon-circle-plus-outline plus" @click="typeAdd"></i>
          </div>
          <div class="left-search">
            <el-input
              class="input"
              v-model="typeKeyword"
              placeholder="请输入分类名称"
              clearable
            ></el-input>
            <el-button type="primary" size="small" :disabled="isShow.urlQuery" @click="typeSearch"
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
            <el-table-column :label="typeName" width="300">
              <template slot-scope="scope">
                <div class="image-wrap">
                  <el-image
                    v-if="checkIsMedia(scope.row.resourceUrl)"
                    class="image-content"
                    :src="scope.row.previewUrl"
                    :preview-src-list="[scope.row.previewUrl]"
                  ></el-image>
                  <div class="image-info">
                    <div>{{ scope.row.resourceName }}</div>
                  </div>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="filesize" label="大小"></el-table-column>
            <el-table-column
              prop="length"
              label="时长"
              v-if="type == 2"
            ></el-table-column>
            <el-table-column
              prop="uploadTimeFormat"
              label="上传时间"
            ></el-table-column>
            <el-table-column label="操作" width="200">
              <template slot-scope="scope">
                <a
                  class="el-button el-button--text"
                  style="text-decoration: none;"
                  :href="scope.row.resourceUrl"
                  target="_blank"
                  >下载</a
                >
                <el-button type="text" @click="del">删除</el-button>
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
      :resourceType="type"
      @reload="getTypeList()"
    ></EditType>
    <!-- 文件上传框 -->
    <UploadDialog
      ref="upload"
      :currentSelect="currentSelect"
      :resourceType="type"
      @reload="getList()"
    ></UploadDialog>
    <!-- 获取权限功能 -->
    <jurisdiction @getJurisdiction="getJurisdiction"></jurisdiction>
  </div>
</template>

<script>
import filsize from "filesize";
import PaginationMixin from "@/mixin/pagination";
import EditType from "@/views/educationManage/itemManage/dialog/EditType";
import UploadDialog from "@/views/educationManage/materialManage/dialog/UploadDialog";
import { delCatalog, getCatalogList } from "@/api/itemManage";
import {
  delEamCatalogResources,
  getEamCatalogResourcesList
} from "@/api/eamCatalogResourcesManage";
import { checkIsVideoOrAudio, requestList, checkIsMedia } from "@/util";
import { formatTableTime } from "@/util/format";
import mediaImage from "@/assets/imgs/media.jpg";
import { ResourceType } from "@/util/constant";
import jurisdiction from "@/components/Jurisdiction";

export default {
  components: { EditType, UploadDialog, jurisdiction },
  mixins: [PaginationMixin],
  data() {
    return {
      type: 1,
      typeList: [],
      tableData: [],
      typeKeyword: "",
      isTypeCreate: false,
      currentType: { catalogId: 0 },
      isShow: {}
    };
  },
  computed: {
    typeName() {
      switch (this.type) {
        case ResourceType.IMAGE:
          return "图片";
        case ResourceType.VIDEO:
          return "视频";
        case ResourceType.AUDIO:
          return "音频";
        case ResourceType.FILE:
          return "文件资料";
        case ResourceType.OTHER:
          return "其他";
        default:
          return "未知";
      }
    }
  },
  watch: {
    type() {
      this.currentType = { catalogId: 0 };
      delete this.searchData.catalogId;
      this.page.pageNo = 1;
      this.getTypeList();
      this.getList();
    }
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
      this.search();
    },

    /**
     * 项操作
     */
    upload() {
      this.$refs.upload.showFlag = true;
    },
    del() {
      this.$confirm("确定删除吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          const {
            catalogResourceId: eamCatalogResourceId
          } = this.currentSelect;
          await delEamCatalogResources({ eamCatalogResourceId });
          this.$message.success("删除成功");
          this.getList();
        })
        .catch(() => {});
    },

    /**
     * 请求函数
     */
    async getList(params = this.searchData) {
      console.log('执行了没')
      const { type } = this;
      const data = await requestList(
        getEamCatalogResourcesList,
        { ...params, resourceType: type },
        this.page
      );
      this.tableData = data.content.map(item => {
        item.filesize = filsize(item.size);
        item.uploadTimeFormat = formatTableTime(item.uploadTime);
        item.previewUrl = checkIsVideoOrAudio(item.resourceUrl)
          ? item.thumbnailUrl
          : item.resourceUrl;
        return item;
      });
      this.page = data.page;
    },
    async getTypeList() {
      const { type } = this;
      const data = await getCatalogList({
        catalogName: this.typeKeyword,
        resourceType: type,
        page: 1,
        size: 1000
      });
      this.typeList = data.data.content;
      this.typeList.unshift({
        catalogId: 0,
        catalogName: "全部",
        resourceType: type
      });
    },
    // 获取权限功能
    getJurisdiction(val) {
      this.isShow = val
    },
    checkIsMedia
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
