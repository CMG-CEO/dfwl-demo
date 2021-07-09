<!--
 * @Author: KokoTa
 * @Date: 2020-12-22 09:43:05
 * @LastEditTime: 2020-12-24 09:11:06
 * @LastEditors: KokoTa
 * @Description: 平台管理 - 数据字典
 * @FilePath: /future-bms/src/views/platformManage/dataDictionary/index.vue
-->
<template>
  <div class="wrap">
    <!-- 搜索区域 -->
    <section class="panel">
      <el-form ref="form" :model="searchData" :inline="true">
        <el-form-item label="类型编号">
          <el-input v-model="searchData.phone" placeholder="输入类型编号" clearable></el-input>
        </el-form-item>
        <el-form-item label="类型名称">
          <el-input v-model="searchData.usernmae" placeholder="输入类型名称" clearable></el-input>
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
        <el-button type="primary" size="small" @click="createType">新增类型</el-button>
        <el-button type="primary" size="small" @click="refreshType">刷新缓存</el-button>
      </div>
      <!-- 表格 -->
      <el-table class="table" :data="tableData" border @row-click="getCurrentSelect">
        <el-table-column type="index" width="50"></el-table-column>
        <el-table-column prop="prop" label="类型编码"></el-table-column>
        <el-table-column prop="prop" label="类型名称"></el-table-column>
        <el-table-column prop="prop" label="状态"></el-table-column>
        <el-table-column label="操作" width="250">
          <template>
            <el-button type="text" @click="modifyType">编辑字典类型</el-button>
            <el-button type="text" @click="modifyItem">编辑字典项</el-button>
            <el-button type="text text-red" size="small" @click="delType">删除</el-button>
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
    <EditType ref="EditType" :isCreate="isCreate" :currentSelect="currentSelect"></EditType>
    <!-- 字典项面板 -->
    <ItemPanel ref="ItemPanel" :currentType="currentSelect"></ItemPanel>
  </div>
</template>

<script>
import { mockTableData } from '@/util/mock'
import { userType, baseStatus } from '@/util/option'
import PaginationMixin from '@/mixin/pagination'
import EditType from '@/views/platformManage/dataDictionary/dialog/EditType'
import ItemPanel from '@/views/platformManage/dataDictionary/dialog/ItemPanel'

export default {
  components: { EditType, ItemPanel },
  mixins: [PaginationMixin],
  data () {
    return {
      userType,
      baseStatus,
      tableData: mockTableData(10),
      isCreate: true
    }
  },
  methods: {
    createType () {
      this.isCreate = true
      this.$refs.EditType.showFlag = true
    },
    modifyType () {
      this.isCreate = false
      this.$refs.EditType.showFlag = true
    },
    modifyItem () {
      this.$refs.ItemPanel.showFlag = true
    },
    delType () {},
    refreshType () {},
    getList () {}
  }
}
</script>

<style>
</style>
