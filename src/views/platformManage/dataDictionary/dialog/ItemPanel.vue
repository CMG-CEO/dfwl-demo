<!--
 * @Author: KokoTa
 * @Date: 2020-12-23 17:27:00
 * @LastEditTime: 2020-12-24 09:13:47
 * @LastEditors: KokoTa
 * @Description: 字典项查询
 * @FilePath: /future-bms/src/views/platformManage/dataDictionary/dialog/ItemPanel.vue
-->
<template>
  <el-dialog title="字典项面板" :visible.sync="showFlag" width="1000px">
    <div class="wrap">
      <!-- 搜索区域 -->
      <section class="panel">
        <el-form ref="form" :model="searchData" :inline="true">
          <el-form-item label="字典项目编码">
            <el-input v-model="searchData.phone" placeholder="输入字典项目编码" clearable></el-input>
          </el-form-item>
          <el-form-item label="字典项目名称">
            <el-input v-model="searchData.usernmae" placeholder="输入字典项目名称" clearable></el-input>
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
          <el-button type="primary" size="small" @click="createItem">新增字典项</el-button>
        </div>
        <!-- 表格 -->
        <el-table class="table" :data="tableData" border @row-click="getCurrentSelect">
          <el-table-column type="index" width="50"></el-table-column>
          <el-table-column prop="prop" label="字典项编码"></el-table-column>
          <el-table-column prop="prop" label="字典项名称"></el-table-column>
          <el-table-column prop="prop" label="是否生效"></el-table-column>
          <el-table-column label="操作" width="250">
            <template>
              <el-button type="text" @click="modifyItem">编辑</el-button>
              <el-button type="text text-red" size="small" @click="delItem">删除</el-button>
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
      <EditItem ref="EditItem" :isCreate="isCreate" :currentSelect="currentSelect"></EditItem>
    </div>
  </el-dialog>
</template>

<script>
import { mockTableData } from '@/util/mock'
import { userType, baseStatus } from '@/util/option'
import PaginationMixin from '@/mixin/pagination'
import EditItem from '@/views/platformManage/dataDictionary/dialog/EditItem'

export default {
  props: {
    currentType: { // 选中的表格行的数据（这里不使用 currentSelect 命名是因为会和 mixin 的命名冲突）
      type: Object,
      default: () => {}
    }
  },
  components: { EditItem },
  mixins: [PaginationMixin],
  data () {
    return {
      showFlag: false,
      userType,
      baseStatus,
      tableData: mockTableData(10),
      isCreate: true
    }
  },
  methods: {
    createItem () {
      this.isCreate = true
      this.$refs.EditItem.showFlag = true
    },
    modifyItem () {
      this.isCreate = false
      this.$refs.EditItem.showFlag = true
    },
    delItem () {},
    refreshType () {},
    getList () {}
  }
}
</script>

<style>
</style>
