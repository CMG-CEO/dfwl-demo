<!--
 * @Author: KokoTa
 * @Date: 2021-01-13 09:53:21
 * @LastEditTime: 2021-01-20 14:29:19
 * @LastEditors: KokoTa
 * @Description
 * @FilePath: /future-bms/src/views/educationManage/studentManage/index.vue
-->

<template>
  <div class="wrap">
    <!-- 搜索区域 -->
    <section class="panel">
      <el-form ref="form" :model="searchData" :inline="true">
        <el-form-item label="登录账号">
          <el-input v-model="searchData.loginId" placeholder="输入登录账号" clearable></el-input>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="searchData.userName" placeholder="输入姓名" clearable></el-input>
        </el-form-item>
        <el-form-item label="昵称">
          <el-input v-model="searchData.nickName" placeholder="输入昵称" clearable></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="searchData.status" placeholder="请选择状态" clearable>
            <el-option
              v-for="item in baseStatus"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :disabled="isShow.urlQuery" @click="search">查询</el-button>
          <el-button type="primary" :disabled="isShow.urlQuery" @click="resetSearch">重置</el-button>
          <el-button type="primary" @click="sendMessage">发短信</el-button>
        </el-form-item>
      </el-form>
    </section>
    <!-- 表格区域 -->
    <section class="panel">
      <!-- 表格 -->
      <el-table
        class="table"
        :data="tableData"
        border
        @row-click="getCurrentSelect"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="index" width="50"></el-table-column>
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="loginId" label="登录账号"></el-table-column>
        <el-table-column prop="userName" label="姓名"></el-table-column>
        <el-table-column prop="nickName" label="昵称"></el-table-column>
        <el-table-column prop="mobile" label="联系手机"></el-table-column>
        <el-table-column prop="registerTime" label="注册日期"></el-table-column>
        <el-table-column prop="ashoreName" label="上岸"></el-table-column>
        <el-table-column label="操作" width="280">
          <template slot-scope="scope">
            <el-button type="text" @click="modify">查看订单</el-button>
            <el-button type="text" @click="modify">班级</el-button>
            <el-button type="text" @click="modify">学习情况</el-button>
            <el-button
              v-if="+scope.row.ashoreFlag"
              type="text"
              @click="handleAshore(false, scope.row)"
            >清除</el-button>
            <el-button v-else type="text" @click="handleAshore(true, scope.row)">上岸</el-button>
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
    <!-- 上岸 -->
    <Ashore ref="ashore" :currentItem="currentSelect" @reload="getList()"></Ashore>
    <!-- 获取权限功能 -->
    <jurisdiction @getJurisdiction="getJurisdiction"></jurisdiction>
  </div>
</template>

<script>
import { userType, baseStatus } from '@/util/option'
import PaginationMixin from '@/mixin/pagination'
import { requestList } from '@/util'
import { delGoodsGroup } from '@/api/commodityGroup'
import { ashoreStudent, getStudentList } from '@/api/studentManage'
import { formatTableTime } from '@/util/format'
import Ashore from '@/views/educationManage/studentManage/dialog/Ashore'
import jurisdiction from "@/components/Jurisdiction";
export default {
  components: { Ashore, jurisdiction },
  mixins: [PaginationMixin],
  data () {
    return {
      userType,
      baseStatus,
      tableData: [],
      isCreate: true,
      isShow: {}
    }
  },
  methods: {
    sendMessage () {},
    handleSelectionChange (rows) {
      console.log(rows)
    },
    async handleAshore (flag, row) {
      if (flag) {
        // 上岸
        this.$refs.ashore.showFlag = true
      } else {
        // 清除
        const { studentId } = row
        await ashoreStudent({
          studentId,
          ashoreFlag: 0,
          writtenScore: 0,
          interviewScore: 0
        })
        this.$message.success('操作成功')
        this.getList()
      }
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
      const data = await requestList(getStudentList, params, this.page)
      this.tableData = data.content.map((item) => {
        item.registerTime = formatTableTime(item.registerTime)
        item.ashoreName = +item.ashoreFlag ? '是' : '否'
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
