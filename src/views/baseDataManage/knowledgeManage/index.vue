<!--
 * @Author: KokoTa
 * @Date: 2020-12-28 09:10:08
 * @LastEditTime: 2021-01-08 16:27:00
 * @LastEditors: KokoTa
 * @Description: 知识点管理
 * @FilePath: /future-bms/src/views/baseDataManage/knowledgeManage/index.vue
-->
<template>
  <div class="wrap">
    <!-- 搜索区域 -->
    <section class="panel">
      <el-form ref="form" :model="searchData" :inline="true">
        <el-form-item label="类型">
          <el-select v-model="searchData.subjectModuleFlag" placeholder="选择类型" clearable filterable>
            <el-option
              v-for="(item, index) in knowledgeType"
              :key="index"
              :label="item.label"
              :value="item.value"
            >{{item.label}}</el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-if="searchData.subjectModuleFlag" label="科目/模块">
          <el-select v-model="searchData.objectId" placeholder="选择科目/模块" clearable filterable>
            <el-option
              v-for="(item, index) in objectList"
              :key="index"
              :label="item.moduleName || item.subjectName"
              :value="item.moduleId || item.subjectId"
            >{{item.moduleName || item.subjectName}}</el-option>
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
        <el-button type="primary" size="small" :disabled="isShow.urlCreate" @click="create">新增知识点</el-button>
      </div>
      <!-- 表格 -->
      <el-table class="table" :data="tableData" border @row-click="getCurrentSelect">
        <el-table-column type="index" width="50"></el-table-column>
        <el-table-column prop="objectName" label="科目/模块名称"></el-table-column>
        <el-table-column prop="subjectModuleFlagFormat" label="类型"></el-table-column>
        <el-table-column prop="knowledgeName" label="知识点名称"></el-table-column>
        <el-table-column prop="pknowledgeName" label="上级知识点名称"></el-table-column>
        <el-table-column prop="isActiveFormat" label="状态"></el-table-column>
        <el-table-column prop="indexNo" label="顺序"></el-table-column>
        <el-table-column label="操作" width="200">
          <template slot-scope="scope">
            <el-button type="text" :disabled="isShow.urlUpdate" @click="modify">编辑</el-button>
            <el-button v-if="+scope.row.isActive === 0" type="text" @click="toggle(scope.row)">启用</el-button>
            <el-button v-else type="text" @click="toggle(scope.row)">禁用</el-button>
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
import { getModuleOption, getSubjectOption, knowledgeType, baseStatus } from '@/util/option'
import PaginationMixin from '@/mixin/pagination'
import Edit from '@/views/baseDataManage/knowledgeManage/dialog/Edit'
import { requestList } from '@/util'
import { activeKnowledge, delKnowledge, getKnowledgeList } from '@/api/knowledgeManage'
import { formatActive, formatSubjectModule } from '@/util/format'
import jurisdiction from "@/components/Jurisdiction";
export default {
  components: { Edit, jurisdiction },
  mixins: [PaginationMixin],
  data () {
    return {
      objectList: [],
      knowledgeType,
      baseStatus,
      tableData: [],
      isCreate: true,
      isShow: {}
    }
  },
  watch: {
    'searchData.subjectModuleFlag' (val) {
      if (val === 1) {
        this.objectList = this.subjectList
      }
      if (val === 2) {
        this.objectList = this.moduleList
      }
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
    async toggle (row) {
      // 这里不能使用 currentSelect，因为获取 currentSelect 的操作需要冒泡后才会执行，因此这里只能用 scope.row 的值
      const { knowledgeId, isActive } = row
      await activeKnowledge({ knowledgeId, isActive: +isActive === 0 ? 1 : 0 })
      this.$message.success('操作成功')
      this.getList()
    },
    del () {
      this.$confirm('确定删除吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const { knowledgeId } = this.currentSelect
        await delKnowledge({ knowledgeId })
        this.$message.success('删除成功')
        this.getList()
      }).catch(() => {})
    },

    async getList (params = this.searchData) {
      const data = await requestList(getKnowledgeList, params, this.page)
      this.tableData = data.content.map((item) => {
        item.isActiveFormat = formatActive(item.isActive)
        item.subjectModuleFlagFormat = formatSubjectModule(item.subjectModuleFlag)
        return item
      })
      this.page = data.page
    },
    // 获取权限功能
    getJurisdiction(val) {
      this.isShow = val
    },
  },
  async mounted () {
    this.subjectList = await getSubjectOption()
    this.moduleList = await getModuleOption()
    this.getList()
  }
}
</script>

<style>
</style>
