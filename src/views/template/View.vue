<template>
  <div class="wrap">
    <!-- 搜索区域 -->
    <section class="panel">
      <el-form ref="form" :model="searchData" :inline="true">
        <el-form-item label="分组名称">
          <el-input v-model="searchData.goodsAttrValue" placeholder="输入分组名称" clearable></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="searchData.goodsAttrValue" placeholder="输入备注" clearable></el-input>
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
        <el-button type="primary" size="small" @click="create">新增分组</el-button>
      </div>
      <!-- 表格 -->
      <el-table class="table" :data="tableData" border @row-click="getCurrentSelect">
        <el-table-column type="index" width="50"></el-table-column>
        <el-table-column prop="prop" label="分组名称"></el-table-column>
        <el-table-column prop="prop" label="备注"></el-table-column>
        <el-table-column prop="prop" label="创建时间"></el-table-column>
        <el-table-column label="操作" width="200">
          <template>
            <el-button type="text" @click="add">详情</el-button>
            <el-button type="text" @click="modify">编辑</el-button>
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
    </section>
    <!-- 新建或编辑 -->
    <Edit ref="Edit" :isCreate="isCreate" :currentSelect="currentSelect" @reload="getList()"></Edit>
  </div>
</template>

<script>
import PaginationMixin from '@/mixin/pagination'
import { mockTableData } from '@/util/mock'

export default {
  mixins: [PaginationMixin],
  data () {
    return {
      tableData: mockTableData(),
      isCreate: true
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
        this.$message.success('删除成功')
        this.getList()
      }).catch(() => {})
    },

    async getList (params = this.searchData) {
    }
  },
  mounted () {
    this.getList()
  }
}
</script>

<style>
</style>
