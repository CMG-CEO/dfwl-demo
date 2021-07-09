<!--
 * @Author: KokoTa
 * @Date: 2020-12-28 09:10:03
 * @LastEditTime: 2021-02-03 09:18:19
 * @LastEditors: KokoTa
 * @Description: 商品属性
 * @FilePath: /future-bms/src/views/commodityManage/commodityAttributes/index.vue
-->
<template>
  <div class="wrap">
    <!-- 搜索区域 -->
    <section class="panel">
      <el-form ref="form" :model="searchData" :inline="true">
        <el-form-item label="属性名称">
          <el-select v-model="searchData.goodsAttrType" placeholder="选择属性名称" clearable filterable>
            <el-option
              v-for="(item, index) in typeList"
              :key="index"
              :label="item.typeName"
              :value="item.typeName"
            >{{item.typeName}}</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="属性值">
          <el-input v-model="searchData.goodsAttrValue" placeholder="输入属性值" clearable></el-input>
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
        <el-button type="primary" size="small" :disabled="isShow.urlCreate" @click="create">新增商品属性</el-button>
      </div>
      <!-- 表格 -->
      <el-table class="table" :data="tableData" border @row-click="getCurrentSelect">
        <el-table-column type="index" width="50"></el-table-column>
        <el-table-column prop="goodsAttrType" label="商品属性名称"></el-table-column>
        <el-table-column prop="goodsAttrValue" label="商品属性值"></el-table-column>
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
    <Edit
      ref="Edit"
      :isCreate="isCreate"
      :currentSelect="currentSelect"
      :typeList="typeList"
      @reload="getList()"
    ></Edit>
    <!-- 获取权限功能 -->
    <jurisdiction @getJurisdiction="getJurisdiction"></jurisdiction>
  </div>
</template>

<script>
import { userType, baseStatus } from '@/util/option'
import PaginationMixin from '@/mixin/pagination'
import Edit from '@/views/commodityManage/commodityAttributes/dialog/Edit'
import { requestList } from '@/util'
import { delGoodAttr, getGoodAttrList } from '@/api/commodityAttributes'
import { formatTableTime } from '@/util/format'
import { getDictList } from '@/api/dict'
import jurisdiction from "@/components/Jurisdiction";
export default {
  components: { Edit, jurisdiction },
  mixins: [PaginationMixin],
  data () {
    return {
      userType,
      baseStatus,
      tableData: [],
      typeList: [],
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
        const { goodsAttrId } = this.currentSelect
        await delGoodAttr({ goodsAttrId })
        this.$message.success('删除成功')
        this.getList()
      }).catch(() => {})
    },

    async getList (params = this.searchData) {
      const data = await requestList(getGoodAttrList, params, this.page)
      this.tableData = data.content.map((item) => {
        item.createTimeFormat = formatTableTime(item.createTime)
        return item
      })
      this.page = data.page
    },
    async getTypeList () {
      const data = await getDictList()
      this.typeList = data.data.content
    },
    // 获取权限功能
    getJurisdiction(val) {
      this.isShow = val
    },
  },
  mounted () {
    this.getTypeList()
    this.getList()
  }
}
</script>

<style>
</style>
