<!--
 * @Author: KokoTa
 * @Date: 2021-01-06 10:43:25
 * @LastEditTime: 2021-02-05 09:15:51
 * @LastEditors: KokoTa
 * @Description:
 * @FilePath: /future-bms/src/views/commodityManage/commodityGroup/index.vue
-->

<template>
  <div class="wrap">
    <!-- 搜索区域 -->
    <section class="panel">
      <el-form ref="form" :model="searchData" :inline="true">
        <el-form-item label="分组名称">
          <el-input v-model="searchData.name" placeholder="输入分组名称" clearable></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="searchData.remark" placeholder="输入备注" clearable></el-input>
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
        <el-button type="primary" :disabled="isShow.urlCreate" size="small" @click="create">新增分组</el-button>
      </div>
      <!-- 表格 -->
      <el-table class="table" :data="tableData" border @row-click="getCurrentSelect">
        <el-table-column type="index" width="50"></el-table-column>
        <el-table-column prop="name" label="分组名称"></el-table-column>
        <el-table-column prop="remark" label="备注"></el-table-column>
        <el-table-column prop="createTimeFormat" label="创建时间"></el-table-column>
        <el-table-column label="操作" width="200">
          <template>
            <el-button type="text" @click="detail">详情</el-button>
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
    <!-- 分组项操作 -->
    <Detail ref="Detail" :currentItem="currentSelect" :type="CommodityManageType.COMMODITY_GROUP"></Detail>
    <!-- 获取权限功能 -->
    <jurisdiction @getJurisdiction="getJurisdiction"></jurisdiction>
  </div>
</template>

<script>
import { userType, baseStatus } from '@/util/option'
import PaginationMixin from '@/mixin/pagination'
import Edit from '@/views/commodityManage/commodityGroup/dialog/Edit'
import Detail from '@/views/commodityManage/bigColumnManage/dialog/Detail'
import { requestList } from '@/util'
import { delGoodsGroup, getGoodsGroupList } from '@/api/commodityGroup'
import { formatTableTime } from '@/util/format'
import { CommodityManageType } from '@/util/constant'
import jurisdiction from "@/components/Jurisdiction";
export default {
  components: { Edit, Detail, jurisdiction },
  mixins: [PaginationMixin],
  data () {
    return {
      userType,
      baseStatus,
      tableData: [],
      isCreate: true,
      CommodityManageType,
      isShow: {}
    }
  },
  methods: {
    detail () {
      this.$refs.Detail.showFlag = true
    },
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
        const { goodsGroupId } = this.currentSelect
        await delGoodsGroup({ goodsGroupId })
        this.$message.success('删除成功')
        this.getList()
      }).catch(() => {})
    },

    async getList (params = this.searchData) {
      const data = await requestList(getGoodsGroupList, params, this.page)
      this.tableData = data.content.map((item) => {
        item.createTimeFormat = formatTableTime(item.createTime)
        return item
      })
      this.page = data.page
    },
    // 获取权限功能
    getJurisdiction(val) {
      this.isShow = val
    },
  },
  mounted () {
    this.getList()
  }
}
</script>

<style>
</style>
