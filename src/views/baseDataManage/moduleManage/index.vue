<!--
 * @Author: KokoTa
 * @Date: 2020-12-28 09:10:11
 * @LastEditTime: 2021-01-04 15:21:21
 * @LastEditors: KokoTa
 * @Description: 模块管理
 * @FilePath: /future-bms/src/views/baseDataManage/moduleManage/index.vue
-->
<template>
  <div class="wrap">
    <!-- 搜索区域 -->
    <section class="panel">
      <el-form ref="form" :model="searchData" :inline="true">
        <el-form-item label="科目">
          <el-select v-model="searchData.subjectId" placeholder="选择科目" clearable filterable>
            <el-option
              v-for="(item, index) in subjectList"
              :key="index"
              :label="item.subjectName"
              :value="item.subjectId"
            >{{item.subjectName}}</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="searchData.isActive" placeholder="选择状态" clearable filterable>
            <el-option
              v-for="(item, index) in baseStatus"
              :key="index"
              :label="item.label"
              :value="item.value"
            >{{item.label}}</el-option>
          </el-select>
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
        <el-button type="primary" size="small" :disabled="isShow.urlCreate" @click="create">新增模块</el-button>
      </div>
      <!-- 表格 -->
      <el-table class="table" :data="tableData" border @row-click="getCurrentSelect">
        <el-table-column type="index" width="50"></el-table-column>
        <el-table-column prop="subjectName" label="科目名称"></el-table-column>
        <el-table-column prop="moduleName" label="模块名称"></el-table-column>
        <el-table-column prop="isActiveFormat" label="模块状态"></el-table-column>
        <el-table-column prop="indexNo" label="顺序"></el-table-column>
        <el-table-column prop="createTimeFormat" label="创建时间"></el-table-column>
        <el-table-column label="操作" width="200">
          <template>
            <el-button type="text" :disabled="isShow.urlUpdate" @click="modify">编辑</el-button>
            <el-button type="text" :disabled="isShow.urlDelete" @click="del">删除</el-button>
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
    <Edit ref="Edit" :isCreate="isCreate" :currentSelect="currentSelect" @reload="getList()"></Edit>
    <!-- 获取权限功能 -->
    <jurisdiction @getJurisdiction="getJurisdiction"></jurisdiction>
  </div>
</template>

<script>
import { baseStatus, getSubjectOption } from '@/util/option'
import PaginationMixin from '@/mixin/pagination'
import Edit from '@/views/baseDataManage/moduleManage/dialog/Edit'
import { requestList } from '@/util'
import { delModule, getModuleList } from '@/api/moduleManage'
import { formatActive, formatTableTime } from '@/util/format'
import jurisdiction from "@/components/Jurisdiction";

export default {
  components: { Edit, jurisdiction },
  mixins: [PaginationMixin],
  data () {
    return {
      subjectList: [],
      baseStatus,
      tableData: [],
      isCreate: true,
      isShow: {}
    }
  },
  methods: {
    create () {
      this.isCreate = true
      this.$refs.Edit.showFlag = true
    },
    modify () {
      this.isCreate = false
      this.$refs.Edit.showFlag = true
    },
    del () {
      this.$confirm('确定删除吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const { moduleId } = this.currentSelect
        await delModule({ moduleId })
        this.$message.success('删除成功')
        this.getList()
      }).catch(() => {})
    },

    async getList (params = this.searchData) {
      const data = await requestList(getModuleList, params, this.page)
      if (data) {
        this.tableData = data.content.map((item) => {
          item.isActiveFormat = formatActive(item.isActive)
          item.createTimeFormat = formatTableTime(item.createTimeFormat)
          return item
        })
        this.page = data.page
      }
    },
    // 获取权限功能
    getJurisdiction(val) {
      this.isShow = val
    },
  },
  async mounted () {
    this.subjectList = await getSubjectOption()
    this.getList()
  }
}
</script>

<style>
</style>
