<!--
 * @Author: KokoTa
 * @Date: 2021-01-22 16:43:24
 * @LastEditTime: 2021-01-27 10:02:23
 * @LastEditors: KokoTa
 * @Description: 商品管理-通用物品列表组件
 * @FilePath: /future-bms/src/views/commodityManage/bigColumnManage/dialog/AddItem.vue
-->

<template>
  <el-dialog title="物品列表" :visible.sync="showFlag" @open="open" append-to-body>
    <!-- 表格区域 -->
    <section>
      <!-- 表格操作 -->
      <div class="table-operation">
        <el-select class="w-180" v-model="searchData.catalogId" placeholder="请选择分类" clearable>
          <el-option
            v-for="item in catalogList"
            :key="item.catalogId"
            :label="item.catalogName"
            :value="item.catalogId"
          >{{item.catalogName}}</el-option>
        </el-select>
        <el-input class="w-180" v-model="searchData.materialsName" placeholder="请输入物品名称" clearable></el-input>
        <el-button type="primary" size="small" @click="search">搜索</el-button>
      </div>
      <!-- 这里的列表是 教务管理 -> 物品管理 的列表 -->
      <!-- 表格 -->
      <el-table
        ref="table"
        class="table"
        height="400"
        :data="tableData"
        border
        @row-click="getCurrentSelect"
        @selection-change="selectChange"
      >
        <el-table-column type="selection" width="50"></el-table-column>
        <el-table-column prop="materialsName" label="物品名称"></el-table-column>
        <el-table-column prop="quantity" label="库存数量"></el-table-column>
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
    <span slot="footer">
      <el-button type="default" size="small" @click="showFlag = false">取消</el-button>
      <el-button type="primary" size="small" @click="submit">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import PaginationMixin from '@/mixin/pagination'
import { getCatalogOption } from '@/util/option'
import { requestList } from '@/util'
import { getMaterialList } from '@/api/itemManage'

export default {
  mixins: [PaginationMixin],
  props: {
    currentItem: { // 选中的表格行的数据（这里不使用 currentSelect 命名是因为会和 mixin 的命名冲突）
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      catalogId: '',
      materialsName: '',
      showFlag: false,
      tableData: [],
      selected: [],
      catalogList: []
    }
  },
  methods: {
    selectChange (rows) {
      this.selected = rows
    },
    async submit () {
      this.$emit('getCommodity', [...this.selected])
      this.showFlag = false
    },

    async getList (params = this.searchData) {
      const data = await requestList(getMaterialList, params, this.page)
      this.tableData = data.content
      this.page = data.page
    },
    async open () {
      this.selected = []
      this.$refs.table && this.$refs.table.clearSelection()
      // 获取物品分类
      const list = await getCatalogOption()
      this.catalogList = list
      // 获取列表
      this.getList()
    }
  }
}
</script>

<style>
</style>
